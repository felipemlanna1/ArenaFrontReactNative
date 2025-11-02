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
import { useHomeLocation } from '@/screens/homeScreen/hooks/useHomeLocation';
import { EventsFilter } from '@/services/events/typesEvents';
import { FILTER_DEFAULTS } from '@/constants/filterDefaults';

export interface ActiveFilters {
  sportIds?: string[];
  hasAvailableSpots?: boolean;
  city?: string;
  priceMin?: number;
  priceMax?: number;
  isFree?: boolean;
  startDateFrom?: string;
  startDateTo?: string;
  eventFilter?: 'all' | 'organizing' | 'participating' | 'invited';
}

interface Sport {
  id?: string;
  sportId?: string;
}

interface HomeFiltersContextData {
  activeFilters: ActiveFilters;
  sortBy: 'date' | 'distance' | 'price' | 'name';
  sortOrder: 'asc' | 'desc';
  searchTerm: string;
  userCity: string | null;
  isLoadingLocation: boolean;
  isReady: boolean;
  activeFiltersCount: number;
  setActiveFilters: (filters: ActiveFilters) => void;
  updateFilter: <K extends keyof ActiveFilters>(
    key: K,
    value: ActiveFilters[K]
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
  buildApiFilters: () => EventsFilter | null;
}

const createInitialFilters = (
  sportIds?: string[],
  city?: string | null
): ActiveFilters => ({
  hasAvailableSpots: FILTER_DEFAULTS.FILTERS.HAS_AVAILABLE_SPOTS,
  eventFilter: 'all',
  sportIds: sportIds && sportIds.length > 0 ? sportIds : undefined,
});

const DEFAULT_CONTEXT_VALUE: HomeFiltersContextData = {
  activeFilters: createInitialFilters(),
  sortBy: 'date',
  sortOrder: FILTER_DEFAULTS.SORT.DEFAULT_SORT_ORDER,
  searchTerm: '',
  userCity: null,
  isLoadingLocation: true,
  isReady: false,
  activeFiltersCount: 0,
  setActiveFilters: () => {},
  updateFilter: () => {},
  toggleSportId: () => {},
  setEventFilter: () => {},
  setSortBy: () => {},
  setSortOrder: () => {},
  setSearchTerm: () => {},
  clearFilters: () => {},
  clearCityFilter: () => {},
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
  const location = useHomeLocation();

  const initialDateRef = useRef(new Date().toISOString());
  const hasLoadedFirstTimeRef = useRef(false);
  const hasSportsAppliedRef = useRef(false);

  const favoritesSportIds = useMemo(() => {
    return userSports
      .map((sport: Sport) => sport.sportId || sport.id)
      .filter((id): id is string => !!id);
  }, [userSports]);

  const [activeFilters, setActiveFilters] = useState<ActiveFilters>(
    createInitialFilters()
  );
  const [sortBy, setSortBy] = useState<'date' | 'distance' | 'price' | 'name'>(
    'date'
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(
    FILTER_DEFAULTS.SORT.DEFAULT_SORT_ORDER
  );
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!hasSportsAppliedRef.current && favoritesSportIds.length > 0) {
      setActiveFilters(prev => ({
        ...prev,
        sportIds: favoritesSportIds,
      }));
      hasSportsAppliedRef.current = true;
    }
  }, [authLoading, favoritesSportIds]);

  const updateFilter = useCallback(
    <K extends keyof ActiveFilters>(key: K, value: ActiveFilters[K]) => {
      setActiveFilters(prev => ({ ...prev, [key]: value }));
    },
    []
  );

  const toggleSportId = useCallback((sportId: string) => {
    setActiveFilters(prev => {
      const currentSportIds = prev.sportIds || [];
      const newSportIds = currentSportIds.includes(sportId)
        ? currentSportIds.filter(id => id !== sportId)
        : [...currentSportIds, sportId];

      return { ...prev, sportIds: newSportIds };
    });
  }, []);

  const setEventFilter = useCallback(
    (filter: 'all' | 'organizing' | 'participating' | 'invited') => {
      setActiveFilters(prev => ({ ...prev, eventFilter: filter }));
    },
    []
  );

  const clearFilters = useCallback(() => {
    setActiveFilters(createInitialFilters(favoritesSportIds));
    setSortBy('date');
    setSortOrder(FILTER_DEFAULTS.SORT.DEFAULT_SORT_ORDER);
    setSearchTerm('');
  }, [favoritesSportIds]);

  const clearCityFilter = useCallback(() => {
    setActiveFilters(prev => ({ ...prev, city: undefined }));
  }, []);

  const buildApiFilters = useMemo((): EventsFilter | null => {
    if (authLoading) {
      return null;
    }

    if (!hasLoadedFirstTimeRef.current) {
      const hasSports =
        favoritesSportIds.length === 0 ||
        (activeFilters.sportIds && activeFilters.sportIds.length > 0);

      if (!hasSports) {
        return null;
      }

      hasLoadedFirstTimeRef.current = true;
    }

    const filters: EventsFilter = {
      search: searchTerm || undefined,
      sportIds: activeFilters.sportIds,
      startDateFrom: activeFilters.startDateFrom || initialDateRef.current,
      startDateTo: activeFilters.startDateTo,
      status: ['PUBLISHED'] as const,
      priceMin: activeFilters.priceMin,
      priceMax: activeFilters.priceMax,
      isFree: activeFilters.isFree,
      hasAvailableSpots: activeFilters.hasAvailableSpots,
      city: activeFilters.city,
      limit: FILTER_DEFAULTS.PAGINATION.DEFAULT_LIMIT,
      sortBy: (sortBy === 'date'
        ? 'startDate'
        : sortBy) as EventsFilter['sortBy'],
      sortOrder,
      eventFilter: activeFilters.eventFilter,
    };

    return filters;
  }, [
    authLoading,
    searchTerm,
    activeFilters,
    sortBy,
    sortOrder,
    favoritesSportIds,
  ]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;

    if (activeFilters.sportIds && activeFilters.sportIds.length > 0) count++;
    if (activeFilters.city) count++;
    if (
      activeFilters.priceMin !== undefined ||
      activeFilters.priceMax !== undefined ||
      activeFilters.isFree
    ) {
      count++;
    }
    if (activeFilters.startDateFrom || activeFilters.startDateTo) count++;
    if (activeFilters.eventFilter && activeFilters.eventFilter !== 'all')
      count++;

    return count;
  }, [activeFilters]);

  const isReady = hasLoadedFirstTimeRef.current;

  const value: HomeFiltersContextData = {
    activeFilters,
    sortBy,
    sortOrder,
    searchTerm,
    userCity: location.userCity,
    isLoadingLocation: location.isLoadingLocation,
    isReady,
    activeFiltersCount,
    setActiveFilters,
    updateFilter,
    toggleSportId,
    setEventFilter,
    setSortBy,
    setSortOrder,
    setSearchTerm,
    clearFilters,
    clearCityFilter,
    buildApiFilters: () => buildApiFilters,
  };

  return (
    <HomeFiltersContext.Provider value={value}>
      {children}
    </HomeFiltersContext.Provider>
  );
};
