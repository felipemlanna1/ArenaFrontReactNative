import { SkillLevel, UserSport } from '@/types/sport';
import { UserSportData } from '@/services/http';

const mapSkillLevel = (level: string): SkillLevel => {
  switch (level) {
    case 'BEGINNER':
      return SkillLevel.BEGINNER;
    case 'INTERMEDIATE':
      return SkillLevel.INTERMEDIATE;
    case 'ADVANCED':
      return SkillLevel.ADVANCED;
    case 'PROFESSIONAL':
    case 'EXPERT':
      return SkillLevel.EXPERT;
    default:
      return SkillLevel.BEGINNER;
  }
};

export const convertUserSportDataToUserSport = (
  sportData: UserSportData
): UserSport => {
  return {
    sportId: sportData.sportId,
    sportName: sportData.sportName,
    sportIcon: sportData.sportIcon,
    sportColor: sportData.sportColor,
    isPrimary: sportData.isPrimary,
    skillLevel: mapSkillLevel(sportData.skillLevel),
  };
};

export const convertUserSportToUserSportData = (
  userSport: UserSport
): UserSportData => {
  const skillLevelMap: Record<SkillLevel, UserSportData['skillLevel']> = {
    [SkillLevel.BEGINNER]: 'BEGINNER',
    [SkillLevel.INTERMEDIATE]: 'INTERMEDIATE',
    [SkillLevel.ADVANCED]: 'ADVANCED',
    [SkillLevel.EXPERT]: 'PROFESSIONAL',
  };

  return {
    sportId: userSport.sportId,
    sportName: userSport.sportName,
    sportIcon: userSport.sportIcon,
    sportColor: userSport.sportColor,
    isPrimary: userSport.isPrimary,
    skillLevel: skillLevelMap[userSport.skillLevel],
  };
};
