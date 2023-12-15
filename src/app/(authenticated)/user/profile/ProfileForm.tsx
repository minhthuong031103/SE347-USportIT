import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectItem } from '@nextui-org/react';
import { Address, User } from '@prisma/client';
import React, { useEffect } from 'react';
import { AddAddress } from './AddAddress';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getRequest, postRequest } from '@/lib/fetch';
import { Zoom } from '@/components/ui/zoom-image';
import { FileDialog } from '@/components/FileDialog';
import toast from 'react-hot-toast';
import { Label } from '@/components/ui/label';
import { generateReactHelpers } from '@uploadthing/react/hooks';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import Loader from '@/components/Loader';
const { useUploadThing } = generateReactHelpers<OurFileRouter>();

const ProfileForm = ({
  user,
  userAddresses,
  setEditing,
}: {
  user: User;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  userAddresses: any[];
}) => {
  const queryClient = useQueryClient();
  const [name, setName] = React.useState(user?.name);
  const [email, setEmail] = React.useState(user?.email);
  const [selectedType, setSelectedType] = React.useState(
    new Set([userAddresses?.[0]?.id?.toString()])
  );
  const [avatarImageFiles, setAvatarImageFiles] = React.useState([]);
  const [defaultAvatar, setDefaultAvatar] = React.useState(user?.avatar);
  const { isUploading, startUpload } = useUploadThing('imageUploader');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  console.log('🚀 ~ file: ProfileForm.tsx:23 ~ selectedType:', selectedType);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = React.useState(
    userAddresses?.[0]?.id?.toString()
  );
  console.log(
    '🚀 ~ file: ProfileForm.tsx:28 ~ selectedAddress:',
    selectedAddress
  );
  const onSubmit = async () => {
    if (!selectedAddress || !name) {
      toast.error('Please fill all required fields');
      return;
    }
    setIsSubmitting(true);
    const [avatarImage] = await Promise.all([
      startUpload([...avatarImageFiles]).then((res) => {
        const formattedImages = res?.map((image) => ({
          id: image.key,
          name: image.key.split('_')[1] ?? image.key,
          url: image.url,
        }));
        return formattedImages ?? null;
      }),
    ]);
    console.log(
      '🚀 ~ file: ProfileForm.tsx:57 ~ onSubmit ~ avatarImage:',
      avatarImage?.[0]?.url
    );

    try {
      const res = await postRequest({
        endPoint: '/api/user/update',
        formData: {
          name,
          avatar: avatarImage?.[0]?.url ? avatarImage?.[0]?.url : defaultAvatar,
          selectedAddress: selectedAddress,
          userId: parseInt(user?.id),
        },
        isFormData: false,
      });
      console.log('🚀 ~ file: ProfileForm.tsx:72 ~ onSubmit ~ res:', res);
      if (res?.message === 'success') {
        toast.success('Update profile successfully');
        setEditing(false);
      } else {
        toast.error('Update profile failed');
      }
      queryClient.refetchQueries(['userInfo', user?.id]);
      queryClient.refetchQueries(['userAddresses', user?.id]);
      setIsSubmitting(false);
    } catch (e) {
      console.log(e);
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    if (selectedType.size > 0) {
      const noiThatValueArray = Array.from(selectedType);
      setSelectedAddress(noiThatValueArray?.[0]);
    }
  }, [selectedType]);
  if (isSubmitting)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  return (
    <div className="px-1 flex flex-col gap-y-3">
      <div className="flex flex-col gap-y-3 w-full">
        <div className="font-bold text-sm">
          Ảnh đại diện <span className="text-red-500">*</span>
        </div>
        <div className="w-full flex flex-col gap-3 justify-center items-center">
          <div className="border-2 border-red-400 rounded-full w-[180px] md:w-[270px] h-[180px] md:h-[270px] overflow-hidden">
            <Zoom key={1} className={'w-full '}>
              <img
                src={
                  avatarImageFiles[0]?.preview ||
                  avatarImageFiles[0]?.url ||
                  defaultAvatar
                }
                alt={avatarImageFiles[0]?.name}
                className="w-full h-full object-cover"
              />
            </Zoom>
          </div>
          <FileDialog
            name="images"
            maxFiles={1}
            maxSize={1024 * 1024 * 4}
            files={avatarImageFiles}
            setFiles={setAvatarImageFiles}
            disabled={false}
          />
        </div>
      </div>
      <Input
        label="Name"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <Input
        disabled
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <Label>Address</Label>
      <Select
        key={'method'}
        radius={'md'}
        label="Address"
        disallowEmptySelection={true}
        autoFocus={false}
        placeholder="Select address"
        selectedKeys={selectedType}
        onSelectionChange={(keys) => {
          setSelectedType(keys);
        }}
        className="max-w-xs lg:max-w-lg"
      >
        {userAddresses?.map((item) => {
          return (
            <SelectItem key={item.id?.toString()} value={item.addressValue}>
              {item?.addressValue}
            </SelectItem>
          );
        })}
      </Select>
      <Button
        className="w-32"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Add address
      </Button>

      {isModalOpen && (
        <AddAddress isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
      <div className="w-full h-full flex items-center justify-center">
        <Button
          onClick={() => {
            onSubmit();
          }}
          className="w-[50%] mt-12"
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileForm;
