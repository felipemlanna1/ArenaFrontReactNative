import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { styles } from './stylesFilterBadge';

export interface FilterBadgeProps {
  count: number;
  isActive: boolean;
  testID?: string;
}

export const FilterBadge: React.FC<FilterBadgeProps> = ({
  count,
  isActive,
  testID = 'filter-badge',
}) => {
  const displayCount = count > 99 ? '99+' : count.toString();

  return (
    <View
      style={[
        styles.badge,
        isActive ? styles.badgeActive : styles.badgeInactive,
      ]}
      testID={testID}
    >
      <Text
        variant="labelPrimary"
        style={isActive ? styles.badgeTextActive : styles.badgeTextInactive}
      >
        {displayCount}
      </Text>
    </View>
  );
};
