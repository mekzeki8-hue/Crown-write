import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * API endpoint to setup database tables using REST API
 * POST /api/setup-database
 */
export async function POST() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { success: false, error: 'Missing Supabase credentials' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const results = [];
    let createdCount = 0;

    // Check and create profiles table
    try {
      const { error: checkError } = await supabase.from('profiles').select('id').limit(1);
      
      if (checkError && checkError.message.includes('does not exist')) {
        // Table doesn't exist, try to create via SQL endpoint
        const sqlEndpoint = `${supabaseUrl}/rest/v1/rpc/exec_sql`;
        const response = await fetch(sqlEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`,
          },
          body: JSON.stringify({
            query: `
              CREATE TABLE IF NOT EXISTS profiles (
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
              ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
            `
          })
        });

        if (response.ok) {
          results.push('✅ Created profiles table');
          createdCount++;
        } else {
          results.push('⚠️ Could not create profiles table automatically');
        }
      } else {
        results.push('✅ profiles table already exists');
      }
    } catch (err: any) {
      results.push(`❌ Error checking profiles: ${err.message}`);
    }

    // Check credit_transactions table
    try {
      const { error: checkError } = await supabase.from('credit_transactions').select('id').limit(1);
      
      if (checkError && checkError.message.includes('does not exist')) {
        results.push('⚠️ credit_transactions table needs to be created manually');
      } else {
        results.push('✅ credit_transactions table already exists');
      }
    } catch (err: any) {
      results.push(`⚠️ credit_transactions table needs to be created manually`);
    }

    // Check humanization_history table
    try {
      const { error: checkError } = await supabase.from('humanization_history').select('id').limit(1);
      
      if (checkError && checkError.message.includes('does not exist')) {
        results.push('⚠️ humanization_history table needs to be created manually');
      } else {
        results.push('✅ humanization_history table already exists');
      }
    } catch (err: any) {
      results.push(`⚠️ humanization_history table needs to be created manually`);
    }

    const allExist = results.every(r => r.startsWith('✅'));

    if (allExist) {
      return NextResponse.json({
        success: true,
        message: '🎉 All tables exist! Database is ready to use.',
        details: results,
      });
    }

    return NextResponse.json({
      success: false,
      message: 'Some tables need manual creation in Supabase Dashboard',
      details: results,
      manualSteps: [
        '1. Open: https://supabase.com/dashboard/project/jvisxehsimzstelrkhre/editor',
        '2. Click "New table" button',
        '3. Follow the table structure guide provided',
      ]
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
