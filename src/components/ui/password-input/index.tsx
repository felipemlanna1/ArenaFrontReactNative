import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, interpolate } from 'react-native-reanimated';
import { Input } from '../input';
import { Text } from '@/components/text';
import { ArenaSpacing } from '@/constants';
import { PasswordInputProps, PasswordStrengthIndicatorProps } from './typesPasswordInput';
import { usePasswordInput } from './usePasswordInput';

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
    <View style={{ marginTop: ArenaSpacing.xs }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: ArenaSpacing.xs,
        }}
      >
        <Text
          variant="captionSecondary"
          style={{
            fontSize: size === 'xs' ? 10 : size === 'sm' ? 11 : 12,
          }}
        >
          Password Strength
        </Text>
        <Text
          variant="captionSecondary"
          style={{
            fontSize: size === 'xs' ? 10 : size === 'sm' ? 11 : 12,
            color: strength.color,
            fontWeight: '600',
          }}
        >
          {strength.label}
        </Text>
      </View>

      {/* Progress bar background */}
      <View
        style={{
          width: barWidth,
          height: barHeight,
          backgroundColor: '#2A2A2A',
          borderRadius: barHeight / 2,
          overflow: 'hidden',
        }}
      >
        {/* Progress bar fill */}
        <Animated.View
          style={[
            {
              height: '100%',
              backgroundColor: strength.color,
              borderRadius: barHeight / 2,
            },
            animatedStyle,
          ]}
        />
      </View>

      {/* Suggestions */}
      {strength.suggestions.length > 0 && (
        <View style={{ marginTop: ArenaSpacing.xs }}>
          {strength.suggestions.slice(0, 2).map((suggestion, index) => (
            <Text
              key={index}
              variant="captionMuted"
              style={{
                fontSize: size === 'xs' ? 9 : size === 'sm' ? 10 : 11,
                marginTop: index > 0 ? 2 : 0,
              }}
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
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          opacity: inputProps.disabled ? 0.5 : 1,
        }}
      >
        <passwordLogic.EyeIcon size={size} color={color} />
      </TouchableOpacity>
    );
  }, [
    showToggle,
    passwordLogic.toggleVisibility,
    passwordLogic.EyeIcon,
    inputProps.disabled,
    toggleTestID,
  ]);

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