import { useState, useEffect } from 'react';
import { feedbackApi } from '@/services/feedback/feedbackApi';
import { UserRatingAggregate } from '@/services/feedback/typesFeedback';

interface UseReputationDataReturn {
  aggregate: UserRatingAggregate | null;
  isLoading: boolean;
  error: Error | null;
}

export const useReputationData = (userId: string): UseReputationDataReturn => {
  const [aggregate, setAggregate] = useState<UserRatingAggregate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAggregate = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await feedbackApi.getUserAggregate(userId);
        setAggregate(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Erro ao buscar reputação')
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchAggregate();
    }
  }, [userId]);

  return { aggregate, isLoading, error };
};
