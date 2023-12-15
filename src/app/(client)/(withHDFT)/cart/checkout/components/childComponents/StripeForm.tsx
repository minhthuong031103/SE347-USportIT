  import Loader from '@/components/Loader';
  import { Button } from '@/components/ui/button';
  import {
    useStripe,
    useElements,
    PaymentElement,
  } from '@stripe/react-stripe-js';
  import React from 'react';
  import toast from 'react-hot-toast';

  const StripeForm = ({ callback }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = React.useState(false);
    const onSubmit = async () => {
      if (!stripe || !elements) return;

      setLoading(true);
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // return_url: `${window.location.origin}/agency/goi-dich-vu`,
        },
        redirect: 'if_required',
      });
      setLoading(false);
      if (error) {
        toast.error(error?.message);
      } else if (paymentIntent.status === 'succeeded') {
        toast.success('Payment successful');
        callback && callback();
      } else {
        toast.error('Payment Failed');
      }
    };
    return stripe && elements ? (
      <div className="px-1 py-10">
        <div className="flex flex-col w-full gap-y-6 ">
          <PaymentElement />
          <div className="w-full flex items-center justify-center">
            <Button disabled={loading} className="w-[60%]" onClick={onSubmit}>
              <span>Checkout</span>
            </Button>
          </div>
          {loading ? (
            <div className="w-full flex items-center justify-center">
              <Loader />
              Your payment is processing...
            </div>
          ) : null}
        </div>
      </div>
    ) : null;
  };

  export default StripeForm;
