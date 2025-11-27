import { Group, GroupStatistics } from '@/services/groups/typesGroups';
import { Event } from '@/services/events/typesEvents';
import { UserStats } from '@/screens/profileScreen/components/ProfileStatsSection/typesProfileStatsSection';

export const mapGroupToHeroData = (group: Group) => {
  const primarySport = group.sports?.[0];

  return {
    avatarUrl: null,
    initials: '',
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
    createdEvents: statistics.recentEvents,
    totalGroups: statistics.activeSportsCount,
    totalFriends: statistics.totalMembers,
    confirmedEvents: 0,
    attendedEvents: 0,
    attendanceRate: 0,
    totalSports: 0,
  };
};

const formatGroupCreatedAt = (createdAt: string): string => {
  const date = new Date(createdAt);
  const month = date.toLocaleDateString('pt-BR', { month: 'long' });
  const year = date.getFullYear();
  return `${month} de ${year}`;
};
