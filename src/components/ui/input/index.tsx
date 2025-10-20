import React, { useMemo } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SportsLoading } from '../sportsLoading';
import type { SportsLoadingSize } from '../sportsLoading/typesSportsLoading';
import { Text } from '../text';
import { Label } from '../label';
import { ArenaColors } from '@/constants';
import { InputProps, ClearButtonProps } from './typesInput';
import { useInput, useInputAccessibility } from './useInput';
import { getInputTypeConfig } from './inputVariants';
import { styles } from './stylesInput';

const LOADING_SPINNER_SIZE: SportsLoadingSize = 'xs';

const ClearButton: React.FC<ClearButtonProps> = ({
  onPress,
  size: _size,
  variant: _variant,
  disabled,
  disableAnimations: _disableAnimations,
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
      <Ionicons
        name="close-circle"
        size={16}
        color={ArenaColors.neutral.medium}
      />
    </TouchableOpacity>
  );
};

export const Input = React.memo<InputProps>(
  ({
    value = '',
    onChangeText,
    placeholder,
    type = 'text',
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
    showPasswordToggle = true,
    onSearch,
    debounceMs = 300,
    autoSearch = false,
    showSearchIcon = true,
    rows = 4,
    maxRows = 10,
    autoGrow = true,
    style,
    inputStyle,
    containerStyle,
    testID,
    ...textInputProps
  }) => {
    const inputRef = React.useRef<TextInput | null>(null);
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const searchTimeout = React.useRef<NodeJS.Timeout | undefined>(undefined);

    const typeConfig = React.useMemo(() => getInputTypeConfig(type), [type]);

    const inputLogic = useInput({
      value: value || '',
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
      onFocus: () =>
        textInputProps.onFocus?.(
          {} as NativeSyntheticEvent<TextInputFocusEventData>
        ),
      onBlur: () =>
        textInputProps.onBlur?.(
          {} as NativeSyntheticEvent<TextInputFocusEventData>
        ),
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

    const handlePasswordToggle = React.useCallback(() => {
      setIsPasswordVisible(prev => !prev);
    }, []);

    const handleSearchChange = React.useCallback(
      (text: string) => {
        inputLogic.handlers.handleChangeText(text);

        if (autoSearch && onSearch) {
          if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
          }
          searchTimeout.current = setTimeout(() => {
            onSearch(text);
          }, debounceMs);
        }
      },
      [inputLogic.handlers, autoSearch, onSearch, debounceMs]
    );

    const handleSearchSubmit = React.useCallback(() => {
      if (onSearch) {
        onSearch(value);
      }
    }, [onSearch, value]);

    React.useEffect(() => {
      return () => {
        if (searchTimeout.current) {
          clearTimeout(searchTimeout.current);
        }
      };
    }, []);

    const shouldShowPasswordToggle = type === 'password' && showPasswordToggle;
    const effectiveSecureTextEntry = type === 'password' && !isPasswordVisible;

    const effectiveLeftIcon =
      type === 'search' && showSearchIcon ? undefined : LeftIcon;
    const effectiveRightIcon = shouldShowPasswordToggle ? undefined : RightIcon;

    const helperMessage = useMemo(() => {
      if (error && typeof error === 'string') return error;
      if (success && typeof success === 'string') return success;
      if (warning && typeof warning === 'string') return warning;
      return helperText;
    }, [error, success, warning, helperText]);

    return (
      <View style={[inputLogic.computedStyles.container, containerStyle]}>
        {inputLogic.shouldShowLabel && label && (
          <Label
            variant="form"
            required={required}
            disabled={disabled}
            testID={testID ? `${testID}-label` : undefined}
          >
            {label}
          </Label>
        )}

        <Pressable
          onPress={inputLogic.handlers.handlePress}
          disabled={inputLogic.isInteractionDisabled}
          style={[inputLogic.computedStyles.inputContainer, style]}
        >
          {type === 'search' && showSearchIcon && (
            <View style={inputLogic.computedStyles.leftIconContainer}>
              <Ionicons
                name="search-outline"
                size={inputLogic.iconProps.size}
                color={inputLogic.iconProps.color}
              />
            </View>
          )}

          {effectiveLeftIcon && (
            <View style={inputLogic.computedStyles.leftIconContainer}>
              {React.createElement(effectiveLeftIcon, {
                size: inputLogic.iconProps.size,
                color: inputLogic.iconProps.color,
              })}
            </View>
          )}

          <TextInput
            ref={inputRef}
            value={value}
            onChangeText={
              type === 'search'
                ? handleSearchChange
                : inputLogic.handlers.handleChangeText
            }
            onFocus={inputLogic.handlers.handleFocus}
            onBlur={inputLogic.handlers.handleBlur}
            onSubmitEditing={type === 'search' ? handleSearchSubmit : undefined}
            placeholder={
              !inputLogic.shouldShowLabel || !inputLogic.isFocused
                ? placeholder
                : undefined
            }
            placeholderTextColor={inputLogic.variantConfig.placeholderColor}
            editable={!inputLogic.isInteractionDisabled && !readonly}
            selectTextOnFocus={selectTextOnFocus}
            autoFocus={autoFocus}
            keyboardType={typeConfig.keyboardType}
            autoCapitalize={typeConfig.autoCapitalize}
            autoComplete={typeConfig.autoComplete}
            textContentType={typeConfig.textContentType}
            secureTextEntry={effectiveSecureTextEntry}
            multiline={typeConfig.multiline}
            numberOfLines={typeConfig.multiline ? rows : 1}
            maxLength={
              typeConfig.multiline && maxRows ? maxRows * 50 : undefined
            }
            style={[
              inputLogic.computedStyles.input,
              typeConfig.multiline && {
                height: rows * 20,
                textAlignVertical: 'top',
              },
              inputStyle,
            ]}
            testID={testID}
            {...accessibility}
            {...textInputProps}
          />

          {loading && (
            <View style={styles.loadingContainer}>
              <SportsLoading
                size={LOADING_SPINNER_SIZE}
                animationSpeed="normal"
                testID={`${testID}-loading`}
              />
            </View>
          )}

          {inputLogic.shouldShowClearButton && !shouldShowPasswordToggle && (
            <ClearButton
              onPress={inputLogic.handlers.handleClear}
              size={size}
              variant={variant}
              disabled={disabled}
              disableAnimations={disableAnimations}
              testID={`${testID}-clear`}
            />
          )}

          {shouldShowPasswordToggle && (
            <TouchableOpacity
              onPress={handlePasswordToggle}
              style={styles.clearButton}
              testID={`${testID}-password-toggle`}
              hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
            >
              <Ionicons
                name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                size={inputLogic.iconProps.size}
                color={inputLogic.iconProps.color}
              />
            </TouchableOpacity>
          )}

          {effectiveRightIcon &&
            !loading &&
            !inputLogic.shouldShowClearButton &&
            !shouldShowPasswordToggle && (
              <View style={inputLogic.computedStyles.rightIconContainer}>
                {React.createElement(effectiveRightIcon, {
                  size: inputLogic.iconProps.size,
                  color: inputLogic.iconProps.color,
                })}
              </View>
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
      </View>
    );
  }
);

export type { InputProps, InputType } from './typesInput';
export { useInput, useInputAccessibility } from './useInput';
