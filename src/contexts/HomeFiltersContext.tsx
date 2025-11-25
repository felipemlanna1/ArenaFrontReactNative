import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  ReactNode,
} from 'react';
import { useAuth } from './AuthContext';
import { useExploreLocation } from '@/screens/exploreScreen/hooks/useExploreLocation';
import { EventsFilter } from '@/services/events/typesEvents';
import { FILTER_DEFAULTS } from '@/constants/filterDefaults';

export type ExploreTab = 'events' | 'groups' | 'friends';

// Base filters compartilhados
interface BaseFilters {
  sportIds?: string[];
  city?: string;
  state?: string;
}

// Event filters (completo - todos os filtros)
export interface EventFilters extends BaseFilters {
  hasAvailableSpots?: boolean;
  priceMin?: number;
  priceMax?: number;
  isFree?: boolean;
  startDateFrom?: string;
  startDateTo?: string;
  eventFilter?: 'all' | 'organizing' | 'participating' | 'invited';
}

// Group filters (limitado - apenas esporte + local)
export interface GroupFilters extends BaseFilters {}

// Friend filters (limitado - apenas esporte + local)
export interface FriendFilters extends BaseFilters {}

// Backward compatibility
export type ActiveFilters = EventFilters;

interface Sport {
  id?: string;
  sportId?: string;
}

interface HomeFiltersContextData {
  // Tab management
  activeTab: ExploreTab;
  setActiveTab: (tab: ExploreTab) => void;

  // Backward compatibility - retorna filtros da tab ativa
  activeFilters: EventFilters | GroupFilters | FriendFilters;
  sortBy: 'date' | 'distance' | 'price' | 'name';
  sortOrder: 'asc' | 'desc';
  searchTerm: string;
  userCity: string | null;
  isLoadingLocation: boolean;
  isReady: boolean;
  activeFiltersCount: number;

  // Tab-specific getters
  eventsFilters: EventFilters;
  groupsFilters: GroupFilters;
  friendsFilters: FriendFilters;

  // Generic setters (operam na tab ativa)
  setActiveFilters: (filters: EventFilters | GroupFilters | FriendFilters) => void;
  updateFilter: <K extends keyof EventFilters>(
    key: K,
    value: EventFilters[K]
  ) => void;
  toggleSportId: (sportId: string) => void;
  setEventFilter: (
    filter: 'all' | 'organizing' | 'participating' | 'invited'
  ) => void;
  setSortBy: (sort: 'date' | 'distance' | 'price' | 'name') => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  setSearchTerm: (term: string) => void;
  clearFilters: () => void;
  clearCityFilter: () => void;

  // Tab-specific setters
  setEventsFilters: (filters: EventFilters) => void;
  setGroupsFilters: (filters: GroupFilters) => void;
  setFriendsFilters: (filters: FriendFilters) => void;

  // API builders
  buildApiFilters: () => EventsFilter | null;
}

const createInitialEventFilters = (
  sportIds?: string[]
): EventFilters => ({
  hasAvailableSpots: FILTER_DEFAULTS.FILTERS.HAS_AVAILABLE_SPOTS,
  eventFilter: 'all',
  sportIds: sportIds && sportIds.length > 0 ? sportIds : undefined,
});

const createInitialGroupFilters = (
  sportIds?: string[]
): GroupFilters => ({
  sportIds: sportIds && sportIds.length > 0 ? sportIds : undefined,
});

const createInitialFriendFilters = (
  sportIds?: string[]
): FriendFilters => ({
  sportIds: sportIds && sportIds.length > 0 ? sportIds : undefined,
});

const DEFAULT_CONTEXT_VALUE: HomeFiltersContextData = {
  activeTab: 'events',
  setActiveTab: () => {},
  activeFilters: createInitialEventFilters(),
  sortBy: 'date',
  sortOrder: FILTER_DEFAULTS.SORT.DEFAULT_SORT_ORDER,
  searchTerm: '',
  userCity: null,
  isLoadingLocation: true,
  isReady: false,
  activeFiltersCount: 0,
  eventsFilters: createInitialEventFilters(),
  groupsFilters: createInitialGroupFilters(),
  friendsFilters: createInitialFriendFilters(),
  setActiveFilters: () => {},
  updateFilter: () => {},
  toggleSportId: () => {},
  setEventFilter: () => {},
  setSortBy: () => {},
  setSortOrder: () => {},
  setSearchTerm: () => {},
  clearFilters: () => {},
  clearCityFilter: () => {},
  setEventsFilters: () => {},
  setGroupsFilters: () => {},
  setFriendsFilters: () => {},
  buildApiFilters: () => null,
};

const HomeFiltersContext = createContext<HomeFiltersContextData>(
  DEFAULT_CONTEXT_VALUE
);

