'use client';

import { Badge } from './ui/badge';

export const SocketIndicator = ({ isConnected }) => {
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
