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

export interface ProfileStatsSectionProps {
  stats: UserStats | null;
  isLoading: boolean;
}

export interface StatCardData {
  id: string;
  label: string;
  value: string;
}
