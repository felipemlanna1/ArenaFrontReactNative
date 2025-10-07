import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UseProfileScreenReturn } from './typesProfileScreen';

export const useProfileScreen = (): UseProfileScreenReturn => {
  const [isLoading] = useState(false);
  const { signOut } = useAuth();

  const handleLogout = useCallback(() => {
    signOut();
  }, [signOut]);

  return {
    isLoading,
    handleLogout,
  };
};
