import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '../text';
import { BadgeProps } from './typesBadge';
import { useBadge } from './useBadge';
import { styles } from './stylesBadge';

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  removable = false,
  onRemove,
  children,
  testID,
  ...restProps
}) => {
  const { containerStyle, textStyle, handleRemove, canRemove } = useBadge({
    variant,
    size,
    removable,
    onRemove,
  });

  return (
    <View
      style={[styles.container, containerStyle]}
      testID={testID}
      {...restProps}
    >
      <Text variant="bodyPrimary" style={[styles.text, textStyle]}>
        {children}
      </Text>
      {canRemove && (
        <TouchableOpacity
          onPress={handleRemove}
          style={styles.removeButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          testID={testID ? `${testID}-remove` : undefined}
        >
          <Text variant="bodyPrimary" style={[styles.removeText, textStyle]}>
            ×
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export type { BadgeProps } from './typesBadge';
export { useBadge } from './useBadge';
