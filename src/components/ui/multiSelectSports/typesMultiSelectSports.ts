import { Sport, SkillLevel } from '@/types/sport';

export interface MultiSelectSportsProps {
  sports: Sport[];
  selectedSportIds: string[];
  onToggleSport: (sportId: string) => void;
  sportLevels?: { [sportId: string]: SkillLevel };
  primarySportId?: string | null;
  onEditLevel?: (
    sportId: string,
    sportName: string,
    currentLevel: SkillLevel
  ) => void;
  onTogglePrimary?: (sportId: string) => void;
  isLoading?: boolean;
  testID?: string;
}
