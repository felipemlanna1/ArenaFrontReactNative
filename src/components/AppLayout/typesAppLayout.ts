import { ReactNode } from 'react';

export interface AppLayoutProps {
  children: ReactNode;
  onLogout?: () => void;
  onBack?: () => void;
  showBottomNav?: boolean;
  testID?: string;
}
