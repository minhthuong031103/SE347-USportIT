import { postRequest } from '@/lib/fetch';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export const useAuth = () => {
  const router = useRouter();

  const onRegister1 = async (data, callback) => {
    const response = await postRequest({
      endPoint: '/api/auth/register',
      formData: data,
      isFormData: false,
    });
    callback?.();

    if (response?.message === 'User already exists') {
      toast.error(response.message);
    }
    if (response?.message === 'User created') {
      toast.success(response.message);
      router.push('/auth/login');
    }
  };

  const onRegister = async (data, callback) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });

    const response = await res.json();
    callback?.();
    if (response?.message === 'User already exists') {
      toast.error(response.message);
    }
    if (response?.message === 'User created') {
      toast.success(response.message);
      router.push('/auth/login');
    }
  };

  return {
    onRegister,
    onRegister1,
  };
};
