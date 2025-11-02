import { ViewStyle } from 'react-native';

export type RoleType = 'OWNER' | 'ADMIN' | 'MODERATOR' | 'MEMBER';

export type RoleBadgeSize = 'sm' | 'md';

export interface RoleBadgeProps {
  role: RoleType;
  size?: RoleBadgeSize;
  showIcon?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export interface RoleConfig {
  label: string;
  icon: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}
