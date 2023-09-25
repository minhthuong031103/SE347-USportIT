import { getServerSession } from 'next-auth';
import React from 'react';
import Chat from './chat';

async function page() {
  const session = await getServerSession();

  return (
    <div>
      <Chat session={session} />
    </div>
  );
}

export default page;
