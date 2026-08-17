import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAuth } from 'google-auth-library';
import { generateWithQualitySelection, scoreRewrittenText } from './quality-scorer';
import { finalizeRewrittenText } from './post-processor';

type ToneType = 'standard' | 'academic' | 'professional' | 'friendly' | 'formal' | 'casual' | 'creative';

/**
 * Get adaptive temperature based on tone
 * Different tones need different creativity levels
 */
function getTemperatureForTone(tone: ToneType): number {
  const temperatureMap: Record<ToneType, number> = {
    academic: 0.7,      // More consistent, scholarly
    professional: 0.75, // Balanced, clear
    formal: 0.7,        // Structured, proper
    standard: 0.85,     // Natural variation
    friendly: 0.9,      // Warm, personable
    casual: 0.9,        // Relaxed, conversational
    creative: 1.0,      // Maximum expression
  };
  return temperatureMap[tone] || 0.85;
}

/**
 * Determine how many generations to use based on text length
 * Shorter texts = faster, longer texts = more quality passes
 */
function getGenerationCount(wordCount: number): number {
  if (wordCount < 300) return 1;      // Short: fast single pass
  if (wordCount < 800) return 2;      // Medium: balanced
  return 3;                            // Long: best quality
}

/**
 * Initialize Google Gemini AI client (standard models)
 * Gemini is 100% FREE with generous limits (1M tokens/day)
 */
export function getGeminiClient() {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GOOGLE_GEMINI_API_KEY is not configured');
  }

  return new GoogleGenerativeAI(apiKey);
}

/**
 * Get Google Cloud access token using Application Default Credentials
 * Used for authenticating Vertex AI endpoint requests
 */
async function getAccessToken(): Promise<string> {
  const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
  
  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();
  
  if (!accessToken.token) {
    throw new Error('Failed to obtain access token');
  }
  
  return accessToken.token;
}

/**
 * Call the fine-tuned Vertex AI endpoint using REST API
 * The model is already trained for humanization, just needs the text and tone
 */
