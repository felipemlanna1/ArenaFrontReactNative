import { useState, useCallback, useEffect, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { friendshipsApi } from '@/services/friendships';
import { FriendshipStatus } from '@/services/friendships/typesFriendships';
import { UseFriendsScreenReturn } from './typesFriendsScreen';
import { UserData } from '@/services/http';

export const useFriendsScreen = (navigation: any): UseFriendsScreenReturn => {
  const { signOut } = useAuth();

  const [friends, setFriends] = useState<UserData[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<UserData[]>([]);
  const [outgoingRequests, setOutgoingRequests] = useState<UserData[]>([]);
  const [allRecommendations, setAllRecommendations] = useState<UserData[]>([]);
  // Internal map to track friendshipId for each request userId
  const [requestsMap, setRequestsMap] = useState<Map<string, string>>(new Map());
  const [outgoingMap, setOutgoingMap] = useState<Map<string, string>>(new Map());

  const [isLoadingFriends, setIsLoadingFriends] = useState(true);
  const [isLoadingRequests, setIsLoadingRequests] = useState(true);
  const [isLoadingOutgoing, setIsLoadingOutgoing] = useState(true);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedSportId, setSelectedSportId] = useState<string | undefined>(
    undefined
  );

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchFriends = useCallback(async () => {
    try {
      setIsLoadingFriends(true);
      const response = await friendshipsApi.getFriends({
        status: FriendshipStatus.ACCEPTED,
        query: debouncedSearchQuery || undefined,
        city: selectedCity || undefined,
        state: selectedState || undefined,
        sportId: selectedSportId,
      });
      setFriends(response.data);
    } catch (error) {
      console.error('Failed to fetch friends:', error);
      setFriends([]);
    } finally {
      setIsLoadingFriends(false);
    }
  }, [debouncedSearchQuery, selectedCity, selectedState, selectedSportId]);

  const fetchIncomingRequests = useCallback(async () => {
    try {
      setIsLoadingRequests(true);
      const friendships = await friendshipsApi.getIncomingRequests();
      // Extract requester user data from each friendship (we are the addressee)
      const users = friendships
        .map(f => f.requester)
        .filter((user): user is UserData => user !== undefined);
      // Build map of userId -> friendshipId for later use
      const newMap = new Map<string, string>();
      friendships.forEach(f => {
        if (f.requester?.id) {
          newMap.set(f.requester.id, f.id);
        }
      });
      setRequestsMap(newMap);
      setIncomingRequests(users);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
      setIncomingRequests([]);
      setRequestsMap(new Map());
    } finally {
      setIsLoadingRequests(false);
    }
  }, []);

  const fetchOutgoingRequests = useCallback(async () => {
    try {
      setIsLoadingOutgoing(true);
      const friendships = await friendshipsApi.getOutgoingRequests();
      // Extract addressee user data from each friendship (we are the requester)
      const users = friendships
        .map(f => f.addressee)
        .filter((user): user is UserData => user !== undefined);
      // Build map of userId -> friendshipId for cancel action
      const newMap = new Map<string, string>();
      friendships.forEach(f => {
        if (f.addressee?.id) {
          newMap.set(f.addressee.id, f.id);
        }
      });
      setOutgoingMap(newMap);
      setOutgoingRequests(users);
    } catch (error) {
      console.error('Failed to fetch outgoing requests:', error);
      setOutgoingRequests([]);
      setOutgoingMap(new Map());
    } finally {
      setIsLoadingOutgoing(false);
    }
  }, []);

  const fetchRecommendations = useCallback(async () => {
    try {
      setIsLoadingRecommendations(true);
      const users = await friendshipsApi.getRecommendations(50);
      setAllRecommendations(users);
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
      setAllRecommendations([]);
    } finally {
      setIsLoadingRecommendations(false);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      fetchFriends(),
      fetchIncomingRequests(),
      fetchOutgoingRequests(),
      fetchRecommendations(),
    ]);
    setRefreshing(false);
  }, [fetchFriends, fetchIncomingRequests, fetchOutgoingRequests, fetchRecommendations]);

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
        const friendshipId = requestsMap.get(userId);
        if (friendshipId) {
          await friendshipsApi.acceptFriendRequest(friendshipId);
          setIncomingRequests(prev => prev.filter(r => r.id !== userId));
          setRequestsMap(prev => {
            const newMap = new Map(prev);
            newMap.delete(userId);
            return newMap;
          });
          await fetchFriends();
        }
      } catch (error) {
        console.error('Failed to accept request:', error);
      } finally {
        setLoadingUserId(null);
      }
    },
    [requestsMap, fetchFriends]
  );

  const handleRejectRequest = useCallback(
    async (userId: string) => {
      try {
        setLoadingUserId(userId);
        const friendshipId = requestsMap.get(userId);
        if (friendshipId) {
          await friendshipsApi.rejectFriendRequest(friendshipId);
          setIncomingRequests(prev => prev.filter(r => r.id !== userId));
          setRequestsMap(prev => {
            const newMap = new Map(prev);
            newMap.delete(userId);
            return newMap;
          });
        }
      } catch (error) {
        console.error('Failed to reject request:', error);
      } finally {
        setLoadingUserId(null);
      }
    },
    [requestsMap]
  );

  const handleCancelRequest = useCallback(
    async (userId: string) => {
      try {
        setLoadingUserId(userId);
        const friendshipId = outgoingMap.get(userId);
        if (friendshipId) {
          await friendshipsApi.cancelFriendRequest(friendshipId);
          setOutgoingRequests(prev => prev.filter(r => r.id !== userId));
          setOutgoingMap(prev => {
            const newMap = new Map(prev);
            newMap.delete(userId);
            return newMap;
          });
        }
      } catch (error) {
        console.error('Failed to cancel request:', error);
      } finally {
        setLoadingUserId(null);
      }
    },
    [outgoingMap]
  );

  const handleSendRequest = useCallback(async (userId: string) => {
    try {
      setLoadingUserId(userId);
      await friendshipsApi.sendFriendRequest({ addresseeId: userId });
      setAllRecommendations((prev: UserData[]) =>
        prev.filter((r: UserData) => r.id !== userId)
      );
    } catch (error) {
      console.error('Failed to send request:', error);
    } finally {
      setLoadingUserId(null);
    }
  }, []);

  const handleNavigateToProfile = useCallback(
    (userId: string) => {
      navigation.navigate('Profile', { userId });
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

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCity('');
    setSelectedState('');
    setSelectedSportId(undefined);
  }, []);

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCity !== '' ||
    selectedState !== '' ||
    selectedSportId !== undefined;

  // Filter recommendations client-side
  const recommendations = useMemo(() => {
    let filtered = allRecommendations;

    // Filter by search query
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter((user: UserData) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const username = user.username?.toLowerCase() || '';
        return fullName.includes(query) || username.includes(query);
      });
    }

    // Filter by city
    if (selectedCity) {
      filtered = filtered.filter(
        (user: UserData) => user.city === selectedCity
      );
    }

    // Filter by state
    if (selectedState) {
      filtered = filtered.filter(
        (user: UserData) => user.state === selectedState
      );
    }

    // Filter by sport
    if (selectedSportId) {
      filtered = filtered.filter((user: UserData) =>
        user.sports?.some(sport => sport.sportId === selectedSportId)
      );
    }

    return filtered;
  }, [
    allRecommendations,
    debouncedSearchQuery,
    selectedCity,
    selectedState,
    selectedSportId,
  ]);

  // Initial load
  useEffect(() => {
    fetchIncomingRequests();
    fetchOutgoingRequests();
    fetchRecommendations();
  }, [fetchIncomingRequests, fetchOutgoingRequests, fetchRecommendations]);

  // Refetch friends when filters change
  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  return {
    friends,
    incomingRequests,
    outgoingRequests,
    recommendations,
    isLoadingFriends,
    isLoadingRequests,
    isLoadingOutgoing,
    isLoadingRecommendations,
    refreshing,
    handleRefresh,
    handleRemoveFriend,
    handleAcceptRequest,
    handleRejectRequest,
    handleCancelRequest,
    handleSendRequest,
    handleNavigateToProfile,
    loadingUserId,
    handleLogout,
    // Filters
    searchQuery,
    setSearchQuery,
    selectedCity,
    setSelectedCity,
    selectedState,
    setSelectedState,
    selectedSportId,
    setSelectedSportId,
    handleClearFilters,
    hasActiveFilters,
  };
};
