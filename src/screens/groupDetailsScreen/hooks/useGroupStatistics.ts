import { useState, useEffect, useCallback } from 'react';
import { GroupStatistics } from '@/services/groups/typesGroups';
import { groupsApi } from '@/services/groups/groupsApi';

interface UseGroupStatisticsReturn {
  statistics: GroupStatistics | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useGroupStatistics = (
  groupId: string | undefined
): UseGroupStatisticsReturn => {
  const [statistics, setStatistics] = useState<GroupStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchStatistics = useCallback(async () => {
    if (!groupId) return;

    try {
      setIsLoading(true);
      setError(null);
      const data = await groupsApi.getGroupStatistics(groupId);
      setStatistics(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to load statistics')
      );
      setStatistics(null);
    } finally {
      setIsLoading(false);
    }
  }, [groupId]);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  return {
    statistics,
    isLoading,
    error,
    refetch: fetchStatistics,
  };
};
