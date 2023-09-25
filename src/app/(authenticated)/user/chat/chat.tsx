'use client';

import { Button } from '@/components/new-york/button';
import { Input } from '@/components/new-york/input';
import { useSocket } from '@/components/providers/socket-provider';
import { SocketIndicator } from '@/components/socket-indicator';
import { useChatSocket } from '@/hooks/useChatSocket';
import { postRequest } from '@/lib/fetch';
import React from 'react';
const queryKey = `chat:${'5a84bf0e-2e29-4a75-981e-03f32bef41bc'}`;
const addKey = `chat:${'5a84bf0e-2e29-4a75-981e-03f32bef41bc'}:messages`;
const updateKey = `chat:${'5a84bf0e-2e29-4a75-981e-03f32bef41bc'}:messages:update`;

function Chat({ session }) {
  useChatSocket({ queryKey, addKey, updateKey });
  const { socket } = useSocket();
  console.log(socket);
  const [message, setMessage] = React.useState('');
  const onSubmit = async () => {
    const data = await postRequest({
      endPoint: `${process.env.NEXT_PUBLIC_SOCKET_URL}/directMessage/sendMessage`,
      formData: { content: message, session },
      isFormData: false,
    });
    console.log(data);
  };
  return (
    <div>
      <SocketIndicator />
      <div>
        <Input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <Button onClick={onSubmit}>send</Button>
      </div>
    </div>
  );
}

export default Chat;
