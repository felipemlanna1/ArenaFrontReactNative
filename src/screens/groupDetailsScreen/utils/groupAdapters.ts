import { Group, GroupStatistics } from '@/services/groups/typesGroups';
import { Event } from '@/services/events/typesEvents';
import { UserStats } from '@/screens/profileScreen/components/ProfileStatsSection/typesProfileStatsSection';

export const mapGroupToHeroData = (group: Group) => {
  const primarySport = group.sports?.[0];

  return {
    avatarUrl: group.avatar || null,
    initials: getGroupInitials(group.name),
    coverImageUrl: group.coverImage || null,
    primarySport: primarySport ? { ...primarySport, isPrimary: true } : null,
  };
};

export const mapGroupToInfoData = (group: Group) => {
  const cityState = [group.city, group.state].filter(Boolean).join(', ');

  const sports = (group.sports || []).map((sport, index) => ({
    ...sport,
    isPrimary: index === 0,
  }));

  return {
    fullName: group.name,
    username: cityState || 'Localização não definida',
    age: null,
    gender: null,
    sports,
    isEmailVerified: false,
    memberSince: formatGroupCreatedAt(group.createdAt),
  };
};

export const mapGroupToStats = (
  group: Group,
  events: Event[]
): { stats: UserStats; isLoading: boolean } => ({
  stats: {
    totalEvents: events?.length ?? 0,
    confirmedEvents: events?.length ?? 0,
    attendedEvents: 0,
    attendanceRate: 0,
    totalGroups: 0,
    totalFriends: group?.memberCount ?? 0,
    totalSports: group?.sports?.length ?? 0,
    createdEvents: events?.length ?? 0,
  },
  isLoading: false,
});

export const mapGroupStatisticsToStats = (
  statistics: GroupStatistics | null
): UserStats | null => {
  if (!statistics) return null;

  return {
    totalEvents: statistics.totalEvents,
    confirmedEvents: statistics.recentEvents,
    attendedEvents: Math.round(
      (statistics.participationRate / 100) * statistics.totalEvents
    ),
    attendanceRate: statistics.participationRate,
    totalGroups: statistics.activeSportsCount,
    totalFriends: statistics.totalMembers,
    totalSports: statistics.activeSportsCount,
    createdEvents: Math.round(statistics.eventsPerMonth * 12),
  };
};

export const getGroupInitials = (name: string): string => {
  const words = name.trim().split(' ');
  if (words.length >= 2) {
    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const formatGroupCreatedAt = (createdAt: string): string => {
  const date = new Date(createdAt);
  const month = date.toLocaleDateString('pt-BR', { month: 'long' });
  const year = date.getFullYear();
  return `${month} de ${year}`;
};
