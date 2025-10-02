import { SkillLevel } from '@/types/sport';
import { UserSportData } from '@/services/http';
import { SportSelection } from '@/screens/onboardingSportsScreen/typesOnboardingSportsScreen';

export const skillLevelToBackend = (level: SkillLevel): string => {
  const mapping: Record<SkillLevel, string> = {
    [SkillLevel.BEGINNER]: 'BEGINNER',
    [SkillLevel.INTERMEDIATE]: 'INTERMEDIATE',
    [SkillLevel.ADVANCED]: 'ADVANCED',
    [SkillLevel.EXPERT]: 'PROFESSIONAL',
  };
  return mapping[level] || 'BEGINNER';
};

export interface ToUserSportDataParams {
  selection: SportSelection;
  sportIcon: string;
  sportColor: string;
  isPrimary: boolean;
}

export const toUserSportData = (
  params: ToUserSportDataParams
): UserSportData => {
  const { selection, sportIcon, sportColor, isPrimary } = params;
  return {
    sportId: selection.sportId,
    sportName: selection.sportName,
    sportIcon,
    sportColor,
    isPrimary,
    skillLevel: skillLevelToBackend(
      selection.level
    ) as UserSportData['skillLevel'],
  };
};

export interface ToApiSportDataParams {
  sportId: string;
  skillLevel: SkillLevel;
  isPrimary: boolean;
  yearsOfExperience?: number;
}

export const toApiSportData = (params: ToApiSportDataParams) => {
  const { sportId, skillLevel, isPrimary, yearsOfExperience = 0 } = params;
  return {
    sportId,
    skillLevel,
    isPrimary,
    yearsOfExperience,
  };
};
