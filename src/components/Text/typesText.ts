// Arena Text Component - Tipos TypeScript completos
import React from 'react';
import { TextStyle, TextProps as RNTextProps } from 'react-native';

// =============================================================================
// TIPOS BASE
// =============================================================================

export type TextVariant =
  // Display variants - Para hero/landing pages
  | 'displayPrimary'    // Branco, bold, heading font
  | 'displayAccent'     // Laranja Arena, bold, heading font

  // Heading variants - Títulos principais de telas
  | 'headingPrimary'    // Branco, semibold
  | 'headingAccent'     // Laranja Arena, semibold

  // Title variants - Títulos de seções
  | 'titlePrimary'      // Branco, semibold
  | 'titleSecondary'    // Cinza médio, semibold

  // Body variants - Texto de corpo
  | 'bodyPrimary'       // Branco, regular
  | 'bodySecondary'     // Cinza médio, regular
  | 'bodyMuted'         // Cinza com opacity, regular
  | 'bodyError'         // Vermelho, regular
  | 'bodySuccess'       // Verde, regular

  // Caption variants - Textos pequenos/legendas
  | 'captionSecondary'  // Cinza médio, regular
  | 'captionMuted'      // Cinza com opacity, regular
  | 'captionError'      // Vermelho, regular

  // Label variants - Labels de formulário
  | 'labelPrimary'      // Branco, medium
  | 'labelSecondary'    // Cinza médio, medium
  | 'labelError';       // Vermelho, medium

export type TextSize =
  | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';

export type TextWeight =
  | 'light' | 'regular' | 'medium'
  | 'semibold' | 'bold' | 'extrabold';

export type TextFamily =
  | 'heading' | 'body' | 'ui' | 'mono';

export type TextColor =
  | 'primary'    // Texto principal (branco)
  | 'secondary'  // Texto secundário (cinza médio)
  | 'accent'     // Destaque Arena (laranja)
  | 'muted'      // Texto suave (cinza com opacity)
  | 'inverse'    // Para fundos escuros
  | 'success'    // Verde para sucesso
  | 'error'      // Vermelho para erro
  | 'warning';   // Amarelo para aviso

export type TextAlign = 'left' | 'center' | 'right' | 'justify';

export type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';

// =============================================================================
// PRESET SYSTEM
// =============================================================================

export interface TextVariantPreset {
  size: TextSize;
  weight: TextWeight;
  family: TextFamily;
  lineHeight: 'tight' | 'comfortable' | 'relaxed' | 'loose';
  letterSpacing: number;
  color?: TextColor;
}

export type TextVariantPresets = Record<TextVariant, TextVariantPreset>;

// =============================================================================
// PROPS INTERFACE
// =============================================================================

export interface TextProps extends Omit<RNTextProps, 'style'> {
  // Conteúdo obrigatório
  children: React.ReactNode;

  // Variante semântica (obrigatória para consistência)
  variant: TextVariant;

  // Comportamento de texto (mantemos por serem funcionais)
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  adjustsFontSizeToFit?: boolean;
  minimumFontScale?: number;

  // Interação (mantemos por serem funcionais)
  onPress?: () => void;
  onLongPress?: () => void;
  selectable?: boolean;

  // Acessibilidade (mantemos por serem funcionais)
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: 'text' | 'button' | 'link' | 'header';

  // Override limitado apenas para ajustes específicos
  style?: TextStyle | TextStyle[];
  testID?: string;
}

// =============================================================================
// HOOK TYPES
// =============================================================================

export interface UseTextReturn {
  // Styles computados
  computedStyle: TextStyle;

  // Props processadas
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

  // Estados derivados
  isInteractive: boolean;
  hasEllipsis: boolean;
  isHeading: boolean;
}

export interface UseTextInput {
  // Apenas a variante semântica é necessária
  variant: TextVariant;

  // Props funcionais que podem ser passadas
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

// =============================================================================
// STYLE COMPUTATION TYPES
// =============================================================================

export interface ComputedTextStyle extends TextStyle {
  // Typography
  fontSize: number;
  fontWeight: TextStyle['fontWeight'];
  fontFamily: string;
  lineHeight: number;
  letterSpacing: number;

  // Appearance
  color: string;
  textAlign: TextAlign;
  textTransform: TextTransform;

  // Layout (quando aplicável)
  includeFontPadding?: boolean;
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

export type RequiredTextProps = Required<Pick<TextProps, 'children'>>;
export type OptionalTextProps = Omit<TextProps, 'children'>;

// Para casos onde queremos garantir que certas props estão definidas
export type TextPropsWithVariant = TextProps & Required<Pick<TextProps, 'variant'>>;

// Para casos de override
export type TextStyleOverride = Partial<ComputedTextStyle>;

// =============================================================================
// CONSTANTS TYPES
// =============================================================================

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

// =============================================================================
// EXPORT TYPES
// =============================================================================

export type {
  ArenaFontSize,
  ArenaFontWeight,
  ArenaFontFamily,
  ArenaLineHeight,
} from '@/constants';