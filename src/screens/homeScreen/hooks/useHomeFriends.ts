import { useState, useCallback, useRef } from 'react';
import { friendsApi } from '@/services/friends/friendsApi';
import { useHomeFilters } from '@/contexts/HomeFiltersContext';

export interface Friend {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  profilePicture?: string;
  city?: string;
  state?: string;
  favoriteSports?: { id: string; name: string }[];
}

interface UseHomeFriendsReturn {
  friends: Friend[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: Error | null;
  loadFriends: () => Promise<void>;
  refreshFriends: () => Promise<void>;
}

export const useHomeFriends = (): UseHomeFriendsReturn => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const isLoadingRef = useRef(false);
  const { activeFilters } = useHomeFilters();
  const selectedCity = activeFilters.city;
  const selectedState = activeFilters.state;

  const loadFriends = useCallback(async () => {
    if (isLoadingRef.current) return;

    try {
      isLoadingRef.current = true;
      setIsLoading(true);
      setError(null);

      const response = await friendsApi.getRecommendations({
        city: selectedCity || undefined,
        state: selectedState || undefined,
        limit: 20,
      });

      setFriends(response);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Erro ao carregar amigos')
      );
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  }, [selectedCity, selectedState]);

  const refreshFriends = useCallback(async () => {
    if (isLoadingRef.current) return;

    try {
      isLoadingRef.current = true;
      setIsRefreshing(true);
      setError(null);

      const response = await friendsApi.getRecommendations({
        city: selectedCity || undefined,
        state: selectedState || undefined,
        limit: 20,
      });

      setFriends(response);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Erro ao atualizar amigos')
      );
    } finally {
      setIsRefreshing(false);
      isLoadingRef.current = false;
    }
  }, [selectedCity, selectedState]);

  return {
    friends,
    isLoading,
    isRefreshing,
    error,
    loadFriends,
    refreshFriends,
  };
};
