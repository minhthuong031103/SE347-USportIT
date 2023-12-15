import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { postRequest } from '@/lib/fetch';
import React, { useEffect, useState } from 'react';

const VnPayCheckout = ({ checkedItems, total }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [paymentUrl, setPaymentUrl] = useState('');
  useEffect(() => {
    const getPaymentUrl = async () => {
      const res = await postRequest({
        endPoint: '/api/vnpay/checkout',
        formData: {
          total,
          checkedItems,
        },
        isFormData: false,
      });
      console.log(
        '🚀 ~ file: VnPayCheckout.tsx:16 ~ getPaymentUrl ~ res:',
        res
      );
      setIsLoading(false);
      setPaymentUrl(res?.vnpUrl);
    };
    getPaymentUrl();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full flex">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex">
      <Button
        onClick={() => {
          window.open(paymentUrl, '_blank');
        }}
      >
        Open VnPay
      </Button>
    </div>
  );
};

export default VnPayCheckout;
