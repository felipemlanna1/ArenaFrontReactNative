import React from 'react';
import { View, Pressable, ViewStyle } from 'react-native';
import { CardProps } from './typesCard';
import { styles } from './stylesCard';

export const Card: React.FC<CardProps> = ({
  onPress,
  disabled = false,
  children,
  style,
  variant = 'default',
  ...rest
}) => {
  const variantStyles: Record<string, ViewStyle> = {
    default: styles.default,
    outlined: styles.outlined,
    elevated: styles.elevated,
  };

  const combinedStyles = [
    styles.container,
    variantStyles[variant],
    ...(Array.isArray(style) ? style : style ? [style] : []),
  ].filter(Boolean);

  if (!onPress) {
    return (
      <View style={combinedStyles} {...rest}>
        {children}
      </View>
    );
  }

  return (
    <Pressable
      style={combinedStyles}
      onPress={onPress}
      disabled={disabled}
      {...rest}
    >
      {children}
    </Pressable>
  );
};
