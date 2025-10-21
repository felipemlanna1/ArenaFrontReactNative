import { useCallback } from 'react';
import { useSports } from '@/contexts/SportsContext';
import { UseSportsFilterReturn } from './typesSportsFilter';

interface UseSportsFilterProps {
  selectedSportIds: string[];
  onSportsChange: (sportIds: string[]) => void;
}

export const useSportsFilter = ({
  selectedSportIds,
  onSportsChange,
}: UseSportsFilterProps): UseSportsFilterReturn => {
  const { sports, isLoading, error } = useSports();

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
