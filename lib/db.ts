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
      console.log('📦 Creating database tables for Clerk + Neon...');
      
      // Enable extensions
      await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
      await pool.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

      // Create users table (stores Clerk user data + credits)
      await pool.query(`
        CREATE TABLE users (
          id TEXT PRIMARY KEY,
          clerk_id TEXT UNIQUE NOT NULL,
          email TEXT UNIQUE NOT NULL,
          name TEXT,
          image TEXT,
          credits INTEGER NOT NULL DEFAULT 300,
          total_credits_used INTEGER NOT NULL DEFAULT 0,
          subscription_tier TEXT DEFAULT 'free',
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // Create credit_transactions table (tracks usage)
      await pool.query(`
        CREATE TABLE credit_transactions (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          amount INTEGER NOT NULL,
          type TEXT NOT NULL,
          description TEXT,
          metadata JSONB,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // Create humanization_history table (saves work)
      await pool.query(`
        CREATE TABLE humanization_history (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
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

      // Create indexes for better performance
      await pool.query(`CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id);`);
      await pool.query(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);`);
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

// Helper: Create or get user from Clerk data
export async function ensureUser(clerkUserId: string, email: string, name?: string, image?: string) {
  const pool = await getDb();
  
  try {
    // Check if user exists
    const existing = await pool.query(
      'SELECT * FROM users WHERE clerk_id = $1',
      [clerkUserId]
    );

    if (existing.rows.length > 0) {
      return existing.rows[0];
    }

    // Create new user with 300 credits
    const result = await pool.query(
      `INSERT INTO users (id, clerk_id, email, name, image, credits, total_credits_used, created_at, updated_at)
       VALUES ($1, $1, $2, $3, $4, 300, 0, NOW(), NOW())
       RETURNING *`,
      [clerkUserId, email, name, image]
    );

    console.log('✅ New user created with 300 credits:', email);
    return result.rows[0];
  } catch (error) {
    console.error('Error ensuring user:', error);
    throw error;
  }
}

// Helper: Get user credits
export async function getUserCredits(clerkUserId: string): Promise<number> {
  const pool = await getDb();
  
  try {
    const result = await pool.query(
      'SELECT credits FROM users WHERE clerk_id = $1',
      [clerkUserId]
    );
    return result.rows[0]?.credits || 0;
  } catch (error) {
    console.error('Error fetching credits:', error);
    return 0;
  }
}

// Helper: Deduct credits
export async function deductCredits(clerkUserId: string, amount: number): Promise<boolean> {
  const pool = await getDb();
  
  try {
    const result = await pool.query(
      `UPDATE users 
       SET credits = credits - $1, 
           total_credits_used = total_credits_used + $1,
           updated_at = NOW()
       WHERE clerk_id = $2 AND credits >= $1
       RETURNING credits`,
      [amount, clerkUserId]
    );
    return result.rows.length > 0;
  } catch (error) {
    console.error('Error deducting credits:', error);
    return false;
  }
}

export default pool;
