import { useState, useCallback, useEffect, useRef } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { useAuth } from '@/contexts/AuthContext';
import { RootStackParamList } from '@/navigation/typesNavigation';
import { EventsFilter } from '@/services/events/typesEvents';
import { useHomeFilters } from './hooks/useHomeFilters';
import { useHomeLocation } from './hooks/useHomeLocation';
import { useHomeEvents } from './hooks/useHomeEvents';
import { useDeepMemo } from '@/utils/useDeepMemo';

interface UseHomeScreenReturn {
  events: ReturnType<typeof useHomeEvents>['events'];
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
  error: Error | null;
  hasMore: boolean;
  searchTerm: string;
  activeFiltersCount: number;
  currentFilters: EventsFilter;
  handleLogout: () => Promise<void>;
  isLoggingOut: boolean;
  setSearchTerm: (term: string) => void;
  handleSortPress: () => void;
  handleFilterPress: () => void;
  handleApplyFilters: (filters: Partial<EventsFilter>) => void;
  handleApplySort: (
    sortBy: 'date' | 'distance' | 'price' | 'name',
    sortOrder: 'asc' | 'desc'
  ) => void;
  refreshEvents: () => Promise<void>;
  loadMoreEvents: () => Promise<void>;
  handleShare: (eventId: string) => void;
  showSortModal: boolean;
  setShowSortModal: (show: boolean) => void;
  sortBy: 'date' | 'distance' | 'price' | 'name';
  sortOrder: 'asc' | 'desc';
}

export const useHomeScreen = (
  navigation: NavigationProp<RootStackParamList>
): UseHomeScreenReturn => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const { signOut } = useAuth();

  // ⭐ REGRA: Usar hooks modulares
  const filters = useHomeFilters();
  const location = useHomeLocation();

  // ⭐ REGRA: Debounce para searchTerm (500ms)
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const isInitializedRef = useRef(false);

  // Memoizar filtros para estabilizar dependências
  const memoizedApiFilters = useDeepMemo(filters.buildApiFilters());

  const events = useHomeEvents({
    apiFilters: memoizedApiFilters,
  });

  const handleLogout = useCallback(async () => {
    try {
      setIsLoggingOut(true);

      await signOut();

      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    } catch {
      setIsLoggingOut(false);
    }
  }, [navigation, signOut]);

  // ⭐ REGRA: Carregar eventos apenas uma vez na inicialização
  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      events.loadEvents();
    }

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [events]);

  // ⭐ REGRA: Debounce de 500ms para pesquisa
  useEffect(() => {
    if (!isInitializedRef.current) return;

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    searchTimeoutRef.current = setTimeout(() => {
      events.loadEvents();
    }, 500);

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [filters.searchTerm]);

  // ⭐ REGRA: Recarregar quando filtros ou ordenação mudarem
  useEffect(() => {
    if (!isInitializedRef.current) return;

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    events.loadEvents();
  }, [memoizedApiFilters]);

  const handleSortPress = useCallback(() => {
    setShowSortModal(true);
  }, []);

  const handleFilterPress = useCallback(() => {
    navigation.navigate('FilterScreen', {
      currentFilters: filters.buildApiFilters(),
      onApplyFilters: (newFilters: EventsFilter) => {
        filters.setActiveFilters({
          sportIds: newFilters.sportIds,
          city: newFilters.city,
          state: newFilters.state,
          priceMin: newFilters.priceMin,
          priceMax: newFilters.priceMax,
          isFree: newFilters.isFree,
          hasAvailableSpots: newFilters.hasAvailableSpots,
          startDateFrom: newFilters.startDateFrom,
          startDateTo: newFilters.startDateTo,
        });
      },
    });
  }, [navigation, filters]);

  const handleApplyFilters = useCallback(
    (newFilters: Partial<EventsFilter>) => {
      filters.setActiveFilters({
        ...filters.activeFilters,
        ...newFilters,
      });
    },
    [filters]
  );

  const handleApplySort = useCallback(
    (
      sortBy: 'date' | 'distance' | 'price' | 'name',
      sortOrder: 'asc' | 'desc'
    ) => {
      filters.setSortBy(sortBy);
      filters.setSortOrder(sortOrder);
      setShowSortModal(false);
    },
    [filters]
  );

  return {
    events: events.events,
    isLoading: events.isLoading,
    isRefreshing: events.isRefreshing,
    isLoadingMore: events.isLoadingMore,
    error: events.error,
    hasMore: events.hasMore,
    searchTerm: filters.searchTerm,
    activeFiltersCount: filters.activeFiltersCount,
    currentFilters: filters.buildApiFilters(),
    handleLogout,
    isLoggingOut,
    setSearchTerm: filters.setSearchTerm,
    handleSortPress,
    handleFilterPress,
    handleApplyFilters,
    handleApplySort,
    refreshEvents: events.refreshEvents,
    loadMoreEvents: events.loadMoreEvents,
    handleShare: events.handleShare,
    showSortModal,
    setShowSortModal,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  };
};
