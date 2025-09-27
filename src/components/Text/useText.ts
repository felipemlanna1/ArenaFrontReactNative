// Arena Text Component - Hook com lógica de presets e estilos
import { useMemo } from 'react';
import { TextStyle } from 'react-native';
import { ArenaColors, ArenaTypography, ArenaLineHeight } from '@/constants';
import {
  TextVariant,
  TextSize,
  TextWeight,
  TextFamily,
  TextColor,
  TextVariantPresets,
  UseTextInput,
  UseTextReturn,
  ComputedTextStyle,
} from './typesText';

const VARIANT_PRESETS: TextVariantPresets = {
  // Display variants - Para hero/landing pages
  displayPrimary: {
    size: '6xl',
    weight: 'bold',
    family: 'heading',
    lineHeight: 'tight',
    letterSpacing: -0.5,
    color: 'primary',
  },
  displayAccent: {
    size: '6xl',
    weight: 'bold',
    family: 'heading',
    lineHeight: 'tight',
    letterSpacing: -0.5,
    color: 'accent',
  },

  // Heading variants - Títulos principais de telas
  headingPrimary: {
    size: '4xl',
    weight: 'semibold',
    family: 'heading',
    lineHeight: 'tight',
    letterSpacing: -0.25,
    color: 'primary',
  },
  headingAccent: {
    size: '4xl',
    weight: 'semibold',
    family: 'heading',
    lineHeight: 'tight',
    letterSpacing: -0.25,
    color: 'accent',
  },

  // Title variants - Títulos de seções
  titlePrimary: {
    size: '2xl',
    weight: 'semibold',
    family: 'body',
    lineHeight: 'comfortable',
    letterSpacing: 0,
    color: 'primary',
  },
  titleSecondary: {
    size: '2xl',
    weight: 'semibold',
    family: 'body',
    lineHeight: 'comfortable',
    letterSpacing: 0,
    color: 'secondary',
  },

  // Body variants - Texto de corpo
  bodyPrimary: {
    size: 'md',
    weight: 'regular',
    family: 'body',
    lineHeight: 'comfortable',
    letterSpacing: 0,
    color: 'primary',
  },
  bodySecondary: {
    size: 'md',
    weight: 'regular',
    family: 'body',
    lineHeight: 'comfortable',
    letterSpacing: 0,
    color: 'secondary',
  },
  bodyMuted: {
    size: 'md',
    weight: 'regular',
    family: 'body',
    lineHeight: 'comfortable',
    letterSpacing: 0,
    color: 'muted',
  },
  bodyError: {
    size: 'md',
    weight: 'regular',
    family: 'body',
    lineHeight: 'comfortable',
    letterSpacing: 0,
    color: 'error',
  },
  bodySuccess: {
    size: 'md',
    weight: 'regular',
    family: 'body',
    lineHeight: 'comfortable',
    letterSpacing: 0,
    color: 'success',
  },

  // Caption variants - Textos pequenos/legendas
  captionSecondary: {
    size: 'sm',
    weight: 'regular',
    family: 'body',
    lineHeight: 'relaxed',
    letterSpacing: 0.25,
    color: 'secondary',
  },
  captionMuted: {
    size: 'sm',
    weight: 'regular',
    family: 'body',
    lineHeight: 'relaxed',
    letterSpacing: 0.25,
    color: 'muted',
  },
  captionError: {
    size: 'sm',
    weight: 'regular',
    family: 'body',
    lineHeight: 'relaxed',
    letterSpacing: 0.25,
    color: 'error',
  },

  // Label variants - Labels de formulário
  labelPrimary: {
    size: 'xs',
    weight: 'medium',
    family: 'ui',
    lineHeight: 'comfortable',
    letterSpacing: 0.5,
    color: 'primary',
  },
  labelSecondary: {
    size: 'xs',
    weight: 'medium',
    family: 'ui',
    lineHeight: 'comfortable',
    letterSpacing: 0.5,
    color: 'secondary',
  },
  labelError: {
    size: 'xs',
    weight: 'medium',
    family: 'ui',
    lineHeight: 'comfortable',
    letterSpacing: 0.5,
    color: 'error',
  },
};

// =============================================================================
// COLOR MAPPING - Mapeamento de cores semânticas
// =============================================================================

const COLOR_MAP: Record<TextColor, string> = {
  primary: ArenaColors.neutral.light, // Branco para texto principal
  secondary: ArenaColors.neutral.medium, // Cinza para texto secundário
  accent: ArenaColors.brand.primary, // Laranja Arena para destaque
  muted: `${ArenaColors.neutral.medium}80`, // Cinza com opacity
  inverse: ArenaColors.neutral.darkest, // Para fundos claros
  success: '#10B981', // Verde para sucesso
  error: '#EF4444', // Vermelho para erro
  warning: '#F59E0B', // Amarelo para aviso
};

// =============================================================================
// UTILITY FUNCTIONS - Funções auxiliares para conversão de valores
// =============================================================================

