import { useMemo } from 'react';
import { UserData } from '@/services/http';

const REQUIRED_FIELDS: (keyof UserData)[] = [
  'birthDate',
  'gender',
  'profilePicture',
  'bio',
  'state',
  'city',
];

interface UseProfileCompletionReturn {
  progress: number;
  missingFieldsCount: number;
  totalFields: number;
}

export const useProfileCompletion = (
  user: UserData | null
): UseProfileCompletionReturn => {
  return useMemo(() => {
    if (!user) {
      return {
        progress: 0,
        missingFieldsCount: REQUIRED_FIELDS.length,
        totalFields: REQUIRED_FIELDS.length,
      };
    }

    const missingFields = REQUIRED_FIELDS.filter(field => {
      const value = user[field];
      return !value || (typeof value === 'string' && value.trim() === '');
    });

    const completedFields = REQUIRED_FIELDS.length - missingFields.length;
    const progress = Math.round(
      (completedFields / REQUIRED_FIELDS.length) * 100
    );

    return {
      progress,
      missingFieldsCount: missingFields.length,
      totalFields: REQUIRED_FIELDS.length,
    };
  }, [user]);
};
