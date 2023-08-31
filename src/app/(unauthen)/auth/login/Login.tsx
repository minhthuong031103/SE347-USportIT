'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/assets/Icons';
import { Button } from '@/components/new-york/button';
import { Input } from '@/components/new-york/input';
import { Label } from '@/components/new-york/label';
import { signIn } from 'next-auth/react';
const Login = ({
  className,
  providers,
}: {
  className?: string;
  providers: any;
}) => {
  console.log(providers);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div
        className={cn('grid gap-6 w-[80%] md:w-[70%] lg:w-[60%] ', className)}
      >
        <form onSubmit={onSubmit}>
          <div className="grid gap-6">
            <div className="gap-8 flex flex-col">
              <div className="flex flex-col gap-3 ">
                <Label>Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your gmail"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
              <div className="flex flex-col gap-3 ">
                <Label>Password</Label>
                <Input
                  id="email"
                  placeholder="Enter your password"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In
            </Button>
          </div>
        </form>
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
            className="w-1/2"
            onClick={() => {
              signIn('discord');
            }}
            variant="outline"
            type="button"
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div>
                <Icons.gitHub className="mr-2 h-4 w-4" />
              </div>
            )}{' '}
            Github
          </Button>
          <Button
            className="w-1/2"
            onClick={() => {
              signIn('discord');
            }}
            variant="outline"
            type="button"
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div>
                <Icons.discord className="mr-2 h-4 w-4" />
              </div>
            )}{' '}
            Discord
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
