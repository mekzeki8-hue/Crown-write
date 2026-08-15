import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getHumanizationPrompt } from '@/lib/prompts';
import { humanizeWithGemini } from '@/lib/gemini';
import { createClient } from '@/lib/supabase/server';
import { getUserCredits, deductCredits, saveHumanizationHistory } from '@/lib/supabase/setup-database';

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
    const { text, tone = 'standard', mode = 'standard', provider = 'auto', qualityMode = 'high' } = body;

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

    // Load the humanization system prompt
    const systemPrompt = getHumanizationPrompt();

    // Add tone-specific instructions
    let toneInstruction = '';
    switch (tone.toLowerCase()) {
      case 'academic':
        toneInstruction = '\n\nTONE: Academic but still natural. Use scholarly vocabulary but maintain human flow. Appropriate for essays, research, and academic writing.';
        break;
      case 'professional':
        toneInstruction = '\n\nTONE: Professional and clear. Business-appropriate language while staying natural and approachable. Suitable for work emails, reports, and business content.';
        break;
      case 'standard':
      default:
        toneInstruction = '\n\nTONE: Standard conversational. Natural everyday language. Appropriate for general content, blogs, and casual writing.';
    }

    // Add mode-specific instructions
    let modeInstruction = '';
    if (mode === 'ultra') {
      modeInstruction = '\n\nMODE: ULTRA - Apply maximum humanization. Be more aggressive with natural language patterns, contractions, and casual phrasing. Push boundaries of natural human writing.';
    }

    // Construct the full system prompt
    const fullSystemPrompt = systemPrompt + toneInstruction + modeInstruction;

    // Determine which AI provider to use
    let selectedProvider = provider;
    let humanizedText = '';
    
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

      console.log('🤖 Calling Google Gemini (FREE) with humanization prompt...');
      
      // Use quality selection for better results (3 generations, pick best)
      const useQualitySelection = qualityMode === 'high';
      humanizedText = await humanizeWithGemini(text, fullSystemPrompt, useQualitySelection);
      
      console.log('✅ Gemini humanization successful');
      
    } else if (selectedProvider === 'openai') {
      if (!openai) {
        return NextResponse.json(
          { error: 'OpenAI API key is not configured.' },
          { status: 500 }
        );
      }

      console.log('🤖 Calling OpenAI with humanization prompt...');
      
      const userMessage = `Humanize the following text. Output ONLY the humanized version with no explanations, notes, or meta-commentary:\n\n${text}`;
      
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: fullSystemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 4000,
        top_p: 0.9,
        frequency_penalty: 0.3,
        presence_penalty: 0.1,
      });

      humanizedText = completion.choices[0]?.message?.content?.trim() || '';
      console.log('✅ OpenAI humanization successful');
      console.log(`📊 Tokens used: ${completion.usage?.total_tokens || 'unknown'}`);
    }

    if (!humanizedText) {
      throw new Error('No response from AI provider');
    }

    // Deduct credits (1 word = 1 credit)
    const deductResult = await deductCredits(
      user.id,
      wordCount,
      `Humanized ${wordCount} words (${tone} tone, ${mode} mode)`
    );

    if (!deductResult.success) {
      return NextResponse.json(
        { error: 'Failed to deduct credits. Please try again.' },
        { status: 500 }
      );
    }

    // Save to history
    await saveHumanizationHistory({
      userId: user.id,
      originalText: text,
      humanizedText: humanizedText,
      tone,
      ultraMode: mode === 'ultra',
      wordCount,
      creditsUsed: wordCount,
    });

    // Log success
    console.log(`📊 Input length: ${text.length} chars`);
    console.log(`📊 Output length: ${humanizedText.length} chars`);
    console.log(`💳 Credits deducted: ${wordCount}`);
    console.log(`💰 Remaining credits: ${deductResult.remainingCredits}`);

    // Return humanized text with credit info
    return NextResponse.json({
      success: true,
      humanizedText,
      stats: {
        inputLength: text.length,
        outputLength: humanizedText.length,
        tone,
        mode,
        provider: selectedProvider,
        wordCount,
        creditsUsed: wordCount,
        remainingCredits: deductResult.remainingCredits,
      },
    });

  } catch (error: any) {
    console.error('❌ Humanization error:', error);

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
        { error: 'Humanization prompt file not found. Please check configuration.' },
        { status: 500 }
      );
    }

    // Generic error
    return NextResponse.json(
      { error: 'Humanization failed. Please try again.' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  try {
    const hasGemini = !!process.env.GOOGLE_GEMINI_API_KEY;
    const hasOpenAI = !!process.env.OPENAI_API_KEY;
    const hasPrompt = !!process.env.HUMANIZATION_PROMPT_PATH;

    // Determine default provider
    let defaultProvider = 'none';
    if (hasGemini) defaultProvider = 'gemini';
    else if (hasOpenAI) defaultProvider = 'openai';

    return NextResponse.json({
      status: 'ok',
      defaultProvider,
      config: {
        gemini: hasGemini ? 'configured (FREE)' : 'missing',
        openai: hasOpenAI ? 'configured (paid)' : 'missing',
        prompt: hasPrompt ? 'configured' : 'missing',
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
