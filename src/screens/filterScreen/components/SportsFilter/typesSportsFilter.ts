import { Sport } from '@/types/sport';

export interface SportsFilterProps {
  selectedSportIds: string[];
  onSportsChange: (sportIds: string[]) => void;
  testID?: string;
}

export interface UseSportsFilterReturn {
  sports: Sport[];
  isLoading: boolean;
  error: Error | null;
  toggleSport: (sportId: string) => void;
}
