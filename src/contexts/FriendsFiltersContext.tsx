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

export interface FriendsActiveFilters {
  sportIds?: string[];
  city?: string;
  state?: string;
}

interface Sport {
  id?: string;
  sportId?: string;
}

interface FriendsFiltersContextData {
  activeFilters: FriendsActiveFilters;
  searchTerm: string;
  userCity: string | null;
  userState: string | null;
  isLoadingLocation: boolean;
  isReady: boolean;
  activeFiltersCount: number;
  setActiveFilters: (filters: FriendsActiveFilters) => void;
  updateFilter: <K extends keyof FriendsActiveFilters>(
    key: K,
    value: FriendsActiveFilters[K]
  ) => void;
  toggleSportId: (sportId: string) => void;
  setSearchTerm: (term: string) => void;
  clearFilters: () => void;
  clearCityFilter: () => void;
}

const createInitialFilters = (
  sportIds?: string[],
  city?: string | null,
  state?: string | null
): FriendsActiveFilters => ({
  sportIds: sportIds && sportIds.length > 0 ? sportIds : undefined,
  city: city || undefined,
  state: state || undefined,
});

const DEFAULT_CONTEXT_VALUE: FriendsFiltersContextData = {
  activeFilters: createInitialFilters(),
  searchTerm: '',
  userCity: null,
  userState: null,
  isLoadingLocation: true,
  isReady: false,
  activeFiltersCount: 0,
  setActiveFilters: () => {},
  updateFilter: () => {},
  toggleSportId: () => {},
  setSearchTerm: () => {},
  clearFilters: () => {},
  clearCityFilter: () => {},
};

const FriendsFiltersContext = createContext<FriendsFiltersContextData>(
  DEFAULT_CONTEXT_VALUE
);

export const useFriendsFilters = (): FriendsFiltersContextData => {
  const context = useContext(FriendsFiltersContext);
  if (!context) {
    throw new Error(
      'useFriendsFilters must be used within FriendsFiltersProvider'
    );
  }
  return context;
};

interface FriendsFiltersProviderProps {
  children: ReactNode;
}

export const FriendsFiltersProvider: React.FC<FriendsFiltersProviderProps> = ({
  children,
}) => {
  const { userSports, isLoading: authLoading } = useAuth();
  const location = useExploreLocation();

  const hasLoadedFirstTimeRef = useRef(false);
  const previousCityRef = useRef<string | null | undefined>(location.userCity);
  const hasSportsAppliedRef = useRef(false);

  const favoritesSportIds = useMemo(() => {
    return userSports
      .map((sport: Sport) => sport.sportId || sport.id)
      .filter((id): id is string => !!id);
  }, [userSports]);

  const [activeFilters, setActiveFilters] = useState<FriendsActiveFilters>(
    createInitialFilters()
  );
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    previousCityRef.current = location.userCity;
  }, [location.userCity]);

  const updateFilter = useCallback(
    <K extends keyof FriendsActiveFilters>(
      key: K,
      value: FriendsActiveFilters[K]
    ) => {
      setActiveFilters(prev => ({ ...prev, [key]: value }));
      if (key === 'sportIds') {
        hasSportsAppliedRef.current = false;
      }
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
    hasSportsAppliedRef.current = false;
  }, []);

  const clearFilters = useCallback(() => {
    setActiveFilters(createInitialFilters());
    setSearchTerm('');
  }, []);

  const clearCityFilter = useCallback(() => {
    setActiveFilters(prev => ({ ...prev, city: undefined, state: undefined }));
  }, []);

  const activeFiltersCount = useMemo(() => {
    let count = 0;

    if (activeFilters.sportIds && activeFilters.sportIds.length > 0) count++;
    if (activeFilters.city || activeFilters.state) count++;

    return count;
  }, [activeFilters]);

  const isReady =
    !location.isLoadingLocation &&
    (hasLoadedFirstTimeRef.current || !!location.userCity);

  const value: FriendsFiltersContextData = {
    activeFilters,
    searchTerm,
    userCity: location.userCity,
    userState: location.userState,
    isLoadingLocation: location.isLoadingLocation,
    isReady,
    activeFiltersCount,
    setActiveFilters,
    updateFilter,
    toggleSportId,
    setSearchTerm,
    clearFilters,
    clearCityFilter,
  };

  return (
    <FriendsFiltersContext.Provider value={value}>
      {children}
    </FriendsFiltersContext.Provider>
  );
};
