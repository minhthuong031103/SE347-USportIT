'use client';
import { v4 as uuidv4 } from 'uuid';

import React, { useEffect } from 'react';

const UniqueIdProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Generate UUIDv4 when the component mounts
    const generatedUuid = uuidv4();

    if (!localStorage.getItem('uuid')) {
      localStorage.setItem('uuid', generatedUuid);
    }
  }, []);

  return <div>{children}</div>;
};

export default UniqueIdProvider;
