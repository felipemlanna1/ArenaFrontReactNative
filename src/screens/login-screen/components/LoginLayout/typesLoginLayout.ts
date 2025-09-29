import { ReactNode } from 'react';

export interface LoginLayoutProps {
  children: ReactNode;
}

export interface UseLoginLayoutReturn {
  keyboardBehavior: 'padding' | 'height' | undefined;
  isPlatformIOS: boolean;
  scrollViewProps: {
    showsVerticalScrollIndicator: boolean;
    keyboardShouldPersistTaps: 'handled' | 'never' | 'always';
  };
}
