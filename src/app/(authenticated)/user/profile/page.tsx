'use client';

import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@nextui-org/react';
import { MdOutlineEmail, MdPermIdentity } from 'react-icons/md';
import { IoIosPhonePortrait } from 'react-icons/io';
import { CiLocationOn } from 'react-icons/ci';
import { useSession } from 'next-auth/react';
import { useUser } from '@/hooks/useUser';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import DialogCustom from '@/components/ui/dialogCustom';
import ProfileForm from './ProfileForm';
import { getRequest } from '@/lib/fetch';

function page() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const session = useSession();
  console.log('🚀 ~ file: page.tsx:16 ~ page ~ session:', session);
  const { data: userInfo } = useQuery({
    queryKey: ['userInfo', session?.data?.user?.id],
    queryFn: async () => {
      const res = await onGetUserDetail(session?.data?.user?.id);
      setIsLoaded(true);
      return res;
    },
    enabled: !!session?.data?.user?.id,
  });
  const { data: userAddresses, isLoading: isLoadingUserAddresses } = useQuery(
    ['userAddresses', session?.data?.user?.id],
    async () => {
      const res = await getRequest({
        endPoint: `/api/user/address?id=${session?.data?.user?.id}`,
      });
      console.log('🚀 ~ file: ProfileForm.tsx:25 ~ res:', res);
      return res;
    },
    { enabled: !!session?.data?.user?.id }
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const { onGetUserDetail } = useUser();
  if (!isLoaded)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />;
      </div>
    );

  return (
    <div>
      <h1 className="text-xl font-medium">Profile</h1>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Edit Profile
      </Button>
      <Card className="bg-white p-6 rounded-lg shadow-md relative mt-4">
        <div className="flex flex-col gap-6 mt-4">
          <div className="w-full flex justify-center">
            <div className="border-2 border-red-400 rounded-full w-[180px] md:w-[270px] h-[180px] md:h-[270px] overflow-hidden">
              <img
                src={userInfo?.avatar}
                className="w-full h-full object-cover"
                alt={''}
              />
            </div>
          </div>
          <div className="w-full space-y-4">
            <div>
              <p className="text-sm text-gray-600">Họ tên</p>
              <div className="flex flex-row gap-2">
                <MdPermIdentity className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                <p className="text-sm text-slate-800">{userInfo?.name}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Điện thoại</p>
              <div className="flex flex-row gap-2">
                <IoIosPhonePortrait className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                <p className="text-sm text-slate-800">
                  {userInfo?.phoneNumber}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <div className="flex flex-row gap-2">
                <MdOutlineEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                <p className="text-sm text-slate-800">{userInfo?.email}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Địa chỉ</p>
              <div className="flex flex-row gap-2">
                <CiLocationOn className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                <p className="text-sm text-slate-800">
                  {userAddresses?.[0]?.addressValue}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
      {userInfo && userAddresses && isOpen && (
        <DialogCustom
          className="w-full lg:w-[40%] h-[80%] lg:h-[95%] flex items-center justify-center"
          isModalOpen={isOpen}
          setIsModalOpen={setIsOpen}
          // notShowClose={false}
        >
          <ProfileForm
            setEditing={setIsOpen}
            user={userInfo}
            userAddresses={userAddresses}
          />
        </DialogCustom>
      )}
    </div>
  );
}

export default page;
