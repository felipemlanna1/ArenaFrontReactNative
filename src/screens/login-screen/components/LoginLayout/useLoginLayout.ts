import { useMemo } from 'react';
import { Platform } from 'react-native';
import { UseLoginLayoutReturn } from './typesLoginLayout';

export const useLoginLayout = (): UseLoginLayoutReturn => {
  const isPlatformIOS = useMemo(() => Platform.OS === 'ios', []);

  const keyboardBehavior = useMemo(
    () => (isPlatformIOS ? 'padding' : undefined),
    [isPlatformIOS]
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
    isPlatformIOS,
    scrollViewProps,
  };
};
