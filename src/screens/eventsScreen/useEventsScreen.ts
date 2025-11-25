import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/typesNavigation';
import { useMyEvents } from '@/screens/myEventsScreen/hooks/useMyEvents';
import { useEventFilterCounts } from '@/screens/myEventsScreen/hooks/useEventFilterCounts';
import { groupEventsByTime } from '@/screens/myEventsScreen/utils/eventGrouping';
import { useEventActions } from '@/hooks/useEventActions';
import { ArenaColors } from '@/constants';
import { Event } from '@/services/events/typesEvents';
import {
  UseEventsScreenReturn,
  UseEventsScreenParams,
  EventViewMode,
  EventFilterType,
  FilterCount,
} from './typesEventsScreen';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const useEventsScreen = ({
  initialFilter = 'upcoming',
  initialViewMode = 'list',
}: UseEventsScreenParams = {}): UseEventsScreenReturn => {
  const navigation = useNavigation<NavigationProp>();
  const [eventFilter, setEventFilter] = useState<EventFilterType>(initialFilter);
  const [viewMode, setViewMode] = useState<EventViewMode>(initialViewMode);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCalendarExpanded, setIsCalendarExpanded] = useState<boolean>(true);

  // Map 'upcoming' to 'all' for useMyEvents which expects myEventsScreen EventFilterType
  const mappedFilter = (eventFilter === 'upcoming' ? 'all' : eventFilter) as
    | 'all'
    | 'organizing'
    | 'participating'
    | 'invited';

  const {
    events,
    isLoading,
    isLoadingMore,
    hasMore,
    loadEvents,
    refreshEvents,
    loadMoreEvents,
    handleShare: handleShareById,
  } = useMyEvents({ eventFilter: mappedFilter });

  useEffect(() => {
    loadEvents();
  }, [eventFilter, loadEvents]);

  const groupedEvents = useMemo(() => {
    return groupEventsByTime(events);
  }, [events]);

  const { filterCounts: myEventsFilterCounts } = useEventFilterCounts();

  // Map filterCounts from myEventsScreen format to EventsScreen format
  const filterCounts: FilterCount = useMemo(() => ({
    upcoming: myEventsFilterCounts.all,
    organizing: myEventsFilterCounts.organizing,
    participating: myEventsFilterCounts.participating,
    invited: myEventsFilterCounts.invited,
  }), [myEventsFilterCounts]);

  const eventActions = useEventActions(refreshEvents);

  const markedDates = useMemo(() => {
    const marked: Record<string, { marked: boolean; dotColor: string }> = {};

    events.forEach(event => {
      const date = new Date(event.startDate);
      const dateStr = date.toISOString().split('T')[0];

      marked[dateStr] = {
        marked: true,
        dotColor: ArenaColors.brand.primary,
      };
    });

    return marked;
  }, [events]);

  const eventsForSelectedDate = useMemo(() => {
    const selectedDateStr = selectedDate.toISOString().split('T')[0];

    return events.filter(event => {
      const eventDateStr = new Date(event.startDate).toISOString().split('T')[0];
      return eventDateStr === selectedDateStr;
    });
  }, [events, selectedDate]);

  const handleFilterChange = useCallback((filter: EventFilterType) => {
    setEventFilter(filter);
  }, []);

  const handleViewModeChange = useCallback((mode: EventViewMode) => {
    setViewMode(mode);
  }, []);

  const handleDateSelect = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const toggleCalendarExpanded = useCallback(() => {
    setIsCalendarExpanded(prev => !prev);
  }, []);

  const handleDetailsPress = useCallback(
    (eventId: string) => {
      navigation.navigate('EventDetails', { eventId });
    },
    [navigation]
  );

  const handleManagePress = useCallback(
    (eventId: string) => {
      navigation.navigate('EventDetails', { eventId });
    },
    [navigation]
  );

  const refetch = useCallback(async () => {
    await refreshEvents();
  }, [refreshEvents]);

  // Wrap handleShare to convert Event to eventId
  const handleShare = useCallback((event: Event) => {
    handleShareById(event.id);
  }, [handleShareById]);

  return {
    viewMode,
    setViewMode: handleViewModeChange,
    eventFilter,
    setEventFilter: handleFilterChange,
    filterCounts,
    groupedEvents,
    isLoading,
    isLoadingMore,
    hasMore,
    selectedDate,
    setSelectedDate: handleDateSelect,
    markedDates,
    eventsForSelectedDate,
    isCalendarExpanded,
    toggleCalendarExpanded,
    loadMoreEvents,
    refreshEvents: refetch,
    handleDetailsPress,
    handleManagePress,
    handleShare,
    eventActions,
  };
};
