'use client';

import React, { useEffect } from 'react';

import { Select, SelectItem } from '@nextui-org/react';
import { Web3Checkout } from './childComponents/Web3Checkout';
import { StripeCheckout } from './childComponents/StripeCheckout';
import VnPayCheckout from './childComponents/VnPayCheckout';

const checkOutConst = [
  { value: 'Stripe' },
  { value: 'Block chain Wallet' },
  { value: 'VnPay' },
];
export const PaymentForm = ({
  checkedItems,
  total,
  userFullName,
  userAddress,
  userEmail,
}) => {
  const [selectedType, setSelectedType] = React.useState(new Set([]));
  const [typeTouched, setTypeTouched] = React.useState(false);
  const [method, setMethod] = React.useState('');
  const isTypeValid = selectedType.size > 0;
  useEffect(() => {
    if (selectedType) {
      const noiThatValueArray = Array.from(selectedType);
      setMethod(noiThatValueArray?.[0]);
    }
  }, [selectedType]);

  return (
    <div className="w-full h-full px-1">
      <Select
        key={'method'}
        radius={'md'}
        label="Phương thức thanh toán"
        isInvalid={isTypeValid || !typeTouched ? false : true}
        errorMessage={
          isTypeValid || !typeTouched
            ? ''
            : 'Vui lòng chọn phương thức thanh toán'
        }
        autoFocus={false}
        placeholder="Chọn phương thức thanh toán"
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
      {method === 'Stripe' && (
        <StripeCheckout
          userAddress={userAddress}
          userFullName={userFullName}
          userEmail={userEmail}
          checkedItems={checkedItems}
          total={total}
        />
      )}
      {method === 'Block chain Wallet' && <Web3Checkout />}
      {method === 'VnPay' && (
        <VnPayCheckout checkedItems={checkedItems} total={total} />
      )}
    </div>
  );
};
