/**
 * Automatic Database Setup for CrownWrite
 * This ensures tables exist and creates user profiles automatically
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Create admin client for database setup
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Ensure user profile exists with 300 free credits
 * Call this after user signs up
 */
export async function ensureUserProfile(userId: string, email: string) {
  try {
    // Check if profile already exists
    const { data: existingProfile } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    if (existingProfile) {
      console.log('Profile already exists for user:', userId);
      return { success: true, profile: existingProfile };
    }

    // Create new profile with 300 free credits
    const { data: newProfile, error } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: userId,
        email: email,
        credits: 300,
        total_credits_used: 0,
        subscription_tier: 'free',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating profile:', error);
      return { success: false, error };
    }

    console.log('✅ Profile created with 300 free credits:', userId);
    return { success: true, profile: newProfile };
  } catch (error) {
    console.error('Unexpected error in ensureUserProfile:', error);
    return { success: false, error };
  }
}

/**
 * Get user's current credit balance
 */
export async function getUserCredits(userId: string): Promise<number> {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('credits')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching credits:', error);
      return 0;
    }

    return data?.credits || 0;
  } catch (error) {
    console.error('Unexpected error in getUserCredits:', error);
    return 0;
  }
}

/**
 * Deduct credits (1 word = 1 credit)
 */
export async function deductCredits(
  userId: string,
  amount: number,
  description: string = 'Humanization request'
): Promise<{ success: boolean; remainingCredits?: number; error?: any }> {
  try {
    // Get current profile data
    const { data: profile, error: fetchError } = await supabaseAdmin
      .from('profiles')
      .select('credits, total_credits_used')
      .eq('id', userId)
      .single();

    if (fetchError || !profile) {
      console.error('Error fetching profile:', fetchError);
      return { success: false, error: 'User profile not found' };
    }

    if (profile.credits < amount) {
      return {
        success: false,
        error: 'Insufficient credits',
      };
    }

    // Deduct credits and update total used
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({
        credits: profile.credits - amount,
        total_credits_used: profile.total_credits_used + amount,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select('credits')
      .single();

    if (error) {
      console.error('Error deducting credits:', error);
      return { success: false, error };
    }

    // Log transaction
    await supabaseAdmin.from('credit_transactions').insert({
      user_id: userId,
      amount: -amount,
      type: 'usage',
      description: description,
      created_at: new Date().toISOString(),
    });

    return {
      success: true,
      remainingCredits: data?.credits || 0,
    };
  } catch (error) {
    console.error('Unexpected error in deductCredits:', error);
    return { success: false, error };
  }
}

/**
 * Save humanization to history
 */
export async function saveRewritingHistory(data: {
  userId: string;
  originalText: string;
  rewrittenText: string;
  tone: string;
  ultraMode: boolean;
  wordCount: number;
  creditsUsed: number;
}) {
  try {
    const { error } = await supabaseAdmin
      .from('humanization_history')
      .insert({
        user_id: data.userId,
        original_text: data.originalText,
        humanized_text: data.rewrittenText,
        tone: data.tone,
        ultra_mode: data.ultraMode,
        word_count: data.wordCount,
        credits_used: data.creditsUsed,
        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Error saving history:', error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error in saveRewritingHistory:', error);
    return { success: false, error };
  }
}
