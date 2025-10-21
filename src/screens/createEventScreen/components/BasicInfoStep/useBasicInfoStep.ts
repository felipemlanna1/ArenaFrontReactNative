import { useState } from 'react';
import { useSports } from '@/contexts/SportsContext';
import { Sport } from '@/types/sport';

interface UseBasicInfoStepReturn {
  sports: Sport[];
  isLoadingSports: boolean;
  sportsError: string | null;
  showDescriptionField: boolean;
  setShowDescriptionField: (show: boolean) => void;
}

export const useBasicInfoStep = (): UseBasicInfoStepReturn => {
  const { sports, isLoading, error } = useSports();
  const [showDescriptionField, setShowDescriptionField] = useState(false);

  return {
    sports,
    isLoadingSports: isLoading,
    sportsError: error?.message || null,
    showDescriptionField,
    setShowDescriptionField,
  };
};
