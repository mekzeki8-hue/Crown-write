import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Load the humanization system prompt from file
 * This keeps the prompt separate from code for easy editing
 */
export function getHumanizationPrompt(): string {
  try {
    const promptPath = process.env.HUMANIZATION_PROMPT_PATH || './prompts/humanization-system.txt';
    const fullPath = join(process.cwd(), promptPath);
    const prompt = readFileSync(fullPath, 'utf-8');
    
    if (!prompt || prompt.trim().length === 0) {
      throw new Error('Humanization prompt is empty');
    }
    
    return prompt.trim();
  } catch (error) {
    console.error('Failed to load humanization prompt:', error);
    throw new Error('Humanization prompt configuration is missing or invalid');
  }
}

/**
 * Validate that all required environment variables are present
 */
export function validateEnvConfig(): { valid: boolean; missing: string[] } {
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'OPENAI_API_KEY',
    'HUMANIZATION_PROMPT_PATH',
  ];

  const missing = required.filter((key) => !process.env[key]);

  return {
    valid: missing.length === 0,
    missing,
  };
}
