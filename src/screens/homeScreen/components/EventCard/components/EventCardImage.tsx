import React from 'react';
import { View, Image } from 'react-native';
import { Symbol } from '@/components/ui/symbol';
import { EventSport } from '@/services/events/typesEvents';
import { styles } from './stylesEventCardImage';

interface EventCardImageProps {
  coverImage?: string;
  sport: EventSport;
  testID?: string;
}

export const EventCardImage: React.FC<EventCardImageProps> = ({
  coverImage,
  sport,
  testID = 'event-card-image',
}) => {
  const backgroundColor = sport.color;

  if (coverImage) {
    return (
      <View style={styles.container} testID={testID}>
        <Image
          source={{ uri: coverImage }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    );
  }

  return (
    <View
      style={[styles.fallbackContainer, { backgroundColor }]}
      testID={`${testID}-fallback`}
    >
      <Symbol size="lg" variant="white" />
    </View>
  );
};
