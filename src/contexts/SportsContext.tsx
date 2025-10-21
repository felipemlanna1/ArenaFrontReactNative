import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { Sport } from '@/types/sport';
import { getSports } from '@/services/sports';

interface SportsContextValue {
  sports: Sport[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  getSportById: (id: string) => Sport | undefined;
  getSportsByIds: (ids: string[]) => Sport[];
}

const SportsContext = createContext<SportsContextValue | undefined>(undefined);

export const useSports = (): SportsContextValue => {
  const context = useContext(SportsContext);
  if (!context) {
    throw new Error('useSports must be used within a SportsProvider');
  }
  return context;
};

interface SportsProviderProps {
  children: React.ReactNode;
}

export const SportsProvider: React.FC<SportsProviderProps> = ({ children }) => {
  const [sports, setSports] = useState<Sport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSports = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getSports();
      const sortedSports = data.sort(
        (a, b) => (b.popularity || 0) - (a.popularity || 0)
      );
      setSports(sortedSports);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load sports'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSports();
  }, [fetchSports]);

  const getSportById = useCallback(
    (id: string): Sport | undefined => {
      return sports.find(sport => sport.id === id);
    },
    [sports]
  );

  const getSportsByIds = useCallback(
    (ids: string[]): Sport[] => {
      return sports.filter(sport => ids.includes(sport.id));
    },
    [sports]
  );

  const value = useMemo(
    () => ({
      sports,
      isLoading,
      error,
      refetch: fetchSports,
      getSportById,
      getSportsByIds,
    }),
    [sports, isLoading, error, fetchSports, getSportById, getSportsByIds]
  );

  return (
    <SportsContext.Provider value={value}>{children}</SportsContext.Provider>
  );
};
