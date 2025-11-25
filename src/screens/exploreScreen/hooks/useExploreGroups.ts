import { useState, useCallback, useRef, useEffect } from 'react';
import { Group } from '@/services/groups/typesGroups';
import { groupsApi } from '@/services/groups/groupsApi';
import { useHomeFilters } from '@/contexts/HomeFiltersContext';

interface UseHomeGroupsReturn {
  groups: Group[];
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
  error: Error | null;
  hasMore: boolean;
  currentPage: number;
  loadGroups: () => Promise<void>;
  refreshGroups: () => Promise<void>;
  loadMoreGroups: () => Promise<void>;
}

export const useExploreGroups = (): UseHomeGroupsReturn => {
  const [groups, setGroups] = useState<Group[]>([]);
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

  const loadGroups = useCallback(async () => {
    if (isLoadingRef.current) return;

    try {
      isLoadingRef.current = true;
      setIsLoading(true);
      setError(null);

      // Filtros aplicados à aba GRUPOS:
      // - Busca (search)
      // - Cidade + Estado
      // - Esporte (APENAS 1 - limitação da API, passa o primeiro selecionado)
      // Filtros IGNORADOS: preço, data, skill level, disponibilidade
      const response = await groupsApi.getGroups({
        page: 1,
        limit: 10,
        search: searchTerm || undefined,
        sportId: selectedSports.length > 0 ? selectedSports[0] : undefined,
        city: selectedCity || undefined,
        state: selectedState || undefined,
      });

      setGroups(response.data);
      setCurrentPage(1);
      setHasMore(response.page < response.totalPages);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Erro ao carregar grupos')
      );
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  }, [searchTerm, selectedSports, selectedCity, selectedState]);

  const loadMoreGroups = useCallback(async () => {
    if (isLoadingMore || !hasMore || isLoadingRef.current) return;

    try {
      setIsLoadingMore(true);
      const nextPage = currentPage + 1;

      // Aplicar os mesmos filtros da aba GRUPOS
      const response = await groupsApi.getGroups({
        page: nextPage,
        limit: 10,
        search: searchTerm || undefined,
        sportId: selectedSports.length > 0 ? selectedSports[0] : undefined,
        city: selectedCity || undefined,
        state: selectedState || undefined,
      });

      setGroups(prev => [...prev, ...response.data]);
      setCurrentPage(nextPage);
      setHasMore(response.page < response.totalPages);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Erro ao carregar mais grupos')
      );
    } finally {
      setIsLoadingMore(false);
    }
  }, [currentPage, hasMore, isLoadingMore, searchTerm, selectedSports, selectedCity, selectedState]);

  const refreshGroups = useCallback(async () => {
    if (isLoadingRef.current) return;

    try {
      isLoadingRef.current = true;
      setIsRefreshing(true);
      setError(null);

      // Aplicar os mesmos filtros da aba GRUPOS
      const response = await groupsApi.getGroups({
        page: 1,
        limit: 10,
        search: searchTerm || undefined,
        sportId: selectedSports.length > 0 ? selectedSports[0] : undefined,
        city: selectedCity || undefined,
        state: selectedState || undefined,
      });

      setGroups(response.data);
      setCurrentPage(1);
      setHasMore(response.page < response.totalPages);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Erro ao atualizar grupos')
      );
    } finally {
      setIsRefreshing(false);
      isLoadingRef.current = false;
    }
  }, [searchTerm, selectedSports, selectedCity, selectedState]);

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
        loadGroups();
      }, 500);
    } else {
      loadGroups();
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm, selectedSports, selectedCity, selectedState, loadGroups]);

  return {
    groups,
    isLoading,
    isRefreshing,
    isLoadingMore,
    error,
    hasMore,
    currentPage,
    loadGroups,
    refreshGroups,
    loadMoreGroups,
  };
};
