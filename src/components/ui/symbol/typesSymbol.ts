import { ViewStyle } from 'react-native';
export type SymbolSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type SymbolVariant =
  | 'variant1'
  | 'variant2'
  | 'variant3'
  | 'variant4'
  | 'black'
  | 'white';
export interface SymbolProps {
  size?: SymbolSize;
  variant?: SymbolVariant;
  style?: ViewStyle | ViewStyle[];
  testID?: string;
}