export const useHomeFilters = (): HomeFiltersContextData => {
  const context = useContext(HomeFiltersContext);
  if (!context) {
    throw new Error('useHomeFilters must be used within HomeFiltersProvider');
  }
  return context;
};

interface HomeFiltersProviderProps {
  children: ReactNode;
}

export const HomeFiltersProvider: React.FC<HomeFiltersProviderProps> = ({
  children,
}) => {
  const { userSports, isLoading: authLoading } = useAuth();
  const location = useExploreLocation();

  const initialDateRef = useRef(new Date().toISOString());
  const hasLoadedFirstTimeRef = useRef(false);
  const hasSportsAppliedRef = useRef(false);

  const favoritesSportIds = useMemo(() => {
    return userSports
      .map((sport: Sport) => sport.sportId || sport.id)
      .filter((id): id is string => !!id);
  }, [userSports]);

  // Tab management
  const [activeTab, setActiveTab] = useState<ExploreTab>('events');

  // Separate filter states per tab
  const [eventsFilters, setEventsFilters] = useState<EventFilters>(
    createInitialEventFilters()
  );
  const [groupsFilters, setGroupsFilters] = useState<GroupFilters>(
    createInitialGroupFilters()
  );
  const [friendsFilters, setFriendsFilters] = useState<FriendFilters>(
    createInitialFriendFilters()
  );

  // Shared states
  const [sortBy, setSortBy] = useState<'date' | 'distance' | 'price' | 'name'>(
    'date'
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(
    FILTER_DEFAULTS.SORT.DEFAULT_SORT_ORDER
  );
  const [searchTerm, setSearchTerm] = useState('');

  // Apply favorite sports to all tabs on mount
  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!hasSportsAppliedRef.current && favoritesSportIds.length > 0) {
      setEventsFilters(prev => ({
        ...prev,
        sportIds: favoritesSportIds,
      }));
      setGroupsFilters(prev => ({
        ...prev,
        sportIds: favoritesSportIds,
      }));
      setFriendsFilters(prev => ({
        ...prev,
        sportIds: favoritesSportIds,
      }));
      hasSportsAppliedRef.current = true;
    }
  }, [authLoading, favoritesSportIds]);

  // Computed: activeFilters baseado na tab ativa
  const activeFilters = useMemo(() => {
    switch (activeTab) {
      case 'events':
        return eventsFilters;
      case 'groups':
        return groupsFilters;
      case 'friends':
        return friendsFilters;
      default:
        return eventsFilters;
    }
  }, [activeTab, eventsFilters, groupsFilters, friendsFilters]);

  // Generic setters (operam na tab ativa)
  const setActiveFilters = useCallback(
    (filters: EventFilters | GroupFilters | FriendFilters) => {
      switch (activeTab) {
        case 'events':
          setEventsFilters(filters as EventFilters);
          break;
        case 'groups':
          setGroupsFilters(filters as GroupFilters);
          break;
        case 'friends':
          setFriendsFilters(filters as FriendFilters);
          break;
      }
    },
    [activeTab]
  );

  const updateFilter = useCallback(
    <K extends keyof EventFilters>(key: K, value: EventFilters[K]) => {
      switch (activeTab) {
        case 'events':
          setEventsFilters(prev => ({ ...prev, [key]: value }));
          break;
        case 'groups':
          if (key === 'sportIds' || key === 'city' || key === 'state') {
            setGroupsFilters(prev => ({ ...prev, [key]: value }));
          }
          break;
        case 'friends':
          if (key === 'sportIds' || key === 'city' || key === 'state') {
            setFriendsFilters(prev => ({ ...prev, [key]: value }));
          }
          break;
      }
    },
    [activeTab]
  );

  const toggleSportId = useCallback(
    (sportId: string) => {
      switch (activeTab) {
        case 'events':
          setEventsFilters(prev => {
            const currentSportIds = prev.sportIds || [];
            const newSportIds = currentSportIds.includes(sportId)
              ? currentSportIds.filter(id => id !== sportId)
              : [...currentSportIds, sportId];
            return { ...prev, sportIds: newSportIds };
          });
          break;
        case 'groups':
          setGroupsFilters(prev => {
            const currentSportIds = prev.sportIds || [];
            const newSportIds = currentSportIds.includes(sportId)
              ? currentSportIds.filter(id => id !== sportId)
              : [...currentSportIds, sportId];
            return { ...prev, sportIds: newSportIds };
          });
          break;
        case 'friends':
          setFriendsFilters(prev => {
            const currentSportIds = prev.sportIds || [];
            const newSportIds = currentSportIds.includes(sportId)
              ? currentSportIds.filter(id => id !== sportId)
              : [...currentSportIds, sportId];
            return { ...prev, sportIds: newSportIds };
          });
          break;
      }
    },
    [activeTab]
  );

  const setEventFilter = useCallback(
    (filter: 'all' | 'organizing' | 'participating' | 'invited') => {
      if (activeTab === 'events') {
        setEventsFilters(prev => ({ ...prev, eventFilter: filter }));
      }
    },
    [activeTab]
  );

  const clearFilters = useCallback(() => {
    switch (activeTab) {
      case 'events':
        setEventsFilters(createInitialEventFilters());
        break;
      case 'groups':
        setGroupsFilters(createInitialGroupFilters());
        break;
      case 'friends':
        setFriendsFilters(createInitialFriendFilters());
        break;
    }
    setSortBy('date');
    setSortOrder(FILTER_DEFAULTS.SORT.DEFAULT_SORT_ORDER);
    setSearchTerm('');
  }, [activeTab]);

  const clearCityFilter = useCallback(() => {
    switch (activeTab) {
      case 'events':
        setEventsFilters(prev => ({ ...prev, state: undefined, city: undefined }));
        break;
      case 'groups':
        setGroupsFilters(prev => ({ ...prev, state: undefined, city: undefined }));
        break;
      case 'friends':
        setFriendsFilters(prev => ({ ...prev, state: undefined, city: undefined }));
        break;
    }
  }, [activeTab]);

  const buildApiFilters = useMemo((): EventsFilter | null => {
    if (authLoading) {
      return null;
    }

    if (!hasLoadedFirstTimeRef.current) {
      const hasSports =
        favoritesSportIds.length === 0 ||
        (eventsFilters.sportIds && eventsFilters.sportIds.length > 0);

      if (!hasSports) {
        return null;
      }

      hasLoadedFirstTimeRef.current = true;
    }

    // Only build API filters for events tab
    if (activeTab !== 'events') {
      return null;
    }

    const filters: EventsFilter = {
      search: searchTerm || undefined,
      sportIds: eventsFilters.sportIds,
      startDateFrom: eventsFilters.startDateFrom || initialDateRef.current,
      startDateTo: eventsFilters.startDateTo,
      status: ['PUBLISHED'] as const,
      priceMin: eventsFilters.priceMin,
      priceMax: eventsFilters.priceMax,
      isFree: eventsFilters.isFree,
      hasAvailableSpots: eventsFilters.hasAvailableSpots,
      city: eventsFilters.city,
      limit: FILTER_DEFAULTS.PAGINATION.DEFAULT_LIMIT,
      sortBy: (sortBy === 'date'
        ? 'startDate'
        : sortBy) as EventsFilter['sortBy'],
      sortOrder,
      eventFilter: eventsFilters.eventFilter,
    };

    return filters;
  }, [
    authLoading,
    searchTerm,
    eventsFilters,
    sortBy,
    sortOrder,
    favoritesSportIds,
    activeTab,
  ]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;

    const filters = activeFilters;

    if (filters.sportIds && filters.sportIds.length > 0) count++;
    if (filters.state || filters.city) count++;

    // Event-specific filters
    if (activeTab === 'events') {
      const eventFilters = filters as EventFilters;
      if (
        eventFilters.priceMin !== undefined ||
        eventFilters.priceMax !== undefined ||
        eventFilters.isFree
      ) {
        count++;
      }
      if (eventFilters.startDateFrom || eventFilters.startDateTo) count++;
      if (eventFilters.eventFilter && eventFilters.eventFilter !== 'all') {
        count++;
      }
      if (eventFilters.hasAvailableSpots !== undefined) {
        // Only count if different from default
        if (eventFilters.hasAvailableSpots !== FILTER_DEFAULTS.FILTERS.HAS_AVAILABLE_SPOTS) {
          count++;
        }
      }
    }

    return count;
  }, [activeFilters, activeTab]);

  const isReady = hasLoadedFirstTimeRef.current;

  const value: HomeFiltersContextData = {
    activeTab,
    setActiveTab,
    activeFilters,
    sortBy,
    sortOrder,
    searchTerm,
    userCity: location.userCity,
    isLoadingLocation: location.isLoadingLocation,
    isReady,
    activeFiltersCount,
    eventsFilters,
    groupsFilters,
    friendsFilters,
    setActiveFilters,
    updateFilter,
    toggleSportId,
    setEventFilter,
    setSortBy,
    setSortOrder,
    setSearchTerm,
    clearFilters,
    clearCityFilter,
    setEventsFilters,
    setGroupsFilters,
    setFriendsFilters,
    buildApiFilters: () => buildApiFilters,
  };

  return (
    <HomeFiltersContext.Provider value={value}>
      {children}
    </HomeFiltersContext.Provider>
  );
};
