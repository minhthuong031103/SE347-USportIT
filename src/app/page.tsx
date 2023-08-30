'use client';
import { Header } from '@/components/header';
import Link from 'next/link';
import React from 'react';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/new-york/button';
const page = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col">
        <Link href={'/auth/login'}>
          <button>login</button>
        </Link>

        <Button
          variant="outline"
          onClick={() => {
            signOut();
          }}
        >
          logout
        </Button>
      </div>
    </div>
  );
};
export default page;
