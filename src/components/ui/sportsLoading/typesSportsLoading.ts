import { ViewStyle, ImageStyle } from 'react-native';
import { AnimatedStyle } from 'react-native-reanimated';
import { SportIconKey } from './sports-icons';

export type SportsLoadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SportsLoadingOrientation = 'horizontal' | 'vertical';
export type SportsLoadingSpeed = 'slow' | 'normal' | 'fast';

export interface SportsLoadingProps {
  size?: SportsLoadingSize;
  orientation?: SportsLoadingOrientation;
  animationSpeed?: SportsLoadingSpeed;
  iconCount?: number;
  style?: ViewStyle;
  testID?: string;
}

export interface SportsLoadingConfig {
  iconSize: number;
  spacing: number;
  animationDuration: number;
  containerPadding: number;
}

export interface UseSportsLoadingParams {
  size: SportsLoadingSize;
  orientation: SportsLoadingOrientation;
  animationSpeed: SportsLoadingSpeed;
  iconCount: number;
}

export interface UseSportsLoadingReturn {
  selectedIcons: SportIconKey[];
  containerStyle: ViewStyle;
  iconContainerStyle: ViewStyle;
  iconStyle: (index: number) => AnimatedStyle<ImageStyle>;
}
