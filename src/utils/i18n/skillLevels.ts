import { SkillLevel } from '@/types/sport';

export const translateSkillLevel = (level: string): string => {
  const translations: Record<string, string> = {
    [SkillLevel.BEGINNER]: 'Iniciante',
    [SkillLevel.INTERMEDIATE]: 'Intermediário',
    [SkillLevel.ADVANCED]: 'Avançado',
    [SkillLevel.PROFESSIONAL]: 'Expert',
  };
  return translations[level] || level;
};
