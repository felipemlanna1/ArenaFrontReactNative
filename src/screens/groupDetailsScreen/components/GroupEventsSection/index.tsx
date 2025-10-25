import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { Event } from '@/services/events/typesEvents';
import { groupsApi } from '@/services/groups/groupsApi';
import { GroupEventsSectionProps } from './typesGroupEventsSection';
import { styles } from './stylesGroupEventsSection';

export const GroupEventsSection: React.FC<GroupEventsSectionProps> = ({
  groupId,
  canCreateEvents,
  onCreateEvent,
}) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

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

  useEffect(() => {
    fetchGroupEvents();
  }, [fetchGroupEvents]);

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
          {events?.slice(0, 3).map(event => (
            <View key={event.id} style={styles.eventCard}>
              <Text variant="bodyBoldAccent">{event.title}</Text>
              <Text variant="captionSecondary">
                {new Date(event.startDate).toLocaleDateString('pt-BR')}
              </Text>
            </View>
          ))}
          {events && events.length > 3 && (
            <Text variant="captionSecondary" style={styles.emptyText}>
              +{events.length - 3} eventos
            </Text>
          )}
        </View>
      )}
    </View>
  );
};
