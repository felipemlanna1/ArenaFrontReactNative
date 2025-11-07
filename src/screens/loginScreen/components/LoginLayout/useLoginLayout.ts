import { useMemo } from 'react';
import { Platform } from 'react-native';
import { UseLoginLayoutReturn } from './typesLoginLayout';

export const useLoginLayout = (): UseLoginLayoutReturn => {
  const isPlatformIOS = useMemo(() => Platform.OS === 'ios', []);

  const keyboardBehavior = useMemo(() => 'padding' as const, []);

  const keyboardVerticalOffset = useMemo(
    () =>
      Platform.select({
        ios: 0,
        android: 0,
        default: 0,
      }),
    []
  );

  const scrollViewProps = useMemo(
    () => ({
      showsVerticalScrollIndicator: false,
      keyboardShouldPersistTaps: 'handled' as const,
    }),
    []
  );

  return {
    keyboardBehavior,
    keyboardVerticalOffset,
    isPlatformIOS,
    scrollViewProps,
  };
};
