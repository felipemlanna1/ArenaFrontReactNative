import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { ArenaColors } from '@/constants';
import { EventParticipant } from '@/services/events/typesEvents';
import { ParticipantActions } from './ParticipantActions';
import { styles } from './stylesParticipantListItem';

interface ParticipantListItemProps {
  participant: EventParticipant;
  isOrganizer?: boolean;
  isOwner?: boolean;
  onApprove?: () => void;
  onReject?: () => void;
  onRemove?: () => void;
  isManaging?: boolean;
}

export const ParticipantListItem: React.FC<ParticipantListItemProps> = ({
  participant,
  isOrganizer = false,
  isOwner = false,
  onApprove,
  onReject,
  onRemove,
  isManaging = false,
}) => {
  const navigation = useNavigation();
  const { user } = participant;
  const fullName = `${user.firstName} ${user.lastName}`;

  const handleNavigateToProfile = () => {
    (
      navigation as { navigate: (screen: string, params?: unknown) => void }
    ).navigate('Profile', {
      userId: user.id,
    });
  };

  const getInitials = () => {
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  };

  const getStatusBadgeText = () => {
    switch (participant.status) {
      case 'PENDING':
        return 'Pendente';
      case 'INVITED':
        return 'Convidado';
      case 'REJECTED':
        return 'Rejeitado';
      case 'CANCELLED':
        return 'Cancelou';
      case 'CONFIRMED':
      default:
        return null;
    }
  };

  const statusBadgeText = getStatusBadgeText();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchableContent}
        onPress={handleNavigateToProfile}
        activeOpacity={0.7}
      >
        {user.profilePicture ? (
          <OptimizedImage
            source={{ uri: user.profilePicture }}
            style={styles.avatar}
            contentFit="cover"
            priority="normal"
          />
        ) : (
          <View style={styles.avatarFallback}>
            <Text variant="bodyPrimary" style={styles.initialsText}>
              {getInitials()}
            </Text>
          </View>
        )}

        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text variant="bodyPrimary" style={styles.name} numberOfLines={1}>
              {fullName}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={ArenaColors.neutral.medium}
              style={styles.chevronIcon}
            />
            {isOrganizer && (
              <View style={styles.organizerBadge}>
                <Text
                  variant="captionSecondary"
                  style={styles.organizerBadgeText}
                >
                  ORGANIZADOR
                </Text>
              </View>
            )}
            {statusBadgeText && (
              <View style={styles.statusBadge}>
                <Text variant="captionSecondary" style={styles.statusBadgeText}>
                  {statusBadgeText}
                </Text>
              </View>
            )}
          </View>

          {user.username && (
            <Text variant="captionSecondary" style={styles.username}>
              @{user.username}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      <ParticipantActions
        status={participant.status}
        isOwner={isOwner}
        isOrganizer={isOrganizer}
        onApprove={onApprove}
        onReject={onReject}
        onRemove={onRemove}
        isManaging={isManaging}
      />
    </View>
  );
};
