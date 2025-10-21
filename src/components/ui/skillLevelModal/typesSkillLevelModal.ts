import { SkillLevel } from '@/types/sport';
import { Entypo } from '@expo/vector-icons';

export interface SkillLevelModalProps {
  visible: boolean;
  sportName: string;
  currentLevel: SkillLevel;
  isPrimary?: boolean;
  onSelectLevel: (level: SkillLevel) => void;
  onTogglePrimary?: (isPrimary: boolean) => void;
  onClose: () => void;
  testID?: string;
}

export interface SkillLevelOption {
  level: SkillLevel;
  label: string;
  shortLabel: string;
  description: string;
  iconName: keyof typeof Entypo.glyphMap;
}