async function callTunedEndpoint(
  text: string,
  tone: ToneType,
  systemPrompt: string
): Promise<string> {
  const project = process.env.GOOGLE_CLOUD_PROJECT;
  const endpoint = process.env.TUNED_MODEL_ENDPOINT;
  
  if (!project || !endpoint) {
    throw new Error('GOOGLE_CLOUD_PROJECT and TUNED_MODEL_ENDPOINT must be configured');
  }

  // Simple prompt: just tone instruction + text
  const prompt = `${systemPrompt}\n\n${text}`;

  // Get access token using Application Default Credentials
  const accessToken = await getAccessToken();
  
  // Vertex AI endpoint URL for tuned models
  const endpointUrl = `https://us-central1-aiplatform.googleapis.com/v1/projects/${project}/locations/us-central1/endpoints/${endpoint}:generateContent`;
  
  console.log(`🎯 Calling fine-tuned model: ${endpoint}`);
  
  const temperature = getTemperatureForTone(tone);
  
  const response = await fetch(endpointUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        role: 'user',
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature,
        topP: 0.95,
        topK: 60,
        maxOutputTokens: 4096,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Vertex AI endpoint error (${response.status}): ${errorText}`);
  }

  const result = await response.json();
  
  const rewrittenText = result.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rewrittenText || rewrittenText.trim().length === 0) {
    throw new Error('Fine-tuned model returned empty response');
  }

  return rewrittenText.trim();
}

/**
 * Internal function: Single humanization attempt using STANDARD Gemini model (fallback)
 */
async function rewriteSingleAttemptStandard(
  text: string,
  tone: ToneType,
  systemPrompt: string,
  genAI: GoogleGenerativeAI
): Promise<string> {
  // Use "latest" models available for new API keys
  const modelNames = [
    'gemini-flash-latest',
    'gemini-pro-latest',
  ];
  
  let lastError: any = null;
  
  for (const modelName of modelNames) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });

      const prompt = `${systemPrompt}\n\n${text}`;
      
      const temperature = getTemperatureForTone(tone);

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature,
          topP: 0.95,
          topK: 60,
          maxOutputTokens: 4096,
        },
      });

      const response = result.response;
      const rewrittenText = response.text();

      if (!rewrittenText || rewrittenText.trim().length === 0) {
        throw new Error('Gemini returned empty response');
      }

      console.log(`✅ Successfully used model: ${modelName}`);
      return rewrittenText.trim();
      
    } catch (error: any) {
      lastError = error;
      console.warn(`❌ Model ${modelName} failed: ${error.message}`);
      continue;
    }
  }
  
  throw lastError || new Error('All Gemini models failed');
}

/**
 * Rewrite text using fine-tuned model with intelligent fallback
 * Generates multiple versions based on text length and returns the best one
 */
export async function rewriteWithGemini(
  text: string,
  tone: ToneType,
  systemPrompt: string
): Promise<{ text: string; score: any; generationCount: number; modelUsed: string }> {
  try {
    // Calculate word count for smart generation
    const wordCount = text.trim().split(/\s+/).length;
    const generationCount = getGenerationCount(wordCount);
    
    console.log(`📊 Text: ${wordCount} words → Using ${generationCount} generation(s)`);
    console.log(`🎨 Tone: ${tone} → Temperature: ${getTemperatureForTone(tone)}`);
    
    // Determine which model to use (fine-tuned or standard)
    const useTunedModel = !!(
      process.env.GOOGLE_CLOUD_PROJECT && 
      process.env.TUNED_MODEL_ENDPOINT
    );
    
    let modelUsed = 'unknown';
    
    if (useTunedModel) {
      console.log('🎯 Using FINE-TUNED CrownWrite model');
      modelUsed = 'fine-tuned';
    } else {
      console.log('⚡ Using standard Gemini model (fallback)');
      modelUsed = 'gemini-standard';
    }
    
    // Smart quality selection: multiple generations only for longer texts
    if (generationCount > 1) {
      console.log(`🎯 Quality selection mode: ${generationCount} generations (parallel)`);
      
      try {
        // Generate multiple versions in parallel for speed
        const generatePromises = Array(generationCount).fill(null).map(() =>
          useTunedModel 
            ? callTunedEndpoint(text, tone, systemPrompt)
            : rewriteSingleAttemptStandard(text, tone, systemPrompt, getGeminiClient())
        );
        
        const generations = await Promise.all(generatePromises);
        
        // Score each and pick best
        let bestText = generations[0];
        let bestScore = scoreRewrittenText(bestText, tone);
        
        for (let i = 1; i < generations.length; i++) {
          const currentScore = scoreRewrittenText(generations[i], tone);
          if (currentScore.total > bestScore.total) {
            bestText = generations[i];
            bestScore = currentScore;
          }
        }
        
        console.log(`✅ Best quality score: ${bestScore.total}/100`);
        console.log(`📊 Details: ${bestScore.details.contractionsCount} contractions, ${bestScore.details.roboticPhrasesFound.length} robotic phrases`);
        
        // Apply post-processing cleanup
        const finalized = finalizeRewrittenText(bestText, tone);
        console.log(`🧹 Post-processing: ${finalized.changesApplied.length} changes applied`);
        if (finalized.warnings.length > 0) {
          console.log(`⚠️  Warnings: ${finalized.warnings.join(', ')}`);
        }
        
        return {
          text: finalized.finalText,
          score: bestScore,
          generationCount,
          modelUsed,
        };
      } catch (error: any) {
        // If fine-tuned model fails, fall back to standard Gemini
        if (useTunedModel && (error.message?.includes('credentials') || error.message?.includes('403') || error.message?.includes('BILLING'))) {
          console.log('⚠️  Fine-tuned model failed (credentials/billing issue), falling back to standard Gemini...');
          modelUsed = 'gemini-standard-fallback';
          
          const generatePromises = Array(generationCount).fill(null).map(() =>
            rewriteSingleAttemptStandard(text, tone, systemPrompt, getGeminiClient())
          );
          
          const generations = await Promise.all(generatePromises);
          
          let bestText = generations[0];
          let bestScore = scoreRewrittenText(bestText, tone);
          
          for (let i = 1; i < generations.length; i++) {
            const currentScore = scoreRewrittenText(generations[i], tone);
            if (currentScore.total > bestScore.total) {
              bestText = generations[i];
              bestScore = currentScore;
            }
          }
          
          const finalized = finalizeRewrittenText(bestText, tone);
          
          return {
            text: finalized.finalText,
            score: bestScore,
            generationCount,
            modelUsed,
          };
        }
        throw error;
      }
    }
    
    // Single generation (fast mode for short texts)
    console.log('⚡ Fast mode: single generation');
    
    try {
      const singleResult = useTunedModel
        ? await callTunedEndpoint(text, tone, systemPrompt)
        : await rewriteSingleAttemptStandard(text, tone, systemPrompt, getGeminiClient());
      
      const score = scoreRewrittenText(singleResult, tone);
      
      // Still apply post-processing
      const finalized = finalizeRewrittenText(singleResult, tone);
      console.log(`🧹 Post-processing: ${finalized.changesApplied.length} changes applied`);
      
      return {
        text: finalized.finalText,
        score,
        generationCount: 1,
        modelUsed,
      };
    } catch (error: any) {
      // If fine-tuned model fails, fall back to standard Gemini
      if (useTunedModel && (error.message?.includes('credentials') || error.message?.includes('403') || error.message?.includes('BILLING'))) {
        console.log('⚠️  Fine-tuned model failed (credentials/billing issue), falling back to standard Gemini...');
        modelUsed = 'gemini-standard-fallback';
        
        const singleResult = await rewriteSingleAttemptStandard(text, tone, systemPrompt, getGeminiClient());
        const score = scoreRewrittenText(singleResult, tone);
        const finalized = finalizeRewrittenText(singleResult, tone);
        
        return {
          text: finalized.finalText,
          score,
          generationCount: 1,
          modelUsed,
        };
      }
      throw error;
    }
    
  } catch (error: any) {
    console.error('❌ Gemini API Error:', error);
    
    // Handle specific errors
    if (error.message?.includes('API key') || error.message?.includes('API_KEY_INVALID')) {
      throw new Error('Invalid Gemini API key. Please check your configuration.');
    }
    
    if (error.message?.includes('quota') || error.message?.includes('RESOURCE_EXHAUSTED')) {
      throw new Error('Gemini API quota exceeded. Try again later.');
    }
    
    if (error.message?.includes('403') || error.message?.includes('permission')) {
      throw new Error('Gemini API access denied. Make sure the Vertex AI API is enabled and Application Default Credentials are configured.');
    }
    
    if (error.message?.includes('GOOGLE_CLOUD_PROJECT') || error.message?.includes('TUNED_MODEL_ENDPOINT')) {
      throw new Error('Fine-tuned model configuration missing. Please set GOOGLE_CLOUD_PROJECT and TUNED_MODEL_ENDPOINT.');
    }
    
    throw new Error(`Gemini rewriting failed: ${error.message}`);
  }
}
