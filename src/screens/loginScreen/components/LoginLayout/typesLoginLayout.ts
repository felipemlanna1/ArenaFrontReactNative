import { ReactNode } from 'react';

export interface LoginLayoutProps {
  children: ReactNode;
  verticalAlign?: 'center' | 'top';
}

export interface UseLoginLayoutReturn {
  keyboardBehavior: 'padding' | 'height' | undefined;
  keyboardVerticalOffset: number;
  isPlatformIOS: boolean;
  scrollViewProps: {
    showsVerticalScrollIndicator: boolean;
    keyboardShouldPersistTaps: 'handled' | 'never' | 'always';
  };
}
