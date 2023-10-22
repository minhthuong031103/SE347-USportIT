'use client';

// import axios from 'axios';
// import { useEffect, useRef } from 'react';
import { useChatSocket } from '@/hooks/useChatSocket';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import useConversation from '@hooks/useConversation';
import MessageBox from './MessageBox';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SocketIndicator } from '@/components/socket-indicator';
const Body = ({ session }) => {
  // const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();
  const queryClient = useQueryClient();
  const fetchMessages = async ({ pageParam = 0, conversationId }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SOCKET_URL}/conversations/messages?conversationId=${conversationId}&page=${pageParam}`
    );
    const temp = await res.json();

    return temp;
  };

  // Getting conversationId from the query parameters

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['messages', conversationId],
    ({ pageParam }) => fetchMessages({ pageParam, conversationId }),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => {
        console.log('last page', lastPage);
        if (lastPage.page === 0 && pages.length < lastPage.totalPages) return 1;
        if (pages.length < lastPage.totalPages) return pages.length;
        else return undefined;
      },
    }
  );

  const { isConnected } = useChatSocket({
    session,
    conversationId,
    callback: (data) => {
      console.log('data', data);
      queryClient.setQueryData(['messages', conversationId], (oldData: any) => {
        const newPages = [...oldData.pages];
        const lastIndex = newPages.length - 1; // Get the last index
        newPages[lastIndex] = {
          ...newPages[lastIndex],
          messages: [...newPages[lastIndex].messages, data.content],
        };
        console.log('newPages', newPages);
        return { ...oldData, pages: newPages };
      });
    },
  });
  console.log(data);

  // useEffect(() => {
  //   axios.post(`/api/conversations/${conversationId}/seen`);
  // }, [conversationId]);

  return (
    <div>
      <div>
        <SocketIndicator isConnected={isConnected} />
      </div>
      <InfiniteScroll
        dataLength={data?.pages?.length ?? 0 + 8}
        next={fetchNextPage}
        style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
        inverse={true} //
        hasMore={hasNextPage || true}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.messages.map((message) => (
              <MessageBox
                isLast={index === page.messages.length - 1}
                key={message.id}
                data={message}
              />
            ))}
          </React.Fragment>
        ))}
      </InfiniteScroll>
      {/* // <div className="pt-24" ref={bottomRef} /> */}
    </div>
  );
};

export default Body;
