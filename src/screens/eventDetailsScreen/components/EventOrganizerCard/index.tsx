import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { ArenaColors } from '@/constants';
import { EventOrganizerCardProps } from './typesEventOrganizerCard';
import { styles } from './stylesEventOrganizerCard';

export const EventOrganizerCard: React.FC<EventOrganizerCardProps> = ({
  event,
  isOwner,
  onPress,
}) => {
  // Prioridade de busca do organizador:
  // 1. Campo organizer (objeto completo) - padrão SportPulse
  // 2. Buscar nos participants por userId
  // 3. Se há apenas 1 participante, assumir que é o organizador
  // 4. Fallback para campos legados (organizerName, organizerAvatar)

  const organizerParticipant = event.participants?.find(
    p => p.userId === event.organizerId
  );

  const participantToUse =
    organizerParticipant ||
    (event.participants?.length === 1 ? event.participants[0] : null);

  // Usar organizer object se disponível, senão usar participante encontrado
  const organizerData = event.organizer || participantToUse?.user;

  const organizerName = organizerData
    ? `${organizerData.firstName} ${organizerData.lastName}`
    : event.organizerName || 'Organizador';

  const organizerAvatar = organizerData?.profilePicture || event.organizerAvatar;

  const organizerUsername = organizerData?.username;

  const getInitials = (name: string) => {
    if (!name || typeof name !== 'string') {
      return 'OR';
    }
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const Content = (
    <>
      {organizerAvatar ? (
        <OptimizedImage
          source={{ uri: organizerAvatar }}
          style={styles.avatarImage}
          contentFit="cover"
          priority="normal"
        />
      ) : (
        <View style={styles.avatar}>
          <Text variant="headingPrimary">{getInitials(organizerName)}</Text>
        </View>
      )}

      <View style={styles.info}>
        <View style={styles.labelRow}>
          <Text variant="captionSecondary" style={styles.label}>
            ORGANIZADOR
          </Text>
          {isOwner && (
            <View style={styles.badge}>
              <Text variant="captionSecondary" style={styles.badgeText}>
                VOCÊ
              </Text>
            </View>
          )}
        </View>
        <Text variant="bodyPrimary" style={styles.name}>
          {organizerName}
        </Text>
        {organizerUsername && (
          <Text variant="captionSecondary" style={styles.username}>
            @{organizerUsername}
          </Text>
        )}
      </View>

      {onPress && (
        <View style={styles.chevron}>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={ArenaColors.neutral.medium}
          />
        </View>
      )}
    </>
  );

  if (onPress) {
    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.pressable}
          onPress={onPress}
          activeOpacity={0.7}
        >
          {Content}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.pressable}>{Content}</View>
    </View>
  );
};
