export type SkillLevel = 1 | 2 | 3 | 4;

export interface SkillLevelOption {
  value: SkillLevel;
  label: string;
  shortLabel: string;
  color: string;
}

export interface SkillLevelRatingProps {
  value: SkillLevel | null;
  onChange: (level: SkillLevel) => void;
  disabled?: boolean;
  testID?: string;
}
