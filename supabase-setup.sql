-- =====================================================
-- CrownWrite Supabase Database Setup
-- Run this in Supabase SQL Editor
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USER PROFILES TABLE
-- Stores additional user data beyond Supabase auth
-- =====================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  credits INTEGER NOT NULL DEFAULT 300,
  total_credits_used INTEGER NOT NULL DEFAULT 0,
  subscription_tier TEXT DEFAULT 'free', -- 'free', 'pro', 'enterprise'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- CREDIT TRANSACTIONS TABLE
-- Track all credit usage
-- =====================================================
CREATE TABLE IF NOT EXISTS public.credit_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL, -- Negative for usage, positive for purchases
  type TEXT NOT NULL, -- 'usage', 'purchase', 'bonus', 'refund'
  description TEXT,
  metadata JSONB, -- Store additional info like word count, tone used, etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- HUMANIZATION HISTORY TABLE
-- Track all humanization requests
-- =====================================================
CREATE TABLE IF NOT EXISTS public.humanization_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  original_text TEXT NOT NULL,
  humanized_text TEXT NOT NULL,
  tone TEXT NOT NULL, -- 'auto', 'academic', 'professional', etc.
  ultra_mode BOOLEAN DEFAULT FALSE,
  word_count INTEGER NOT NULL,
  credits_used INTEGER NOT NULL DEFAULT 1,
  quality_score INTEGER, -- Optional quality score
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.humanization_history ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only see/update their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Credit Transactions: Users can only see their own transactions
CREATE POLICY "Users can view own transactions"
  ON public.credit_transactions FOR SELECT
  USING (auth.uid() = user_id);

-- Humanization History: Users can only see their own history
CREATE POLICY "Users can view own history"
  ON public.humanization_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own history"
  ON public.humanization_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function: Create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, credits)
  VALUES (NEW.id, NEW.email, 300);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: Auto-create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function: Deduct credits based on word count
CREATE OR REPLACE FUNCTION public.deduct_credits(
  p_user_id UUID,
  p_amount INTEGER,
  p_description TEXT DEFAULT 'Humanization request',
  p_metadata JSONB DEFAULT '{}'::JSONB
)
RETURNS BOOLEAN AS $$
DECLARE
  v_current_credits INTEGER;
BEGIN
  -- Get current credits
  SELECT credits INTO v_current_credits
  FROM public.profiles
  WHERE id = p_user_id;

  -- Check if user has enough credits
  IF v_current_credits < p_amount THEN
    RETURN FALSE;
  END IF;

  -- Deduct credits
  UPDATE public.profiles
  SET credits = credits - p_amount,
      total_credits_used = total_credits_used + p_amount,
      updated_at = NOW()
  WHERE id = p_user_id;

  -- Log transaction
  INSERT INTO public.credit_transactions (user_id, amount, type, description, metadata)
  VALUES (p_user_id, -p_amount, 'usage', p_description, p_metadata);

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Add credits
CREATE OR REPLACE FUNCTION public.add_credits(
  p_user_id UUID,
  p_amount INTEGER,
  p_type TEXT DEFAULT 'purchase',
  p_description TEXT DEFAULT 'Credit purchase'
)
RETURNS BOOLEAN AS $$
BEGIN
  -- Add credits
  UPDATE public.profiles
  SET credits = credits + p_amount,
      updated_at = NOW()
  WHERE id = p_user_id;

  -- Log transaction
  INSERT INTO public.credit_transactions (user_id, amount, type, description)
  VALUES (p_user_id, p_amount, p_type, p_description);

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- INDEXES for performance
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_id ON public.credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_created_at ON public.credit_transactions(created_at);
CREATE INDEX IF NOT EXISTS idx_humanization_history_user_id ON public.humanization_history(user_id);
CREATE INDEX IF NOT EXISTS idx_humanization_history_created_at ON public.humanization_history(created_at);

-- =====================================================
-- DONE!
-- =====================================================
-- Copy this entire file and run it in:
-- Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- =====================================================
