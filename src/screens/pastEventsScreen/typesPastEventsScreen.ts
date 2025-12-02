import { Event } from '@/services/events/typesEvents';

export interface EnrichedPastEvent extends Event {
  feedbackStatus: 'pending' | 'completed' | 'expired';
  badgeVariant: 'primary' | 'success' | 'error';
  badgeText: string;
  shouldPulsate: boolean;
  daysRemaining: number | null;
  isPendingWithin7Days: boolean;
  feedbackMarkedCompleted: boolean;
}

export interface UsePastEventsScreenReturn {
  enrichedEvents: EnrichedPastEvent[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  navigateToEventDetails: (eventId: string) => void;
  navigateToFeedback: (eventId: string) => void;
  keyExtractor: (item: EnrichedPastEvent) => string;
  getItemLayout: (
    data: ArrayLike<EnrichedPastEvent> | null | undefined,
    index: number
  ) => { length: number; offset: number; index: number };
}
