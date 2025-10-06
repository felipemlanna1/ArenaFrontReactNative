import { useState, useEffect, useCallback } from 'react';
import { sportsService } from '@/services/sports';
import { Sport } from '@/types/sport';
import { UseSportsFilterReturn } from './typesSportsFilter';

interface UseSportsFilterProps {
  selectedSportIds: string[];
  onSportsChange: (sportIds: string[]) => void;
}

export const useSportsFilter = ({
  selectedSportIds,
  onSportsChange,
}: UseSportsFilterProps): UseSportsFilterReturn => {
  const [sports, setSports] = useState<Sport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadSports = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await sportsService.getAllSports();
        setSports(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Erro ao carregar esportes')
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadSports();
  }, []);

  const toggleSport = useCallback(
    (sportId: string) => {
      const newSelected = selectedSportIds.includes(sportId)
        ? selectedSportIds.filter(id => id !== sportId)
        : [...selectedSportIds, sportId];
      onSportsChange(newSelected);
    },
    [selectedSportIds, onSportsChange]
  );

  return {
    sports,
    isLoading,
    error,
    toggleSport,
  };
};
