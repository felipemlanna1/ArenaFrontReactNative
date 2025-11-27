import React, { forwardRef, useImperativeHandle } from 'react';
import { View, TouchableOpacity, TextInput, Platform } from 'react-native';
import { Text } from '@/components/ui/text';
import { useOTPInput } from './useOTPInput';
import { styles } from './stylesOTPInput';
import { OTPInputProps, OTPInputRef } from './typesOTPInput';

export const OTPInput = forwardRef<OTPInputRef, OTPInputProps>(
  (
    {
      value,
      onChange,
      length = 6,
      disabled = false,
      error,
      onComplete,
      style,
      testID,
    },
    ref
  ) => {
    const hook = useOTPInput({
      value,
      onChange,
      length,
      disabled,
      onComplete,
    });

    useImperativeHandle(ref, () => ({
      focus: hook.focus,
      blur: hook.blur,
      clear: hook.clear,
    }));

    const getDigitBoxStyle = (digit: string, index: number) => {
      const isCurrentPosition = value.length === index && hook.isFocused;
      const isFilled = digit !== '';

      return [
        styles.digitBox,
        isCurrentPosition && styles.digitBoxFocused,
        isFilled && styles.digitBoxFilled,
        error && styles.digitBoxError,
        disabled && styles.digitBoxDisabled,
      ];
    };

    return (
      <View style={[styles.container, style]} testID={testID}>
        <TouchableOpacity
          style={styles.digitsContainer}
          onPress={hook.handlePress}
          disabled={disabled}
          activeOpacity={0.7}
        >
          {hook.digits.map((digit, index) => (
            <View key={index} style={getDigitBoxStyle(digit, index)}>
              <Text variant="headingPrimary">{digit || '•'}</Text>
            </View>
          ))}
        </TouchableOpacity>

        <TextInput
          ref={hook.inputRef}
          value={value}
          onChangeText={hook.handleChange}
          onFocus={hook.handleFocus}
          onBlur={hook.handleBlur}
          keyboardType="number-pad"
          maxLength={length}
          autoComplete="one-time-code"
          textContentType={Platform.OS === 'ios' ? 'oneTimeCode' : 'none'}
          editable={!disabled}
          style={styles.hiddenInput}
          testID={`${testID}-input`}
        />

        {error && (
          <Text variant="captionError" style={styles.errorText}>
            {error}
          </Text>
        )}
      </View>
    );
  }
);

OTPInput.displayName = 'OTPInput';
