import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Input } from '../input';
import { Text } from '@/components/text';
import {
  PasswordInputProps,
  PasswordStrengthIndicatorProps,
} from './typesPasswordInput';
import { usePasswordInput } from './usePasswordInput';
import { styles } from './stylesPasswordInput';

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  strength,
  size,
  disableAnimations,
}) => {
  const barWidth = useMemo(() => {
    switch (size) {
      case 'xs':
        return 60;
      case 'sm':
        return 80;
      case 'md':
        return 100;
      case 'lg':
        return 120;
      case 'xl':
        return 140;
      default:
        return 100;
    }
  }, [size]);

  const barHeight = useMemo(() => {
    switch (size) {
      case 'xs':
        return 3;
      case 'sm':
        return 4;
      case 'md':
      case 'lg':
      case 'xl':
        return 4;
      default:
        return 4;
    }
  }, [size]);

  const progress = (strength.score / 4) * 100;

  const animatedStyle = useAnimatedStyle(() => {
    if (disableAnimations) {
      return {
        width: `${progress}%`,
      };
    }

    return {
      width: withTiming(`${progress}%`, { duration: 300 }),
    };
  });

  return (
    <View style={styles.strengthContainer}>
      <View style={styles.strengthHeader}>
        <Text
          variant="captionSecondary"
          style={[
            ...(size === 'xs' ? [styles.strengthTextXs] : []),
            ...(size === 'sm' ? [styles.strengthTextSm] : []),
            ...(size === 'md' ? [styles.strengthTextMd] : []),
          ]}
        >
          Password Strength
        </Text>
        <Text
          variant="captionSecondary"
          style={[
            ...(size === 'xs' ? [styles.strengthTextXs] : []),
            ...(size === 'sm' ? [styles.strengthTextSm] : []),
            ...(size === 'md' ? [styles.strengthTextMd] : []),
            styles.strengthLabel,
            { color: strength.color },
          ]}
        >
          {strength.label}
        </Text>
      </View>

      <View
        style={[
          styles.strengthBarContainer,
          { width: barWidth, height: barHeight, borderRadius: barHeight / 2 },
        ]}
      >
        <Animated.View
          style={[
            styles.strengthBar,
            {
              backgroundColor: strength.color,
              borderRadius: barHeight / 2,
            },
            animatedStyle,
          ]}
        />
      </View>

      {strength.suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {strength.suggestions.slice(0, 2).map((suggestion, index) => (
            <Text
              key={index}
              variant="captionMuted"
              style={[
                ...(size === 'xs' ? [styles.suggestionTextXs] : []),
                ...(size === 'sm' ? [styles.suggestionTextSm] : []),
                ...(size === 'md' ? [styles.suggestionTextMd] : []),
                ...(index > 0 ? [styles.suggestionSpacing] : []),
              ]}
            >
              • {suggestion}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export const PasswordInput: React.FC<PasswordInputProps> = ({
  showStrength = false,
  showToggle = true,
  strengthMinLength = 1,
  customStrengthValidator,
  onToggleVisibility,
  toggleTestID,
  ...inputProps
}) => {
  const passwordLogic = usePasswordInput({
    value: inputProps.value,
    showStrength,
    showToggle,
    strengthMinLength,
    customStrengthValidator,
    onToggleVisibility,
  });

  const toggleButton = useMemo(() => {
    if (!showToggle) return undefined;

    return ({ size, color }: { size: number; color: string }) => (
      <TouchableOpacity
        onPress={passwordLogic.toggleVisibility}
        disabled={inputProps.disabled}
        testID={toggleTestID}
        hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
        style={[
          styles.toggleButtonContainer,
          inputProps.disabled && styles.toggleButtonDisabled,
        ]}
      >
        <passwordLogic.EyeIcon size={size} color={color} />
      </TouchableOpacity>
    );
  }, [showToggle, passwordLogic, inputProps.disabled, toggleTestID]);

  return (
    <View>
      <Input
        {...inputProps}
        secureTextEntry={!passwordLogic.isVisible}
        rightIcon={toggleButton}
        autoComplete="password"
        textContentType="password"
      />

      {passwordLogic.shouldShowStrength && passwordLogic.strength && (
        <PasswordStrengthIndicator
          strength={passwordLogic.strength}
          size={inputProps.size || 'md'}
          disableAnimations={inputProps.disableAnimations}
        />
      )}
    </View>
  );
};

export type { PasswordInputProps } from './typesPasswordInput';
export { usePasswordInput } from './usePasswordInput';
