import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAuth } from '@/contexts/AuthContext';
import { usersApi } from '@/services/users';
import { friendshipsApi } from '@/services/friendships';
import { UserData } from '@/services/http';
import { FriendshipStatus } from '@/services/friendships/typesFriendships';
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
  const [friendshipStatus, setFriendshipStatus] =
    useState<FriendshipStatus | null>(null);

  const targetUserId = params?.userId || currentUser?.id;
  const currentUserId = currentUser?.id || null;
  const isOwnProfile = targetUserId === currentUserId;

  const fetchFriendshipStatus = useCallback(async () => {
    if (!targetUserId || isOwnProfile) {
      setFriendshipStatus(null);
      return;
    }

    try {
      const { status } = await friendshipsApi.getFriendshipStatus(targetUserId);
      setFriendshipStatus(status as FriendshipStatus);
    } catch {
      setFriendshipStatus(null);
    }
  }, [targetUserId, isOwnProfile]);

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
    fetchFriendshipStatus();
  }, [fetchUserProfile, fetchFriendshipStatus]);

  useFocusEffect(
    useCallback(() => {
      if (isOwnProfile) {
        fetchUserProfile();
      } else {
        fetchFriendshipStatus();
      }
    }, [fetchUserProfile, fetchFriendshipStatus, isOwnProfile])
  );

  const canViewFullProfile = useMemo(() => {
    if (isOwnProfile) return true;
    if (!user?.isProfilePrivate) return true;
    if (friendshipStatus === FriendshipStatus.ACCEPTED) return true;
    return false;
  }, [isOwnProfile, user?.isProfilePrivate, friendshipStatus]);

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

  const handleSendFriendRequest = useCallback(async () => {
    if (!targetUserId) return;

    try {
      await friendshipsApi.sendFriendRequest({ addresseeId: targetUserId });
      setFriendshipStatus(FriendshipStatus.PENDING);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to send friend request')
      );
    }
  }, [targetUserId]);

  return {
    user,
    userId: targetUserId,
    isLoading,
    isRefreshing,
    error,
    isOwnProfile,
    currentUserId,
    friendshipStatus,
    canViewFullProfile,
    refetch,
    handleEditPress,
    handleBackPress,
    handleLogout,
    handleSendFriendRequest,
  };
};
