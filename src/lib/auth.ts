import options from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export async function mustBeLoggedIn() {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/auth/login');
  }
}
export async function getSession() {
  const session = await getServerSession(options);
  return session;
}

export async function alreadyLoggedIn() {
  const session = await getServerSession(options);

  if (session) {
    redirect('/');
  }
}
