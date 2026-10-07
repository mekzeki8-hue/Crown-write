import { Pool } from 'pg';

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Auto-create tables on first connection
let tablesCreated = false;

async function ensureTables() {
  if (tablesCreated) return;

  try {
    console.log('🔧 Checking database tables...');
    
    // Check if users table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'users'
      );
    `);

    if (!tableCheck.rows[0].exists) {
      console.log('📦 Creating database tables...');
      
      // Enable extensions
      await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
      await pool.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

      // Create users table
      await pool.query(`
        CREATE TABLE users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email TEXT UNIQUE NOT NULL,
          password TEXT,
          name TEXT,
          image TEXT,
          credits INTEGER NOT NULL DEFAULT 300,
          total_credits_used INTEGER NOT NULL DEFAULT 0,
          subscription_tier TEXT DEFAULT 'free',
          email_verified TIMESTAMPTZ,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // Create sessions table
      await pool.query(`
        CREATE TABLE sessions (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          session_token TEXT UNIQUE NOT NULL,
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          expires TIMESTAMPTZ NOT NULL,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // Create accounts table
      await pool.query(`
        CREATE TABLE accounts (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          type TEXT NOT NULL,
          provider TEXT NOT NULL,
          provider_account_id TEXT NOT NULL,
          refresh_token TEXT,
          access_token TEXT,
          expires_at INTEGER,
          token_type TEXT,
          scope TEXT,
          id_token TEXT,
          session_state TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          UNIQUE(provider, provider_account_id)
        );
      `);

      // Create credit_transactions table
      await pool.query(`
        CREATE TABLE credit_transactions (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          amount INTEGER NOT NULL,
          type TEXT NOT NULL,
          description TEXT,
          metadata JSONB,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // Create humanization_history table
      await pool.query(`
        CREATE TABLE humanization_history (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          original_text TEXT NOT NULL,
          humanized_text TEXT NOT NULL,
          tone TEXT NOT NULL,
          ultra_mode BOOLEAN DEFAULT FALSE,
          word_count INTEGER NOT NULL,
          credits_used INTEGER NOT NULL DEFAULT 1,
          quality_score INTEGER,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // Create indexes
      await pool.query(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);`);
      await pool.query(`CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(session_token);`);
      await pool.query(`CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);`);
      await pool.query(`CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id);`);
      await pool.query(`CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_id ON credit_transactions(user_id);`);
      await pool.query(`CREATE INDEX IF NOT EXISTS idx_humanization_history_user_id ON humanization_history(user_id);`);

      console.log('✅ Database tables created successfully!');
    } else {
      console.log('✅ Database tables already exist');
    }

    tablesCreated = true;
  } catch (error) {
    console.error('❌ Error creating tables:', error);
    throw error;
  }
}

// Export pool with auto-setup
export async function getDb() {
  await ensureTables();
  return pool;
}

export default pool;
