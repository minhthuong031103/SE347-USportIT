'use client';
import { Controller, useForm } from 'react-hook-form';

import toast from 'react-hot-toast';
import { checkEmail, cn } from '@/lib/utils';
import { Button } from '@/components/new-york/button';
import { Input } from '@/components/new-york/input';
import { Label } from '@/components/new-york/label';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Loader from '@/components/Loader';
import Link from 'next/link';
const Register = ({
  className,
  payload,
}: {
  className?: string;
  payload: any;
}) => {
  const { onRegister } = useAuth();
  console.log(payload);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: payload?.name || '',
      email: payload?.email || '',
      password: '',
      confirmPassword: '',
    },
  });
  useEffect(() => {
    if (payload?.email && payload?.name) {
      toast.error(
        'Your account is not registered yet, please register to continue'
      );
    }
  }, []);
  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(data) {
    console.log(data);
    if (!data.name || !data.email || !data.password || !data.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (!checkEmail(data.email)) {
      toast.error('Email is invalid');
      return;
    }
    if (data.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (data.password !== data.confirmPassword) {
      toast.error('Password and confirm password do not match');
      return;
    }

    setIsLoading(true);
    onRegister(data, () => {
      setIsLoading(false);
    });
  }
  if (isLoading)
    return (
      <div className="w-full flex h-full items-center justify-center">
        <Loader />
      </div>
    );
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div
        className={cn('grid gap-6 w-[80%] md:w-[70%] lg:w-[60%] ', className)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            <div className="gap-8 flex flex-col">
              <div className="flex flex-col gap-3 ">
                <Label>Name</Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        placeholder="Enter your name"
                        autoCapitalize="none"
                        autoCorrect="off"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    );
                  }}
                />
              </div>
              <div className="flex flex-col gap-3 ">
                <Label>Email</Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        placeholder="Enter your email"
                        autoCapitalize="none"
                        defaultValue={''}
                        type="text"
                        autoCorrect="off"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    );
                  }}
                />
              </div>
              <div className="flex flex-col gap-3 ">
                <Label>Password</Label>
                <Controller
                  control={control}
                  name="password"
                  defaultValue={''}
                  render={({ field }) => {
                    return (
                      <Input
                        placeholder="Enter your password"
                        type={show.password ? 'text' : 'password'}
                        value={field.value}
                        onChange={field.onChange}
                        renderRight={
                          <div
                            onClick={() => {
                              setShow({ ...show, password: !show.password });
                            }}
                            className="opacity-50 cursor-pointer hover:opacity-100"
                          >
                            {show.password ? (
                              <AiFillEyeInvisible size={20} />
                            ) : (
                              <AiFillEye size={20} />
                            )}
                          </div>
                        }
                      />
                    );
                  }}
                />
              </div>
              <div className="flex flex-col gap-3 ">
                <Label>Confirm password</Label>
                <Controller
                  control={control}
                  name="confirmPassword"
                  defaultValue={''}
                  render={({ field }) => {
                    return (
                      <Input
                        placeholder="Enter your password"
                        type={show.confirmPassword ? 'text' : 'password'}
                        value={field.value}
                        onChange={field.onChange}
                        renderRight={
                          <div
                            onClick={() => {
                              setShow({
                                ...show,
                                confirmPassword: !show.confirmPassword,
                              });
                            }}
                            className="opacity-50 cursor-pointer hover:opacity-100"
                          >
                            {show.confirmPassword ? (
                              <AiFillEyeInvisible size={20} />
                            ) : (
                              <AiFillEye size={20} />
                            )}
                          </div>
                        }
                      />
                    );
                  }}
                />
              </div>
            </div>

            <Button type="submit" className="">
              Sign Up
            </Button>
          </div>
        </form>
      </div>
      <p className=" mt-10 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link className=" font-bold underline text-black" href="/auth/login">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;
