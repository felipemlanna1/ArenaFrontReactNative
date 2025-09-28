import React, { useRef, useMemo } from 'react';
import { View, TextInput, TouchableOpacity, Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import { SportsLoading } from '../sports-loading';
import { Text } from '@/components/text';
import { ArenaColors } from '@/constants';
import { InputProps, FloatingLabelProps, SimpleLabelProps, ClearButtonProps } from './typesInput';
import { useInput, useInputAccessibility } from './useInput';
import { useLoadingAnimation } from './inputAnimations';
import { getInputSize, getInputVariant } from './inputVariants';
import { styles } from './stylesInput';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const SimpleLabel: React.FC<SimpleLabelProps> = ({
  label,
  size,
  variant,
  required,
  disabled,
}) => {
  const sizeConfig = getInputSize(size);
  const variantConfig = getInputVariant(variant);

  const labelStyle = {
    fontSize: sizeConfig.label.fontSize,
    marginBottom: sizeConfig.label.marginBottom,
    color: disabled ? ArenaColors.disabled.text : variantConfig.labelColor,
    alignSelf: 'flex-start' as const,
  };

  return (
    <Text variant="labelPrimary" style={labelStyle}>
      {label}
      {required && <Text variant="captionSecondary" style={styles.requiredAsterisk}> *</Text>}
    </Text>
  );
};

const ClearButton: React.FC<ClearButtonProps> = ({
  onPress,
  size,
  variant,
  disabled,
  disableAnimations,
  testID,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={styles.clearButton}
      testID={testID}
      hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
    >
      <View style={styles.clearIcon} />
    </TouchableOpacity>
  );
};

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  variant = 'default',
  size = 'md',
  disabled = false,
  loading = false,
  readonly = false,
  error,
  success,
  warning,
  required = false,
  label,
  helperText,
  fullWidth = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  clearable = false,
  autoFocus = false,
  selectTextOnFocus = false,
  disableAnimations = false,
  haptic = true,
  style,
  inputStyle,
  containerStyle,
  testID,
  ...textInputProps
}) => {
  const inputRef = useRef<TextInput>(null);

  const inputLogic = useInput({
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
    placeholder,
    required,
    clearable,
    fullWidth,
    disableAnimations,
    haptic,
    onChangeText,
    onFocus: () => textInputProps.onFocus?.(undefined as any),
    onBlur: () => textInputProps.onBlur?.(undefined as any),
    onClear: () => {},
  });

  const accessibility = useInputAccessibility(
    label,
    value,
    placeholder,
    disabled,
    Boolean(error),
    Boolean(success),
    required,
    helperText
  );

  const loadingAnimation = useLoadingAnimation(loading, disableAnimations);

  const helperMessage = useMemo(() => {
    if (error && typeof error === 'string') return error;
    if (success && typeof success === 'string') return success;
    if (warning && typeof warning === 'string') return warning;
    return helperText;
  }, [error, success, warning, helperText]);

  const ViewComponent = disableAnimations ? View : AnimatedView;
  const TextInputComponent = disableAnimations ? TextInput : AnimatedTextInput;

  return (
    <ViewComponent
      style={[
        inputLogic.computedStyles.container,
        containerStyle,
        !disableAnimations && inputLogic.animatedStyles.animatedContainerStyle,
      ]}
    >
      {inputLogic.shouldShowLabel && label && (
        <View>
          <SimpleLabel
            label={label}
            size={size}
            variant={variant}
            required={required}
            disabled={disabled}
          />
        </View>
      )}

      <Pressable
        onPress={inputLogic.handlers.handlePress}
        disabled={inputLogic.isInteractionDisabled}
        style={[
          inputLogic.computedStyles.inputContainer,
          !disableAnimations && inputLogic.animatedStyles.animatedInputStyle,
          style,
        ]}
      >
        {LeftIcon && (
          <View style={inputLogic.computedStyles.leftIconContainer}>
            <LeftIcon
              size={inputLogic.iconProps.size}
              color={inputLogic.iconProps.color}
            />
          </View>
        )}

        <TextInputComponent
          ref={inputRef}
          value={value}
          onChangeText={inputLogic.handlers.handleChangeText}
          onFocus={inputLogic.handlers.handleFocus}
          onBlur={inputLogic.handlers.handleBlur}
          placeholder={!inputLogic.shouldShowLabel || !inputLogic.isFocused ? placeholder : undefined}
          placeholderTextColor={inputLogic.variantConfig.placeholderColor}
          editable={!inputLogic.isInteractionDisabled && !readonly}
          selectTextOnFocus={selectTextOnFocus}
          autoFocus={autoFocus}
          style={[
            inputLogic.computedStyles.input,
            inputStyle,
          ]}
          testID={testID}
          {...accessibility}
          {...textInputProps}
        />

        {loading && (
          <AnimatedView
            style={[
              styles.loadingContainer,
              loadingAnimation.animatedLoadingStyle,
            ]}
          >
            <SportsLoading
              size="xs"
              animationSpeed="normal"
              testID={`${testID}-loading`}
            />
          </AnimatedView>
        )}

        {inputLogic.shouldShowClearButton && (
          <ClearButton
            onPress={inputLogic.handlers.handleClear}
            size={size}
            variant={variant}
            disabled={disabled}
            disableAnimations={disableAnimations}
            testID={`${testID}-clear`}
          />
        )}

        {RightIcon && !loading && !inputLogic.shouldShowClearButton && (
          <View style={inputLogic.computedStyles.rightIconContainer}>
            <RightIcon
              size={inputLogic.iconProps.size}
              color={inputLogic.iconProps.color}
            />
          </View>
        )}

        {!disableAnimations && (
          <AnimatedView
            style={[
              inputLogic.computedStyles.focusRing,
              {
                opacity: inputLogic.animationValues.focusRingOpacity,
              },
            ]}
          />
        )}
      </Pressable>

      {inputLogic.shouldShowHelperText && helperMessage && (
        <Text
          variant="captionSecondary"
          style={inputLogic.computedStyles.helperText}
        >
          {helperMessage}
        </Text>
      )}
    </ViewComponent>
  );
};

export type { InputProps } from './typesInput';
export { useInput, useInputAccessibility } from './useInput';