import { useState, useCallback } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { useAuth } from '@/contexts/AuthContext';
import { RootStackParamList } from '@/navigation/typesNavigation';

interface UseHomeScreenReturn {
  handleLogout: () => Promise<void>;
  isLoggingOut: boolean;
}

export const useHomeScreen = (
  navigation: NavigationProp<RootStackParamList>
): UseHomeScreenReturn => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { signOut } = useAuth();

  const handleLogout = useCallback(async () => {
    try {
      setIsLoggingOut(true);

      await signOut();

      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    } catch (err) {
      setIsLoggingOut(false);
    }
  }, [navigation, signOut]);

  return {
    handleLogout,
    isLoggingOut,
  };
};
