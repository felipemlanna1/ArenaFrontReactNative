import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/text';
import { ArenaColors } from '@/constants';
import { EventSport } from '@/services/events/typesEvents';
import { styles } from './stylesSportBadge';

interface SportBadgeProps {
  sport: EventSport;
  testID?: string;
}

const SPORT_ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
  futebol: 'football',
  basquete: 'basketball',
  volei: 'tennisball',
  tenis: 'tennisball',
  corrida: 'walk',
  natacao: 'water',
  ciclismo: 'bicycle',
  yoga: 'body',
  musculacao: 'barbell',
  default: 'fitness',
};

export const SportBadge: React.FC<SportBadgeProps> = ({
  sport,
  testID = 'sport-badge',
}) => {
  const iconName =
    SPORT_ICON_MAP[sport.name.toLowerCase()] || SPORT_ICON_MAP.default;
  const backgroundColor = sport.color || ArenaColors.brand.primary;

  return (
    <View style={[styles.container, { backgroundColor }]} testID={testID}>
      <Ionicons name={iconName} size={14} color={ArenaColors.text.inverse} />
      <Text variant="labelPrimary" style={styles.text}>
        {sport.name.toUpperCase()}
      </Text>
    </View>
  );
};
