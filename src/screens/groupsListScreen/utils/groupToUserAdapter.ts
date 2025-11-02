import { Group } from '@/services/groups/typesGroups';
import { UserData } from '@/services/http';

export const mapGroupToUserCard = (group: Group): UserData => {
  const nameParts = group.name.trim().split(' ');
  const firstName = nameParts[0] || group.name;
  const lastName = nameParts.slice(1).join(' ') || '';

  const usernameText =
    group.description?.slice(0, 80) ||
    `${group.memberCount} ${group.memberCount === 1 ? 'membro' : 'membros'}`;

  const sports = (group.sports || []).map((sport, index) => ({
    sportId: sport.id,
    sportName: sport.name,
    sportIcon: sport.icon,
    sportColor: sport.color,
    isPrimary: index === 0,
    skillLevel: 'INTERMEDIATE' as const,
  }));

  return {
    id: group.id,
    firstName,
    lastName,
    username: usernameText,
    email: '',
    profilePicture: group.avatar || undefined,
    city: group.city || undefined,
    state: group.state || undefined,
    sports,
    isActive: group.isActive,
    isEmailVerified: false,
    createdAt: group.createdAt,
    updatedAt: group.updatedAt,
  };
};
