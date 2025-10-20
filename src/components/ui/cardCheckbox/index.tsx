import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { CardCheckboxProps } from './typesCardCheckbox';
import { styles } from './stylesCardCheckbox';

export const CardCheckbox: React.FC<CardCheckboxProps> = ({
  label,
  checked,
  onPress,
  icon,
  testID = 'card-checkbox',
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, checked && styles.containerChecked]}
      onPress={onPress}
      testID={testID}
      activeOpacity={0.7}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={label}
    >
      {icon && <Text variant="headingPrimary">{icon}</Text>}
      <Text variant="labelPrimary" style={styles.label}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
