/**
 * Achievement System - Types
 *
 * Defines all achievement-related types for Arena gamification.
 *
 * @module features/achievements/types
 */

export type AchievementCategory =
  | 'participation'
  | 'social'
  | 'streak'
  | 'milestone'
  | 'sport'
  | 'profile';

export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface Achievement {
  /**
   * Unique identifier for the achievement
   */
  id: string;

  /**
   * Display name for the achievement
   */
  title: string;

  /**
   * Detailed description of how to unlock
   */
  description: string;

  /**
   * Category this achievement belongs to
   */
  category: AchievementCategory;

  /**
   * Tier/rarity of the achievement
   */
  tier: AchievementTier;

  /**
   * Icon name from Ionicons
   */
  icon: string;

  /**
   * Points awarded when unlocked
   */
  points: number;

  /**
   * Requirements to unlock this achievement
   */
  requirements: AchievementRequirements;
}

export interface AchievementRequirements {
  /**
   * Number of events participated
   */
  eventsParticipated?: number;

  /**
   * Number of events created
   */
  eventsCreated?: number;

  /**
   * Number of friends added
   */
  friendsAdded?: number;

  /**
   * Current streak (days)
   */
  currentStreak?: number;

  /**
   * Specific sport required
   */
  sport?: string;

  /**
   * Profile completion percentage
   */
  profileCompletion?: number;

  /**
   * Custom check function (for complex requirements)
   */
  customCheck?: (userStats: UserStats) => boolean;
}

export interface UserStats {
  /**
   * Total events participated in
   */
  eventsParticipated: number;

  /**
   * Total events created
   */
  eventsCreated: number;

  /**
   * Total friends added
   */
  friendsAdded: number;

  /**
   * Current activity streak (days)
   */
  currentStreak: number;

  /**
   * Longest streak achieved
   */
  longestStreak: number;

  /**
   * Profile completion (0-100)
   */
  profileCompletion: number;

  /**
   * Events by sport (sport name -> count)
   */
  eventsBySport: Record<string, number>;

  /**
   * Total points earned
   */
  totalPoints: number;

  /**
   * Account creation date
   */
  accountCreatedAt: Date;
}

export interface UnlockedAchievement {
  /**
   * Achievement ID
   */
  achievementId: string;

  /**
   * When it was unlocked
   */
  unlockedAt: Date;

  /**
   * Whether user has seen the unlock notification
   */
  hasSeenNotification: boolean;
}

export interface AchievementProgress {
  /**
   * Achievement ID
   */
  achievementId: string;

  /**
   * Current progress value
   */
  currentValue: number;

  /**
   * Target value to unlock
   */
  targetValue: number;

  /**
   * Progress percentage (0-100)
   */
  percentage: number;
}
