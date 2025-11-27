export type AchievementCategory =
  | 'participation'
  | 'social'
  | 'streak'
  | 'milestone'
  | 'sport'
  | 'profile';

export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface Achievement {
  id: string;

  title: string;

  description: string;

  category: AchievementCategory;

  tier: AchievementTier;

  icon: string;

  points: number;

  requirements: AchievementRequirements;
}

export interface AchievementRequirements {
  eventsParticipated?: number;

  eventsCreated?: number;

  friendsAdded?: number;

  currentStreak?: number;

  sport?: string;

  profileCompletion?: number;

  customCheck?: (userStats: UserStats) => boolean;
}

export interface UserStats {
  eventsParticipated: number;

  eventsCreated: number;

  friendsAdded: number;

  currentStreak: number;

  longestStreak: number;

  profileCompletion: number;

  eventsBySport: Record<string, number>;

  totalPoints: number;

  accountCreatedAt: Date;
}

export interface UnlockedAchievement {
  achievementId: string;

  unlockedAt: Date;

  hasSeenNotification: boolean;
}

export interface AchievementProgress {
  achievementId: string;

  currentValue: number;

  targetValue: number;

  percentage: number;
}
