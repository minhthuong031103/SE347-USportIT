'use client';
import {
  ConnectWallet,
  useChainId,
  useSwitchChain,
  useAddress,
} from '@thirdweb-dev/react';
import { FantomTestnet, Ethereum } from '@thirdweb-dev/chains';
import { useChain } from './providers/chain-provider';
import { useEffect } from 'react';
import { Button } from './ui/button';

export const tokenAddress = '0x00BCf4Ee95444D6aFF032a029080fAFE90C9d53B';
export const contractAddress = '0xD5b2d91f7E04667728eb2E38327f559D998d6919';
export const receiver = '0x9feacc5E9509C1A198ff4E65B4096C289A176287';
export const USDTAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
export const MARKETPLACE_ADDRESS = '0xb304D8378a97a1978C8f06325584384C716c2B86';
export const NFT_COLLECTION_ADDRESS =
  '0xBA410E8D44f1846a0926E28cA880E096Ba6401Af';
export const MAIN_WALLET_ADDRESS = '0x9feacc5E9509C1A198ff4E65B4096C289A176287';

export const CHARACTER_EDITION_ADDRESS =
  '0xE554fD0AcC2145c820CD7fEf076CCbd7C4dFD77E'; //up

export const MINING_CONTRACT_ADDRESS =
  '0x06F905dB9b1F45CDFf5F0269bEECA867c6e03b2b'; //up

export const GOLD_GEMS_ADDRESS = '0x00BCf4Ee95444D6aFF032a029080fAFE90C9d53B'; //up

export const PICKAXE_EDITION_ADDRESS =
  '0x067A2fe548d503760f53faDb8A660483153D9abE'; //up

const ConnectWalletButton = () => {
  const address = useAddress();

  const switchChain = useSwitchChain();
  const { selectedChain, setSelectedChain } = useChain();
  const chainId = useChainId();
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
  return chainId === FantomTestnet.chainId || !address ? (
    <ConnectWallet
      className="h-8"
      theme={'dark'}
      btnTitle={'Kết nối Ví'}
      modalTitle={'Chọn ví của bạn'}
      switchToActiveChain={true}
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
      welcomeScreen={{
        title: 'Cổng kết nối đến thế giới Block Chain ',
        subtitle: 'Kết nối với ví của bạn để tiếp tục',
      }}
    ></ConnectWallet>
  ) : (
    <Button
      variant={'outline'}
      onClick={() => {
        switchChain(FantomTestnet.chainId);
        setSelectedChain(FantomTestnet.slug);
      }}
    >
      Chuyển mạng
    </Button>
  );
};
export default ConnectWalletButton;
