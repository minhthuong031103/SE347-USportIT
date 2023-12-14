// import ConversationList from '@components/ConversationList';
import ConversationList from '@/components/ConversationList';
import { getSession } from '@/lib/auth';

export default async function layout({ children }) {
  const session = await getSession();
  // console.log('🚀 ~ file: layout.tsx:7 ~ layout ~ session:', session);

  return (
    <div className="h-full w-full flex flex-col lg:flex-row overflow-hidden">
      <ConversationList title="Messages" session={session} />
      <div className="w-full lg:w-[80%]">{children}</div>
    </div>
  );
}
