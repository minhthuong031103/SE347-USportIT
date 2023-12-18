'use client';

import { AddAddress } from '@/app/(authenticated)/user/profile/AddAddress';
import Loader from '@/components/Loader';
import { SelectAddress } from '@/components/select-address';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/hooks/useUser';
import { Select, SelectItem } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const AuthInformationForm = ({
  setPage,
  user,
  addresses,
  setUserFullname,
  setUserAddress,
  setUserEmail,
}) => {
  const [addressValue, setAddressValue] = useState(
    addresses?.[0]?.addressValue
  );
  const [selectedType, setSelectedType] = React.useState(
    new Set([addresses?.[0]?.addressValue?.toString()])
  );
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [fullName, setFullName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  useEffect(() => {
    if (selectedType.size > 0) {
      const noiThatValueArray = Array.from(selectedType);
      setUserAddress(noiThatValueArray?.[0]);
    }
  }, [selectedType]);
  return user && addresses ? (
    <div className="flex flex-col h-full justify-between">
      <div className="w-[95%] h-full flex flex-col gap-y-6">
        <Input
          placeholder="Nhập đầy đủ họ tên"
          value={fullName}
          onChange={(e) => {
            setUserFullname(e.target.value);
          }}
          label="Họ Tên"
        />
        <Input
          placeholder="Nhập email"
          value={email}
          disabled
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
          label="Email"
        />

        {/* <SelectAddress
          addressValue={addressValue}
          setAddressValue={setAddressValue}
        /> */}

        <Label>Địa chỉ</Label>
        <Select
          key={'method'}
          radius={'md'}
          label="Địa chỉ"
          disallowEmptySelection={true}
          autoFocus={false}
          placeholder="Select address"
          selectedKeys={selectedType}
          onSelectionChange={(keys) => {
            setSelectedType(keys);
          }}
          className="max-w-xs lg:max-w-lg"
        >
          {addresses?.map((item) => {
            return (
              <SelectItem key={item?.addressValue} value={item.addressValue}>
                {item?.addressValue}
              </SelectItem>
            );
          })}
        </Select>
        <Button
          disabled={!addressValue || !fullName || !email}
          className="w-32"
          onClick={() => {
            setIsAddressModalOpen(true);
          }}
        >
          Thêm địa chỉ
        </Button>
        <AddAddress
          isModalOpen={isAddressModalOpen}
          setIsModalOpen={setIsAddressModalOpen}
        />
      </div>
      <div className="mt-20 w-full flex justify-center">
        <Button
          className="w-32"
          onClick={() => {
            setPage('2');
          }}
        >
          Tiếp tục
        </Button>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <Loader />
    </div>
  );
};

export default AuthInformationForm;
