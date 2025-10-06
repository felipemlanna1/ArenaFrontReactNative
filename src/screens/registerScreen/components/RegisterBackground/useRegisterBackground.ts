import { useMemo } from 'react';
import { ArenaColors } from '@/constants';
import { UseRegisterBackgroundReturn } from './typesRegisterBackground';

export const useRegisterBackground = (): UseRegisterBackgroundReturn => {
  const statusBarColor = useMemo(() => ArenaColors.neutral.darkest, []);

  const backgroundImage = useMemo(
    () => require('@/assets/players/voleibol.webp'),
    []
  );

  return {
    statusBarColor,
    backgroundImage,
  };
};
