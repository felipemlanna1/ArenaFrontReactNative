import { useCallback, useMemo, useState, useRef } from 'react';
import { TextInput, ViewStyle, TextStyle } from 'react-native';
import { AnimatedStyle } from 'react-native-reanimated';
import {
  UseInputParams,
  UseInputReturn,
  InputAccessibilityProps,
} from './typesInput';
import { getInputVariant, getInputSize } from './inputVariants';
import { useInputAnimations } from './inputAnimations';
import { styles } from './stylesInput';

export const useInput = (params: UseInputParams): UseInputReturn => {
  const {
    value,
    variant,
    size,
    disabled,
    loading,
    readonly,
    error,
    success,
    warning,
    label,
    required,
    clearable,
    fullWidth,
    disableAnimations,
    haptic,
    onChangeText,
    onFocus,
    onBlur,
    onClear,
  } = params;

  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const hasValue = useMemo(() => value.length > 0, [value]);
  const hasError = useMemo(() => Boolean(error), [error]);
  const hasSuccess = useMemo(
    () => Boolean(success) && !hasError,
    [success, hasError]
  );
  const hasWarning = useMemo(
    () => Boolean(warning) && !hasError && !hasSuccess,
    [warning, hasError, hasSuccess]
  );

  const isInteractionDisabled = disabled || loading;
  const shouldShowLabel = Boolean(label);
  const shouldShowHelperText = Boolean(
    (hasError && typeof error === 'string') ||
      (hasSuccess && typeof success === 'string') ||
      (hasWarning && typeof warning === 'string')
  );
  const shouldShowClearButton =
    clearable && hasValue && !disabled && !readonly && !loading;

  const variantConfig = useMemo(() => {
    if (hasError) return getInputVariant('error');
    if (hasSuccess) return getInputVariant('success');
    if (hasWarning) return getInputVariant('warning');
    return getInputVariant(variant);
  }, [variant, hasError, hasSuccess, hasWarning]);

  const sizeConfig = useMemo(() => getInputSize(size), [size]);

  const inputConfig = useMemo(
    () => ({
      height: sizeConfig.container.height,
      fontSize: sizeConfig.text.fontSize,
      paddingHorizontal: sizeConfig.container.paddingHorizontal,
      paddingVertical: sizeConfig.container.paddingVertical,
      iconSize: sizeConfig.icon.size,
      borderRadius: sizeConfig.container.borderRadius,
      borderWidth: 1.5,
    }),
    [sizeConfig]
  );

  const animations = useInputAnimations(
    variant,
    disabled,
    readonly,
    isFocused,
    hasValue,
    hasError,
    hasSuccess,
    haptic,
    disableAnimations
  );

  const handleFocus = useCallback(() => {
    if (isInteractionDisabled) return;

    setIsFocused(true);
    animations.triggerFocusAnimation();
    onFocus?.();
  }, [isInteractionDisabled, animations, onFocus]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    animations.triggerBlurAnimation();
    onBlur?.();
  }, [animations, onBlur]);

  const handleChangeText = useCallback(
    (text: string) => {
      if (isInteractionDisabled) return;
      onChangeText(text);
    },
    [isInteractionDisabled, onChangeText]
  );

  const handleClear = useCallback(() => {
    if (isInteractionDisabled) return;
    onChangeText('');
    onClear?.();
    inputRef.current?.focus();
  }, [isInteractionDisabled, onChangeText, onClear]);

  const handlePress = useCallback(() => {
    if (isInteractionDisabled) return;
    inputRef.current?.focus();
  }, [isInteractionDisabled]);

  const computedStyles = useMemo(() => {
    const containerStyles = [styles.container];
    if (fullWidth) containerStyles.push(styles.containerFullWidth);

    const inputContainerStyles = [
      styles.inputContainer,
      styles[`${size}Container` as keyof typeof styles],
    ];

    if (disabled) {
      inputContainerStyles.push(styles.inputContainerDisabled);
    } else if (readonly) {
      inputContainerStyles.push(styles.inputContainerReadonly);
    } else if (isFocused) {
      inputContainerStyles.push(styles.inputContainerFocused);
      if (hasError) inputContainerStyles.push(styles.inputContainerError);
      else if (hasSuccess)
        inputContainerStyles.push(styles.inputContainerSuccess);
      else if (hasWarning)
        inputContainerStyles.push(styles.inputContainerWarning);
    } else {
      if (hasError) inputContainerStyles.push(styles.inputContainerError);
      else if (hasSuccess)
        inputContainerStyles.push(styles.inputContainerSuccess);
      else if (hasWarning)
        inputContainerStyles.push(styles.inputContainerWarning);
    }

    if (isFocused && !disabled && !readonly) {
      inputContainerStyles.push(styles.shadowFocused);
    } else if (hasError) {
      inputContainerStyles.push(styles.shadowError);
    } else {
      inputContainerStyles.push(styles.shadow);
    }

    const inputStyles = [
      styles.input,
      styles[`${size}Input` as keyof typeof styles],
      {
        fontSize: sizeConfig.text.fontSize,
        lineHeight: sizeConfig.text.lineHeight,
        color: variantConfig.textColor,
      },
    ];

    if (disabled) inputStyles.push(styles.inputDisabled);
    else if (readonly) inputStyles.push(styles.inputReadonly);

    const labelStyles = [
      styles.label,
      styles[`${size}Label` as keyof typeof styles],
      {
        fontSize: sizeConfig.label.fontSize,
        color: variantConfig.labelColor,
      },
    ];

    if (isFocused || hasValue) {
      labelStyles.push(styles.labelFloating);
    }

    if (disabled) {
      labelStyles.push(styles.labelDisabled);
    } else if (isFocused) {
      labelStyles.push(styles.labelFocused);
    } else if (hasError) {
      labelStyles.push(styles.labelError);
    } else if (hasSuccess) {
      labelStyles.push(styles.labelSuccess);
    } else if (hasWarning) {
      labelStyles.push(styles.labelWarning);
    }

    if (required) {
      labelStyles.push(styles.labelRequired);
    }

    const helperTextStyles = [
      styles.helperText,
      styles[`${size}HelperText` as keyof typeof styles],
      {
        fontSize: sizeConfig.helperText.fontSize,
        marginTop: sizeConfig.helperText.marginTop,
      },
    ];

    if (disabled) {
      helperTextStyles.push(styles.helperTextDisabled);
    } else if (hasError) {
      helperTextStyles.push(styles.helperTextError);
    } else if (hasSuccess) {
      helperTextStyles.push(styles.helperTextSuccess);
    } else if (hasWarning) {
      helperTextStyles.push(styles.helperTextWarning);
    }

    return {
      container: containerStyles,
      inputContainer: inputContainerStyles,
      input: inputStyles,
      label: labelStyles,
      helperText: helperTextStyles,
      leftIconContainer: [styles.leftIconContainer],
      rightIconContainer: [styles.rightIconContainer],
      clearButton: [styles.clearButton],
      focusRing: [
        styles.focusRing,
        {
          borderRadius: sizeConfig.container.borderRadius + 3,
          borderColor: variantConfig.focusRingColor,
        },
      ],
    };
  }, [
    fullWidth,
    size,
    disabled,
    readonly,
    isFocused,
    hasError,
    hasSuccess,
    hasWarning,
    required,
    sizeConfig,
    variantConfig,
  ]);

  const iconProps = useMemo(
    () => ({
      size: sizeConfig.icon.size,
      color: variantConfig.iconColor,
    }),
    [sizeConfig.icon.size, variantConfig.iconColor]
  );

  return {
    inputConfig,
    variantConfig,
    sizeConfig,
    isFocused,
    hasValue,
    isInteractionDisabled,
    shouldShowLabel,
    shouldShowHelperText,
    shouldShowClearButton,
    computedStyles,
    animationValues: {
      focusRingOpacity: animations.focusRingOpacity,
      borderColor: animations.borderColor,
      labelY: animations.labelY,
      labelScale: animations.labelScale,
      errorShake: animations.errorShake,
      loadingOpacity: animations.loadingOpacity,
    },
    animatedStyles: {
      animatedContainerStyle:
        animations.animatedContainerStyle as AnimatedStyle<ViewStyle>,
      animatedInputStyle:
        animations.animatedInputStyle as AnimatedStyle<TextStyle>,
      animatedLabelStyle:
        animations.animatedLabelStyle as AnimatedStyle<TextStyle>,
      animatedFocusRingStyle:
        animations.animatedFocusRingStyle as AnimatedStyle<ViewStyle>,
    },
    handlers: {
      handleFocus,
      handleBlur,
      handleChangeText,
      handleClear,
      handlePress,
    },
    iconProps,
  };
};

