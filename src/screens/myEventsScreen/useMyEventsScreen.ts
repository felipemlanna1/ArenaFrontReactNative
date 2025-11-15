import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/typesNavigation';
import {
  UseMyEventsScreenReturn,
  EventFilterType,
} from './typesMyEventsScreen';
import { useMyEvents } from './hooks/useMyEvents';
import { groupEventsByTime, getPastEvents } from './utils/eventGrouping';
import { useEventActions } from '@/hooks/useEventActions';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const useMyEventsScreen = (): UseMyEventsScreenReturn => {
  const navigation = useNavigation<NavigationProp>();
  const [eventFilter, setEventFilter] = useState<EventFilterType>('all');

  const {
    events,
    isLoading,
    isRefreshing,
    isLoadingMore,
    error,
    hasMore,
    currentPage,
    loadEvents,
    refreshEvents,
    loadMoreEvents,
    handleShare,
  } = useMyEvents({ eventFilter });

  useEffect(() => {
    loadEvents();
  }, [eventFilter, loadEvents]);

  const groupedEvents = useMemo(() => {
    return groupEventsByTime(events);
  }, [events]);

  const pastEvents = useMemo(() => {
    return getPastEvents(events);
  }, [events]);

  const eventActions = useEventActions(refreshEvents);

  const handleFilterChange = useCallback((filter: EventFilterType) => {
    setEventFilter(filter);
  }, []);

  const refetch = useCallback(async () => {
    await refreshEvents();
  }, [refreshEvents]);

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

  return {
    events,
    groupedEvents,
    pastEvents,
    isLoading,
    isRefreshing,
    isLoadingMore,
    error,
    hasMore,
    currentPage,
    eventFilter,
    setEventFilter: handleFilterChange,
    refetch,
    loadMoreEvents,
    handleDetailsPress,
    handleManagePress,
    handleShare,
    eventActions,
  };
};
