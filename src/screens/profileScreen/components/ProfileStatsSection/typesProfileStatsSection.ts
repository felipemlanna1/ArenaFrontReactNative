export interface UserStats {
  totalEvents: number;
  confirmedEvents: number;
  attendedEvents: number;
  attendanceRate: number;
  totalGroups: number;
  totalFriends: number;
  totalSports: number;
  createdEvents: number;
}

export interface StatsLabels {
  events?: string;
  created?: string;
  groups?: string;
  friends?: string;
}

export interface ProfileStatsSectionProps {
  stats: UserStats | null;
  isLoading: boolean;
  customLabels?: StatsLabels;
}

export interface StatCardData {
  id: string;
  label: string;
  value: number;
}
