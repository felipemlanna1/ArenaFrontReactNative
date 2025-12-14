import { useMemo } from 'react';
import { ArenaColors } from '@/constants';
import { UseLoginBackgroundReturn } from './typesLoginBackground';

export const useLoginBackground = (): UseLoginBackgroundReturn => {
  const statusBarColor = useMemo(() => ArenaColors.neutral.darkest, []);

  const backgroundImage = useMemo(
    () => require('@/assets/players/loginBg.jpg'),
    []
  );

  return {
    statusBarColor,
    backgroundImage,
  };
};
