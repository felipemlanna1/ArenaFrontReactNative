import { SkillLevel } from '@/types/sport';

export interface SportCardProps {
  sportId: string;
  sportName: string;
  sportIcon: string;
  skillLevel?: SkillLevel;
  isPrimary?: boolean;
  isSelected?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  testID?: string;
}
