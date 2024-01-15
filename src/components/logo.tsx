import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Logo() {
  return (
    <Link className="w-[200px]" href={'/'}>
      <div className="items-center w-full flex flex-row gap-2">
        <Image
          alt="A&Z"
          src={
            'https://utfs.io/f/ef06a82d-3a60-4934-a92b-5de2eda046cc-oxx5jb.jpg'
          }
          width={40}
          height={40}
        />

        <div className="text-lg w-full font-bold tracking-tight">
          Elite Motion
        </div>
      </div>
    </Link>
  );
}

export default Logo;
