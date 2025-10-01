import { ReactNode } from 'react';

export interface RegisterBackgroundProps {
  children: ReactNode;
}

export interface UseRegisterBackgroundReturn {
  statusBarColor: string;
  backgroundImage: number;
}
