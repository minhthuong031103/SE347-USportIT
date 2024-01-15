'use client';

import React from 'react';
import { Button } from './ui/button';
import { tokenAddress } from './ConnectWalletButton';
import { useQueryClient } from '@tanstack/react-query';
import { useAddress, useChainId } from '@thirdweb-dev/react';
import { FantomTestnet, Ethereum } from '@thirdweb-dev/chains';

export const AddTokenButton = ({
  className,
  variant,
}: {
  className?: string;
  variant?: string;
}) => {
  const address = useAddress();
  const chainId = useChainId();

  const queryClient = useQueryClient();
  return !address || chainId !== FantomTestnet.chainId ? null : (
    <Button
      variant={variant || 'outline'}
      onClick={() => {
        window.ethereum?.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: tokenAddress,
              symbol: 'MTH',
              decimals: 18,
              image:
                'https://res.cloudinary.com/dci8dhaps/image/upload/v1700155030/logo123_rxylro.png',
            },
          },
        });
        queryClient.refetchQueries();
      }}
      className={className}
    >
      Thêm Token MTH
    </Button>
  );
};
