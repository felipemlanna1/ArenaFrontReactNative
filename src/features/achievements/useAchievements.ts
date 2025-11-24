/**
 * Achievement System - Hook
 *
 * Manages achievement unlocking, progress tracking, and storage.
 *
 * @module features/achievements/useAchievements
 */

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Achievement,
  UnlockedAchievement,
  AchievementProgress,
  UserStats,
} from './types';
import { ACHIEVEMENTS } from './achievementsList';
import { haptic } from '@/utils/haptics';

const STORAGE_KEY = '@arena:achievements:unlocked';

export interface UseAchievementsReturn {
  /**
   * All unlocked achievements
   */
  unlockedAchievements: UnlockedAchievement[];

  /**
   * Achievements unlocked but not yet seen by user
   */
  unseenAchievements: UnlockedAchievement[];

  /**
   * Check if achievements should unlock based on current stats
   */
  checkAchievements: (userStats: UserStats) => Promise<Achievement[]>;

  /**
   * Mark achievement notification as seen
   */
  markAchievementAsSeen: (achievementId: string) => Promise<void>;

  /**
   * Get progress for all achievements
   */
  getAchievementProgress: (userStats: UserStats) => AchievementProgress[];

  /**
   * Total points earned from unlocked achievements
   */
  totalPoints: number;

  /**
   * Loading state
   */
  isLoading: boolean;
}

export const useAchievements = (): UseAchievementsReturn => {
  const [unlockedAchievements, setUnlockedAchievements] = useState<
    UnlockedAchievement[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load unlocked achievements from storage
  useEffect(() => {
    const loadUnlockedAchievements = async (): Promise<void> => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as UnlockedAchievement[];
          // Convert date strings back to Date objects
          const withDates = parsed.map((ua) => ({
            ...ua,
            unlockedAt: new Date(ua.unlockedAt),
          }));
          setUnlockedAchievements(withDates);
        }
      } catch (error) {
        console.error('Failed to load unlocked achievements:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUnlockedAchievements();
  }, []);

  // Save unlocked achievements to storage
  const saveUnlockedAchievements = useCallback(
    async (achievements: UnlockedAchievement[]): Promise<void> => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(achievements));
        setUnlockedAchievements(achievements);
      } catch (error) {
        console.error('Failed to save unlocked achievements:', error);
      }
    },
    []
  );

  // Check if achievement requirements are met
  const checkRequirements = useCallback(
    (achievement: Achievement, userStats: UserStats): boolean => {
      const { requirements } = achievement;

      // Events participated
      if (
        requirements.eventsParticipated !== undefined &&
        userStats.eventsParticipated < requirements.eventsParticipated
      ) {
        return false;
      }

      // Events created
      if (
        requirements.eventsCreated !== undefined &&
        userStats.eventsCreated < requirements.eventsCreated
      ) {
        return false;
      }

      // Friends added
      if (
        requirements.friendsAdded !== undefined &&
        userStats.friendsAdded < requirements.friendsAdded
      ) {
        return false;
      }

      // Current streak
      if (
        requirements.currentStreak !== undefined &&
        userStats.currentStreak < requirements.currentStreak
      ) {
        return false;
      }

      // Profile completion
      if (
        requirements.profileCompletion !== undefined &&
        userStats.profileCompletion < requirements.profileCompletion
      ) {
        return false;
      }

      // Custom check
      if (requirements.customCheck && !requirements.customCheck(userStats)) {
        return false;
      }

      return true;
    },
    []
  );

  // Check achievements and unlock new ones
  const checkAchievements = useCallback(
    async (userStats: UserStats): Promise<Achievement[]> => {
      const newlyUnlocked: Achievement[] = [];

      for (const achievement of ACHIEVEMENTS) {
        // Skip if already unlocked
        const isUnlocked = unlockedAchievements.some(
          (ua) => ua.achievementId === achievement.id
        );
        if (isUnlocked) continue;

        // Check requirements
        if (checkRequirements(achievement, userStats)) {
          newlyUnlocked.push(achievement);

          // Add to unlocked list
          const unlocked: UnlockedAchievement = {
            achievementId: achievement.id,
            unlockedAt: new Date(),
            hasSeenNotification: false,
          };

          const updated = [...unlockedAchievements, unlocked];
          await saveUnlockedAchievements(updated);

          // Trigger celebration haptic
          haptic.celebration();
        }
      }

      return newlyUnlocked;
    },
    [unlockedAchievements, checkRequirements, saveUnlockedAchievements]
  );

  // Mark achievement as seen
  const markAchievementAsSeen = useCallback(
    async (achievementId: string): Promise<void> => {
      const updated = unlockedAchievements.map((ua) =>
        ua.achievementId === achievementId
          ? { ...ua, hasSeenNotification: true }
          : ua
      );
      await saveUnlockedAchievements(updated);
    },
    [unlockedAchievements, saveUnlockedAchievements]
  );

  // Get progress for all achievements
  const getAchievementProgress = useCallback(
    (userStats: UserStats): AchievementProgress[] => {
      return ACHIEVEMENTS.map((achievement) => {
        const { requirements } = achievement;

        // Determine current and target values
        let currentValue = 0;
        let targetValue = 1;

        if (requirements.eventsParticipated !== undefined) {
          currentValue = userStats.eventsParticipated;
          targetValue = requirements.eventsParticipated;
        } else if (requirements.eventsCreated !== undefined) {
          currentValue = userStats.eventsCreated;
          targetValue = requirements.eventsCreated;
        } else if (requirements.friendsAdded !== undefined) {
          currentValue = userStats.friendsAdded;
          targetValue = requirements.friendsAdded;
        } else if (requirements.currentStreak !== undefined) {
          currentValue = userStats.currentStreak;
          targetValue = requirements.currentStreak;
        } else if (requirements.profileCompletion !== undefined) {
          currentValue = userStats.profileCompletion;
          targetValue = requirements.profileCompletion;
        } else if (requirements.customCheck) {
          // For custom checks, can't calculate progress
          currentValue = requirements.customCheck(userStats) ? 1 : 0;
          targetValue = 1;
        }

        const percentage = Math.min(
          Math.round((currentValue / targetValue) * 100),
          100
        );

        return {
          achievementId: achievement.id,
          currentValue,
          targetValue,
          percentage,
        };
      });
    },
    []
  );

  // Calculate total points
  const totalPoints = unlockedAchievements.reduce((sum, ua) => {
    const achievement = ACHIEVEMENTS.find((a) => a.id === ua.achievementId);
    return sum + (achievement?.points ?? 0);
  }, 0);

  // Get unseen achievements
  const unseenAchievements = unlockedAchievements.filter(
    (ua) => !ua.hasSeenNotification
  );

  return {
    unlockedAchievements,
    unseenAchievements,
    checkAchievements,
    markAchievementAsSeen,
    getAchievementProgress,
    totalPoints,
    isLoading,
  };
};
