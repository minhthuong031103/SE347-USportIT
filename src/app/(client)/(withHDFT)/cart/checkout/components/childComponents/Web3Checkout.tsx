/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useEffect } from 'react';
import {
  useContract,
  ConnectWallet,
  useAddress,
  useSwitchChain,
  useChainId,
  Web3Button,
  useTokenBalance,
} from '@thirdweb-dev/react';
import { Button } from '@/components/ui/button';
import { ethers } from 'ethers';
import { FantomTestnet, Ethereum } from '@thirdweb-dev/chains';
import { useChain } from '@/components/providers/chain-provider';
import { useAuth } from '@/hooks/useAuth';
import { useSession } from 'next-auth/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { postRequest } from '@/lib/fetch';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
const tokenAddress = '0xf0698869A8DCb2175b84059D7DF8A20AB233cf53';
const contractAddress = '0xD5b2d91f7E04667728eb2E38327f559D998d6919';
const receiver = '0x9feacc5E9509C1A198ff4E65B4096C289A176287';
const USDTAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
const uitContractAddress = '0xf0698869A8DCb2175b84059D7DF8A20AB233cf53';
export const Web3Checkout = () => {
  const address = useAddress();
  const { data: uitContract } = useContract(uitContractAddress);
  const { data: uitBalance } = useTokenBalance(uitContract, address);
  const [inputSend, setInputSend] = React.useState('');
  const session = useSession();
  const queryClient = useQueryClient();

  const { onGetUserDetail } = useAuth();
  const { data: userDetail } = useQuery({
    queryKey: ['userDetail', session?.data?.user?.id],
    queryFn: () => onGetUserDetail({ userId: session?.data?.user?.id }),
    enabled: !!session?.data?.user?.id,
  });
  console.log(userDetail);

  const switchChain = useSwitchChain();
  const { selectedChain, setSelectedChain } = useChain();
  const chainId = useChainId();
  console.log('🚀 ~ file: checkout.tsx:23 ~ Checkout ~ chainId:', chainId);

  const { contract: tokenContract } = useContract(tokenAddress, 'token');

  useEffect(() => {
    if (!address) return;
    if (chainId === FantomTestnet.chainId) {
      switchChain(FantomTestnet.chainId);
      setSelectedChain(FantomTestnet.slug);
    } else {
      switchChain(Ethereum.chainId);
      setSelectedChain(Ethereum.slug);
    }
  }, []);
  return (
    <div className="flex flex-col gap-y-3 w-max-[30%] items-center justify-center">
      <ConnectWallet
        className=""
        displayBalanceToken={
          selectedChain === FantomTestnet.slug ||
          chainId === FantomTestnet.chainId
            ? {
                [FantomTestnet.chainId]: tokenAddress,
              }
            : {
                [Ethereum.chainId]: USDTAddress,
              }
        }
      />
      {address && (
        <div className="flex flex-row gap-x-5">
          {/* <Input
            value={inputSend}
            onChange={(e) => {
              setInputSend(e.target.value);
              console.log(parseFloat(inputSend));
            }}
            placeholder="Enter amount to send"
          /> */}
          {chainId === FantomTestnet.chainId && (
            <Web3Button
              contractAddress={uitContractAddress}
              action={async (contract) => {
                await contract?.call('approve', [
                  tokenAddress,
                  ethers.utils.parseEther(inputSend),
                ]);
                await contract?.call('transfer', [
                  receiver,
                  ethers.utils.parseEther(inputSend),
                ]);
              }}
            >
              Check out
            </Web3Button>
          )}
          {chainId === Ethereum.chainId && (
            <Web3Button
              contractAddress={USDTAddress}
              action={async (contract) => {
                await contract?.call('approve', [
                  USDTAddress,
                  ethers.utils.parseEther(inputSend),
                ]);
                await contract?.call('transfer', [
                  receiver,
                  ethers.utils.parseEther(inputSend),
                ]);
              }}
            >
              Check out
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
            Switch Chain{' '}
          </Button>
          {/* <Button
            onClick={() => {
              window.ethereum?.request({
                method: 'wallet_watchAsset',
                params: {
                  type: 'ERC20',
                  options: {
                    address: tokenAddress,
                    symbol: 'UIT',
                    decimals: 18,
                    image:
                      'https://upload  <>
            }}
          >
            add
          </Button> */}
        </div>
      )}
    </div>
  );
};
