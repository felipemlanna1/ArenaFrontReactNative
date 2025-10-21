import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { friendshipsApi } from '@/services/friendships';
import { UseFriendsScreenReturn } from './typesFriendsScreen';
import { UserData } from '@/services/http';

export const useFriendsScreen = (navigation: any): UseFriendsScreenReturn => {
  const { signOut } = useAuth();

  const [friends, setFriends] = useState<UserData[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<UserData[]>([]);
  const [recommendations, setRecommendations] = useState<UserData[]>([]);

  const [isLoadingFriends, setIsLoadingFriends] = useState(true);
  const [isLoadingRequests, setIsLoadingRequests] = useState(true);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  const fetchFriends = useCallback(async () => {
    try {
      setIsLoadingFriends(true);
      const response = await friendshipsApi.getFriends({ status: 'ACCEPTED' });
      setFriends(response.data);
    } catch (error) {
      console.error('Failed to fetch friends:', error);
      setFriends([]);
    } finally {
      setIsLoadingFriends(false);
    }
  }, []);

  const fetchIncomingRequests = useCallback(async () => {
    try {
      setIsLoadingRequests(true);
      const response = await friendshipsApi.getIncomingRequests();
      setIncomingRequests(response.data);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
      setIncomingRequests([]);
    } finally {
      setIsLoadingRequests(false);
    }
  }, []);

  const fetchRecommendations = useCallback(async () => {
    try {
      setIsLoadingRecommendations(true);
      const users = await friendshipsApi.getRecommendations(20);
      setRecommendations(users);
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
      setRecommendations([]);
    } finally {
      setIsLoadingRecommendations(false);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      fetchFriends(),
      fetchIncomingRequests(),
      fetchRecommendations(),
    ]);
    setRefreshing(false);
  }, [fetchFriends, fetchIncomingRequests, fetchRecommendations]);

  const handleRemoveFriend = useCallback(
    async (userId: string) => {
      try {
        setLoadingUserId(userId);
        await friendshipsApi.removeFriend(userId);
        setFriends(prev => prev.filter(f => f.id !== userId));
      } catch (error) {
        console.error('Failed to remove friend:', error);
      } finally {
        setLoadingUserId(null);
      }
    },
    []
  );

  const handleAcceptRequest = useCallback(
    async (userId: string) => {
      try {
        setLoadingUserId(userId);
        const friendship = await friendshipsApi.getFriendshipStatus(userId);
        if (friendship) {
          await friendshipsApi.acceptFriendRequest(friendship.id);
          setIncomingRequests(prev => prev.filter(r => r.id !== userId));
          await fetchFriends();
        }
      } catch (error) {
        console.error('Failed to accept request:', error);
      } finally {
        setLoadingUserId(null);
      }
    },
    [fetchFriends]
  );

  const handleRejectRequest = useCallback(async (userId: string) => {
    try {
      setLoadingUserId(userId);
      const friendship = await friendshipsApi.getFriendshipStatus(userId);
      if (friendship) {
        await friendshipsApi.rejectFriendRequest(friendship.id);
        setIncomingRequests(prev => prev.filter(r => r.id !== userId));
      }
    } catch (error) {
      console.error('Failed to reject request:', error);
    } finally {
      setLoadingUserId(null);
    }
  }, []);

  const handleSendRequest = useCallback(async (userId: string) => {
    try {
      setLoadingUserId(userId);
      await friendshipsApi.sendFriendRequest({ addresseeId: userId });
      setRecommendations(prev => prev.filter(r => r.id !== userId));
    } catch (error) {
      console.error('Failed to send request:', error);
    } finally {
      setLoadingUserId(null);
    }
  }, []);

  const handleNavigateToProfile = useCallback(
    (userId: string) => {
      navigation.navigate('UserProfile', { userId });
    },
    [navigation]
  );

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }, [signOut]);

  useEffect(() => {
    fetchFriends();
    fetchIncomingRequests();
    fetchRecommendations();
  }, [fetchFriends, fetchIncomingRequests, fetchRecommendations]);

  return {
    friends,
    incomingRequests,
    recommendations,
    isLoadingFriends,
    isLoadingRequests,
    isLoadingRecommendations,
    refreshing,
    handleRefresh,
    handleRemoveFriend,
    handleAcceptRequest,
    handleRejectRequest,
    handleSendRequest,
    handleNavigateToProfile,
    loadingUserId,
    handleLogout,
  };
};
