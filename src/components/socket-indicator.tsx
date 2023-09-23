'use client';

import { useSocket } from './providers/socket-provider';
import { Badge } from './new-york/badge';

export const SocketIndicator = () => {
  const { isConnected } = useSocket();
  if (!isConnected) {
    return (
      <Badge
        variant={'outline'}
        className="bg-destructive text-black border-none"
      >
        Fail to connect, Polling every 1s
      </Badge>
    );
  }
  return (
    <Badge className="bg-emerald-600 text-white border-none">
      Connected! Live Real time
    </Badge>
  );
};
