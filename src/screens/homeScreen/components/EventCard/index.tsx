import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ArenaColors } from '@/constants';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { EventCardImage } from './components/EventCardImage';
import { ProgressBar } from './components/ProgressBar';
import { EventCardProps } from './typesEventCard';
import { useEventCard } from './useEventCard';
import { useEventCardActions } from './hooks/useEventCardActions';
import { styles } from './stylesEventCard';

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onPress,
  onShare,
  onActionPress,
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

  const handlePress = () => {
    onPress(event.id);
  };

  const handleShare = () => {
    onShare(event.id);
  };

  const handleActionPress = () => {
    if (onActionPress) {
      onActionPress(event.id);
    }
  };

  const handleSecondaryActionPress = () => {
    if (onActionPress) {
      onActionPress(event.id);
    }
  };

  return (
    <View style={styles.container} testID={testID}>
      <EventCardImage
        coverImage={event.coverImage}
        sport={event.sport}
        price={event.price}
        isFree={event.isFree}
        distance={event.distance}
        formatPrice={formatPrice}
        formatDistance={formatDistance}
        testID={`${testID}-image`}
      />

      <View style={styles.contentContainer}>
        <Text variant="bodyPrimary" numberOfLines={2} style={styles.title}>
          <Text variant="bodyBoldAccent">{event.sport.name}</Text>
          <Text variant="bodySecondary"> • </Text>
          {event.title}
        </Text>

        <View style={styles.infoRow}>
          <View style={styles.infoContent}>
            <Ionicons
              name="location-outline"
              size={18}
              color={ArenaColors.text.inverse}
            />
            <Text variant="bodySecondary" style={styles.addressText}>
              {event.location.city}
            </Text>
          </View>
          <TouchableOpacity onPress={handleShare} testID={`${testID}-share`}>
            <Ionicons
              name="share-outline"
              size={24}
              color={ArenaColors.brand.primary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.dateTimeRow}>
          <View style={styles.dateTimeContainer}>
            <Ionicons
              name="time-outline"
              size={18}
              color={ArenaColors.text.inverse}
            />
            <Text variant="bodySecondary" style={styles.dateTimeText}>
              {formatDate(event.startDate)} • {formatTime(event.startDate)}
            </Text>
          </View>
          <Text variant="bodySecondary" style={styles.slotsText}>
            {event.currentParticipants}/{event.maxParticipants} vagas
          </Text>
        </View>

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
              onPress={handlePress}
              testID={viewButton.testID}
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
                fullWidth
              >
                {secondaryActionButton.label}
              </Button>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
