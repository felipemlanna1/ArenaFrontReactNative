import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { EventSectionHeaderProps } from './typesEventSectionHeader';
import { styles } from './stylesEventSectionHeader';

export const EventSectionHeader: React.FC<EventSectionHeaderProps> = ({
  label,
  testID = 'event-section-header',
}) => {
  return (
    <View style={styles.container} testID={testID}>
      <Text variant="titlePrimary">{label}</Text>
    </View>
  );
};
