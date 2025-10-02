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
import { styles } from './stylesEventCard';

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onPress,
  onShare,
  testID = 'event-card',
}) => {
  const { formatDate, formatTime, formatPrice, formatDistance } =
    useEventCard();

  const handlePress = () => {
    onPress(event.id);
  };

  const handleShare = () => {
    onShare(event.id);
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
        <View
          style={[styles.sportBadge, { backgroundColor }]}
          testID={`${testID}-sport-badge`}
        >
          <Symbol size="xs" variant="white" />
          <Text variant="labelPrimary" style={styles.sportBadgeText}>
            {event.sport.name.toUpperCase()}
          </Text>
        </View>

        <Text variant="titlePrimary" numberOfLines={2} style={styles.title}>
          {event.title}
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

        <View style={styles.infoRow}>
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
          <Text variant="bodyPrimary" style={styles.priceText}>
            {formatPrice(event.price, event.isFree)}
          </Text>
        </View>

        <View style={styles.progressContainer}>
          <ProgressBar
            current={event.currentParticipants}
            max={event.maxParticipants}
          />
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShare}
            testID={`${testID}-share`}
          >
            <Ionicons
              name="share-outline"
              size={18}
              color={ArenaColors.neutral.medium}
            />
            <Text variant="bodySecondary" style={styles.shareButtonText}>
              Compartilhar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewButton}
            onPress={handlePress}
            testID={`${testID}-view`}
          >
            <Text variant="labelPrimary" style={styles.viewButtonText}>
              VER
            </Text>
            <Ionicons
              name="arrow-forward"
              size={18}
              color={ArenaColors.text.inverse}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
