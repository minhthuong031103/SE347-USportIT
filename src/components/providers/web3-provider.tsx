'use client';

import { FantomTestnet, Ethereum } from '@thirdweb-dev/chains';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { useChain } from './chain-provider';

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const { selectedChain } = useChain();
  console.log(
    '🚀 ~ file: web3-provider.tsx:23 ~ Web3Provider ~ selectedChain',
    selectedChain
  );
  return (
    <ThirdwebProvider
      activeChain={selectedChain}
      supportedChains={[FantomTestnet, Ethereum]}
      clientId="8d30cd5b80149184f1e17f092232930a" // You can get a client id from dashboard settings
    >
      {children}
    </ThirdwebProvider>
  );
};
