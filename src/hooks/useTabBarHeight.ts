import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TAB_BAR_BASE_HEIGHT } from '@/constants';

export const useTabBarHeight = (): number => {
  const insets = useSafeAreaInsets();

  const tabBarHeight = useMemo(() => {
    return TAB_BAR_BASE_HEIGHT + insets.bottom;
  }, [insets.bottom]);

  return tabBarHeight;
};
