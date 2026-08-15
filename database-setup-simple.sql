-- ============================================
-- CrownWrite Simple Database Setup
-- Copy ALL of this and paste in Supabase SQL Editor
-- ============================================

-- Table 1: User Profiles (stores credits)
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  credits INTEGER NOT NULL DEFAULT 300,
  total_credits_used INTEGER NOT NULL DEFAULT 0,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table 2: Credit Transactions (tracks usage)
CREATE TABLE credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table 3: Humanization History (saves work)
CREATE TABLE humanization_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  original_text TEXT NOT NULL,
  humanized_text TEXT NOT NULL,
  tone TEXT NOT NULL,
  ultra_mode BOOLEAN DEFAULT FALSE,
  word_count INTEGER NOT NULL,
  credits_used INTEGER NOT NULL DEFAULT 1,
  quality_score INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE humanization_history ENABLE ROW LEVEL SECURITY;

-- Security Policies (users see only their data)
CREATE POLICY "Users view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users view own transactions" ON credit_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users view own history" ON humanization_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own history" ON humanization_history FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- DONE! Now users will get 300 credits when they sign up
-- ============================================
