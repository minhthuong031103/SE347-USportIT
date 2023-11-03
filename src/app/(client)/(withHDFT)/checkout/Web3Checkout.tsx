'use client';

import React, { useEffect } from 'react';
import {
  useContract,
  ConnectWallet,
  useAddress,
  useSwitchChain,
  useChainId,
  Web3Button,
} from '@thirdweb-dev/react';
import { Button } from '@/components/ui/button';
import { ethers } from 'ethers';
import { FantomTestnet, Ethereum } from '@thirdweb-dev/chains';
import { useChain } from '@/components/providers/chain-provider';
const tokenAddress = '0xf0698869A8DCb2175b84059D7DF8A20AB233cf53';
const contractAddress = '0xD5b2d91f7E04667728eb2E38327f559D998d6919';
const receiver = '0x69b74a620D4493D484CEC4711a7FBaEaaD1F576C';
const USDTAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

export const Web3Checkout = () => {
  const address = useAddress();
  const switchChain = useSwitchChain();
  const { selectedChain, setSelectedChain } = useChain();
  const chainId = useChainId();
  console.log('🚀 ~ file: checkout.tsx:23 ~ Checkout ~ chainId:', chainId);

  const { contract: tokenContract } = useContract(tokenAddress, 'token');

  useEffect(() => {
    if (chainId === FantomTestnet.chainId) {
      setSelectedChain(FantomTestnet.slug);
    } else {
      setSelectedChain(Ethereum.slug);
    }
  }, []);
  return (
    <div>
      <ConnectWallet
        displayBalanceToken={
          selectedChain === FantomTestnet.slug
            ? {
                [FantomTestnet.chainId]: tokenAddress,
              }
            : {
                [Ethereum.chainId]: USDTAddress,
              }
        }
      />
      {address && (
        <>
          {chainId === FantomTestnet.chainId && (
            <Web3Button
              contractAddress={contractAddress}
              action={async (contract) => {
                await tokenContract?.setAllowance(contractAddress, 150);
                await contract?.call('transfer', [
                  tokenAddress,
                  receiver,
                  ethers.utils.parseEther('150'),
                  'ok',
                ]);
              }}
            >
              send
            </Web3Button>
          )}
          {chainId === Ethereum.chainId && (
            <Web3Button
              contractAddress={USDTAddress}
              action={async (contract) => {
                await contract?.call('approve', [USDTAddress, 150]);
                await contract?.call('transfer', [
                  receiver,
                  ethers.utils.parseEther('150'),
                ]);
              }}
            >
              send
            </Web3Button>
          )}
          <Button
            onClick={async () => {
              console.log('change');
              console.log(selectedChain);
              if (selectedChain === FantomTestnet.slug) {
                await switchChain(Ethereum.chainId);
                setSelectedChain(Ethereum.slug);
              } else {
                await switchChain(FantomTestnet.chainId);
                setSelectedChain(FantomTestnet.slug);
              }
            }}
          >
            switch chain{' '}
          </Button>
        </>
      )}
    </div>
  );
};
