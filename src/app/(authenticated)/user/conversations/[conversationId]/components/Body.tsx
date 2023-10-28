/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

// import axios from 'axios';
// import { useEffect, useRef } from 'react';
import { useChatSocket } from '@/hooks/useChatSocket';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import useConversation from '@hooks/useConversation';
import MessageBox from './MessageBox';
import React, { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SocketIndicator } from '@/components/socket-indicator';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
const Body = ({ session, className }) => {
  // const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();
  const queryClient = useQueryClient();
  const [lastToastId, setLastToastId] = useState<any>();
  // Getting conversationId from the query parameters

  const fetchMessages = async ({ conversationId, cursor, pageSize }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SOCKET_URL}/conversations/messages?conversationId=${conversationId}&cursor=${cursor}&pageSize=${pageSize}`
    );
    const data = await response.json();
    return data;
  };
  useEffect(() => {
    if (lastToastId) {
      console.log('🚀 ~ file: Body.tsx:36 ~ Body ~ lastToastId:', lastToastId);
      toast.dismiss(lastToastId);
    }
  }, [lastToastId]);
  const { socket, isConnected } = useChatSocket({
    session,
    conversationId,
    callback: (data) => {
      console.log('data', data);

      //o day se handle message duoc gui toi
      console.log('🚀 ~ file: Body.tsx:36 ~ Body ~ lastToastId:', lastToastId);
      // queryClient.setQueryData(['messages', conversationId], (oldData: any) => {
      //   const newPages = [...oldData.pages];
      //   newPages[0] = {
      //     ...newPages[0],
      //     messages: [data.content, ...newPages[0].messages],
      //   };
      //   console.log('newPages', newPages);
      //   // neu thanh cong thi fetch luon cai conversation
      //   return { ...oldData, pages: newPages };
      // });
      queryClient.refetchQueries(['messages', conversationId]);
      const i = toast.custom((t) => (
        <div
          className={`${
            t.visible
              ? 'animate-appearance-in'
              : 'animate-appearance-out duration-200'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Emilia Gates
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Sure! 8:30pm works great!
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));

      setTimeout(() => {
        setLastToastId(i);
      }, 2000);

      queryClient.refetchQueries(['conversations']);
      // khong duoc dung refetchQueries vi no se goi lai ham fetchMessages
      // dieu nay se fetch nhieu lan
    },
  });
  const useInfiniteMessagesQuery = (conversationId, pageSize) => {
    return useInfiniteQuery(
      ['messages', conversationId],
      ({ pageParam }) =>
        fetchMessages({ conversationId, cursor: pageParam, pageSize }),
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor || null,
        keepPreviousData: true,
      }
    );
  };

  const pageSize = 4;
  const { data, error, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteMessagesQuery(conversationId, pageSize);
  const [newMessage, setNewMessage] = useState('');
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

  console.log(data);
  console.log(
    data ? data.pages.reduce((acc, page) => acc + page.messages.length, 0) : 0
  );
  // useEffect(() => {
  //   axios.post(`/api/conversations/${conversationId}/seen`);
  // }, [conversationId]);
  console.log(hasNextPage);
  return (
    <div className={'h-[80%]'}>
      <div>
        <Button
          onClick={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
        >
          load more
        </Button>
        <SocketIndicator isConnected={isConnected} />
      </div>

      <InfiniteScroll
        dataLength={
          data
            ? data.pages.reduce((acc, page) => acc + page.messages.length, 0)
            : 0
        }
        next={() => {
          toast.success('fetching next page');
          fetchNextPage();
        }}
        style={{
          display: 'flex',
          flexDirection: 'column-reverse',
          height: 500,
        }}
        inverse={true}
        hasMore={true}
        loader={<h4>Loading...</h4>}
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
            {/* o duoi nay se la messages dang duoc gui toi */}
          </React.Fragment>
        ))}
      </InfiniteScroll>
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

export default Body;
