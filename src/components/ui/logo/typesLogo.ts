import { ViewStyle } from 'react-native';

export type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type LogoVariant =
  | 'variant1'
  | 'variant2'
  | 'variant3'
  | 'variant4'
  | 'black'
  | 'white';

export interface LogoProps {
  size?: LogoSize;
  variant?: LogoVariant;
  style?: ViewStyle | ViewStyle[];
  testID?: string;
}
