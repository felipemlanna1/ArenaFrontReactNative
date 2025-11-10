import { useMemo, useState, useEffect } from 'react';
import { Platform, Keyboard } from 'react-native';
import { UseKeyboardAwareLayoutReturn } from './typesKeyboardAwareLayout';

export const useKeyboardAwareLayout = (
  enableKeyboardAvoid?: boolean,
  verticalOffset?: number,
  extraScrollHeight?: number
): UseKeyboardAwareLayoutReturn => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSubscription = Keyboard.addListener(showEvent, () => {
      setIsKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener(hideEvent, () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const keyboardBehavior = useMemo(() => {
    if (!enableKeyboardAvoid) return undefined;
    return 'padding';
  }, [enableKeyboardAvoid]);

  const keyboardOffset = useMemo(() => {
    if (verticalOffset !== undefined) {
      return verticalOffset;
    }

    return Platform.select({
      ios: 100,
      android: 80,
      default: 0,
    });
  }, [verticalOffset]);

  const keyboardPadding = useMemo(() => {
    if (!isKeyboardVisible) return 0;
    return extraScrollHeight ?? 20;
  }, [isKeyboardVisible, extraScrollHeight]);

  const shouldEnableAvoid = enableKeyboardAvoid !== false;

  return {
    keyboardBehavior,
    keyboardOffset,
    shouldEnableAvoid,
    keyboardPadding,
  };
};
