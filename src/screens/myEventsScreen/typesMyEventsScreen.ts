import { Event } from '@/services/events/typesEvents';
import { UseEventActionsReturn } from '@/hooks/useEventActions';

export type EventFilterType =
  | 'all'
  | 'organizing'
  | 'participating'
  | 'invited';

export type TimeCategory =
  | 'today'
  | 'tomorrow'
  | 'thisWeek'
  | 'thisMonth'
  | 'upcoming';

export interface TimeCategoryLabel {
  key: TimeCategory;
  label: string;
}

export interface SectionHeader {
  type: 'header';
  category: TimeCategory;
  label: string;
}

export interface EventItem {
  type: 'event';
  event: Event;
}

export type GroupedEventItem = SectionHeader | EventItem;

export interface MyEventsScreenProps {
  testID?: string;
}

export interface UseMyEventsScreenReturn {
  events: Event[];
  groupedEvents: GroupedEventItem[];
  pastEvents: Event[];
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
  error: Error | null;
  hasMore: boolean;
  currentPage: number;
  eventFilter: EventFilterType;
  setEventFilter: (filter: EventFilterType) => void;
  refetch: () => Promise<void>;
  loadMoreEvents: () => Promise<void>;
  handleDetailsPress: (eventId: string) => void;
  handleManagePress: (eventId: string) => void;
  handleShare: (eventId: string) => void;
  eventActions: UseEventActionsReturn;
}
