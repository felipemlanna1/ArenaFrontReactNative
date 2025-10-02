import { useState, useEffect } from 'react';
import { sportsService } from '@/services/sports';
import { Sport } from '@/types/sport';

interface UseUserSportsReturn {
  availableSports: Sport[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useUserSports = (): UseUserSportsReturn => {
  const [availableSports, setAvailableSports] = useState<Sport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSports = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const sports = await sportsService.getAllSports();

      const sortedSports = sports.sort(
        (a, b) => (b.popularity || 0) - (a.popularity || 0)
      );

      setAvailableSports(sortedSports);
    } catch {
      setError('Erro ao carregar esportes. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSports();
  }, []);

  return {
    availableSports,
    isLoading,
    error,
    refetch: fetchSports,
  };
};
