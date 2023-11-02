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
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import { ImageDialog } from '@/components/imageDialog';
import NewMessage from './NewMessage';

const Body = ({ session, className }) => {
  // const bottomRef = useRef<HTMLDivElement>(null);
  const [isSent, setIsSent] = useState(true);
  const [newMessage1, setNewMessage1] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
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
      setIsSent(true);
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
                <p className="text-sm font-medium text-gray-900">You</p>
                <p className="mt-1 text-sm text-gray-500">Sent Successful!</p>
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

  const pageSize = 8;
  const { data, error, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteMessagesQuery(conversationId, pageSize);
  const [newMessage, setNewMessage] = useState('');
  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };
  const handleSendMessage = () => {
    setIsSent(false);
    setNewMessage1(newMessage);
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
  console.log('isSent', isSent);
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
      <div
        id="scrollableDiv"
        className="h-[600px] lg:h-[500px] overflow-y-auto flex flex-col-reverse"
      >
        <InfiniteScroll
          dataLength={
            data
              ? data.pages.reduce((acc, page) => acc + page.messages.length, 0)
              : 0
          }
          next={() => {
            fetchNextPage();
          }}
          style={{
            display: 'flex',
            flexDirection: 'column-reverse',
          }}
          inverse={true}
          hasMore={hasNextPage || false}
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
              {/* o duoi nay se la messages dang duoc gui toi */}
              {isSent ? null : <NewMessage data={newMessage1} />}
            </React.Fragment>
          ))}
        </InfiniteScroll>
      </div>
      <div
        className="
        fixed
        bottom-0
        py-4 
        px-4 
        bg-white 
        border-t 
        flex 
        items-center 
        gap-2 
        lg:gap-2
        w-full
      "
      >
        <ImageDialog
          name="images"
          maxFiles={8}
          customButton={<HiPhoto size={30} className="text-sky-500" />}
          maxSize={1024 * 1024 * 4}
          files={imageFiles}
          setFiles={setImageFiles}
          disabled={false}
        />

        <div className="flex items-center gap-2 lg:gap-4 w-full">
          <textarea
            value={newMessage}
            onChange={handleNewMessageChange}
            placeholder="Type a message..."
            className="
          text-black
          font-light
          py-2
          px-4
          bg-neutral-100 
          w-full lg:w-[70%]
          rounded-full
          focus:outline-none
        "
          />

          <button
            type="button"
            onClick={handleSendMessage}
            className="
            rounded-full 
            p-2 
            bg-sky-500 
            cursor-pointer 
            hover:bg-sky-600 
            transition
          "
          >
            <HiPaperAirplane size={18} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Body;
