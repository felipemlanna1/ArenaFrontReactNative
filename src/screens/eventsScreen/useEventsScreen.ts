import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/typesNavigation';
import { useMyEvents } from '@/screens/myEventsScreen/hooks/useMyEvents';
import { useEventFilterCounts } from '@/screens/myEventsScreen/hooks/useEventFilterCounts';
import { useEventActions } from '@/hooks/useEventActions';
import { useToast } from '@/contexts/ToastContext';
import { haptic } from '@/utils/haptics';
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
  const { showToast } = useToast();
  const [eventFilter, setEventFilter] =
    useState<EventFilterType>(initialFilter);
  const [viewMode, setViewMode] = useState<EventViewMode>(initialViewMode);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCalendarExpanded, setIsCalendarExpanded] = useState<boolean>(true);

  const mappedFilter = (eventFilter === 'upcoming' ? 'all' : eventFilter) as
    | 'all'
    | 'organizing'
    | 'participating'
    | 'invited';

  const {
    events,
    isLoading,
    isRefreshing,
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

  const { filterCounts: myEventsFilterCounts, refetch: refetchFilterCounts } =
    useEventFilterCounts();

  const filterCounts: FilterCount = useMemo(
    () => ({
      upcoming: myEventsFilterCounts.all,
      organizing: myEventsFilterCounts.organizing,
      participating: myEventsFilterCounts.participating,
      invited: myEventsFilterCounts.invited,
    }),
    [myEventsFilterCounts]
  );

  const eventActions = useEventActions(async () => {
    await refreshEvents();
    await refetchFilterCounts();
  });

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
      const eventDateStr = new Date(event.startDate)
        .toISOString()
        .split('T')[0];
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

  const handleShare = useCallback(
    (event: Event) => {
      handleShareById(event.id);
    },
    [handleShareById]
  );

  const handleRefresh = useCallback(async () => {
    haptic.light();
    try {
      await Promise.all([refreshEvents(), refetchFilterCounts()]);
      haptic.success();
      showToast('Eventos atualizados', 'success');
    } catch {
      haptic.error();
      showToast('Erro ao atualizar eventos', 'error');
    }
  }, [refreshEvents, refetchFilterCounts, showToast]);

  return {
    viewMode,
    setViewMode: handleViewModeChange,
    eventFilter,
    setEventFilter: handleFilterChange,
    filterCounts,
    events,
    isLoading,
    isRefreshing,
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
    handleRefresh,
    handleDetailsPress,
    handleManagePress,
    handleShare,
    eventActions,
  };
};
