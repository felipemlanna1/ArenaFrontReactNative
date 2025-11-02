import { useMemo } from 'react';
import { ArenaColors } from '@/constants';
import { UseFriendsBackgroundReturn } from './typesFriendsBackground';

export const useFriendsBackground = (): UseFriendsBackgroundReturn => {
  const statusBarColor = useMemo(() => ArenaColors.neutral.darkest, []);

  const backgroundImage = useMemo(
    () => require('@/assets/players/backgroud_group.png'),
    []
  );

  return {
    statusBarColor,
    backgroundImage,
  };
};
