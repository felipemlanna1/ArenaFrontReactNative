import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { friendshipsApi } from '@/services/friendships/friendshipsApi';
import { FriendshipType } from '@/services/friendships/typesFriendships';
import { UserData } from '@/services/http';
import { useHomeFilters } from '@/contexts/HomeFiltersContext';

interface UseHomeFriendsReturn {
  friends: UserData[];
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  currentPage: number;
  error: Error | null;
  loadFriends: () => Promise<void>;
  refreshFriends: () => Promise<void>;
  loadMoreFriends: () => Promise<void>;
}

export const useExploreFriends = (): UseHomeFriendsReturn => {
  const [friends, setFriends] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const isLoadingRef = useRef(false);

  const { searchTerm, friendsFilters } = useHomeFilters();
  const selectedSports = useMemo(
    () => friendsFilters.sportIds || [],
    [friendsFilters.sportIds]
  );
  const selectedCity = friendsFilters.city;
  const selectedState = friendsFilters.state;

  const loadFriends = useCallback(async () => {
    if (isLoadingRef.current) return;

    try {
      isLoadingRef.current = true;
      setIsLoading(true);
      setError(null);

      const response = await friendshipsApi.getUsers(
        FriendshipType.RECOMMENDATIONS,
        {
          query: searchTerm || undefined,
          city: selectedCity || undefined,
          state: selectedState || undefined,
          sportId: selectedSports.length > 0 ? selectedSports[0] : undefined,
        },
        1,
        20
      );

      setFriends(response.data);
      setCurrentPage(1);
      setHasMore(response.hasMore);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Erro ao carregar amigos')
      );
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  }, [selectedCity, selectedState, selectedSports, searchTerm]);

  const loadMoreFriends = useCallback(async () => {
    if (isLoadingMore || !hasMore || isLoadingRef.current) return;

    try {
      setIsLoadingMore(true);
      const nextPage = currentPage + 1;

      const response = await friendshipsApi.getUsers(
        FriendshipType.RECOMMENDATIONS,
        {
          query: searchTerm || undefined,
          city: selectedCity || undefined,
          state: selectedState || undefined,
          sportId: selectedSports.length > 0 ? selectedSports[0] : undefined,
        },
        nextPage,
        20
      );

      setFriends(prev => [...prev, ...response.data]);
      setCurrentPage(nextPage);
      setHasMore(response.hasMore);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Erro ao carregar mais amigos')
      );
    } finally {
      setIsLoadingMore(false);
    }
  }, [
    currentPage,
    hasMore,
    isLoadingMore,
    selectedCity,
    selectedState,
    selectedSports,
    searchTerm,
  ]);

  const refreshFriends = useCallback(async () => {
    if (isLoadingRef.current) return;

    try {
      isLoadingRef.current = true;
      setIsRefreshing(true);
      setError(null);

      const response = await friendshipsApi.getUsers(
        FriendshipType.RECOMMENDATIONS,
        {
          query: searchTerm || undefined,
          city: selectedCity || undefined,
          state: selectedState || undefined,
          sportId: selectedSports.length > 0 ? selectedSports[0] : undefined,
        },
        1,
        20
      );

      setFriends(response.data);
      setCurrentPage(1);
      setHasMore(response.hasMore);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Erro ao atualizar amigos')
      );
    } finally {
      setIsRefreshing(false);
      isLoadingRef.current = false;
    }
  }, [selectedCity, selectedState, selectedSports, searchTerm]);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        loadFriends();
      },
      searchTerm ? 500 : 0
    );

    return () => clearTimeout(timeout);
  }, [searchTerm, selectedSports, selectedCity, selectedState, loadFriends]);

  useFocusEffect(
    useCallback(() => {
      refreshFriends();
    }, [refreshFriends])
  );

  return {
    friends,
    isLoading,
    isRefreshing,
    isLoadingMore,
    hasMore,
    currentPage,
    error,
    loadFriends,
    refreshFriends,
    loadMoreFriends,
  };
};
