import React, { useState, useCallback, useMemo } from 'react';
import { ArenaColors } from '@/constants';
import {
  UsePasswordInputParams,
  UsePasswordInputReturn,
  PasswordStrength,
  EyeIconProps,
} from './typesPasswordInput';

import { View } from 'react-native';
import { styles } from './stylesPasswordInput';

const EyeIcon: React.FC<EyeIconProps> = ({
  size,
  color,
  isVisible,
  disabled,
}) => {
  const opacity = disabled ? 0.5 : 1;
  const iconSize = size;
  const eyeWidth = iconSize * 0.75;
  const eyeHeight = iconSize * 0.5;
  const pupilSize = iconSize * 0.25;

  return (
    <View
      style={[
        styles.eyeIconContainer,
        {
          width: iconSize,
          height: iconSize,
          opacity,
        },
      ]}
    >
      <View
        style={[
          styles.eyeIcon,
          styles.eyeIconBorder,
          {
            width: eyeWidth,
            height: eyeHeight,
            borderColor: color,
            borderRadius: eyeWidth / 2,
          },
        ]}
      >
        {isVisible && (
          <View
            style={[
              styles.eyeIconPupil,
              {
                width: pupilSize,
                height: pupilSize,
                backgroundColor: color,
                borderRadius: pupilSize / 2,
              },
            ]}
          />
        )}
      </View>

      {!isVisible && (
        <View
          style={[
            styles.eyeIconStrike,
            {
              width: iconSize * 0.9,
              backgroundColor: color,
              transform: [{ rotate: '45deg' }],
            },
          ]}
        />
      )}
    </View>
  );
};

const calculatePasswordStrength = (password: string): PasswordStrength => {
  if (!password) {
    return {
      score: 0,
      label: 'Very Weak',
      color: ArenaColors.semantic.error,
      suggestions: ['Enter a password'],
    };
  }

  let score = 0;
  const suggestions: string[] = [];

  if (password.length >= 8) {
    score += 1;
  } else {
    suggestions.push('Use at least 8 characters');
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    suggestions.push('Add uppercase letters');
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    suggestions.push('Add lowercase letters');
  }

  if (/\d/.test(password)) {
    score += 1;
  } else {
    suggestions.push('Add numbers');
  }

  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    score += 1;
  } else {
    suggestions.push('Add special characters');
  }

  if (password.length >= 12) {
    score = Math.min(score + 1, 4);
  }

  let label: PasswordStrength['label'];
  let color: string;

  switch (score) {
    case 0:
    case 1:
      label = 'Very Weak';
      color = ArenaColors.semantic.error;
      break;
    case 2:
      label = 'Weak';
      color = '#FF8C00';
      break;
    case 3:
      label = 'Fair';
      color = ArenaColors.semantic.warning;
      break;
    case 4:
      label = 'Good';
      color = '#32CD32';
      break;
    case 5:
      label = 'Strong';
      color = ArenaColors.semantic.success;
      break;
    default:
      label = 'Very Weak';
      color = ArenaColors.semantic.error;
  }

  return {
    score: Math.min(score, 4),
    label,
    color,
    suggestions: suggestions.slice(0, 3),
  };
};

export const usePasswordInput = (
  params: UsePasswordInputParams
): UsePasswordInputReturn => {
  const {
    value,
    showStrength,
    strengthMinLength,
    customStrengthValidator,
    onToggleVisibility,
  } = params;

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    onToggleVisibility?.(newVisibility);
  }, [isVisible, onToggleVisibility]);

  const strength = useMemo(() => {
    if (!showStrength || value.length < strengthMinLength) {
      return null;
    }

    if (customStrengthValidator) {
      return customStrengthValidator(value);
    }

    return calculatePasswordStrength(value);
  }, [value, showStrength, strengthMinLength, customStrengthValidator]);

  const shouldShowStrength = showStrength && strength !== null;

  const EyeIconComponent = useCallback(
    ({ size, color }: { size: number; color: string }) => (
      <EyeIcon
        size={size}
        color={color}
        isVisible={isVisible}
        disabled={false}
      />
    ),
    [isVisible]
  );

  return {
    isVisible,
    strength,
    shouldShowStrength,
    toggleVisibility,
    EyeIcon: EyeIconComponent,
  };
};
