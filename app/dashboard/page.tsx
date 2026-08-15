import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const supabase = await createClient();
  
  // Check if user is logged in
  const { data: { user }, error } = await supabase.auth.getUser();
  
  // Redirect to login if not authenticated
  if (error || !user) {
    redirect('/login');
  }

  // Redirect to home page (which will show the workspace)
  redirect('/');
}
