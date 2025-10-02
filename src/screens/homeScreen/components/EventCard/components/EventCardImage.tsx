import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@/components/ui/text';
import { getSportIcon } from '@/config/sportIcons';
import { EventSport } from '@/services/events/typesEvents';
import { styles } from './stylesEventCardImage';

interface EventCardImageProps {
  coverImage?: string;
  sport: EventSport;
  price: number | string;
  isFree: boolean;
  formatPrice: (price: number | string, isFree: boolean) => string;
  testID?: string;
}

export const EventCardImage: React.FC<EventCardImageProps> = ({
  coverImage,
  sport,
  price,
  isFree,
  formatPrice,
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

  if (coverImage) {
    return (
      <View style={styles.container} testID={testID}>
        <Image
          source={{ uri: coverImage }}
          style={styles.image}
          resizeMode="cover"
        />
        {priceBadge}
      </View>
    );
  }

  return (
    <View
      style={[styles.fallbackContainer, { backgroundColor }]}
      testID={`${testID}-fallback`}
    >
      <Image source={iconSource} style={styles.fallbackIcon} resizeMode="contain" />
      {priceBadge}
    </View>
  );
};
