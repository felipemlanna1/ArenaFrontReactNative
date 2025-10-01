import { ViewStyle } from 'react-native';
export type AppIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export interface AppIconProps {
  size?: AppIconSize;
  style?: ViewStyle | ViewStyle[];
  testID?: string;
}
