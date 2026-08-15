import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAuth } from 'google-auth-library';
import { getDynamicExamples } from './examples';
import { generateWithQualitySelection, scoreHumanizedText } from './quality-scorer';
import { finalizeHumanizedText } from './post-processor';

/**
 * Initialize Google Gemini AI client (standard models)
 * Gemini is 100% FREE with generous limits (1M tokens/day)
 * 
 * NOTE: As of 2026, Gemini uses NEW AUTH KEYS (AQ.) instead of old AIza format
 * Source: https://ai.google.dev/gemini-api/docs/api-key
 */
export function getGeminiClient() {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GOOGLE_GEMINI_API_KEY is not configured');
  }

  // New AQ. auth keys are the standard format as of 2026
  // Old AIza keys are being phased out by September 2026
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
 * Vertex AI tuned endpoints use the same generateContent API as standard models
 */
async function callTunedEndpoint(
  text: string,
  systemPrompt: string
): Promise<string> {
  const project = process.env.GOOGLE_CLOUD_PROJECT;
  const endpoint = process.env.TUNED_MODEL_ENDPOINT;
  
  if (!project || !endpoint) {
    throw new Error('GOOGLE_CLOUD_PROJECT and TUNED_MODEL_ENDPOINT must be configured');
  }

  // Get dynamic examples relevant to this specific input
  const dynamicExamples = getDynamicExamples(text);
  
  // Enhance prompt with relevant few-shot examples
  const enhancedPrompt = `${systemPrompt}

═══════════════════════════════════════════════════════════════════════════
RELEVANT EXAMPLES FOR THIS TEXT:
═══════════════════════════════════════════════════════════════════════════

${dynamicExamples}

═══════════════════════════════════════════════════════════════════════════

Now apply what you learned to transform this text (output ONLY the humanized text):

${text}`;

  // Get access token using Application Default Credentials
  const accessToken = await getAccessToken();
  
  // Vertex AI endpoint URL for tuned models
  // Region: us-central1 (Iowa)
  const endpointUrl = `https://us-central1-aiplatform.googleapis.com/v1/projects/${project}/locations/us-central1/endpoints/${endpoint}:generateContent`;
  
  console.log(`🎯 Calling tuned endpoint: ${endpoint}`);
  
  // Call the Vertex AI endpoint using the same format as generateContent
  const response = await fetch(endpointUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        role: 'user',
        parts: [{ text: enhancedPrompt }]
      }],
      generationConfig: {
        temperature: 0.9,
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
  
  // Extract text from Vertex AI response format
  const humanizedText = result.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!humanizedText || humanizedText.trim().length === 0) {
    throw new Error('Fine-tuned model returned empty response');
  }

  return humanizedText.trim();
}

/**
 * Internal function: Single humanization attempt using STANDARD Gemini model
 */
async function humanizeSingleAttemptStandard(
  text: string,
  systemPrompt: string,
  genAI: GoogleGenerativeAI
): Promise<string> {
  // Only use models that we know work (tested earlier)
  const modelNames = [
    'gemini-3.6-flash',  // This one worked in our earlier tests
  ];
  
  let lastError: any = null;
  
  for (const modelName of modelNames) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });

      // Get dynamic examples relevant to this specific input
      const dynamicExamples = getDynamicExamples(text);
      
      // Enhance prompt with relevant few-shot examples
      const enhancedPrompt = `${systemPrompt}

═══════════════════════════════════════════════════════════════════════════
RELEVANT EXAMPLES FOR THIS TEXT:
═══════════════════════════════════════════════════════════════════════════

${dynamicExamples}

═══════════════════════════════════════════════════════════════════════════

Now apply what you learned to transform this text (output ONLY the humanized text):

${text}`;

      // Generate response with human-like variation settings
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: enhancedPrompt }] }],
        generationConfig: {
          temperature: 0.9,        // High for natural variation
          topP: 0.95,              // Very high for diverse expression  
          topK: 60,                // Wider vocabulary
          maxOutputTokens: 4096,
          // Note: presencePenalty and frequencyPenalty not supported by Gemini API
        },
      });

      const response = result.response;
      const humanizedText = response.text();

      if (!humanizedText || humanizedText.trim().length === 0) {
        throw new Error('Gemini returned empty response');
      }

      return humanizedText.trim();
      
    } catch (error: any) {
      lastError = error;
      continue;
    }
  }
  
  throw lastError || new Error('All Gemini models failed');
}

/**
 * Humanize text using Google Gemini with quality selection
 * Generates multiple versions and returns the best one
 * 
 * NOW USES FINE-TUNED MODEL when configured, falls back to standard model
 */
export async function humanizeWithGemini(
  text: string,
  systemPrompt: string,
  useQualitySelection: boolean = true
): Promise<string> {
  try {
    // Determine which model to use (fine-tuned or standard)
    const useTunedModel = !!(
      process.env.GOOGLE_CLOUD_PROJECT && 
      process.env.TUNED_MODEL_ENDPOINT
    );
    
    if (useTunedModel) {
      console.log('🎯 Using FINE-TUNED CrownWrite model (Crownwrite-humanizer-v1)');
    } else {
      console.log('⚡ Using standard Gemini model (fallback)');
    }
    
    // If quality selection enabled, generate 3 versions and pick best
    if (useQualitySelection) {
      console.log('🎯 Using quality selection mode (3 generations)');
      
      const result = await generateWithQualitySelection(
        () => useTunedModel 
          ? callTunedEndpoint(text, systemPrompt)
          : humanizeSingleAttemptStandard(text, systemPrompt, getGeminiClient()),
        3 // Generate 3 versions
      );
      
      console.log(`✅ Quality score: ${result.score.total}/100`);
      console.log(`📊 Details: ${result.score.details.contractionsCount} contractions, ${result.score.details.roboticPhrasesFound.length} robotic phrases, variety: ${result.score.details.sentenceLengthVariety}`);
      
      // Apply post-processing cleanup
      const finalized = finalizeHumanizedText(result.text);
      console.log(`🧹 Post-processing: ${finalized.changesApplied.length} changes applied`);
      if (finalized.warnings.length > 0) {
        console.log(`⚠️  Warnings: ${finalized.warnings.join(', ')}`);
      }
      
      return finalized.finalText;
    }
    
    // Otherwise, single attempt (faster but lower quality)
    console.log('⚡ Using single generation mode (fast)');
    const singleResult = useTunedModel
      ? await callTunedEndpoint(text, systemPrompt)
      : await humanizeSingleAttemptStandard(text, systemPrompt, getGeminiClient());
    
    // Still apply post-processing
    const finalized = finalizeHumanizedText(singleResult);
    console.log(`🧹 Post-processing: ${finalized.changesApplied.length} changes applied`);
    
    return finalized.finalText;
    
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
    
    throw new Error(`Gemini humanization failed: ${error.message}`);
  }
}
