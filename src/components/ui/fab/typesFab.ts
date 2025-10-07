import { ReactNode } from 'react';

export type FabSize = 'sm' | 'md' | 'lg';
export type FabVariant = 'primary' | 'secondary';
export type FabPosition = 'bottom-right' | 'bottom-left' | 'bottom-center';

export interface FabProps {
  onPress: () => void;
  icon: ReactNode;
  size?: FabSize;
  variant?: FabVariant;
  position?: FabPosition;
  bottom?: number;
  right?: number;
  left?: number;
  disabled?: boolean;
  testID?: string;
}

export interface FabSizeConfig {
  width: number;
  height: number;
  iconSize: number;
}

export interface FabVariantConfig {
  backgroundColor: string;
  iconColor: string;
  pressedBackgroundColor: string;
}

export interface FabPositionConfig {
  bottom: number;
  right?: number;
  left?: number;
  alignSelf?: 'center';
}

export interface UseFabParams {
  size: FabSize;
  variant: FabVariant;
  position: FabPosition;
  bottom?: number;
  right?: number;
  left?: number;
  disabled: boolean;
}

export interface UseFabReturn {
  sizeConfig: FabSizeConfig;
  variantConfig: FabVariantConfig;
  positionConfig: FabPositionConfig;
  containerStyle: object;
  opacity: number;
}
