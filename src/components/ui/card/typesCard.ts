import { ViewProps, ViewStyle } from 'react-native';

export type CardVariant = 'default' | 'outlined' | 'elevated';

export interface CardProps extends Omit<ViewProps, 'onPress'> {
  onPress?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  variant?: CardVariant;
}
