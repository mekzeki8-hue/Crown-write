import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        try {
          // Check if user exists
          const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [credentials.email]
          );

          const user = result.rows[0];

          if (!user) {
            throw new Error('No user found with this email');
          }

          // Verify password
          const isValid = await bcrypt.compare(credentials.password, user.password);

          if (!isValid) {
            throw new Error('Invalid password');
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw error;
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          // Check if user exists
          const existingUser = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [user.email]
          );

          if (existingUser.rows.length === 0) {
            // Create new user with 300 credits
            await pool.query(
              `INSERT INTO users (id, email, name, image, credits, created_at, updated_at) 
               VALUES (gen_random_uuid(), $1, $2, $3, 300, NOW(), NOW())`,
              [user.email, user.name, user.image]
            );
          }
        } catch (error) {
          console.error('Sign in error:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        
        // Fetch user credits
        try {
          const result = await pool.query(
            'SELECT credits FROM users WHERE email = $1',
            [session.user.email]
          );
          if (result.rows[0]) {
            session.user.credits = result.rows[0].credits;
          }
        } catch (error) {
          console.error('Error fetching credits:', error);
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Helper function to get user credits
export async function getUserCredits(email: string): Promise<number> {
  try {
    const result = await pool.query(
      'SELECT credits FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0]?.credits || 0;
  } catch (error) {
    console.error('Error fetching credits:', error);
    return 0;
  }
}

// Helper function to deduct credits
export async function deductCredits(email: string, amount: number): Promise<boolean> {
  try {
    const result = await pool.query(
      `UPDATE users 
       SET credits = credits - $1, 
           total_credits_used = total_credits_used + $1,
           updated_at = NOW()
       WHERE email = $2 AND credits >= $1
       RETURNING credits`,
      [amount, email]
    );
    return result.rows.length > 0;
  } catch (error) {
    console.error('Error deducting credits:', error);
    return false;
  }
}
