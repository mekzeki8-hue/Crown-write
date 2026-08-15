#!/usr/bin/env node

/**
 * CrownWrite Database Setup Script
 * Run this once to create all database tables
 * 
 * Usage: node scripts/setup-database.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  console.log('🚀 Setting up CrownWrite database...\n');

  try {
    // Create profiles table
    console.log('📝 Creating profiles table...');
    const { error: profilesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS profiles (
          id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
          email TEXT NOT NULL,
          full_name TEXT,
          avatar_url TEXT,
          credits INTEGER NOT NULL DEFAULT 300,
          total_credits_used INTEGER NOT NULL DEFAULT 0,
          subscription_tier TEXT DEFAULT 'free',
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `
    });

    if (profilesError) {
      console.log('⚠️  Profiles table may already exist or needs manual creation');
    } else {
      console.log('✅ Profiles table created');
    }

    // Create credit_transactions table
    console.log('📝 Creating credit_transactions table...');
    const { error: transactionsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS credit_transactions (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
          amount INTEGER NOT NULL,
          type TEXT NOT NULL,
          description TEXT,
          metadata JSONB,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
      `
    });

    if (transactionsError) {
      console.log('⚠️  Transactions table may already exist or needs manual creation');
    } else {
      console.log('✅ Credit transactions table created');
    }

    // Create humanization_history table
    console.log('📝 Creating humanization_history table...');
    const { error: historyError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS humanization_history (
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
      `
    });

    if (historyError) {
      console.log('⚠️  History table may already exist or needs manual creation');
    } else {
      console.log('✅ Humanization history table created');
    }

    console.log('\n✅ Database setup complete!');
    console.log('\n📌 Next steps:');
    console.log('1. Sign up a test user');
    console.log('2. User will automatically get 300 free credits');
    console.log('3. Test the humanization feature');

  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    console.log('\n💡 Please create tables manually in Supabase dashboard:');
    console.log('   https://supabase.com/dashboard/project/jvisxehsimzstelrkhre/editor');
    process.exit(1);
  }
}

setupDatabase();
