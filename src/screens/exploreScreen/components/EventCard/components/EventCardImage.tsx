import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/text';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { PrivacyBadge } from '@/components/ui/privacyBadge';
import { ArenaColors } from '@/constants';
import { getSportIcon } from '@/config/sportIcons';
import {
  EventSport,
  EventPrivacy,
  EventGroup,
} from '@/services/events/typesEvents';
import { styles } from './stylesEventCardImage';

interface EventCardImageProps {
  coverImage?: string;
  sport: EventSport;
  price: number | string;
  isFree: boolean;
  distance?: number;
  privacy: EventPrivacy;
  group?: EventGroup;
  formatPrice: (price: number | string, isFree: boolean) => string;
  formatDistance: (distance: number) => string;
  testID?: string;
}

export const EventCardImage: React.FC<EventCardImageProps> = ({
  coverImage,
  sport,
  price,
  isFree,
  distance,
  privacy,
  group,
  formatPrice,
  formatDistance,
  testID = 'event-card-image',
}) => {
  const backgroundColor = sport.color;
  const isGratuito = isFree || parseFloat(String(price)) === 0;
  const iconSource = getSportIcon(sport.icon);

  const priceBadge = (
    <View
      style={[
        styles.priceBadge,
        isGratuito ? styles.priceSuccessBadge : styles.pricePrimaryBadge,
      ]}
    >
      <Text variant="labelPrimary" style={styles.priceText}>
        {isGratuito ? 'GRATUITO' : formatPrice(price, isFree)}
      </Text>
    </View>
  );

  const distanceBadge = (
    <View style={styles.distanceBadge}>
      <Ionicons
        name="location-outline"
        size={12}
        color={ArenaColors.text.inverse}
        style={styles.distanceIcon}
      />
      <Text variant="labelPrimary" style={styles.distanceText}>
        {distance !== undefined ? formatDistance(distance) : '--'}
      </Text>
    </View>
  );

  const privacyBadge = (
    <View style={styles.privacyBadge}>
      <PrivacyBadge
        privacy={privacy}
        groupName={group?.name}
        size="sm"
        testID={`${testID}-privacy`}
      />
    </View>
  );

  if (coverImage) {
    return (
      <View style={styles.container} testID={testID}>
        <OptimizedImage
          source={{ uri: coverImage }}
          style={styles.image}
          contentFit="cover"
          priority="normal"
          loadingSize="sm"
        />
        {priceBadge}
        {distanceBadge}
        {privacyBadge}
      </View>
    );
  }

  return (
    <View
      style={[styles.fallbackContainer, { backgroundColor }]}
      testID={`${testID}-fallback`}
    >
      <OptimizedImage
        source={iconSource}
        style={styles.fallbackIcon}
        contentFit="contain"
        priority="high"
        showLoading={false}
      />
      {priceBadge}
      {distanceBadge}
      {privacyBadge}
    </View>
  );
};
