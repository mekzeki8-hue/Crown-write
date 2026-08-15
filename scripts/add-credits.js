/**
 * Script to add credits to a user account
 * Usage: node scripts/add-credits.js
 */

const { createClient } = require('@supabase/supabase-js');

// Load environment variables from .env.local manually
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=:#]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim();
    env[key] = value;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function addCredits(email, creditsToAdd) {
  console.log(`\n🔍 Looking for user: ${email}...`);

  // Find user by email
  const { data: profile, error: findError } = await supabase
    .from('profiles')
    .select('id, email, credits, full_name')
    .eq('email', email)
    .single();

  if (findError || !profile) {
    console.error('❌ User not found:', findError?.message || 'No profile exists');
    process.exit(1);
  }

  console.log(`✅ Found user: ${profile.full_name || profile.email}`);
  console.log(`   Current credits: ${profile.credits || 0}`);

  const newCredits = (profile.credits || 0) + creditsToAdd;

  // Update credits
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ 
      credits: newCredits,
      updated_at: new Date().toISOString() 
    })
    .eq('id', profile.id);

  if (updateError) {
    console.error('❌ Failed to update credits:', updateError.message);
    process.exit(1);
  }

  // Log transaction
  const { error: logError } = await supabase
    .from('credit_transactions')
    .insert({
      user_id: profile.id,
      amount: creditsToAdd,
      transaction_type: 'add',
      description: 'Manual credit addition by admin',
      created_at: new Date().toISOString(),
    });

  if (logError) {
    console.warn('⚠️  Failed to log transaction:', logError.message);
  }

  console.log(`\n✅ Successfully added ${creditsToAdd.toLocaleString()} credits!`);
  console.log(`   Previous balance: ${(profile.credits || 0).toLocaleString()}`);
  console.log(`   Added: +${creditsToAdd.toLocaleString()}`);
  console.log(`   New balance: ${newCredits.toLocaleString()}`);
  console.log(`\n🎉 Done!\n`);
}

// Execute
const EMAIL = 'mekzeki8@gmail.com';
const CREDITS = 100000;

addCredits(EMAIL, CREDITS)
  .catch(err => {
    console.error('❌ Unexpected error:', err);
    process.exit(1);
  });
