import React from 'react';
import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ArenaColors } from '@/constants';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { AvatarStack } from '@/components/ui/avatarStack';
import { EventCardImage } from './components/EventCardImage';
import { ProgressBar } from './components/ProgressBar';
import { EventCardProps } from './typesEventCard';
import { useEventCard } from './useEventCard';
import { useEventCardActions } from './hooks/useEventCardActions';
import { haptic } from '@/utils/haptics';
import { styles } from './stylesEventCard';

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onDetailsPress,
  onManagePress,
  onShare,
  onJoinEvent,
  onRequestJoin,
  onCancelParticipation,
  onUndoRequest,
  onAcceptInvitation,
  onRejectInvitation,
  isActionLoading = false,
  currentActionEventId,
  testID = 'event-card',
}) => {
  const { formatDate, formatTime, formatPrice, formatDistance } =
    useEventCard();

  const { viewButton, actionButton, secondaryActionButton } =
    useEventCardActions({
      userEventStatus: event.userEventStatus,
      privacy: event.privacy,
      currentParticipants: event.currentParticipants,
      maxParticipants: event.maxParticipants,
      isLoading: isActionLoading,
      currentActionEventId,
      eventId: event.id,
      invitationId: event.invitationId,
    });

  const getButtonVariant = (
    variant:
      | 'primary'
      | 'secondary'
      | 'outline'
      | 'danger'
      | 'outline-light'
      | 'outline-primary'
  ):
    | 'primary'
    | 'secondary'
    | 'subtle'
    | 'destructive'
    | 'outline-light'
    | 'outline-primary' => {
    switch (variant) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'secondary';
      case 'outline':
        return 'subtle';
      case 'danger':
        return 'destructive';
      case 'outline-light':
        return 'outline-light';
      case 'outline-primary':
        return 'outline-primary';
      default:
        return 'secondary';
    }
  };

  const handleViewPress = () => {
    haptic.light();
    onDetailsPress(event.id);
  };

  const handleShare = () => {
    haptic.light();
    onShare(event.id);
  };

  const handleCardPress = () => {
    haptic.light();
    onDetailsPress(event.id);
  };

  const handleActionPress = async () => {
    if (!actionButton) return;

    haptic.medium();

    switch (actionButton.type) {
      case 'manage':
        onManagePress?.(event.id);
        break;
      case 'join':
        await onJoinEvent?.(event.id);
        break;
      case 'request':
        await onRequestJoin?.(event.id);
        break;
      case 'cancel':
        await onCancelParticipation?.(event.id);
        break;
      case 'undo':
        await onUndoRequest?.(event.id);
        break;
      case 'accept':
        await onAcceptInvitation?.(event.id, event.invitationId);
        break;
    }
  };

  const handleSecondaryActionPress = async () => {
    if (!secondaryActionButton) return;

    if (secondaryActionButton.type === 'reject') {
      await onRejectInvitation?.(event.id, event.invitationId);
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
      ]}
      onPress={handleCardPress}
      testID={testID}
    >
      <EventCardImage
        coverImage={event.coverImage}
        sport={event.sport}
        price={event.price}
        isFree={event.isFree}
        distance={event.distance}
        privacy={event.privacy}
        group={event.group}
        formatPrice={formatPrice}
        formatDistance={formatDistance}
        testID={`${testID}-image`}
      />

      <View style={styles.divider} />

      <View style={styles.contentContainer}>
        <Text variant="titleSecondary" numberOfLines={2} style={styles.title}>
          <Text variant="titleSecondary">{event.sport.name}</Text>
          <Text variant="bodySecondary"> • </Text>
          {event.title}
        </Text>

        <View style={styles.infoRow}>
          <View style={styles.infoContent}>
            <Ionicons
              name="location-outline"
              size={20}
              color={ArenaColors.brand.primary}
            />
            <Text variant="bodyPrimary" style={styles.addressText}>
              {event.location.city}
            </Text>
          </View>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            onPress={handleShare}
            testID={`${testID}-share`}
          >
            <Ionicons
              name="share-outline"
              size={24}
              color={ArenaColors.brand.primary}
            />
          </Button>
        </View>

        <View style={styles.dateTimeRow}>
          <View style={styles.dateTimeContainer}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={ArenaColors.brand.primary}
            />
            <Text variant="bodyPrimary" style={styles.dateTimeText}>
              {formatDate(event.startDate)} • {formatTime(event.startDate)}
            </Text>
          </View>
        </View>

        {event.participants && event.participants.length > 0 && (
          <View style={styles.participantsRow}>
            <AvatarStack
              participants={event.participants.map(p => ({
                id: p.id,
                userId: p.user.id,
                name: `${p.user.firstName} ${p.user.lastName}`,
                profileImage: p.user.profilePicture,
              }))}
              maxVisible={4}
              testID={`${testID}-avatars`}
            />
            <Text variant="captionSecondary" style={styles.participantsText}>
              {event.currentParticipants}/{event.maxParticipants} confirmados
            </Text>
          </View>
        )}

        <View style={styles.progressContainer}>
          <ProgressBar
            current={event.currentParticipants}
            max={event.maxParticipants}
          />
        </View>

        <View style={styles.actionsRow}>
          <View style={styles.buttonWrapper}>
            <Button
              variant={getButtonVariant(viewButton.variant)}
              size="sm"
              onPress={handleViewPress}
              testID={viewButton.testID}
              loading={viewButton.loading}
              disabled={viewButton.disabled}
              rightIcon={({ size, color }) => (
                <Ionicons name="arrow-forward" size={size} color={color} />
              )}
              fullWidth
            >
              {viewButton.label}
            </Button>
          </View>

          {actionButton && (
            <View style={styles.buttonWrapper}>
              <Button
                variant={getButtonVariant(actionButton.variant)}
                size="sm"
                onPress={handleActionPress}
                testID={actionButton.testID}
                loading={actionButton.loading}
                disabled={actionButton.disabled}
                fullWidth
              >
                {actionButton.label}
              </Button>
            </View>
          )}

          {secondaryActionButton && (
            <View style={styles.buttonWrapper}>
              <Button
                variant={getButtonVariant(secondaryActionButton.variant)}
                size="sm"
                onPress={handleSecondaryActionPress}
                testID={secondaryActionButton.testID}
                loading={secondaryActionButton.loading}
                disabled={secondaryActionButton.disabled}
                fullWidth
              >
                {secondaryActionButton.label}
              </Button>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};
