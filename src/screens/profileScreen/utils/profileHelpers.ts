import { UserData } from '@/services/http';
import { ProfileDisplayData, SportBadgeData } from '../typesProfileScreen';
import { getSportIconName, getSportColor } from '@/config/sportsConfig';

export const calculateAge = (birthDate: string | undefined): number | null => {
  if (!birthDate) return null;

  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

export const formatGender = (gender: string | undefined): string | null => {
  if (!gender) return null;

  const genderMap: Record<string, string> = {
    male: 'Masculino',
    female: 'Feminino',
    other: 'Outro',
  };

  return genderMap[gender] || gender;
};

export const getInitials = (firstName: string, lastName: string): string => {
  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
  return `${firstInitial}${lastInitial}`;
};

export const formatMemberSince = (createdAt: string): string => {
  const date = new Date(createdAt);
  const month = date.toLocaleDateString('pt-BR', { month: 'long' });
  const year = date.getFullYear();
  return `${month} de ${year}`;
};

export const formatSkillLevel = (
  skillLevel?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'PROFESSIONAL'
): string => {
  if (!skillLevel) return '';

  const skillMap: Record<string, string> = {
    BEGINNER: 'Iniciante',
    INTERMEDIATE: 'Intermediário',
    ADVANCED: 'Avançado',
    PROFESSIONAL: 'Profissional',
  };

  return skillMap[skillLevel] || skillLevel;
};

export const mapUserToDisplayData = (user: UserData): ProfileDisplayData => {
  const sports: SportBadgeData[] =
    user.sports?.map(sport => ({
      id: sport.sportId,
      name: sport.sportName,
      icon: sport.sportIcon || getSportIconName(sport.sportName),
      color: sport.sportColor || getSportColor(sport.sportName),
      isPrimary: sport.isPrimary,
      skillLevel: sport.skillLevel,
    })) || [];

  return {
    fullName: `${user.firstName} ${user.lastName}`,
    username: user.username,
    age: calculateAge(user.birthDate),
    gender: formatGender(user.gender),
    bio: user.bio || null,
    avatarUrl: user.profilePicture || user.avatar || null,
    coverImageUrl: user.coverImage || null,
    sports,
  };
};
