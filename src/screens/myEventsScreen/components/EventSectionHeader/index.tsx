import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { ArenaColors } from '@/constants';
import { TimeCategory } from '@/screens/myEventsScreen/typesMyEventsScreen';
import { EventSectionHeaderProps } from './typesEventSectionHeader';
import { styles } from './stylesEventSectionHeader';

const CATEGORY_ICONS: Record<TimeCategory, keyof typeof Ionicons.glyphMap> = {
  today: 'today',
  tomorrow: 'sunny',
  thisWeek: 'calendar',
  thisMonth: 'calendar-outline',
  upcoming: 'calendar-sharp',
};

export const EventSectionHeader: React.FC<EventSectionHeaderProps> = ({
  label,
  category,
  count,
  testID = 'event-section-header',
}) => {
  const iconName = CATEGORY_ICONS[category];

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Ionicons
            name={iconName}
            size={20}
            color={ArenaColors.brand.primary}
            style={styles.icon}
          />
          <Text variant="titlePrimary">{label}</Text>
        </View>
        <View style={styles.badge}>
          <Text variant="captionSecondary" style={styles.badgeText}>
            {count}
          </Text>
        </View>
      </View>
    </View>
  );
};
