import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session) return new Response(JSON.stringify({}), { status: 500 });
  return new Response(JSON.stringify(session), { status: 200 });
}
