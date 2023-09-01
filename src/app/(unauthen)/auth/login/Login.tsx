'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/assets/Icons';
import { Button } from '@/components/new-york/button';
import { Input } from '@/components/new-york/input';
import { Label } from '@/components/new-york/label';
import { signIn } from 'next-auth/react';
import { Controller, useForm } from 'react-hook-form';
import Loader from '@/components/Loader';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Login = ({ className }: { className?: string; providers: unknown }) => {
  const { control, handleSubmit } = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data) {
    console.log(data);
    if (!data.email || !data.password) {
      toast.error('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    setIsLoading(false);
    if (res?.error) {
      toast.error(res?.error);
      return;
    }

    if (!res?.error) router.replace('/');
    setIsLoading(false);
    console.log(res);
  }
  if (isLoading)
    return (
      <div className="w-full flex flex-col items-center justify-center">
        <Loader />
      </div>
    );
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div
        className={cn('grid gap-6 w-[80%] md:w-[70%] lg:w-[60%] ', className)}
      >
        <div className="grid gap-6">
          <div className="gap-8 flex flex-col">
            <div className="flex flex-col gap-3 ">
              <Label>Email</Label>
              <Controller
                control={control}
                name="email"
                defaultValue={''}
                render={({ field }) => (
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    id="email"
                    placeholder="Enter your gmail"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-3 ">
              <Label>Password</Label>
              <Controller
                control={control}
                name="password"
                defaultValue={''}
                render={({ field }) => (
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="password"
                    autoCorrect="off"
                  />
                )}
              />
            </div>
          </div>

          <Button
            onClick={() => {
              handleSubmit(onSubmit)();
            }}
          >
            Sign in
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="w-full flex gap-6">
          <Button
            className="w-1/2 "
            onClick={() => {
              signIn('discord');
            }}
            variant="outline"
            disabled={isLoading}
          >
            <div>
              <Icons.gitHub className="mr-2 h-4 w-4" />
            </div>{' '}
            Github
          </Button>
          <Button
            className="w-1/2"
            onClick={() => {
              signIn('discord');
            }}
            variant="outline"
            disabled={isLoading}
          >
            <div>
              <Icons.discord className="mr-2 h-4 w-4" />
            </div>{' '}
            Discord
          </Button>
        </div>
      </div>
      <p className="mt-10 px-8 text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <Link className="font-bold underline text-black" href="/auth/register">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
