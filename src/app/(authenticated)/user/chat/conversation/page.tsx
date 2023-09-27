import React from 'react';
import ConversationPage from './conversation';
import { getSession } from '@/lib/auth';

async function page() {
  const session = await getSession();
  return <ConversationPage session={session} />;
}

export default page;
