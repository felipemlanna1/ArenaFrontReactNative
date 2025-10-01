import { ReactNode } from 'react';

export interface LoginBackgroundProps {
  children: ReactNode;
}

export interface UseLoginBackgroundReturn {
  statusBarColor: string;
  backgroundImage: ReturnType<typeof require>;
}
