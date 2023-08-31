import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { getProviders } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/new-york/button';

import Login from './Login';
import { getServerSession } from 'next-auth';
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
      <div className="p-12 relative h-screen w-full md:grid lg:max-w-none lg:grid-cols-2 lg:p-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900">
            <Image
              src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_540,c_limit/d320bfb2-9b9a-453c-96f4-bad7e12fdffe/nike-just-do-it.png"
              alt="Auth background"
              layout="fill"
              objectFit="cover"
              priority
              quality={100}
            />
            <div className="absolute inset-0 bg-black opacity-30" />
          </div>
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8 sm:p-12 ">
          <div className="mx-auto h-full flex w-full flex-col justify-center space-y-6 ">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back!
              </h1>
              <p className="text-sm text-muted-foreground">
                Explore the entirely new collection of fashion
              </p>
            </div>
            <Login providers={providers} />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link
                className="font-bold underline text-black"
                href="/examples/authentication/register"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
