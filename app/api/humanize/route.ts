import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getHumanizationPrompt } from '@/lib/prompts';
import { humanizeWithGemini } from '@/lib/gemini';
import { auth } from '@clerk/nextjs/server';
import { getDb } from '@/lib/db';

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
    // Get authenticated user from Clerk
    const { userId } = await auth();

    if (!userId) {
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
    
    // Get user's current credits from Neon
    const pool = await getDb();
    const { rows } = await pool.query(
      'SELECT credits FROM users WHERE clerk_id = $1',
      [userId]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'User not found. Please sign in again.' },
        { status: 404 }
      );
    }

    const currentCredits = rows[0].credits || 0;
    
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
    const systemPrompt = getHumanizationPrompt(tone as any);

    // Determine which AI provider to use (Gemini as primary)
    let selectedProvider = provider;
    let humanizedText = '';
    let qualityScore: any = undefined;
    
    // Auto-select provider: Gemini first, then OpenAI
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

      console.log('🤖 Calling Google Gemini with humanization...');
      
      const result = await humanizeWithGemini(text, tone as any, systemPrompt);
      humanizedText = result.text;
      qualityScore = result.score;
      
      console.log('✅ Gemini humanization successful');
      console.log(`📊 Quality: ${result.score.total}/100 | Generations: ${result.generationCount} | Model: ${result.modelUsed}`);
      
    } else if (selectedProvider === 'openai') {
      if (!openai) {
        return NextResponse.json(
          { error: 'OpenAI API key is not configured.' },
          { status: 500 }
        );
      }

      console.log('🤖 Calling OpenAI with humanization...');
      
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

      humanizedText = completion.choices[0]?.message?.content?.trim() || '';
      console.log('✅ OpenAI humanization successful');
      console.log(`📊 Tokens used: ${completion.usage?.total_tokens || 'unknown'}`);
    }

    if (!humanizedText) {
      throw new Error('No response from AI provider');
    }

    // Deduct credits and update database
    const newCredits = currentCredits - wordCount;
    
    await pool.query(
      'UPDATE users SET credits = $1, updated_at = NOW() WHERE clerk_id = $2',
      [newCredits, userId]
    );

    // Log transaction
    await pool.query(
      `INSERT INTO credit_transactions (user_id, amount, type, description, created_at)
       VALUES ($1, $2, $3, $4, NOW())`,
      [userId, -wordCount, 'usage', `Humanized ${wordCount} words (${tone} tone)`]
    );

    // Save to history
    await pool.query(
      `INSERT INTO humanization_history (user_id, original_text, humanized_text, tone, word_count, credits_used, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
      [userId, text, humanizedText, tone, wordCount, wordCount]
    );

    // Log success
    console.log(`📊 Input length: ${text.length} chars`);
    console.log(`📊 Output length: ${humanizedText.length} chars`);
    console.log(`💳 Credits deducted: ${wordCount}`);
    console.log(`💰 Remaining credits: ${newCredits}`);

    // Return humanized text with credit info
    return NextResponse.json({
      success: true,
      humanizedText,
      stats: {
        inputLength: text.length,
        outputLength: humanizedText.length,
        tone,
        provider: selectedProvider,
        wordCount,
        creditsUsed: wordCount,
        remainingCredits: newCredits,
        qualityScore: selectedProvider === 'gemini' && typeof qualityScore !== 'undefined' ? qualityScore : null,
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

    // Determine default provider
    let defaultProvider = 'none';
    if (hasGemini) defaultProvider = 'gemini';
    else if (hasOpenAI) defaultProvider = 'openai';

    return NextResponse.json({
      status: 'ok',
      defaultProvider,
      config: {
        gemini: hasGemini ? 'configured ✅' : 'missing',
        openai: hasOpenAI ? 'configured' : 'missing',
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
