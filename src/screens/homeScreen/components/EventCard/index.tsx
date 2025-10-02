import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ArenaColors } from '@/constants';
import { Text } from '@/components/ui/text';
import { Symbol } from '@/components/ui/symbol';
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

  const { viewButton, actionButton } = useEventCardActions({
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

  const handleActionPress = () => {
    if (onActionPress && actionButton) {
      onActionPress(event.id);
    }
  };

  const backgroundColor = event.sport.color;

  return (
    <View style={styles.container} testID={testID}>
      <EventCardImage
        coverImage={event.coverImage}
        sport={event.sport}
        testID={`${testID}-image`}
      />

      <View style={styles.contentContainer}>
        <Text variant="titlePrimary" numberOfLines={2} style={styles.title}>
          <Text variant="bodyAccent">{event.sport.name}</Text> • {event.title}
        </Text>

        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons
              name="location-outline"
              size={18}
              color={ArenaColors.text.inverse}
            />
          </View>
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
            <View style={styles.infoIcon}>
              <Ionicons
                name="time-outline"
                size={18}
                color={ArenaColors.text.inverse}
              />
            </View>
            <Text variant="bodySecondary" style={styles.dateTimeText}>
              {formatDate(event.startDate)} • {formatTime(event.startDate)}
            </Text>
          </View>
          {event.isFree || parseFloat(String(event.price)) === 0 ? (
            <View style={styles.priceSuccessBadge}>
              <Text variant="labelPrimary" style={styles.priceSuccessText}>
                GRATUITO
              </Text>
            </View>
          ) : (
            <Text variant="bodyPrimary" style={styles.priceText}>
              {formatPrice(event.price, event.isFree)}
            </Text>
          )}
        </View>

        <View style={styles.progressContainer}>
          <ProgressBar
            current={event.currentParticipants}
            max={event.maxParticipants}
          />
        </View>

        <View style={styles.progressRow}>
          <Text variant="bodySecondary" style={styles.locationText}>
            {event.currentParticipants}/{event.maxParticipants} vagas
          </Text>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShare}
            testID={`${testID}-share`}
          >
            <Ionicons
              name="share-outline"
              size={16}
              color={ArenaColors.neutral.medium}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.actionsRow}>
          {actionButton && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleActionPress}
              testID={actionButton.testID}
            >
              <Text variant="labelPrimary" style={styles.actionButtonText}>
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
