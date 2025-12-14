import { useMemo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import type { ThemeColors } from '@/types/theme';

export const useThemedStyles = <T>(
  createStylesFn: (colors: ThemeColors) => T
): T => {
  const { colors } = useTheme();

  return useMemo(() => createStylesFn(colors), [colors, createStylesFn]);
};
