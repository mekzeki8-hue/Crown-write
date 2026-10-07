import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getDb } from './db';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
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
          const pool = await getDb();
          
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
          const pool = await getDb();
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
    const pool = await getDb();
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
    const pool = await getDb();
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
