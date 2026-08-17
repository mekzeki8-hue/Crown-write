import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getRewritingPrompt } from '@/lib/prompts';
import { rewriteWithGemini } from '@/lib/gemini';
import { createClient } from '@/lib/supabase/server';
import { getUserCredits, deductCredits, saveRewritingHistory } from '@/lib/supabase/setup-database';

// Initialize OpenAI client (optional, for paid users)
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

// Rate limiting (basic implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return true;
  }

  if (limit.count >= 10) {
    return false;
  }

  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      );
    }

    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in a minute.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { text, tone = 'standard', provider = 'auto' } = body;

    // Validation
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input. "text" field is required.' },
        { status: 400 }
      );
    }

    if (text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text cannot be empty.' },
        { status: 400 }
      );
    }

    if (text.length > 3000) {
      return NextResponse.json(
        { error: 'Text is too long. Maximum 3,000 words per request.' },
        { status: 400 }
      );
    }

    // Calculate word count (1 word = 1 credit)
    const wordCount = text.trim().split(/\s+/).length;
    
    // Check if user has enough credits
    const currentCredits = await getUserCredits(user.id);
    
    if (currentCredits < wordCount) {
      return NextResponse.json(
        { 
          error: `Insufficient credits. You need ${wordCount} credits but only have ${currentCredits}.`,
          requiredCredits: wordCount,
          availableCredits: currentCredits,
        },
        { status: 402 } // Payment Required
      );
    }

    // Load the rewriting system prompt (minimal for fine-tuned model)
    const systemPrompt = getRewritingPrompt(tone as any);

    // Determine which AI provider to use
    let selectedProvider = provider;
    let rewrittenText = '';
    let qualityScore: any = undefined;
    
    // Auto-select provider: Gemini (free) first, then OpenAI if available
    if (selectedProvider === 'auto') {
      if (process.env.GOOGLE_GEMINI_API_KEY) {
        selectedProvider = 'gemini';
      } else if (openai) {
        selectedProvider = 'openai';
      } else {
        return NextResponse.json(
          { error: 'No AI provider configured. Please set up Gemini or OpenAI API key.' },
          { status: 500 }
        );
      }
    }

    console.log(`🤖 Using AI provider: ${selectedProvider}`);

    // Call the appropriate AI provider
    if (selectedProvider === 'gemini') {
      if (!process.env.GOOGLE_GEMINI_API_KEY) {
        return NextResponse.json(
          { error: 'Gemini API key is not configured.' },
          { status: 500 }
        );
      }

      console.log('🤖 Calling Google Gemini (fine-tuned) with rewriting...');
      
      const result = await rewriteWithGemini(text, tone as any, systemPrompt);
      rewrittenText = result.text;
      qualityScore = result.score;
      
      console.log('✅ Gemini rewriting successful');
      console.log(`📊 Quality: ${result.score.total}/100 | Generations: ${result.generationCount} | Model: ${result.modelUsed}`);
      
    } else if (selectedProvider === 'openai') {
      if (!openai) {
        return NextResponse.json(
          { error: 'OpenAI API key is not configured.' },
          { status: 500 }
        );
      }

      
      const userMessage = `Humanize the following text. Output ONLY the humanized version with no explanations, notes, or meta-commentary:\n\n${text}`;
      
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 4000,
        top_p: 0.9,
        frequency_penalty: 0.3,
        presence_penalty: 0.1,
      });

      rewrittenText = completion.choices[0]?.message?.content?.trim() || '';
      console.log('✅ OpenAI rewriting successful');
      console.log(`📊 Tokens used: ${completion.usage?.total_tokens || 'unknown'}`);
    }

    if (!rewrittenText) {
      throw new Error('No response from AI provider');
    }

    // Deduct credits (1 word = 1 credit)
    const deductResult = await deductCredits(
      user.id,
      wordCount,
      `Rewritten ${wordCount} words (${tone} tone)`
    );

    if (!deductResult.success) {
      return NextResponse.json(
        { error: 'Failed to deduct credits. Please try again.' },
        { status: 500 }
      );
    }

    // Save to history
    await saveRewritingHistory({
      userId: user.id,
      originalText: text,
      rewrittenText: rewrittenText,
      tone,
      ultraMode: false,
      wordCount,
      creditsUsed: wordCount,
    });

    // Log success
    console.log(`📊 Input length: ${text.length} chars`);
    console.log(`📊 Output length: ${rewrittenText.length} chars`);
    console.log(`💳 Credits deducted: ${wordCount}`);
    console.log(`💰 Remaining credits: ${deductResult.remainingCredits}`);

    // Return humanized text with credit info
    return NextResponse.json({
      success: true,
      rewrittenText,
      stats: {
        inputLength: text.length,
        outputLength: rewrittenText.length,
        tone,
        provider: selectedProvider,
        wordCount,
        creditsUsed: wordCount,
        remainingCredits: deductResult.remainingCredits,
        qualityScore: selectedProvider === 'gemini' && typeof qualityScore !== 'undefined' ? qualityScore : null,
      },
    });

  } catch (error: any) {
    console.error('❌ Rewriting error:', error);

    // Handle specific errors
    if (error?.message?.includes('API key') || error?.status === 401) {
      return NextResponse.json(
        { error: 'Invalid API key. Please check your configuration.' },
        { status: 500 }
      );
    }

    if (error?.status === 429 || error?.message?.includes('quota')) {
      return NextResponse.json(
        { error: 'API rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    if (error?.code === 'ENOENT') {
      return NextResponse.json(
        { error: 'Rewriting prompt file not found. Please check configuration.' },
        { status: 500 }
      );
    }

    // Generic error
    return NextResponse.json(
      { error: 'Rewriting failed. Please try again.' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  try {
    const hasTunedModel = !!(process.env.GOOGLE_CLOUD_PROJECT && process.env.TUNED_MODEL_ENDPOINT);
    const hasGemini = !!process.env.GOOGLE_GEMINI_API_KEY;
    const hasOpenAI = !!process.env.OPENAI_API_KEY;

    // Determine default provider
    let defaultProvider = 'none';
    if (hasTunedModel) defaultProvider = 'fine-tuned';
    else if (hasGemini) defaultProvider = 'gemini';
    else if (hasOpenAI) defaultProvider = 'openai';

    return NextResponse.json({
      status: 'ok',
      defaultProvider,
      config: {
        fineTuned: hasTunedModel ? 'configured' : 'missing',
        gemini: hasGemini ? 'configured (FREE)' : 'missing',
        openai: hasOpenAI ? 'configured (paid)' : 'missing',
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Health check failed' },
      { status: 500 }
    );
  }
}
