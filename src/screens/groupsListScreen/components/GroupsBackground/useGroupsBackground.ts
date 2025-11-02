import { useMemo } from 'react';
import { ArenaColors } from '@/constants';
import { UseGroupsBackgroundReturn } from './typesGroupsBackground';

export const useGroupsBackground = (): UseGroupsBackgroundReturn => {
  const statusBarColor = useMemo(() => ArenaColors.neutral.darkest, []);

  const backgroundImage = useMemo(
    () => require('@/assets/players/background_friends.png'),
    []
  );

  return {
    statusBarColor,
    backgroundImage,
  };
};
