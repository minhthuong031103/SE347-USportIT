import { Metadata } from 'next';
import React from 'react';
import { getProviders } from 'next-auth/react';
import Login from './Login';
import { mustBeLoggedInAndVerified } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
};

const LoginPage = async () => {
  const providers = await getProviders();
  await mustBeLoggedInAndVerified();
  return (
    <>
      <div className="p-12 relative h-screen w-full ">
        <div className="lg:p-8 sm:p-12 ">
          <div className="mx-auto h-full flex w-full flex-col justify-center space-y-6 ">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Chào mừng trở lại!
              </h1>
              <p className="text-sm text-muted-foreground">
                Cùng khám phá những bộ sưu tập thời trang hoàn toàn mới.
              </p>
            </div>
            <Login providers={providers} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
