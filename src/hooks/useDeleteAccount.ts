import { useState } from 'react';
import { usersApi } from '@/services/users/api';
import { useAuth } from '@/contexts/AuthContext';
import { ApiError } from '@/services/http';

interface UseDeleteAccountReturn {
  deleteAccount: (keyword: string) => Promise<void>;
  isDeleting: boolean;
  error: Error | null;
}

export const useDeleteAccount = (): UseDeleteAccountReturn => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { signOut } = useAuth();

  const deleteAccount = async (keyword: string): Promise<void> => {
    try {
      setIsDeleting(true);
      setError(null);

      await usersApi.deleteAccount(keyword);

      await signOut();
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      throw apiError;
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteAccount, isDeleting, error };
};
