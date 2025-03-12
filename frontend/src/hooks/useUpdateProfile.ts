import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

interface UpdateProfileParams {
  fullName?: string;
  avatarStyle?: string;
}

export const useUpdateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const updateProfile = async ({ fullName, avatarStyle }: UpdateProfileParams) => {
    if (!fullName && !avatarStyle) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, avatarStyle }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Error updating profile');
      }

      setAuthUser(data);
      toast.success('Profile updated successfully');
      return data;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update profile');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProfile, isLoading };
}; 