import { ReactNode } from 'react';

export interface AppLayoutProps {
  children: ReactNode;
  onLogout?: () => void;
  showBottomNav?: boolean;
  testID?: string;
}
