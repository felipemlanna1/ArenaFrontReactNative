import { useSports } from '@/contexts/SportsContext';
import { Sport } from '@/types/sport';

interface UseUserSportsReturn {
  availableSports: Sport[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useUserSports = (): UseUserSportsReturn => {
  const { sports, isLoading, error, refetch } = useSports();

  return {
    availableSports: sports,
    isLoading,
    error: error?.message || null,
    refetch,
  };
};