const getFontSize = (size: TextSize): number => {
  return ArenaTypography.size[size];
};

const getFontWeight = (weight: TextWeight): TextStyle['fontWeight'] => {
  return ArenaTypography.weight[weight] as TextStyle['fontWeight'];
};

const getFontFamily = (family: TextFamily): string => {
  return ArenaTypography.family[family];
};

const getLineHeight = (lineHeight: 'tight' | 'comfortable' | 'relaxed' | 'loose'): number => {
  return ArenaTypography.lineHeight[lineHeight];
};

const getTextColor = (color: TextColor): string => {
  return COLOR_MAP[color];
};

// =============================================================================
// MAIN HOOK - Hook principal do componente Text
// =============================================================================

export const useText = (input: UseTextInput): UseTextReturn => {
  // Usar preset obrigatório baseado na variante
  const preset = VARIANT_PRESETS[input.variant];

  // Valores finais vêm diretamente do preset (sem personalização)
  const resolvedSize = preset.size;
  const resolvedWeight = preset.weight;
  const resolvedFamily = preset.family;
  const resolvedColor = preset.color;
  const resolvedAlign = 'left'; // Sempre left por padrão
  const resolvedTransform = 'none'; // Sempre none por padrão

  // Line height e letter spacing vêm do preset
  const resolvedLineHeight = preset.lineHeight;
  const resolvedLetterSpacing = preset.letterSpacing;

  // Computar estilo final
  const computedStyle: ComputedTextStyle = useMemo(() => {
    const baseStyle: ComputedTextStyle = {
      fontSize: getFontSize(resolvedSize),
      fontWeight: getFontWeight(resolvedWeight),
      fontFamily: getFontFamily(resolvedFamily),
      lineHeight: getFontSize(resolvedSize) * getLineHeight(resolvedLineHeight),
      letterSpacing: resolvedLetterSpacing,
      color: getTextColor(resolvedColor || 'primary'),
      textAlign: resolvedAlign,
      textTransform: resolvedTransform,
      includeFontPadding: false, // Para melhor alinhamento no Android
      textAlignVertical: 'center',
    };

    return baseStyle;
  }, [
    resolvedSize,
    resolvedWeight,
    resolvedFamily,
    resolvedColor,
    resolvedAlign,
    resolvedTransform,
    resolvedLineHeight,
    resolvedLetterSpacing,
  ]);

  // Mesclar com estilos customizados
  const finalStyle = useMemo(() => {
    if (!input.style) return computedStyle;

    if (Array.isArray(input.style)) {
      return [computedStyle, ...input.style];
    }

    return { ...computedStyle, ...input.style };
  }, [computedStyle, input.style]);

  // Processar props para o componente Text
  const processedProps = useMemo(
    () => ({
      numberOfLines: input.numberOfLines,
      ellipsizeMode: input.ellipsizeMode,
      adjustsFontSizeToFit: input.adjustsFontSizeToFit,
      minimumFontScale: input.minimumFontScale,
      selectable: input.selectable,
      onPress: input.onPress,
      onLongPress: input.onLongPress,
      accessibilityLabel: input.accessibilityLabel,
      accessibilityHint: input.accessibilityHint,
      accessibilityRole: input.accessibilityRole,
      testID: input.testID,
    }),
    [
      input.numberOfLines,
      input.ellipsizeMode,
      input.adjustsFontSizeToFit,
      input.minimumFontScale,
      input.selectable,
      input.onPress,
      input.onLongPress,
      input.accessibilityLabel,
      input.accessibilityHint,
      input.accessibilityRole,
      input.testID,
    ]
  );

  // Estados derivados
  const isInteractive = Boolean(input.onPress || input.onLongPress);
  const hasEllipsis = Boolean(input.numberOfLines && input.numberOfLines > 0);
  const isHeading =
    input.variant.startsWith('display') ||
    input.variant.startsWith('heading') ||
    input.variant.startsWith('title');

  return {
    computedStyle: finalStyle as any, // Temporarily bypass type issue
    processedProps,
    isInteractive,
    hasEllipsis,
    isHeading,
  };
};

// =============================================================================
// PRESET UTILITIES - Funções utilitárias para trabalhar com presets
// =============================================================================

/**
 * Obter preset de uma variante específica
 */
export const getVariantPreset = (variant: TextVariant) => {
  return VARIANT_PRESETS[variant];
};

/**
 * Verificar se uma variante é considerada heading
 */
export const isHeadingVariant = (variant: TextVariant): boolean => {
  return ['display', 'heading', 'title'].includes(variant);
};

/**
 * Obter todas as variantes disponíveis
 */
export const getAvailableVariants = (): TextVariant[] => {
  return Object.keys(VARIANT_PRESETS) as TextVariant[];
};

/**
 * Obter todas as cores disponíveis
 */
export const getAvailableColors = (): TextColor[] => {
  return Object.keys(COLOR_MAP) as TextColor[];
};
