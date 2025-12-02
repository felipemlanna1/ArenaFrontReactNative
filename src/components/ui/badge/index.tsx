import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../text';
import { OptimizedImage } from '../optimizedImage';
import { ArenaSpacing } from '@/constants';
import { BadgeProps } from './typesBadge';
import { useBadge } from './useBadge';
import { styles } from './stylesBadge';

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  removable = false,
  onRemove,
  children,
  icon,
  iconName,
  testID,
  ...restProps
}) => {
  const {
    containerStyle,
    textStyle,
    removeIconStyle,
    removeIconSize,
    iconSize,
    handleRemove,
    canRemove,
  } = useBadge({
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
      {icon && (
        <OptimizedImage
          source={icon}
          style={styles.icon}
          contentFit="contain"
          priority="high"
        />
      )}
      {iconName && (
        <Ionicons
          name={iconName as keyof typeof Ionicons.glyphMap}
          size={iconSize}
          color={textStyle.color}
          style={styles.ionicon}
        />
      )}
      <Text variant="bodyPrimary" style={[styles.text, textStyle]}>
        {children}
      </Text>
      {canRemove && (
        <TouchableOpacity
          onPress={handleRemove}
          style={styles.removeButton}
          hitSlop={{
            top: ArenaSpacing.xs,
            bottom: ArenaSpacing.xs,
            left: ArenaSpacing.xs,
            right: ArenaSpacing.xs,
          }}
          testID={testID ? `${testID}-remove` : undefined}
        >
          <Ionicons
            name="close"
            size={removeIconSize}
            color={removeIconStyle.color}
            testID={testID ? `${testID}-remove-icon` : undefined}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export type { BadgeProps } from './typesBadge';
export { useBadge } from './useBadge';
