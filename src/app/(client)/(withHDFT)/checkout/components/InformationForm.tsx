'use client';

import { SelectAddress } from '@/components/select-address';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const InformationForm = ({ setPage }) => {
  const [addressValue, setAddressValue] = useState('');
  const [fullName, setFullName] = useState('');

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="w-[95%] h-full flex flex-col gap-y-6">
        <Input
          placeholder="Enter your Full name"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
          label="Full name"
        />

        <SelectAddress
          addressValue={addressValue}
          setAddressValue={setAddressValue}
        />
      </div>
      <div className="mt-20 w-full flex justify-center">
        <Button
          onClick={() => {
            setPage('2');
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default InformationForm;
