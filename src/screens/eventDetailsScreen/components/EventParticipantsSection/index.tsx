import React, { useState, useCallback, useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Clipboard from 'expo-clipboard';
import { Accordion } from '@/components/ui/accordion';
import { Text } from '@/components/ui/text';
import { ArenaColors } from '@/constants';
import { useAlert } from '@/contexts/AlertContext';
import { Event } from '@/services/events/typesEvents';
import { ParticipantListItem } from './components/ParticipantListItem';
import { useEventManagement } from '@/screens/eventDetailsScreen/hooks/useEventManagement';
import { formatParticipantsList } from './utils/formatParticipantsList';
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
  const participants = useMemo(
    () => event.participants || [],
    [event.participants]
  );

  const { showSuccess, showError } = useAlert();
  const [isCopied, setIsCopied] = useState(false);

  const { isManaging, handleApprove, handleReject, handleRemove } =
    useEventManagement({
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

  const handleCopyParticipants = useCallback(async () => {
    try {
      const formattedList = formatParticipantsList(
        participants,
        event.organizerId,
        {
          includeEventTitle: true,
          eventTitle: event.title,
          sportName: event.sport?.name,
          description: event.description,
          location: event.location,
          startDate: event.startDate,
          endDate: event.endDate,
        }
      );

      await Clipboard.setStringAsync(formattedList);
      showSuccess('Lista de participantes copiada!');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      showError('Não foi possível copiar a lista');
    }
  }, [participants, event, showSuccess, showError]);

  const renderCopyButton = () => {
    const hasParticipants =
      confirmedParticipants.length > 0 ||
      pendingParticipants.length > 0 ||
      invitedParticipants.length > 0;

    if (!hasParticipants) return null;

    return (
      <TouchableOpacity
        onPress={handleCopyParticipants}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Copiar lista de participantes"
        accessibilityHint="Copia a lista formatada para compartilhar via WhatsApp ou outros apps"
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        testID="copy-participants-button"
      >
        <Ionicons
          name="copy-outline"
          size={20}
          color={
            isCopied ? ArenaColors.semantic.success : ArenaColors.brand.primary
          }
        />
      </TouchableOpacity>
    );
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
    const confirmedAndInvited = [
      ...sortParticipants(confirmedParticipants),
      ...invitedParticipants,
    ];

    return (
      <View style={styles.content}>
        {confirmedAndInvited.length === 0 ? (
          <Text variant="bodySecondary" style={styles.emptyText}>
            Ainda não há participantes confirmados.
          </Text>
        ) : (
          <View style={styles.listContainer}>
            {confirmedAndInvited.map(participant => (
              <ParticipantListItem
                key={participant.id}
                participant={participant}
                isOrganizer={participant.userId === event.organizerId}
                isOwner={isOwner}
                isManaging={isManaging}
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

  const renderAllParticipants = () => {
    const allParticipants = isOwner
      ? [
          ...pendingParticipants,
          ...sortParticipants(confirmedParticipants),
          ...invitedParticipants,
        ]
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
    const confirmedCount =
      confirmedParticipants.length + invitedParticipants.length;

    if (event.privacy === 'APPROVAL_REQUIRED' && isOwner && pendingCount > 0) {
      return [
        {
          id: 'pending-requests',
          title: `Solicitações Pendentes (${pendingCount})`,
          content: renderPendingList(),
          headerAction: renderCopyButton(),
        },
        {
          id: 'participants',
          title: `Participantes (${confirmedCount})`,
          content: renderConfirmedList(),
          headerAction: renderCopyButton(),
        },
      ];
    }

    return [
      {
        id: 'participants',
        title: `Participantes (${participantCount})`,
        content: renderAllParticipants(),
        headerAction: renderCopyButton(),
      },
    ];
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
      defaultExpandedIds={
        hasPendingRequests
          ? ['pending-requests', 'participants']
          : ['participants']
      }
    />
  );
};
