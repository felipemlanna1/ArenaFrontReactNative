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
import { storageService } from '@/utils/storage';
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
    console.log('[usePastEventsScreen] fetchData called, user:', user?.id);

    if (!user) {
      console.log('[usePastEventsScreen] No user found, skipping fetch');
      return;
    }

    try {
      setError(null);

      console.log(
        '[usePastEventsScreen] Fetching past events and pending events...'
      );

      const [pastEventsResult, pendingEventsResult] = await Promise.allSettled([
        eventsApi.getUserPastEvents({ limit: 50 }),
        feedbackApi.getPendingEvents(),
      ]);

      let pastEvents: Event[] = [];
      let pendingEvents: Event[] = [];

      if (pastEventsResult.status === 'fulfilled') {
        pastEvents = pastEventsResult.value;
        console.log(
          '[usePastEventsScreen] Past events fetched:',
          pastEvents.length
        );

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
            } catch (error) {
              console.warn(
                `[usePastEventsScreen] Failed to check feedback for event ${event.id}:`,
                error
              );
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
        console.log(
          '[usePastEventsScreen] Events with feedback:',
          eventsWithFeedbackSet.size
        );
      } else {
        console.error(
          '[usePastEventsScreen] Failed to fetch past events:',
          pastEventsResult.reason
        );
        setError(
          new Error('Falha ao carregar eventos passados. Tente novamente.')
        );
      }

      if (pendingEventsResult.status === 'fulfilled') {
        pendingEvents = pendingEventsResult.value;
        console.log(
          '[usePastEventsScreen] Pending events fetched:',
          pendingEvents.length
        );
      } else {
        console.warn(
          '[usePastEventsScreen] Failed to fetch pending events - showing events without badges'
        );
      }

      setAllPastEvents(pastEvents);
      setPendingEventsMap(new Map(pendingEvents.map(e => [e.id, e])));
    } catch (err) {
      console.error('[usePastEventsScreen] Error in fetchData:', err);
      setError(err instanceof Error ? err : new Error('Erro desconhecido'));
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    const printJwtToken = async () => {
      try {
        const token = await storageService.getItem('@Arena:access_token');
        console.log('\n========================================');
        console.log('🔑 JWT TOKEN PARA COPIAR:');
        console.log(token);
        console.log('========================================\n');
        console.log('📋 Use este token para testar o endpoint via curl:');
        console.log(
          `curl -X GET "https://your-api-url/api/v1/events/my-events?onlyFutureEvents=false&limit=50" -H "Authorization: Bearer ${token}"`
        );
        console.log('========================================\n');
      } catch (error) {
        console.error('[usePastEventsScreen] Erro ao buscar token:', error);
      }
    };

    if (isFocused) {
      printJwtToken();
      fetchData();
    }
  }, [isFocused, fetchData]);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        if (nextAppState === 'active') {
          console.log('[usePastEventsScreen] App became active, refreshing...');
          fetchData();
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, [fetchData]);

  const enrichedEvents = useMemo(() => {
    console.log('[usePastEventsScreen] enrichedEvents memo triggered');
    console.log('[usePastEventsScreen] user:', user?.id);
    console.log(
      '[usePastEventsScreen] allPastEvents length:',
      allPastEvents.length
    );

    if (!user) {
      console.log('[usePastEventsScreen] No user, returning empty array');
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

    console.log('[usePastEventsScreen] Enriched events:', enriched.length);
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
