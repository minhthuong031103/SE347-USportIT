'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useChatSocket } from '@/hooks/useChatSocket';
import { SocketIndicator } from '@/components/socket-indicator';
import Loader from '@/components/Loader';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

const ConversationPage = ({ session }) => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const fetchMessages = async ({ pageParam = 0, conversationId }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SOCKET_URL}/conversations/messages?conversationId=${conversationId}&page=${pageParam}`
    );
    const temp = await res.json();

    return temp;
  };

  // Getting conversationId from the query parameters
  const conversationId = searchParams.get('conversationId');

  const [newMessage, setNewMessage] = useState('');
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    ['messages', conversationId],
    ({ pageParam }) => fetchMessages({ pageParam, conversationId }),
    //pageParam is the value returned by getNextPageParam
    //when it changes, the query is refetched
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      getNextPageParam: (lastPage, pages) => {
        //pages is an array of all the pages fetched so far
        //last page is the last page fetched
        console.log('last page', lastPage);
        if (lastPage.page === 0 && pages.length < lastPage.totalPages) return 1;
        if (pages.length < lastPage.totalPages) return pages.length;
        else return undefined;
      },
    }
  );

  const { socket, isConnected } = useChatSocket({
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

  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };
  const handleSendMessage = () => {
    if (!newMessage) return;

    // setMessages((messages) => [...messages, newMessage]);

    if (socket) {
      socket.emit('newMessage', {
        content: newMessage,
        userId: session?.user?.id,
        conversationId,
      });
      setNewMessage('');
    }
  };
  if (data) {
    console.log(data.pages);
  }
  console.log(data);
  return (
    <div>
      <div>
        <SocketIndicator isConnected={isConnected} />
      </div>
      <h1>Conversation Page</h1>
      <div>
        {hasNextPage && (
          <Button
            onClick={() => {
              fetchNextPage();
            }}
          >
            Load more
          </Button>
        )}
        {isLoading && <Loader />}
        <div>
          {data?.pages
            .slice()
            .reverse()
            .map((page, index) => (
              <React.Fragment key={index}>
                {page.messages.map((message) => (
                  <div key={message.id} className="flex flex-row gap-x-2">
                    <p>{message.content}</p>
                  </div>
                ))}
              </React.Fragment>
            ))}
        </div>
      </div>

      <div>
        <textarea
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ConversationPage;
