import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserData } from '@/services/http';

const STORAGE_KEY = '@Arena:profile_completion_dismissed';
const COMPLETION_VERSION = 1;

interface DismissedData {
  userId: string;
  dismissedAt: string;
  version: number;
}

interface ProfileCompletionStatus {
  isIncomplete: boolean;
  missingFieldsCount: number;
  missingFields: string[];
}

interface UseProfileCompletionBannerReturn {
  isIncomplete: boolean;
  missingFieldsCount: number;
  isDismissed: boolean;
  isLoading: boolean;
  handleDismiss: () => Promise<void>;
}

const REQUIRED_FIELDS: (keyof UserData)[] = [
  'birthDate',
  'gender',
  'profilePicture',
  'bio',
  'state',
  'city',
];

const checkProfileCompletion = (user: UserData): ProfileCompletionStatus => {
  const missingFields = REQUIRED_FIELDS.filter(field => {
    const value = user[field];
    return !value || (typeof value === 'string' && value.trim() === '');
  });

  return {
    isIncomplete: missingFields.length > 0,
    missingFieldsCount: missingFields.length,
    missingFields,
  };
};

export const useProfileCompletionBanner = (
  user: UserData | null,
  isOwnProfile: boolean
): UseProfileCompletionBannerReturn => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDismissedState = async () => {
      if (!user || !isOwnProfile) {
        setIsLoading(false);
        return;
      }

      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          const parsed: DismissedData = JSON.parse(storedData);
          const isSameUser = parsed.userId === user.id;
          const isSameVersion = parsed.version === COMPLETION_VERSION;
          setIsDismissed(isSameUser && isSameVersion);
        }
      } catch (error) {
        console.error('Error loading dismissed state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDismissedState();
  }, [user, isOwnProfile]);

  const handleDismiss = useCallback(async () => {
    if (!user) return;

    try {
      const dismissData: DismissedData = {
        userId: user.id,
        dismissedAt: new Date().toISOString(),
        version: COMPLETION_VERSION,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dismissData));
      setIsDismissed(true);
    } catch (error) {
      console.error('Error saving dismissed state:', error);
    }
  }, [user]);

  const completionStatus = user
    ? checkProfileCompletion(user)
    : { isIncomplete: false, missingFieldsCount: 0, missingFields: [] };

  return {
    isIncomplete: completionStatus.isIncomplete,
    missingFieldsCount: completionStatus.missingFieldsCount,
    isDismissed,
    isLoading,
    handleDismiss,
  };
};
