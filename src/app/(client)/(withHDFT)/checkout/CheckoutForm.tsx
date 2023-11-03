'use client';

import React, { useEffect } from 'react';

import DialogCustom from '@/components/ui/dialogCustom';
import { Select, SelectItem } from '@nextui-org/react';
import { Web3Checkout } from './Web3Checkout';
import { StripeCheckout } from './StripeCheckout';

interface CheckoutProps {
  setIsModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
}
const checkOutConst = [{ value: 'Stripe' }, { value: 'Block chain Wallet' }];
export const CheckoutForm = ({
  setIsModalOpen,
  isModalOpen,
}: CheckoutProps) => {
  const [selectedType, setSelectedType] = React.useState(new Set([]));
  const [typeTouched, setTypeTouched] = React.useState(false);
  const [method, setMethod] = React.useState('');
  console.log('🚀 ~ file: CheckoutForm.tsx:26 ~ method:', method);
  const isTypeValid = selectedType.size > 0;
  useEffect(() => {
    if (selectedType) {
      const noiThatValueArray = Array.from(selectedType);
      setMethod(noiThatValueArray?.[0]);
    }
  }, [selectedType]);
  return (
    <div className="w-full h-full px-1">
      <DialogCustom
        className="w-full lg:w-[50%] h-[80%] lg:h-[95%] flex items-center justify-center"
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        warningOnClose={true}
        callBack={() => {}}
      >
        <Select
          key={'method'}
          radius={'md'}
          label="Payment method"
          isInvalid={isTypeValid || !typeTouched ? false : true}
          errorMessage={
            isTypeValid || !typeTouched ? '' : 'Please choose payment method'
          }
          autoFocus={false}
          placeholder="Select payment method"
          selectedKeys={selectedType}
          onSelectionChange={(keys) => {
            setSelectedType(keys);
          }}
          onClose={() => setTypeTouched(true)}
          className="max-w-xs lg:max-w-lg"
        >
          {checkOutConst?.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.value.toString()}
            </SelectItem>
          ))}
        </Select>
        {method === 'Stripe' && <StripeCheckout />}
        {method === 'Block chain Wallet' && <Web3Checkout />}
      </DialogCustom>
    </div>
  );
};
