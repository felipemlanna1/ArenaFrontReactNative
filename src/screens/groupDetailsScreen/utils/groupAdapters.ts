import { Group } from '@/services/groups/typesGroups';
import { Event } from '@/services/events/typesEvents';
import { UserStats } from '@/screens/profileScreen/components/ProfileStatsSection/typesProfileStatsSection';

/**
 * Maps Group data to ProfileHeroSection format
 */
export const mapGroupToHeroData = (group: Group) => ({
  avatarUrl: group.avatar || null,
  initials: getGroupInitials(group.name),
  coverImageUrl: group.coverImage || null,
  primarySport: group.sports?.[0] || null,
});

/**
 * Maps Group data to ProfileInfoSection format
 */
export const mapGroupToInfoData = (group: Group) => {
  const cityState = [group.city, group.state].filter(Boolean).join(', ');

  return {
    fullName: group.name,
    username: cityState || 'Localização não definida',
    age: null,
    gender: null,
    sports: group.sports || [],
    isEmailVerified: false,
    memberSince: formatGroupCreatedAt(group.createdAt),
  };
};

/**
 * Maps Group data and events to ProfileStatsSection format
 */
export const mapGroupToStats = (
  group: Group,
  events: Event[]
): { stats: UserStats; isLoading: boolean } => ({
  stats: {
    totalEvents: events.length,
    confirmedEvents: events.length,
    attendedEvents: 0,
    attendanceRate: 0,
    totalGroups: 0,
    totalFriends: group.memberCount,
    totalSports: group.sports?.length || 0,
    createdEvents: events.length,
  },
  isLoading: false,
});

/**
 * Generates initials from group name
 */
export const getGroupInitials = (name: string): string => {
  const words = name.trim().split(' ');
  if (words.length >= 2) {
    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

/**
 * Formats group creation date for display
 */
const formatGroupCreatedAt = (createdAt: string): string => {
  const date = new Date(createdAt);
  const month = date.toLocaleDateString('pt-BR', { month: 'long' });
  const year = date.getFullYear();
  return `${month} de ${year}`;
};
