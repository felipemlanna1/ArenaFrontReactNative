import { ReactNode } from 'react';

export type AppHeaderVariant =
  | 'main'
  | 'secondary'
  | 'secondaryCentered'
  | 'mainWithBack';

export interface HeaderAction {
  icon: string;
  onPress: () => void;
  disabled?: boolean;
  testID?: string;
}

export interface AppHeaderProps {
  variant: AppHeaderVariant;
  title?: string;
  showLogo?: boolean;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightActions?: HeaderAction[];
  rightComponent?: ReactNode;
  testID?: string;
}
