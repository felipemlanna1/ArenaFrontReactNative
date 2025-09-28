import { ViewStyle, ImageStyle } from 'react-native';
import { SharedValue, AnimatedStyle } from 'react-native-reanimated';
import { SportIconKey } from './sports-icons';

export type SportsLoadingSize = 'xs' | 'sm' | 'md' | 'lg';
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
  config: SportsLoadingConfig;
  animationValues: {
    icon1Opacity: SharedValue<number>;
    icon2Opacity: SharedValue<number>;
    icon3Opacity: SharedValue<number>;
    icon1Scale: SharedValue<number>;
    icon2Scale: SharedValue<number>;
    icon3Scale: SharedValue<number>;
  };
  containerStyle: ViewStyle;
  iconContainerStyle: ViewStyle;
  iconStyle: (index: number) => (ImageStyle | AnimatedStyle<ImageStyle>)[];
}
