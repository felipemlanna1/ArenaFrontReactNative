import { ViewProps, ImageSourcePropType } from 'react-native';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'error'
  | 'outlined';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends Omit<ViewProps, 'style'> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  removable?: boolean;
  onRemove?: () => void;
  children: string;
  icon?: ImageSourcePropType;
  iconName?: string;
  testID?: string;
}

export interface BadgeVariantConfig {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  textColor: string;
  removeIconColor: string;
}

export interface BadgeSizeConfig {
  paddingVertical: number;
  paddingHorizontal: number;
  fontSize: number;
  borderRadius: number;
}
