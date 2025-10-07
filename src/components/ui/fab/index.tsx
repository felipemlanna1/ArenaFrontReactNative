import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FabProps } from './typesFab';
import { useFab } from './useFab';
import { styles } from './stylesFab';

export const Fab: React.FC<FabProps> = ({
  onPress,
  icon,
  size = 'md',
  variant = 'primary',
  position = 'bottom-right',
  bottom,
  right,
  left,
  disabled = false,
  testID,
}) => {
  const { containerStyle, opacity } = useFab({
    size,
    variant,
    position,
    bottom,
    right,
    left,
    disabled,
  });

  return (
    <TouchableOpacity
      style={[styles.fab, containerStyle, { opacity }]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      testID={testID}
    >
      {icon}
    </TouchableOpacity>
  );
};
