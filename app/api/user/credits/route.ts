import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { ensureUser, getUserCredits } from '@/lib/db';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user from Clerk
    const { users } = await import('@clerk/nextjs/server');
    const clerkUser = await users.getUser(userId);
    
    // Ensure user exists in our database
    await ensureUser(
      userId,
      clerkUser.emailAddresses[0].emailAddress,
      clerkUser.firstName || clerkUser.username || undefined,
      clerkUser.imageUrl
    );

    // Get credits
    const credits = await getUserCredits(userId);

    return NextResponse.json({ credits });
  } catch (error) {
    console.error('Error fetching credits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch credits' },
      { status: 500 }
    );
  }
}
