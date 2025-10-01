import React, { useMemo } from 'react';
import { Text as RNText, Pressable } from 'react-native';
import { useText } from './useText';
import { styles } from './stylesText';
import { TextProps } from './typesText';
export const Text: React.FC<TextProps> = ({
  children,
  variant,
  numberOfLines,
  ellipsizeMode = 'tail',
  adjustsFontSizeToFit = false,
  minimumFontScale = 0.5,
  onPress,
  onLongPress,
  selectable = false,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'text',
  style,
  testID,
  ...restProps
}) => {
  const { computedStyle, processedProps, isInteractive, isHeading } = useText({
    variant,
    style,
    onPress,
    onLongPress,
    numberOfLines,
    ellipsizeMode,
    adjustsFontSizeToFit,
    minimumFontScale,
    selectable,
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
    testID,
  });
  const conditionalStyles = useMemo(() => {
    const styleArray = [styles.baseText];
    if (isInteractive && styles.interactive) {
      styleArray.push(styles.interactive);
    }
    if (isHeading && styles.heading) {
      styleArray.push(styles.heading);
    }
    if (selectable && styles.selectable) {
      styleArray.push(styles.selectable as typeof styles.baseText);
    }
    return styleArray;
  }, [isInteractive, isHeading, selectable]);
  const accessibilityProps = useMemo(
    () => ({
      accessible: true,
      accessibilityLabel:
        accessibilityLabel ||
        (typeof children === 'string' ? children : undefined),
      accessibilityHint,
      accessibilityRole: isInteractive ? 'button' : accessibilityRole,
      importantForAccessibility: 'yes' as const,
    }),
    [
      accessibilityLabel,
      accessibilityHint,
      accessibilityRole,
      isInteractive,
      children,
    ]
  );
  const textProps = useMemo(
    () => ({
      ...restProps,
      ...processedProps,
      ...accessibilityProps,
      testID,
      style: [conditionalStyles, computedStyle],
      allowFontScaling: true,
      maxFontSizeMultiplier: 1.3,
    }),
    [
      restProps,
      processedProps,
      accessibilityProps,
      testID,
      conditionalStyles,
      computedStyle,
    ]
  );
  if (isInteractive) {
    return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={({ pressed }) => [pressed && styles.interactivePressed]}
        accessibilityRole="button"
        testID={testID ? `${testID}-pressable` : undefined}
      >
        {({ pressed }) => (
          <RNText
            {...textProps}
            style={[textProps.style, pressed && styles.interactivePressed]}
          >
            {children}
          </RNText>
        )}
      </Pressable>
    );
  }
  return <RNText {...textProps}>{children}</RNText>;
};
export type { TextProps } from './typesText';
export { useText } from './useText';
