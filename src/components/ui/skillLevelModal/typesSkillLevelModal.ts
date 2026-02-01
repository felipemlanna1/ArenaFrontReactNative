import { SkillLevel } from '@/types/sport';

export interface SkillLevelModalProps {
  visible: boolean;
  sportName: string;
  sportIcon?: string;
  currentLevel: SkillLevel | null;
  isPrimary?: boolean;
  onSelectLevel: (level: SkillLevel, isPrimary?: boolean) => void;
  onTogglePrimary?: (isPrimary: boolean) => void;
  onRemoveSport?: () => void;
  onClose: () => void;
  testID?: string;
}

export interface SkillLevelOption {
  level: SkillLevel;
  label: string;
  filledDots: number;
}
