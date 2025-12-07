import React, { useCallback } from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArenaColors } from '@/constants';
import { PulsatingBadge } from '../PulsatingBadge';
import type { EnrichedPastEvent } from '../../typesPastEventsScreen';
import { styles } from './stylesPastEventCard';

interface PastEventCardProps {
  event: EnrichedPastEvent;
  onDetailsPress: (eventId: string) => void;
  onFeedbackPress: (eventId: string) => void;
}

export const PastEventCard = React.memo<PastEventCardProps>(
  ({ event, onDetailsPress, onFeedbackPress }) => {
    const handleDetailsPress = useCallback(() => {
      onDetailsPress(event.id);
    }, [onDetailsPress, event.id]);

    const handleFeedbackPress = useCallback(() => {
      onFeedbackPress(event.id);
    }, [onFeedbackPress, event.id]);

    const participantsCount = event.participants?.length || 0;
    const formattedDate = format(
      new Date(event.startDate),
      "dd/MM/yyyy '•' HH:mm",
      { locale: ptBR }
    );

    return (
      <View style={styles.card}>
        {event.shouldPulsate ? (
          <View style={styles.badgeContainer}>
            <PulsatingBadge variant={event.badgeVariant}>
              {event.badgeText}
            </PulsatingBadge>
          </View>
        ) : (
          event.badgeText && (
            <View style={styles.badgeContainer}>
              <Badge variant={event.badgeVariant}>{event.badgeText}</Badge>
            </View>
          )
        )}

        <View style={styles.header}>
          <Text variant="titlePrimary">{event.title}</Text>
          <Text variant="captionSecondary">{formattedDate}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="basketball-outline"
            size={16}
            color={ArenaColors.neutral.medium}
          />
          <Text variant="bodySecondary">{event.sport.name}</Text>

          <View style={styles.infoSeparator} />

          <Ionicons
            name="location-outline"
            size={16}
            color={ArenaColors.neutral.medium}
          />
          <Text variant="bodySecondary" numberOfLines={1}>
            {event.location.city}
          </Text>
        </View>

        {participantsCount === 0 ? (
          <View style={styles.warningContainer}>
            <Ionicons
              name="information-circle-outline"
              size={16}
              color={ArenaColors.semantic.warning}
            />
            <Text variant="labelPrimary">Nenhum participante confirmado</Text>
          </View>
        ) : (
          <View style={styles.infoRow}>
            <Ionicons
              name="people-outline"
              size={16}
              color={ArenaColors.neutral.medium}
            />
            <Text variant="bodySecondary">
              {participantsCount}{' '}
              {participantsCount === 1 ? 'participante' : 'participantes'}
            </Text>
          </View>
        )}

        <View style={styles.actions}>
          <Button variant="secondary" size="md" onPress={handleDetailsPress}>
            Ver Detalhes
          </Button>

          {event.isPendingWithin7Days && participantsCount > 0 && (
            <Button variant="primary" size="md" onPress={handleFeedbackPress}>
              Dar Feedback
            </Button>
          )}
        </View>
      </View>
    );
  },
  (prev, next) => {
    return (
      prev.event.id === next.event.id &&
      prev.event.badgeVariant === next.event.badgeVariant &&
      prev.event.badgeText === next.event.badgeText &&
      prev.event.shouldPulsate === next.event.shouldPulsate &&
      prev.event.isPendingWithin7Days === next.event.isPendingWithin7Days
    );
  }
);

PastEventCard.displayName = 'PastEventCard';
