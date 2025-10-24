import React from 'react';
import { View } from 'react-native';
import { Accordion } from '@/components/ui/accordion';
import { Text } from '@/components/ui/text';
import { Event } from '@/services/events/typesEvents';
import { ParticipantListItem } from './components/ParticipantListItem';
import { useEventManagement } from '@/screens/eventDetailsScreen/hooks/useEventManagement';
import { styles } from './stylesEventParticipantsSection';

interface EventParticipantsSectionProps {
  event: Event;
  isOwner?: boolean;
  onRefresh?: () => void;
}

export const EventParticipantsSection: React.FC<
  EventParticipantsSectionProps
> = ({ event, isOwner = false, onRefresh }) => {
  const participantCount = event.currentParticipants || 0;
  const participants = event.participants || [];

  const {
    isManaging,
    handleApprove,
    handleReject,
    handleRemove,
    handleCancelInvitation,
  } = useEventManagement({
    eventId: event.id,
    onSuccess: onRefresh,
  });

  const confirmedParticipants = participants.filter(
    p => p.status === 'CONFIRMED'
  );
  const pendingParticipants = participants.filter(p => p.status === 'PENDING');
  const invitedParticipants = participants.filter(p => p.status === 'INVITED');

  const sortParticipants = (participants: typeof confirmedParticipants) => {
    return [...participants].sort((a, b) => {
      if (a.userId === event.organizerId) return -1;
      if (b.userId === event.organizerId) return 1;
      return 0;
    });
  };

  const renderPendingList = () => {
    return (
      <View style={styles.content}>
        <View style={styles.listContainer}>
          {pendingParticipants.map(participant => (
            <ParticipantListItem
              key={participant.id}
              participant={participant}
              isOrganizer={participant.userId === event.organizerId}
              isOwner={isOwner}
              isManaging={isManaging}
              onApprove={() => handleApprove(participant.userId)}
              onReject={() => handleReject(participant.userId)}
            />
          ))}
        </View>
      </View>
    );
  };

  const renderConfirmedList = () => {
    const sortedConfirmed = sortParticipants(confirmedParticipants);

    return (
      <View style={styles.content}>
        {sortedConfirmed.length === 0 ? (
          <Text variant="bodySecondary" style={styles.emptyText}>
            Ainda não há participantes confirmados.
          </Text>
        ) : (
          <View style={styles.listContainer}>
            {sortedConfirmed.map(participant => (
              <ParticipantListItem
                key={participant.id}
                participant={participant}
                isOrganizer={participant.userId === event.organizerId}
                isOwner={isOwner}
                isManaging={isManaging}
                onRemove={() => handleRemove(participant.userId)}
              />
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderInvitedList = () => {
    return (
      <View style={styles.content}>
        {invitedParticipants.length === 0 ? (
          <Text variant="bodySecondary" style={styles.emptyText}>
            Ainda não há usuários convidados.
          </Text>
        ) : (
          <View style={styles.listContainer}>
            {invitedParticipants.map(participant => (
              <ParticipantListItem
                key={participant.id}
                participant={participant}
                isOrganizer={participant.userId === event.organizerId}
                isOwner={isOwner}
                isManaging={isManaging}
                onRemove={() => handleCancelInvitation(participant.userId)}
              />
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderAllParticipants = () => {
    const allParticipants = isOwner
      ? [...pendingParticipants, ...sortParticipants(confirmedParticipants)]
      : sortParticipants(confirmedParticipants);

    return (
      <View style={styles.content}>
        {allParticipants.length === 0 ? (
          <Text variant="bodySecondary" style={styles.emptyText}>
            Ainda não há participantes confirmados.
          </Text>
        ) : (
          <View style={styles.listContainer}>
            {allParticipants.map(participant => (
              <ParticipantListItem
                key={participant.id}
                participant={participant}
                isOrganizer={participant.userId === event.organizerId}
                isOwner={isOwner}
                isManaging={isManaging}
                onApprove={
                  participant.status === 'PENDING'
                    ? () => handleApprove(participant.userId)
                    : undefined
                }
                onReject={
                  participant.status === 'PENDING'
                    ? () => handleReject(participant.userId)
                    : undefined
                }
                onRemove={
                  participant.status === 'CONFIRMED'
                    ? () => handleRemove(participant.userId)
                    : undefined
                }
              />
            ))}
          </View>
        )}
      </View>
    );
  };

  const buildAccordionItems = () => {
    const pendingCount = pendingParticipants.length;
    const confirmedCount = confirmedParticipants.length;
    const invitedCount = invitedParticipants.length;

    if (event.privacy === 'APPROVAL_REQUIRED' && isOwner && pendingCount > 0) {
      const items = [
        {
          id: 'pending-requests',
          title: `Solicitações Pendentes (${pendingCount})`,
          content: renderPendingList(),
        },
        {
          id: 'participants',
          title: `Participantes (${confirmedCount})`,
          content: renderConfirmedList(),
        },
      ];

      if (isOwner && invitedCount > 0) {
        items.push({
          id: 'invited',
          title: `Convidados (${invitedCount})`,
          content: renderInvitedList(),
        });
      }

      return items;
    }

    const items = [
      {
        id: 'participants',
        title: `Participantes (${participantCount})`,
        content: renderAllParticipants(),
      },
    ];

    if (isOwner && invitedCount > 0) {
      items.push({
        id: 'invited',
        title: `Convidados (${invitedCount})`,
        content: renderInvitedList(),
      });
    }

    return items;
  };

  const items = buildAccordionItems();
  const hasPendingRequests =
    event.privacy === 'APPROVAL_REQUIRED' &&
    isOwner &&
    pendingParticipants.length > 0;

  return (
    <Accordion
      items={items}
      variant="default"
      mode="multiple"
      defaultExpandedIds={hasPendingRequests ? ['pending-requests'] : undefined}
    />
  );
};
