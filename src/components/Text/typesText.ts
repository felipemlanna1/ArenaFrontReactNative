import React from 'react';
import { TextStyle, TextProps as RNTextProps } from 'react-native';

export type TextVariant =
  | 'displayPrimary'
  | 'displayAccent'
  | 'headingPrimary'
  | 'headingAccent'
  | 'titlePrimary'
  | 'titleSecondary'
  | 'bodyPrimary'
  | 'bodySecondary'
  | 'bodyMuted'
  | 'bodyError'
  | 'bodySuccess'
  | 'captionSecondary'
  | 'captionMuted'
  | 'captionError'
  | 'labelPrimary'
  | 'labelSecondary'
  | 'labelError';

export type TextSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl';

export type TextWeight =
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold';

export type TextFamily = 'heading' | 'body' | 'ui' | 'mono';

export type TextColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'muted'
  | 'inverse'
  | 'success'
  | 'error'
  | 'warning';

export type TextAlign = 'left' | 'center' | 'right' | 'justify';

export type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';

export interface TextVariantPreset {
  size: TextSize;
  weight: TextWeight;
  family: TextFamily;
  lineHeight: 'tight' | 'comfortable' | 'relaxed' | 'loose';
  letterSpacing: number;
  color?: TextColor;
}

export type TextVariantPresets = Record<TextVariant, TextVariantPreset>;

export interface TextProps extends Omit<RNTextProps, 'style'> {
  children: React.ReactNode;
  variant: TextVariant;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  adjustsFontSizeToFit?: boolean;
  minimumFontScale?: number;
  onPress?: () => void;
  onLongPress?: () => void;
  selectable?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: 'text' | 'button' | 'link' | 'header';
  style?: TextStyle | TextStyle[];
  testID?: string;
}

export interface UseTextReturn {
  computedStyle: TextStyle;
  processedProps: {
    numberOfLines?: number;
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
    adjustsFontSizeToFit?: boolean;
    minimumFontScale?: number;
    selectable?: boolean;
    onPress?: () => void;
    onLongPress?: () => void;
    accessibilityLabel?: string;
    accessibilityHint?: string;
    accessibilityRole?: 'text' | 'button' | 'link' | 'header';
    testID?: string;
  };
  isInteractive: boolean;
  hasEllipsis: boolean;
  isHeading: boolean;
}

export interface UseTextInput {
  variant: TextVariant;
  style?: TextStyle | TextStyle[];
  onPress?: () => void;
  onLongPress?: () => void;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  adjustsFontSizeToFit?: boolean;
  minimumFontScale?: number;
  selectable?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: 'text' | 'button' | 'link' | 'header';
  testID?: string;
}

export interface ComputedTextStyle extends TextStyle {
  fontSize: number;
  fontWeight: TextStyle['fontWeight'];
  fontFamily: string;
  lineHeight: number;
  letterSpacing: number;
  color: string;
  textAlign: TextAlign;
  textTransform: TextTransform;
  includeFontPadding?: boolean;
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
}

export type RequiredTextProps = Required<Pick<TextProps, 'children'>>;
export type OptionalTextProps = Omit<TextProps, 'children'>;
export type TextPropsWithVariant = TextProps &
  Required<Pick<TextProps, 'variant'>>;
export type TextStyleOverride = Partial<ComputedTextStyle>;

export interface TextColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  muted: string;
  inverse: string;
  success: string;
  error: string;
  warning: string;
}

