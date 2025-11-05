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

export interface GroupsActiveFilters {
  sportIds?: string[];
  city?: string;
  state?: string;
}

interface Sport {
  id?: string;
  sportId?: string;
}

interface GroupsFiltersContextData {
  activeFilters: GroupsActiveFilters;
  searchTerm: string;
  userCity: string | null;
  userState: string | null;
  isLoadingLocation: boolean;
  isReady: boolean;
  activeFiltersCount: number;
  setActiveFilters: (filters: GroupsActiveFilters) => void;
  updateFilter: <K extends keyof GroupsActiveFilters>(
    key: K,
    value: GroupsActiveFilters[K]
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
): GroupsActiveFilters => ({
  sportIds: sportIds && sportIds.length > 0 ? sportIds : undefined,
  city: city || undefined,
  state: state || undefined,
});

const DEFAULT_CONTEXT_VALUE: GroupsFiltersContextData = {
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

const GroupsFiltersContext = createContext<GroupsFiltersContextData>(
  DEFAULT_CONTEXT_VALUE
);

export const useGroupsFilters = (): GroupsFiltersContextData => {
  const context = useContext(GroupsFiltersContext);
  if (!context) {
    throw new Error(
      'useGroupsFilters must be used within GroupsFiltersProvider'
    );
  }
  return context;
};

interface GroupsFiltersProviderProps {
  children: ReactNode;
}

export const GroupsFiltersProvider: React.FC<GroupsFiltersProviderProps> = ({
  children,
}) => {
  const { userSports, isLoading: authLoading } = useAuth();
  const location = useHomeLocation();

  const hasLoadedFirstTimeRef = useRef(false);
  const previousCityRef = useRef<string | null | undefined>(location.userCity);
  const hasSportsAppliedRef = useRef(false);

  const favoritesSportIds = useMemo(() => {
    return userSports
      .map((sport: Sport) => sport.sportId || sport.id)
      .filter((id): id is string => !!id);
  }, [userSports]);

  const [activeFilters, setActiveFilters] = useState<GroupsActiveFilters>(
    createInitialFilters()
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

  useEffect(() => {
    if (authLoading) {
      return;
    }

    const cityChanged =
      location.userCity !== previousCityRef.current &&
      location.userCity != null;

    if (cityChanged) {
      setActiveFilters(prev => ({
        ...prev,
        city: location.userCity || undefined,
        state: location.userState || undefined,
      }));
      previousCityRef.current = location.userCity;
    }
  }, [location.userCity, location.userState, authLoading]);

  const updateFilter = useCallback(
    <K extends keyof GroupsActiveFilters>(
      key: K,
      value: GroupsActiveFilters[K]
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
    setActiveFilters(
      createInitialFilters(
        favoritesSportIds,
        location.userCity,
        location.userState
      )
    );
    setSearchTerm('');
  }, [favoritesSportIds, location.userCity, location.userState]);

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

  const value: GroupsFiltersContextData = {
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
    <GroupsFiltersContext.Provider value={value}>
      {children}
    </GroupsFiltersContext.Provider>
  );
};
