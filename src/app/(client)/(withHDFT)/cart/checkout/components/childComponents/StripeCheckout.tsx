import React, { useEffect } from 'react';
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import StripeForm from './StripeForm';
import { loadStripe } from '@stripe/stripe-js';
import { postRequest } from '@/lib/fetch';
import Loader from '@/components/Loader';
import { useSession } from 'next-auth/react';

export const StripeCheckout = ({
  checkedItems,
  total,
  userFullName,
  userAddress,
  userEmail,
}) => {
  const [clientSecret, setClientSecret] = React.useState();
  const [stripePromise, setStripePromise] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const uuid = localStorage.getItem('uuid');
  const dataArray = Object.values(checkedItems).map((item) => {
    return {
      id: item.data.id,
      quantity: item.quantity,
      selectedSize: item.selectedSize,
    };
  });
  console.log(
    '🚀 ~ file: StripeCheckout.tsx:23 ~ dataArray ~ dataArray:',
    dataArray,
    userFullName,
    userAddress,
    userEmail
  );

  useEffect(() => {
    setStripePromise(
      loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    );
  }, []);
  useEffect(() => {
    if (!stripePromise) return;
    const getClientSecret = async () => {
      setLoading(true);
      const checkoutSession = await postRequest({
        endPoint: '/api/stripe/checkout-session/checkout',
        formData: {
          checkedItems: dataArray,
          amount: total,
          userFullName,
          userAddress,
          userEmail,
          uuid,
        },
        isFormData: false,
      });

      setClientSecret(checkoutSession?.clientSecret);
      setLoading(false);
    };
    getClientSecret();
  }, [stripePromise]);
  return loading ? (
    <div className="w-full h-full flex items-center justify-center">
      <Loader />
    </div>
  ) : clientSecret ? (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <StripeForm />
    </Elements>
  ) : null;
};
