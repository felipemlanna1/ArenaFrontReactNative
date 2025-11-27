import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Achievement,
  UnlockedAchievement,
  AchievementProgress,
  UserStats,
} from './typesAchievements';
import { ACHIEVEMENTS } from './achievementsList';
import { haptic } from '@/utils/haptics';

const STORAGE_KEY = '@arena:achievements:unlocked';

export interface UseAchievementsReturn {
  unlockedAchievements: UnlockedAchievement[];

  unseenAchievements: UnlockedAchievement[];

  checkAchievements: (userStats: UserStats) => Promise<Achievement[]>;

  markAchievementAsSeen: (achievementId: string) => Promise<void>;

  getAchievementProgress: (userStats: UserStats) => AchievementProgress[];

  totalPoints: number;

  isLoading: boolean;
}

export const useAchievements = (): UseAchievementsReturn => {
  const [unlockedAchievements, setUnlockedAchievements] = useState<
    UnlockedAchievement[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUnlockedAchievements = async (): Promise<void> => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as UnlockedAchievement[];

          const withDates = parsed.map(ua => ({
            ...ua,
            unlockedAt: new Date(ua.unlockedAt),
          }));
          setUnlockedAchievements(withDates);
        }
      } catch {
        setUnlockedAchievements([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadUnlockedAchievements();
  }, []);

  const saveUnlockedAchievements = useCallback(
    async (achievements: UnlockedAchievement[]): Promise<void> => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(achievements));
        setUnlockedAchievements(achievements);
      } catch {
        setUnlockedAchievements([]);
      }
    },
    []
  );

  const checkRequirements = useCallback(
    (achievement: Achievement, userStats: UserStats): boolean => {
      const { requirements } = achievement;

      if (
        requirements.eventsParticipated !== undefined &&
        userStats.eventsParticipated < requirements.eventsParticipated
      ) {
        return false;
      }

      if (
        requirements.eventsCreated !== undefined &&
        userStats.eventsCreated < requirements.eventsCreated
      ) {
        return false;
      }

      if (
        requirements.friendsAdded !== undefined &&
        userStats.friendsAdded < requirements.friendsAdded
      ) {
        return false;
      }

      if (
        requirements.currentStreak !== undefined &&
        userStats.currentStreak < requirements.currentStreak
      ) {
        return false;
      }

      if (
        requirements.profileCompletion !== undefined &&
        userStats.profileCompletion < requirements.profileCompletion
      ) {
        return false;
      }

      if (requirements.customCheck && !requirements.customCheck(userStats)) {
        return false;
      }

      return true;
    },
    []
  );

  const checkAchievements = useCallback(
    async (userStats: UserStats): Promise<Achievement[]> => {
      const newlyUnlocked: Achievement[] = [];

      for (const achievement of ACHIEVEMENTS) {
        const isUnlocked = unlockedAchievements.some(
          ua => ua.achievementId === achievement.id
        );
        if (isUnlocked) continue;

        if (checkRequirements(achievement, userStats)) {
          newlyUnlocked.push(achievement);

          const unlocked: UnlockedAchievement = {
            achievementId: achievement.id,
            unlockedAt: new Date(),
            hasSeenNotification: false,
          };

          const updated = [...unlockedAchievements, unlocked];
          await saveUnlockedAchievements(updated);

          haptic.celebration();
        }
      }

      return newlyUnlocked;
    },
    [unlockedAchievements, checkRequirements, saveUnlockedAchievements]
  );

  const markAchievementAsSeen = useCallback(
    async (achievementId: string): Promise<void> => {
      const updated = unlockedAchievements.map(ua =>
        ua.achievementId === achievementId
          ? { ...ua, hasSeenNotification: true }
          : ua
      );
      await saveUnlockedAchievements(updated);
    },
    [unlockedAchievements, saveUnlockedAchievements]
  );

  const getAchievementProgress = useCallback(
    (userStats: UserStats): AchievementProgress[] => {
      return ACHIEVEMENTS.map(achievement => {
        const { requirements } = achievement;

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

  const totalPoints = unlockedAchievements.reduce((sum, ua) => {
    const achievement = ACHIEVEMENTS.find(a => a.id === ua.achievementId);
    return sum + (achievement?.points ?? 0);
  }, 0);

  const unseenAchievements = unlockedAchievements.filter(
    ua => !ua.hasSeenNotification
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