export const useInputAccessibility = (
  label: string | undefined,
  value: string,
  placeholder: string | undefined,
  disabled: boolean,
  hasError: boolean,
  hasSuccess: boolean,
  required: boolean,
  helperText: string | undefined
): InputAccessibilityProps => {
  return useMemo(() => {
    const accessibilityLabel = label || placeholder || 'Text input';

    let accessibilityHint = '';
    if (required) accessibilityHint += 'Required field. ';
    if (hasError) accessibilityHint += 'Has validation error. ';
    if (hasSuccess) accessibilityHint += 'Validation successful. ';
    if (helperText) accessibilityHint += helperText;

    return {
      accessible: true,
      accessibilityLabel,
      accessibilityHint: accessibilityHint.trim() || undefined,
      accessibilityRole: 'text' as const,
      accessibilityState: {
        disabled,
        selected: false,
        invalid: hasError,
      },
      accessibilityLiveRegion: hasError
        ? ('assertive' as const)
        : ('polite' as const),
    };
  }, [
    label,
    placeholder,
    disabled,
    hasError,
    hasSuccess,
    required,
    helperText,
  ]);
};

export const useInputValidation = (
  value: string,
  rules?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    email?: boolean;
    phone?: boolean;
    custom?: (value: string) => {
      isValid: boolean;
      errors: string[];
      warnings: string[];
    };
  }
) => {
  return useMemo(() => {
    if (!rules) return { isValid: true, errors: [], warnings: [] };

    const errors: string[] = [];
    const warnings: string[] = [];

    if (rules.required && !value.trim()) {
      errors.push('This field is required');
    }

    if (value && rules.minLength && value.length < rules.minLength) {
      errors.push(`Minimum ${rules.minLength} characters required`);
    }

    if (value && rules.maxLength && value.length > rules.maxLength) {
      warnings.push(`Maximum ${rules.maxLength} characters allowed`);
    }

    if (value && rules.pattern && !rules.pattern.test(value)) {
      errors.push('Invalid format');
    }

    if (value && rules.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors.push('Invalid email format');
      }
    }

    if (value && rules.phone) {
      const phoneRegex = /^\+?[\d\s\-()]+$/;
      if (!phoneRegex.test(value)) {
        errors.push('Invalid phone format');
      }
    }

    if (value && rules.custom) {
      const customResult = rules.custom(value);
      errors.push(...customResult.errors);
      warnings.push(...customResult.warnings);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }, [value, rules]);
};
