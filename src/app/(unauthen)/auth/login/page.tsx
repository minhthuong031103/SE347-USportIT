import React from 'react';
import { getProviders } from 'next-auth/react';
import { Login } from './Login';

const page = async () => {
  const providers = await getProviders();

  return (
    <div>
      <Login providers={providers} />
    </div>
  );
};
export default page;
