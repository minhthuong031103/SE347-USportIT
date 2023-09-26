import React from 'react';
import Chat from './chat';
import { getSession } from '@/lib/auth';

async function page() {
  const session = await getSession();
  console.log(session);
  console.log('session in server');
  return (
    <div>
      <Chat session={session} />
    </div>
  );
}

export default page;
