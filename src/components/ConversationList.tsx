'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo } from 'react';
import clsx from 'clsx';

import useConversation from '@hooks/useConversation';
import ConversationBox from './ConversationBox';
import { FullConversationType } from '@/types';

interface ConversationListProps {
  initialItems: FullConversationType[];
  title?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
}) => {
  // const [items, setItems] = useState(initialItems);
  // console.log("🚀 ~ file: ConversationList.tsx:21 ~ initialItems:", initialItems)

  // console.log("🚀 ~ file: ConversationList.tsx:21 ~ items:", items)

  const router = useRouter();
  const session = useSession();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }
  }, [pusherKey, router]);

  return (
    <>
      <aside
        className={clsx(
          `
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200 
      `,
          isOpen ? 'hidden' : 'block w-full left-0'
        )}
      >
        <div className="px-5">
          <div className="flex justify-center mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">Messages</div>
          </div>
          {initialItems.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
