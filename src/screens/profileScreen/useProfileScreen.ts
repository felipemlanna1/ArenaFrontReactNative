import { useState, useCallback, useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAuth } from '@/contexts/AuthContext';
import { usersApi } from '@/services/users';
import { UserData } from '@/services/http';
import {
  UseProfileScreenParams,
  UseProfileScreenReturn,
} from './typesProfileScreen';

export const useProfileScreen = (
  params?: UseProfileScreenParams
): UseProfileScreenReturn => {
  const navigation = useNavigation();
  const { user: currentUser, signOut } = useAuth();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const targetUserId = params?.userId || currentUser?.id;
  const currentUserId = currentUser?.id || null;
  const isOwnProfile = targetUserId === currentUserId;

  const fetchUserProfile = useCallback(async () => {
    if (!targetUserId) {
      setError(new Error('User ID not found'));
      setIsLoading(false);
      return;
    }

    try {
      setError(null);
      const userData = await usersApi.getUserProfile(targetUserId);
      setUser(userData);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to load profile')
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [targetUserId]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  useFocusEffect(
    useCallback(() => {
      if (isOwnProfile) {
        fetchUserProfile();
      }
    }, [fetchUserProfile, isOwnProfile])
  );

  const refetch = useCallback(async () => {
    setIsRefreshing(true);
    await fetchUserProfile();
  }, [fetchUserProfile]);

  const handleEditPress = useCallback(() => {
    if (!isOwnProfile) return;
    navigation.navigate('EditProfile' as never);
  }, [navigation, isOwnProfile]);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleLogout = useCallback(() => {
    signOut();
  }, [signOut]);

  return {
    user,
    isLoading,
    isRefreshing,
    error,
    isOwnProfile,
    currentUserId,
    refetch,
    handleEditPress,
    handleBackPress,
    handleLogout,
  };
};
