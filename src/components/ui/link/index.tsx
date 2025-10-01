import React from 'react';
import { Pressable, Text } from 'react-native';
import { LinkProps } from './typesLink';
import { useLink } from './useLink';
import './stylesLink';

export const Link: React.FC<LinkProps> = ({
  children,
  onPress,
  size = 'md',
  variant = 'primary',
  disabled = false,
  underline = false,
  style,
  testID,
}) => {
  const linkLogic = useLink({
    disabled,
    size,
    variant,
    underline,
    onPress,
  });

  return (
    <Pressable
      onPress={linkLogic.handlePress}
      onPressIn={linkLogic.handlePressIn}
      onPressOut={linkLogic.handlePressOut}
      disabled={linkLogic.isInteractionDisabled}
      testID={testID}
      accessibilityRole="link"
      accessibilityState={{ disabled }}
      style={{ flexShrink: 1 }}
    >
      <Text style={[linkLogic.computedStyles.text, style]}>{children}</Text>
    </Pressable>
  );
};
