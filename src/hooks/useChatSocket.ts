'use client';

import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { io as ClientIO } from 'socket.io-client';
import { getRequest, postRequest } from '@/lib/fetch';
import { useRouter } from 'next/navigation';

type ChatSocketProps = {
  addKey?: string;
  updateKey?: string;
  queryKey?: string;
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
  console.log(session, 'sessionsssssssssssssssssssssssssssss');
  const [onlineUsers, setOnlineUsers] = useState();
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    const socketInstance = ClientIO(
      `${process.env.NEXT_PUBLIC_SOCKET_URL}/socket`,
      {
        // withCredentials: true,
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
    const res: any = await postRequest({
      endPoint: `${process.env.NEXT_PUBLIC_SOCKET_URL}/conversations`,
      formData: { userOneId, userTwoId },
      isFormData: false,
    });
    console.log(res);
    const { conversationId } = res;

    router.push(`/user/conversations/${conversationId}`);
  };

  const getConversations = async ({ userId, page }) => {
    const limit = 2;
    const conversations = await getRequest({
      endPoint: `/conversations/all?userId=${userId}&page=${page}&limit=${limit}`,
    });
    console.log(conversations, 'conversations');
    return conversations;
  };

  return {
    socket,
    isConnected,
    onlineUsers,
    goToConversation,
    getConversations,
  };
};
