import { useState, useCallback, useRef, useEffect } from 'react';
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
  isProfilePublic?: boolean;
}

interface UseHomeFriendsReturn {
  friends: Friend[];
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
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const isLoadingRef = useRef(false);
  const isInitializedRef = useRef(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { searchTerm, activeFilters } = useHomeFilters();
  const selectedSports = activeFilters.sportIds || [];
  const selectedCity = activeFilters.city;
  const selectedState = activeFilters.state;

  // Filtro client-side: busca, esportes e perfil público
  // A API não suporta esses filtros, então aplicamos após receber os dados
  const filterFriends = useCallback(
    (allFriends: Friend[]): Friend[] => {
      let filtered = allFriends;

      // Filtro 1: Apenas perfis FECHADOS (NÃO públicos)
      // Assumindo que pessoas sem o campo isProfilePublic definido têm perfil fechado
      filtered = filtered.filter(
        friend => friend.isProfilePublic === false || friend.isProfilePublic === undefined
      );

      // Filtro 2: Busca por nome/username
      if (searchTerm && searchTerm.trim()) {
        const term = searchTerm.toLowerCase().trim();
        filtered = filtered.filter(
          friend =>
            friend.firstName.toLowerCase().includes(term) ||
            friend.lastName.toLowerCase().includes(term) ||
            friend.username.toLowerCase().includes(term)
        );
      }

      // Filtro 3: Esportes favoritos
      if (selectedSports.length > 0) {
        filtered = filtered.filter(friend => {
          if (!friend.favoriteSports || friend.favoriteSports.length === 0) {
            return false;
          }
          // Verifica se o amigo tem pelo menos um dos esportes selecionados
          return friend.favoriteSports.some(sport =>
            selectedSports.includes(sport.id)
          );
        });
      }

      return filtered;
    },
    [searchTerm, selectedSports]
  );

  const loadFriends = useCallback(async () => {
    if (isLoadingRef.current) return;

    try {
      isLoadingRef.current = true;
      setIsLoading(true);
      setError(null);

      // Filtros aplicados à aba AMIGOS:
      // - Cidade + Estado (via API)
      // - Busca (filtro client-side)
      // - Esportes (filtro client-side)
      // - Apenas perfis FECHADOS (filtro client-side)
      // Filtros IGNORADOS: preço, data, skill level, disponibilidade
      const response = await friendsApi.getRecommendations({
        city: selectedCity || undefined,
        state: selectedState || undefined,
        page: 1,
        limit: 20,
      });

      // Aplicar filtros client-side
      const filtered = filterFriends(response);

      setFriends(filtered);
      setCurrentPage(1);
      // Se retornou menos que o limite, não há mais páginas
      setHasMore(response.length >= 20);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Erro ao carregar amigos')
      );
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  }, [selectedCity, selectedState, filterFriends]);

  const loadMoreFriends = useCallback(async () => {
    if (isLoadingMore || !hasMore || isLoadingRef.current) return;

    try {
      setIsLoadingMore(true);
      const nextPage = currentPage + 1;

      // Buscar próxima página
      const response = await friendsApi.getRecommendations({
        city: selectedCity || undefined,
        state: selectedState || undefined,
        page: nextPage,
        limit: 20,
      });

      // Aplicar filtros client-side
      const filtered = filterFriends(response);

      setFriends(prev => [...prev, ...filtered]);
      setCurrentPage(nextPage);
      setHasMore(response.length >= 20);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Erro ao carregar mais amigos')
      );
    } finally {
      setIsLoadingMore(false);
    }
  }, [currentPage, hasMore, isLoadingMore, selectedCity, selectedState, filterFriends]);

  const refreshFriends = useCallback(async () => {
    if (isLoadingRef.current) return;

    try {
      isLoadingRef.current = true;
      setIsRefreshing(true);
      setError(null);

      // Resetar para primeira página
      const response = await friendsApi.getRecommendations({
        city: selectedCity || undefined,
        state: selectedState || undefined,
        page: 1,
        limit: 20,
      });

      // Aplicar filtros client-side
      const filtered = filterFriends(response);

      setFriends(filtered);
      setCurrentPage(1);
      setHasMore(response.length >= 20);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Erro ao atualizar amigos')
      );
    } finally {
      setIsRefreshing(false);
      isLoadingRef.current = false;
    }
  }, [selectedCity, selectedState, filterFriends]);

  // Recarregar quando filtros mudarem
  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      return;
    }

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Debounce de 500ms para busca
    if (searchTerm) {
      searchTimeoutRef.current = setTimeout(() => {
        loadFriends();
      }, 500);
    } else {
      loadFriends();
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
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
