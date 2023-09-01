import { Metadata } from 'next';
import React from 'react';
import { getProviders } from 'next-auth/react';

import Register from './Register';

import { getSession } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
};

const LoginPage = async () => {
  const providers = await getProviders();
  const session = await getSession();
  console.log('ok');
  console.log(session);
  return (
    <>
      <div className="p-12 relative h-full w-full ">
        <div className="lg:p-8 sm:p-12 ">
          <div className="mx-auto h-full flex w-full flex-col justify-center space-y-6 ">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Create your Member profile and get first access to the very best
                of our products, inspiration and community.
              </p>
            </div>
            <Register providers={providers} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
