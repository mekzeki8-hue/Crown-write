import { createClient } from '@/lib/supabase/server';
import { ensureUserProfile } from '@/lib/supabase/setup-database';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    // Automatically create user profile with 300 free credits
    if (data?.user && !error) {
      await ensureUserProfile(data.user.id, data.user.email || '');
    }
  }

  // Redirect to dashboard after successful auth
  return NextResponse.redirect(new URL('/dashboard', request.url));
}
