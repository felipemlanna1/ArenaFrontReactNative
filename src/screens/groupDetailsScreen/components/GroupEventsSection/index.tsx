import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { Event } from '@/services/events/typesEvents';
import { groupsApi } from '@/services/groups/groupsApi';
import { EventCard } from '@/screens/homeScreen/components/EventCard';
import { useEventActions } from '@/hooks/useEventActions';
import { GroupEventsSectionProps } from './typesGroupEventsSection';
import { styles } from './stylesGroupEventsSection';

const EVENTS_PER_PAGE = 3;

export const GroupEventsSection: React.FC<GroupEventsSectionProps> = ({
  groupId,
  canCreateEvents,
  onCreateEvent,
}) => {
  const navigation = useNavigation();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [displayLimit, setDisplayLimit] = useState(EVENTS_PER_PAGE);

  const fetchGroupEvents = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const groupEvents = await groupsApi.getGroupEvents(groupId);
      setEvents(Array.isArray(groupEvents) ? groupEvents : []);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Erro ao carregar eventos')
      );
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  }, [groupId]);

  const eventActions = useEventActions(fetchGroupEvents);

  useEffect(() => {
    fetchGroupEvents();
  }, [fetchGroupEvents]);

  const handleDetailsPress = useCallback(
    (eventId: string) => {
      // @ts-expect-error - Navigation type limitation
      navigation.navigate('EventDetails', { eventId });
    },
    [navigation]
  );

  const handleManagePress = useCallback(
    (eventId: string) => {
      // @ts-expect-error - Navigation type limitation
      navigation.navigate('EventManagement', { eventId });
    },
    [navigation]
  );

  const handleShare = useCallback(
    async (eventId: string) => {
      const eventData = events.find(e => e.id === eventId);
      if (!eventData) return;
    },
    [events]
  );

  const handleLoadMore = useCallback(() => {
    setDisplayLimit(prev => prev + EVENTS_PER_PAGE);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="titlePrimary">Eventos</Text>
        </View>
        <View style={styles.loadingContainer}>
          <SportsLoading size="md" animationSpeed="normal" />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="titlePrimary">Eventos</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text variant="bodySecondary" style={styles.emptyText}>
            Erro ao carregar eventos
          </Text>
        </View>
      </View>
    );
  }

  const displayedEvents = events.slice(0, displayLimit);
  const hasMore = events.length > displayLimit;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="titlePrimary">
          Eventos {events.length > 0 && `(${events.length})`}
        </Text>
        {canCreateEvents && (
          <Button variant="primary" size="sm" onPress={onCreateEvent}>
            Criar Evento
          </Button>
        )}
      </View>

      {events.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text variant="bodySecondary" style={styles.emptyText}>
            {canCreateEvents
              ? 'Nenhum evento criado. Crie o primeiro evento do grupo!'
              : 'Este grupo ainda não possui eventos'}
          </Text>
        </View>
      ) : (
        <View style={styles.eventsList}>
          {displayedEvents.map(event => (
            <View key={event.id} style={styles.eventCardWrapper}>
              <EventCard
                event={event}
                onDetailsPress={handleDetailsPress}
                onManagePress={handleManagePress}
                onShare={handleShare}
                onJoinEvent={eventActions.handleJoinEvent}
                onRequestJoin={eventActions.handleRequestJoin}
                onCancelParticipation={eventActions.handleCancelParticipation}
                onUndoRequest={eventActions.handleUndoRequest}
                onAcceptInvitation={eventActions.handleAcceptInvitation}
                onRejectInvitation={eventActions.handleRejectInvitation}
                isActionLoading={eventActions.isActionLoading}
                currentActionEventId={eventActions.currentActionEventId}
              />
            </View>
          ))}

          {hasMore && (
            <View style={styles.loadMoreContainer}>
              <Button
                variant="outline-primary"
                size="md"
                onPress={handleLoadMore}
                fullWidth
              >
                Ver mais ({events.length - displayLimit} eventos)
              </Button>
            </View>
          )}
        </View>
      )}
    </View>
  );
};
