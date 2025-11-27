import { useState, useCallback, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useHomeFilters } from '@/contexts/HomeFiltersContext';
import { EventsFilter } from '@/services/events/typesEvents';
import { useExploreEvents } from './hooks/useExploreEvents';
import { useDeepMemo } from '@/utils/useDeepMemo';
import { useEventActions } from '@/hooks/useEventActions';

interface NavigationLike {
  navigate: (screen: string, params?: unknown) => void;
  reset: (state: unknown) => void;
}

interface UseExploreScreenReturn {
  events: ReturnType<typeof useExploreEvents>['events'];
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
  error: Error | null;
  hasMore: boolean;
  searchTerm: string;
  activeFiltersCount: number;
  currentFilters: EventsFilter | null;
  handleLogout: () => Promise<void>;
  isLoggingOut: boolean;
  setSearchTerm: (term: string) => void;
  handleSortPress: () => void;
  handleFilterPress: () => void;
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
  eventActions: ReturnType<typeof useEventActions>;
}

export const useExploreScreen = (
  navigation: NavigationLike
): UseExploreScreenReturn => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const { signOut } = useAuth();

  const {
    buildApiFilters,
    searchTerm,
    setSearchTerm,
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
    activeFiltersCount,
  } = useHomeFilters();

  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const isInitializedRef = useRef(false);

  const apiFilters = buildApiFilters();
  const memoizedApiFilters = useDeepMemo(apiFilters);

  const events = useExploreEvents({
    apiFilters: memoizedApiFilters,
  });

  const { loadEvents } = events;

  const handleLogout = useCallback(async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
    } catch {
      setIsLoggingOut(false);
    }
  }, [signOut]);

  useEffect(() => {
    if (!memoizedApiFilters) {
      return;
    }

    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
    }

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchTerm) {
      searchTimeoutRef.current = setTimeout(() => {
        loadEvents();
      }, 500);
    } else {
      loadEvents();
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [memoizedApiFilters, searchTerm, loadEvents]);

  const handleSortPress = useCallback(() => {
    setShowSortModal(true);
  }, []);

  const handleFilterPress = useCallback(() => {
    navigation.navigate('FilterScreen', { source: 'home' });
  }, [navigation]);

  const handleApplySort = useCallback(
    (
      newSortBy: 'date' | 'distance' | 'price' | 'name',
      newSortOrder: 'asc' | 'desc'
    ) => {
      setSortBy(newSortBy);
      setSortOrder(newSortOrder);
      setShowSortModal(false);
    },
    [setSortBy, setSortOrder]
  );

  const eventActions = useEventActions(events.refreshEvents);

  return {
    events: events.events,
    isLoading: events.isLoading,
    isRefreshing: events.isRefreshing,
    isLoadingMore: events.isLoadingMore,
    error: events.error,
    hasMore: events.hasMore,
    searchTerm,
    activeFiltersCount,
    currentFilters: memoizedApiFilters,
    handleLogout,
    isLoggingOut,
    setSearchTerm,
    handleSortPress,
    handleFilterPress,
    handleApplySort,
    refreshEvents: events.refreshEvents,
    loadMoreEvents: events.loadMoreEvents,
    handleShare: events.handleShare,
    showSortModal,
    setShowSortModal,
    sortBy,
    sortOrder,
    eventActions,
  };
};
