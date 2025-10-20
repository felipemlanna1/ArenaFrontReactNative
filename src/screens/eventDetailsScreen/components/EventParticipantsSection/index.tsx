import React from 'react';
import { View } from 'react-native';
import { Accordion } from '@/components/ui/accordion';
import { Text } from '@/components/ui/text';
import { Event } from '@/services/events/typesEvents';
import { ParticipantListItem } from './components/ParticipantListItem';
import { styles } from './stylesEventParticipantsSection';

interface EventParticipantsSectionProps {
  event: Event;
}

export const EventParticipantsSection: React.FC<
  EventParticipantsSectionProps
> = ({ event }) => {
  const participantCount = event.currentParticipants || 0;
  const participants = event.participants || [];
  const confirmedParticipants = participants.filter(
    p => p.status === 'CONFIRMED' && p.userId !== event.organizerId
  );

  const items = [
    {
      id: 'participants',
      title: `Participantes (${participantCount})`,
      content: (
        <View style={styles.content}>
          {confirmedParticipants.length === 0 ? (
            <Text variant="bodySecondary" style={styles.emptyText}>
              Ainda não há participantes confirmados.
            </Text>
          ) : (
            <View style={styles.listContainer}>
              {confirmedParticipants.map(participant => (
                <ParticipantListItem
                  key={participant.id}
                  participant={participant}
                  isOrganizer={participant.userId === event.organizerId}
                />
              ))}
            </View>
          )}
        </View>
      ),
    },
  ];

  return <Accordion items={items} variant="default" mode="single" />;
};
