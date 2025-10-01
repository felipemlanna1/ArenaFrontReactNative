import React from 'react';
import { Pressable, Text } from 'react-native';
import { LinkProps } from './typesLink';
import { useLink } from './useLink';
import { styles } from './stylesLink';

export const Link: React.FC<LinkProps> = ({
  children,
  onPress,
  variant = 'bodyPrimary',
  disabled = false,
  underline = false,
  style,
  testID,
}) => {
  const linkLogic = useLink({
    disabled,
    variant,
    underline,
    onPress,
  });

  return (
    <Pressable
      onPress={linkLogic.handlePress}
      disabled={linkLogic.isInteractionDisabled}
      testID={testID}
      accessibilityRole="link"
      accessibilityState={{ disabled }}
      style={styles.pressable}
    >
      {({ pressed }) => (
        <Text style={[linkLogic.getTextStyle(pressed), style]}>{children}</Text>
      )}
    </Pressable>
  );
};
