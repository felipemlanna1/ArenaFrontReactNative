import { useMemo } from 'react';
import { Platform } from 'react-native';
import { UseKeyboardAwareLayoutReturn } from './typesKeyboardAwareLayout';

export const useKeyboardAwareLayout = (
  enableKeyboardAvoid?: boolean,
  verticalOffset?: number
): UseKeyboardAwareLayoutReturn => {
  const keyboardBehavior = useMemo(() => {
    if (!enableKeyboardAvoid) return undefined;
    return 'padding';
  }, [enableKeyboardAvoid]);

  const keyboardOffset = useMemo(() => {
    if (verticalOffset !== undefined) {
      return verticalOffset;
    }

    return Platform.select({
      ios: 0,
      android: 80,
      default: 0,
    });
  }, [verticalOffset]);

  const shouldEnableAvoid = enableKeyboardAvoid !== false;

  return {
    keyboardBehavior,
    keyboardOffset,
    shouldEnableAvoid,
  };
};
