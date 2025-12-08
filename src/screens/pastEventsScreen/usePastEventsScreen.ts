import { useState, useEffect, useCallback, useMemo } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { eventsApi } from '@/services/events/eventsApi';
import { feedbackApi } from '@/services/feedback/feedbackApi';
import { Event } from '@/services/events/typesEvents';
import { useAuth } from '@/contexts/AuthContext';
import { ArenaSpacing } from '@/constants';
import type {
  EnrichedPastEvent,
  UsePastEventsScreenReturn,
} from './typesPastEventsScreen';
import type { RootStackParamList } from '@/navigation/typesNavigation';

const CARD_HEIGHT = 140;
const CARD_MARGIN = ArenaSpacing.md;

export const usePastEventsScreen = (): UsePastEventsScreenReturn => {
  const [allPastEvents, setAllPastEvents] = useState<Event[]>([]);
  const [pendingEventsMap, setPendingEventsMap] = useState<Map<string, Event>>(
    new Map()
  );
  const [eventsWithFeedback, setEventsWithFeedback] = useState<Set<string>>(
    new Set()
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();
  const { user } = useAuth();

  const fetchData = useCallback(async () => {
    if (!user) {
      return;
    }

    try {
      setError(null);

      const [pastEventsResult, pendingEventsResult] = await Promise.allSettled([
        eventsApi.getUserPastEvents({ limit: 50 }),
        feedbackApi.getPendingEvents(),
      ]);

      let pastEvents: Event[] = [];
      let pendingEvents: Event[] = [];

      if (pastEventsResult.status === 'fulfilled') {
        pastEvents = pastEventsResult.value;

        const feedbackChecks = await Promise.allSettled(
          pastEvents.map(async event => {
            try {
              const givenFeedbacks = await feedbackApi.getGivenFeedbacks(
                event.id
              );
              return {
                eventId: event.id,
                hasFeedback: givenFeedbacks.length > 0,
              };
            } catch {
              return {
                eventId: event.id,
                hasFeedback: false,
              };
            }
          })
        );

        const eventsWithFeedbackSet = new Set<string>();
        feedbackChecks.forEach(result => {
          if (result.status === 'fulfilled' && result.value.hasFeedback) {
            eventsWithFeedbackSet.add(result.value.eventId);
          }
        });
        setEventsWithFeedback(eventsWithFeedbackSet);
      } else {
        setError(
          new Error('Falha ao carregar eventos passados. Tente novamente.')
        );
      }

      if (pendingEventsResult.status === 'fulfilled') {
        pendingEvents = pendingEventsResult.value;
      }

      setAllPastEvents(pastEvents);
      setPendingEventsMap(new Map(pendingEvents.map(e => [e.id, e])));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro desconhecido'));
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused, fetchData]);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        if (nextAppState === 'active') {
          fetchData();
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, [fetchData]);

  const enrichedEvents = useMemo(() => {
    if (!user) {
      return [];
    }

    const enriched = allPastEvents.map(event => {
      const isPending = pendingEventsMap.has(event.id);
      const hasFeedbackGiven = eventsWithFeedback.has(event.id);
      const endDate = new Date(event.endDate);
      const daysSinceEnd = Math.floor(
        (Date.now() - endDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      let feedbackStatus: 'pending' | 'completed' | 'expired';
      let badgeVariant: 'primary' | 'success' | 'error';
      let badgeText: string;
      let shouldPulsate = false;

      if (hasFeedbackGiven || (!isPending && daysSinceEnd >= 7)) {
        feedbackStatus = 'completed';
        badgeVariant = 'success';
        badgeText = 'Feedback Concluído ✓';
      } else if (isPending && daysSinceEnd < 7) {
        feedbackStatus = 'pending';
        badgeVariant = 'primary';
        badgeText = 'FEEDBACK PENDENTE!';
        shouldPulsate = true;
      } else if (!isPending && !hasFeedbackGiven && daysSinceEnd < 7) {
        feedbackStatus = 'pending';
        badgeVariant = 'primary';
        badgeText = 'FEEDBACK PENDENTE!';
        shouldPulsate = true;
      } else {
        feedbackStatus = 'expired';
        badgeVariant = 'error';
        badgeText = 'Expirado';
      }

      return {
        ...event,
        feedbackStatus,
        badgeVariant,
        badgeText,
        shouldPulsate,
        daysRemaining: daysSinceEnd < 7 ? 7 - daysSinceEnd : null,
        isPendingWithin7Days: feedbackStatus === 'pending',
        feedbackMarkedCompleted: hasFeedbackGiven,
      };
    });

    return enriched;
  }, [allPastEvents, pendingEventsMap, eventsWithFeedback, user]);

  const refetch = useCallback(async () => {
    setIsRefreshing(true);
    await fetchData();
  }, [fetchData]);

  const navigateToEventDetails = useCallback(
    (eventId: string) => {
      navigation.navigate('EventDetails', { eventId });
    },
    [navigation]
  );

  const navigateToFeedback = useCallback(
    (eventId: string) => {
      navigation.navigate('RateParticipants', { eventId });
    },
    [navigation]
  );

  const keyExtractor = useCallback((item: EnrichedPastEvent) => item.id, []);

  const getItemLayout = useCallback(
    (
      _data: ArrayLike<EnrichedPastEvent> | null | undefined,
      index: number
    ) => ({
      length: CARD_HEIGHT,
      offset: (CARD_HEIGHT + CARD_MARGIN) * index,
      index,
    }),
    []
  );

  return {
    enrichedEvents,
    isLoading,
    isRefreshing,
    error,
    refetch,
    navigateToEventDetails,
    navigateToFeedback,
    keyExtractor,
    getItemLayout,
  };
};
