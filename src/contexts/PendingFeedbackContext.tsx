import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { feedbackApi } from '@/services/feedback/feedbackApi';

interface PendingFeedbackContextData {
  pendingCount: number;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

const PendingFeedbackContext = createContext<
  PendingFeedbackContextData | undefined
>(undefined);

interface PendingFeedbackProviderProps {
  children: ReactNode;
}

export const PendingFeedbackProvider: React.FC<
  PendingFeedbackProviderProps
> = ({ children }) => {
  const [pendingCount, setPendingCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPendingCount = useCallback(async () => {
    try {
      setIsLoading(true);
      const events = await feedbackApi.getPendingEvents();

      const validEvents = events.filter(event => {
        const endDate = new Date(event.endDate);
        const daysSinceEnd = Math.floor(
          (Date.now() - endDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        return daysSinceEnd < 7;
      });

      setPendingCount(validEvents.length);
    } catch {
      setPendingCount(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPendingCount();

    const interval = setInterval(
      () => {
        fetchPendingCount();
      },
      5 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, [fetchPendingCount]);

  return (
    <PendingFeedbackContext.Provider
      value={{ pendingCount, isLoading, refetch: fetchPendingCount }}
    >
      {children}
    </PendingFeedbackContext.Provider>
  );
};

export const usePendingFeedback = (): PendingFeedbackContextData => {
  const context = useContext(PendingFeedbackContext);
  if (!context) {
    throw new Error(
      'usePendingFeedback must be used within PendingFeedbackProvider'
    );
  }
  return context;
};
