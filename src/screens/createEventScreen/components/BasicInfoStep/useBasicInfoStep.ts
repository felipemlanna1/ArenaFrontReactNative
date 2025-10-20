import { useState, useEffect } from 'react';
import { sportsService } from '@/services/sports';
import { Sport } from '@/types/sport';

interface UseBasicInfoStepReturn {
  sports: Sport[];
  isLoadingSports: boolean;
  sportsError: string | null;
  showDescriptionField: boolean;
  setShowDescriptionField: (show: boolean) => void;
}

export const useBasicInfoStep = (): UseBasicInfoStepReturn => {
  const [sports, setSports] = useState<Sport[]>([]);
  const [isLoadingSports, setIsLoadingSports] = useState(true);
  const [sportsError, setSportsError] = useState<string | null>(null);
  const [showDescriptionField, setShowDescriptionField] = useState(false);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        setIsLoadingSports(true);
        setSportsError(null);
        const allSports = await sportsService.getAllSports();
        setSports(allSports);
      } catch {
        setSportsError('Erro ao carregar esportes');
      } finally {
        setIsLoadingSports(false);
      }
    };

    fetchSports();
  }, []);

  return {
    sports,
    isLoadingSports,
    sportsError,
    showDescriptionField,
    setShowDescriptionField,
  };
};
