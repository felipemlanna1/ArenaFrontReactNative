import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ArenaColors } from '@/constants';
import { Text } from '@/components/ui/text';
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

  const handlePress = () => {
    onPress(event.id);
  };

  const handleShare = () => {
    onShare(event.id);
  };

  const handleActionPress = (buttonType?: string) => {
    if (onActionPress && actionButton) {
      onActionPress(event.id);
    }
  };

  const handleSecondaryActionPress = () => {
    if (onActionPress && secondaryActionButton) {
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
        formatPrice={formatPrice}
        testID={`${testID}-image`}
      />

      <View style={styles.contentContainer}>
        <Text numberOfLines={2} style={styles.title}>
          <Text variant="titleAccent">{event.sport.name}</Text>{' '}
          <Text variant="titlePrimary">{event.title}</Text>
        </Text>

        <View style={styles.infoRow}>
          <Ionicons
            name="location-outline"
            size={18}
            color={ArenaColors.text.inverse}
          />
          <Text
            variant="bodySecondary"
            numberOfLines={1}
            style={styles.locationText}
          >
            {event.location.city}
          </Text>
          {event.distance !== undefined && (
            <Text variant="bodyMuted" style={styles.distanceText}>
              • {formatDistance(event.distance)}
            </Text>
          )}
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
        </View>

        <View style={styles.progressContainer}>
          <ProgressBar
            current={event.currentParticipants}
            max={event.maxParticipants}
          />
        </View>

        <View style={styles.actionsRow}>
          {secondaryActionButton && (
            <TouchableOpacity
              style={[
                styles.actionButton,
                secondaryActionButton.variant === 'outline' &&
                  styles.outlineButton,
              ]}
              onPress={handleSecondaryActionPress}
              testID={secondaryActionButton.testID}
            >
              <Text
                variant="labelPrimary"
                style={[
                  styles.actionButtonText,
                  secondaryActionButton.variant === 'outline' &&
                    styles.outlineButtonText,
                ]}
              >
                {secondaryActionButton.label}
              </Text>
            </TouchableOpacity>
          )}

          {actionButton && (
            <TouchableOpacity
              style={[
                styles.actionButton,
                actionButton.variant === 'danger' && styles.dangerButton,
                actionButton.variant === 'outline' && styles.outlineButton,
              ]}
              onPress={handleActionPress}
              testID={actionButton.testID}
            >
              <Text
                variant="labelPrimary"
                style={[
                  styles.actionButtonText,
                  actionButton.variant === 'danger' && styles.dangerButtonText,
                  actionButton.variant === 'outline' && styles.outlineButtonText,
                ]}
              >
                {actionButton.label}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.viewButton}
            onPress={handlePress}
            testID={viewButton.testID}
          >
            <Text variant="labelPrimary" style={styles.viewButtonText}>
              {viewButton.label}
            </Text>
            <Ionicons
              name="arrow-forward"
              size={16}
              color={ArenaColors.text.inverse}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
