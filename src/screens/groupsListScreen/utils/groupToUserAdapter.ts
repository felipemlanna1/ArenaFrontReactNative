import { Group } from '@/services/groups/typesGroups';
import { User } from '@/services/users/typesUsers';

/**
 * Maps a Group object to User format for UserCard component reuse
 */
export const mapGroupToUserCard = (group: Group): User => {
  const nameParts = group.name.trim().split(' ');
  const firstName = nameParts[0] || group.name;
  const lastName = nameParts.slice(1).join(' ') || '';

  const usernameText = group.description?.slice(0, 80) || `${group.memberCount} ${group.memberCount === 1 ? 'membro' : 'membros'}`;

  return {
    id: group.id,
    firstName,
    lastName,
    username: usernameText,
    email: '',
    profilePicture: group.avatar || null,
    city: group.city || null,
    state: group.state || null,
    sports: group.sports || [],
    isEmailVerified: false,
    createdAt: group.createdAt,
    updatedAt: group.updatedAt,
  } as User;
};
