import { ReactNode } from 'react';
import {
  AppHeaderVariant,
  HeaderAction,
} from '@/components/ui/appHeader/typesAppHeader';

export interface AppLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;

  showHeader?: boolean;
  headerVariant?: AppHeaderVariant;
  headerTitle?: string;
  headerShowLogo?: boolean;
  headerShowBackButton?: boolean;
  headerOnBackPress?: () => void;
  headerRightActions?: HeaderAction[];
  headerRightComponent?: ReactNode;

  testID?: string;
}
