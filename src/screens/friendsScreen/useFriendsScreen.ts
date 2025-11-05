import { useState, useCallback, useEffect } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { useAuth } from '@/contexts/AuthContext';
import { friendshipsApi } from '@/services/friendships';
import { FriendshipType } from '@/services/friendships/typesFriendships';
import { UseFriendsScreenReturn } from './typesFriendsScreen';
import { UserData } from '@/services/http';

export const useFriendsScreen = (
  navigation: NavigationProp<Record<string, object | undefined>>
): UseFriendsScreenReturn => {
  const { signOut } = useAuth();

  const [friends, setFriends] = useState<UserData[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<UserData[]>([]);
  const [outgoingRequests, setOutgoingRequests] = useState<UserData[]>([]);
  const [recommendations, setRecommendations] = useState<UserData[]>([]);
  const [requestsMap, setRequestsMap] = useState<Map<string, string>>(
    new Map()
  );
  const [outgoingMap, setOutgoingMap] = useState<Map<string, string>>(
    new Map()
  );

  const [isLoadingFriends, setIsLoadingFriends] = useState(true);
  const [isLoadingRequests, setIsLoadingRequests] = useState(true);
  const [isLoadingOutgoing, setIsLoadingOutgoing] = useState(true);
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  const [friendsPage, setFriendsPage] = useState(1);
  const [incomingPage, setIncomingPage] = useState(1);
  const [outgoingPage, setOutgoingPage] = useState(1);
  const [recommendationsPage, setRecommendationsPage] = useState(1);

  const [hasMoreFriends, setHasMoreFriends] = useState(false);
  const [hasMoreIncoming, setHasMoreIncoming] = useState(false);
  const [hasMoreOutgoing, setHasMoreOutgoing] = useState(false);
  const [hasMoreRecommendations, setHasMoreRecommendations] = useState(false);

  const [isLoadingMoreFriends, setIsLoadingMoreFriends] = useState(false);
  const [isLoadingMoreIncoming, setIsLoadingMoreIncoming] = useState(false);
  const [isLoadingMoreOutgoing, setIsLoadingMoreOutgoing] = useState(false);
  const [isLoadingMoreRecommendations, setIsLoadingMoreRecommendations] =
    useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedSportId, setSelectedSportId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchFriends = useCallback(
    async (page: number = 1) => {
      try {
        if (page === 1) {
          setIsLoadingFriends(true);
          setFriendsPage(1);
        } else {
          setIsLoadingMoreFriends(true);
        }

        const response = await friendshipsApi.getUsers(
          FriendshipType.FRIENDS,
          {
            query: debouncedSearchQuery || undefined,
            city: selectedCity || undefined,
            state: selectedState || undefined,
            sportId: selectedSportId,
          },
          page,
          20
        );

        if (page === 1) {
          setFriends(response.data);
        } else {
          setFriends(prev => [...prev, ...response.data]);
        }

        setFriendsPage(page);
        setHasMoreFriends(response.hasMore);
      } catch {
        if (page === 1) {
          setFriends([]);
        }
      } finally {
        setIsLoadingFriends(false);
        setIsLoadingMoreFriends(false);
      }
    },
    [debouncedSearchQuery, selectedCity, selectedState, selectedSportId]
  );

  const fetchIncomingRequests = useCallback(
    async (page: number = 1) => {
      try {
        if (page === 1) {
          setIsLoadingRequests(true);
          setIncomingPage(1);
        } else {
          setIsLoadingMoreIncoming(true);
        }

        const response = await friendshipsApi.getUsers(
          FriendshipType.INCOMING,
          {
            query: debouncedSearchQuery || undefined,
            city: selectedCity || undefined,
            state: selectedState || undefined,
            sportId: selectedSportId,
          },
          page,
          20
        );

        if (page === 1) {
          const friendships = await friendshipsApi.getIncomingRequests();
          const newMap = new Map<string, string>();
          friendships.forEach(f => {
            if (f.requester?.id) {
              newMap.set(f.requester.id, f.id);
            }
          });
          setRequestsMap(newMap);
          setIncomingRequests(response.data);
        } else {
          setIncomingRequests(prev => [...prev, ...response.data]);
        }

        setIncomingPage(page);
        setHasMoreIncoming(response.hasMore);
      } catch {
        if (page === 1) {
          setIncomingRequests([]);
          setRequestsMap(new Map());
        }
      } finally {
        setIsLoadingRequests(false);
        setIsLoadingMoreIncoming(false);
      }
    },
    [debouncedSearchQuery, selectedCity, selectedState, selectedSportId]
  );

  const fetchOutgoingRequests = useCallback(async (page: number = 1) => {
    try {
      if (page === 1) {
        setIsLoadingOutgoing(true);
        setOutgoingPage(1);
      } else {
        setIsLoadingMoreOutgoing(true);
      }

      const response = await friendshipsApi.getUsers(
        FriendshipType.OUTGOING,
        {},
        page,
        20
      );

      if (page === 1) {
        const friendships = await friendshipsApi.getOutgoingRequests();
        const newMap = new Map<string, string>();
        friendships.forEach(f => {
          if (f.addressee?.id) {
            newMap.set(f.addressee.id, f.id);
          }
        });
        setOutgoingMap(newMap);
        setOutgoingRequests(response.data);
      } else {
        setOutgoingRequests(prev => [...prev, ...response.data]);
      }

      setOutgoingPage(page);
      setHasMoreOutgoing(response.hasMore);
    } catch {
      if (page === 1) {
        setOutgoingRequests([]);
        setOutgoingMap(new Map());
      }
    } finally {
      setIsLoadingOutgoing(false);
      setIsLoadingMoreOutgoing(false);
    }
  }, []);

  const fetchRecommendations = useCallback(
    async (page: number = 1) => {
      try {
        if (page === 1) {
          setIsLoadingRecommendations(true);
          setRecommendationsPage(1);
        } else {
          setIsLoadingMoreRecommendations(true);
        }

        const response = await friendshipsApi.getUsers(
          FriendshipType.RECOMMENDATIONS,
          {
            query: debouncedSearchQuery || undefined,
            city: selectedCity || undefined,
            state: selectedState || undefined,
            sportId: selectedSportId,
          },
          page,
          20
        );

        if (page === 1) {
          setRecommendations(response.data);
        } else {
          setRecommendations(prev => [...prev, ...response.data]);
        }

        setRecommendationsPage(page);
        setHasMoreRecommendations(response.hasMore);
      } catch {
        if (page === 1) {
          setRecommendations([]);
        }
      } finally {
        setIsLoadingRecommendations(false);
        setIsLoadingMoreRecommendations(false);
      }
    },
    [debouncedSearchQuery, selectedCity, selectedState, selectedSportId]
  );

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      fetchFriends(),
      fetchIncomingRequests(),
      fetchOutgoingRequests(),
      fetchRecommendations(),
    ]);
    setRefreshing(false);
  }, [
    fetchFriends,
    fetchIncomingRequests,
    fetchOutgoingRequests,
    fetchRecommendations,
  ]);

  const handleRemoveFriend = useCallback(async (userId: string) => {
    try {
      setLoadingUserId(userId);
      await friendshipsApi.removeFriend(userId);
      setFriends(prev => prev.filter(f => f.id !== userId));
    } catch {
      void 0;
    } finally {
      setLoadingUserId(null);
    }
  }, []);

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
      } catch {
        void 0;
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
      } catch {
        void 0;
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
      } catch {
        void 0;
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
      setRecommendations((prev: UserData[]) =>
        prev.filter((r: UserData) => r.id !== userId)
      );
      // Refetch outgoing requests to show the new request
      await fetchOutgoingRequests(1);
    } catch {
      void 0;
    } finally {
      setLoadingUserId(null);
    }
  }, [fetchOutgoingRequests]);

  const handleNavigateToProfile = useCallback(
    (userId: string) => {
      navigation.navigate('Profile', { userId });
    },
    [navigation]
  );

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
    } catch {
      void 0;
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

  const handleLoadMoreFriends = useCallback(() => {
    if (!isLoadingMoreFriends && hasMoreFriends) {
      fetchFriends(friendsPage + 1);
    }
  }, [isLoadingMoreFriends, hasMoreFriends, friendsPage, fetchFriends]);

  const handleLoadMoreIncoming = useCallback(() => {
    if (!isLoadingMoreIncoming && hasMoreIncoming) {
      fetchIncomingRequests(incomingPage + 1);
    }
  }, [
    isLoadingMoreIncoming,
    hasMoreIncoming,
    incomingPage,
    fetchIncomingRequests,
  ]);

  const handleLoadMoreOutgoing = useCallback(() => {
    if (!isLoadingMoreOutgoing && hasMoreOutgoing) {
      fetchOutgoingRequests(outgoingPage + 1);
    }
  }, [
    isLoadingMoreOutgoing,
    hasMoreOutgoing,
    outgoingPage,
    fetchOutgoingRequests,
  ]);

  const handleLoadMoreRecommendations = useCallback(() => {
    if (!isLoadingMoreRecommendations && hasMoreRecommendations) {
      fetchRecommendations(recommendationsPage + 1);
    }
  }, [
    isLoadingMoreRecommendations,
    hasMoreRecommendations,
    recommendationsPage,
    fetchRecommendations,
  ]);

  useEffect(() => {
    fetchIncomingRequests();
    fetchOutgoingRequests();
  }, [fetchIncomingRequests, fetchOutgoingRequests]);

  useEffect(() => {
    fetchFriends();
    fetchRecommendations();
  }, [fetchFriends, fetchRecommendations]);

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
    hasMoreFriends,
    hasMoreIncoming,
    hasMoreOutgoing,
    hasMoreRecommendations,
    isLoadingMoreFriends,
    isLoadingMoreIncoming,
    isLoadingMoreOutgoing,
    isLoadingMoreRecommendations,
    handleLoadMoreFriends,
    handleLoadMoreIncoming,
    handleLoadMoreOutgoing,
    handleLoadMoreRecommendations,
  };
};
