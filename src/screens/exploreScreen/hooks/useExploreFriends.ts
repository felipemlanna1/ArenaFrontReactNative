import { useState, useCallback, useRef, useEffect } from 'react';
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
  const selectedSports = friendsFilters.sportIds || [];
  const selectedCity = friendsFilters.city;
  const selectedState = friendsFilters.state;

  const loadFriends = useCallback(async () => {
    if (isLoadingRef.current) return;

    try {
      isLoadingRef.current = true;
      setIsLoading(true);
      setError(null);

      // Filtros aplicados à aba AMIGOS (via API):
      // - query (busca por nome/username - enviado ao backend)
      // - Cidade + Estado
      // - sportId (apenas primeiro esporte da lista)
      // - Apenas perfis públicos (backend filtra automaticamente)
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

      // Buscar próxima página
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
  }, [currentPage, hasMore, isLoadingMore, selectedCity, selectedState, selectedSports, searchTerm]);

  const refreshFriends = useCallback(async () => {
    if (isLoadingRef.current) return;

    try {
      isLoadingRef.current = true;
      setIsRefreshing(true);
      setError(null);

      // Resetar para primeira página
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

  // Carregar amigos quando filtros mudarem (incluindo primeira montagem)
  // Debounce de 500ms para busca (query enviada ao backend)
  useEffect(() => {
    const timeout = setTimeout(() => {
      loadFriends();
    }, searchTerm ? 500 : 0);

    return () => clearTimeout(timeout);
  }, [searchTerm, selectedSports, selectedCity, selectedState, loadFriends]);

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
