/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import useConversation from '@hooks/useConversation';
import ConversationBox from './ConversationBox';
import { FullConversationType } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { BiArrowBack } from 'react-icons/bi';
import { useChatSocket } from '@/hooks/useChatSocket';
import { AvatarImage, Avatar } from '@/components/ui/avatar';
interface ConversationListProps {
  initialItems?: FullConversationType[];
  title?: string;
  session: any;
}

const ConversationList: React.FC<ConversationListProps> = ({ session }) => {
  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.user.email;
  }, [session.user.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }
  }, [pusherKey, router]);

  const { goToConversation } = useChatSocket({ session });
  const fetchConversations = async ({ cursor, pageSize }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SOCKET_URL}/conversations/all?cursor=${cursor}&pageSize=${pageSize}&userId=${session.user.id}`
    );
    const data = await response.json();
    return data;
  };

  const useInfiniteMessagesQuery = (pageSize) => {
    return useInfiniteQuery(
      ['conversations'],
      ({ pageParam }) => fetchConversations({ cursor: pageParam, pageSize }),
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor || null,
        enabled: !!session.user.id,
      }
    );
  };
  const pageSize = 6;

  const { data, error, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteMessagesQuery(pageSize);
  console.log('🚀 ~ file: ConversationList.tsx:60 ~ data:', data);
  const handleClick = () => {
    goToConversation(session.user.id, 4);
  };
  return (
    <>
      <aside
        className={clsx(
          `

        pb-20
        lg:pb-0 
        lg:block
        overflow-y-auto 
        lg:w-[20%]
        border-r 
        border-gray-200 
      `,
          isOpen ? 'hidden' : 'block lg:w-[20%] left-0'
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <Link aria-label="Home" href="/">
              <BiArrowBack className="text-2xl text-neutral-800 " />
            </Link>
            <div className="text-2xl font-bold text-neutral-800">Messages</div>
          </div>
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.conversations.map((item) => (
                <ConversationBox
                  key={item.id}
                  data={item}
                  selected={conversationId === item.id}
                />
              ))}
            </React.Fragment>
          ))}
          {data?.pages[0].conversations.length === 0 && (
            <div
              onClick={handleClick}
              className=" w-full relative flex items-center space-x-3 p-3 hover:bg-neutral-100
              rounded-lg transition cursor-pointer bg-white"
            >
              <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
                <Avatar>
                  <AvatarImage src="https://utfs.io/f/10c68314-965c-430d-87a8-b4de0f3f023f-20h4l.jpg" />
                </Avatar>
              </div>
              <div className="flex flex-col">
                <div className="text-gray-900">Admin</div>
                <div className="text-gray-900">Bắt đầu trò chuyện</div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
