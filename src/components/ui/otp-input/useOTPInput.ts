import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { TextInput } from 'react-native';
import { UseOTPInputParams, UseOTPInputReturn } from './typesOTPInput';

export const useOTPInput = ({
  value,
  onChange,
  length,
  disabled,
  onComplete,
}: UseOTPInputParams): UseOTPInputReturn => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const digits = useMemo(() => {
    const digitArray = value.split('');
    return Array.from({ length }, (_, index) => digitArray[index] || '');
  }, [value, length]);

  useEffect(() => {
    if (value.length === length && onCompleteRef.current) {
      onCompleteRef.current(value);
    }
  }, [value, length]);

  const handlePress = useCallback(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  const handleChange = useCallback(
    (text: string) => {
      if (disabled) return;

      const cleanText = text.replace(/[^0-9]/g, '').slice(0, length);
      onChange(cleanText);
    },
    [disabled, length, onChange]
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const focus = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const blur = useCallback(() => {
    inputRef.current?.blur();
  }, []);

  const clear = useCallback(() => {
    onChange('');
    inputRef.current?.focus();
  }, [onChange]);

  return {
    digits,
    isFocused,
    inputRef,
    handlePress,
    handleChange,
    handleFocus,
    handleBlur,
    focus,
    blur,
    clear,
  };
};
