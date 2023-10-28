/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useContext, useState } from 'react';
import { createContext } from 'react';

const ChainContext = createContext({
  selectedChain: 'fantom-testnet',
  setSelectedChain: (chain: string) => {},
});
export const useChain = () => {
  return useContext(ChainContext);
};

export const ChainProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedChain, setSelectedChain] = useState('fantom-testnet');

  return (
    <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
      {children}
    </ChainContext.Provider>
  );
};
