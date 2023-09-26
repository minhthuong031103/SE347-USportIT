'use client';

import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { io as ClientIO } from 'socket.io-client';
import { postRequest } from '@/lib/fetch';
import { useRouter } from 'next/navigation';

type ChatSocketProps = {
  addKey: string;
  updateKey: string;
  queryKey: string;
  session: any;
  conversationId?: string;
  callback?: (data: any) => void;
};

export const useChatSocket = ({
  addKey,
  updateKey,
  queryKey,
  session,
  conversationId,
  callback,
}: ChatSocketProps) => {
  const router = useRouter();

  console.log(session);
  const handleUserConnectedAndDisConnected = (data) => {
    console.log('online user!');
    setOnlineUsers(data);
    console.log(data, 'dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  };

  const [onlineUsers, setOnlineUsers] = useState();
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    const socketInstance = ClientIO(
      `${process.env.NEXT_PUBLIC_SOCKET_URL}/socket`,
      {
        withCredentials: true,
        query: {
          userId: session.user.id,
          conversationId,
        },
      }
    );
    socketInstance.on('onlineUsers', handleUserConnectedAndDisConnected);
    socketInstance.on('connect', () => {
      // Listen for the 'userDisconnected' event and update the onlineUsers state

      setIsConnected(true);
      socketInstance.emit('userConnected', { userId: session.user.id });
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
      socketInstance.emit('userDisconnected', {
        userId: session.user.id,
      });
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on(updateKey, (message) => {
      console.log('send messssssssssssssssssssage');
      console.log('in update key');
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData;
        }

        const newData = oldData.pages.map((page: any) => {
          return {
            ...page,
            items: page.items.map((item) => {
              if (item.id === message.id) {
                return message;
              }
              return item;
            }),
          };
        });

        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    socket.on(addKey, (message) => {
      console.log('send messssssssssssssssssssage');
      console.log(message);
      console.log('in add key');
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [
              {
                items: [message],
              },
            ],
          };
        }

        const newData = [...oldData.pages];

        newData[0] = {
          ...newData[0],
          items: [message, ...newData[0].items],
        };

        return {
          ...oldData,
          pages: newData,
        };
      });
    });
    socket.on('onMessage', (message) => {
      // Handle the received message, e.g., by updating the state
      callback(message);
      console.log(message);
    });
    return () => {
      socket.off(addKey);
      socket.off(updateKey);
      socket.disconnect();
    };
  }, [queryClient, addKey, queryKey, socket, updateKey]);

  const goToConversation = async (userOneId, userTwoId) => {
    const res = await postRequest({
      endPoint: `${process.env.NEXT_PUBLIC_SOCKET_URL}/conversations`,
      formData: { userOneId, userTwoId },
      isFormData: false,
    });
    console.log(res);
    const { conversationId } = res;

    router.push(`/user/chat/conversation?conversationId=${conversationId}`);
  };

  return {
    socket,
    isConnected,
    onlineUsers,
    goToConversation,
  };
};
