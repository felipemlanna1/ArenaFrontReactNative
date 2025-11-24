import { Event } from '@/services/events/typesEvents';

export type EventViewMode = 'list' | 'calendar';

export type EventFilterType = 'upcoming' | 'organizing' | 'participating' | 'invited';

export interface EventsScreenProps {
  testID?: string;
}

export interface GroupedEventItem {
  type: 'header' | 'event';
  label?: string;
  category?: string;
  count?: number;
  event?: Event;
}

export interface FilterCount {
  upcoming: number;
  organizing: number;
  participating: number;
  invited: number;
}

export interface UseEventsScreenParams {
  initialFilter?: EventFilterType;
  initialViewMode?: EventViewMode;
}

export interface UseEventsScreenReturn {
  viewMode: EventViewMode;
  setViewMode: (mode: EventViewMode) => void;
  eventFilter: EventFilterType;
  setEventFilter: (filter: EventFilterType) => void;
  filterCounts: FilterCount;
  groupedEvents: GroupedEventItem[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  markedDates: Record<string, { marked: boolean; dotColor: string }>;
  eventsForSelectedDate: Event[];
  loadMoreEvents: () => Promise<void>;
  refreshEvents: () => Promise<void>;
  handleDetailsPress: (eventId: string) => void;
  handleManagePress: (eventId: string) => void;
  handleShare: (event: Event) => void;
  eventActions: {
    handleJoinEvent: (eventId: string) => Promise<void>;
    handleRequestJoin: (eventId: string) => Promise<void>;
    handleCancelParticipation: (eventId: string) => Promise<void>;
    handleUndoRequest: (eventId: string) => Promise<void>;
    handleAcceptInvitation: (eventId: string) => Promise<void>;
    handleRejectInvitation: (eventId: string) => Promise<void>;
    isActionLoading: boolean;
    currentActionEventId: string | null;
  };
}
