// Arena Text Component - Estilos baseados em tokens
import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  // Base comum para todos os textos
  baseText: {
    includeFontPadding: false, // Remove padding extra no Android
    textAlignVertical: 'center',
  },

  // Estados interativos
  interactive: {
    // Adiciona indicação visual sutil para textos clicáveis
  },

  interactivePressed: {
    opacity: 0.7,
  },

  // Estados de foco (para acessibilidade)
  focused: {
    // Outline sutil para navegação por teclado
    textShadowColor: ArenaColors.brand.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },

  // Variantes especiais de display que podem precisar de ajustes específicos
  displayText: {
    // Para textos muito grandes, pode ser necessário ajustes de rendering
    textAlignVertical: 'top',
  },

  // Estado desabilitado
  disabled: {
    opacity: 0.5,
  },

  // Utilidade para truncamento
  truncated: {
    // Já é tratado via numberOfLines, mas pode ser usado como override
  },

  // Utilidade para texto selecionável
  selectable: {
    userSelect: 'text' as any, // Para web
  },

  // Ajustes específicos de plataforma para diferentes famílias
  headingFont: {
    // Ajustes específicos para BebasNeue se necessário
    // Por exemplo, line-height pode precisar de ajuste fino
  },

  monoFont: {
    // Ajustes para fonte monospace
    letterSpacing: 0, // Fontes mono geralmente não precisam de letter-spacing
  },

  // Utilidades para cases especiais
  uppercase: {
    textTransform: 'uppercase',
    letterSpacing: 1, // Textos em maiúsculo geralmente precisam de mais espaçamento
  },

  lowercase: {
    textTransform: 'lowercase',
  },

  capitalize: {
    textTransform: 'capitalize',
  },

  // Estados de alinhamento (como backup/override)
  textLeft: {
    textAlign: 'left',
  },

  textCenter: {
    textAlign: 'center',
  },

  textRight: {
    textAlign: 'right',
  },

  textJustify: {
    textAlign: 'justify',
  },

  // Utilidades para spacing personalizado
  tightLineHeight: {
    // Line-height mais apertado que o padrão
    // Será calculado dinamicamente no hook
  },

  relaxedLineHeight: {
    // Line-height mais relaxado que o padrão
    // Será calculado dinamicamente no hook
  },

  // Ajustes para diferentes densidades de tela
  highDensity: {
    // Ajustes para telas de alta densidade se necessário
  },

  // Utilidades para casos específicos
  noWrap: {
    flexWrap: 'nowrap',
  },

  // Container styles para casos onde o Text precisa de wrapper
  container: {
    // Para casos onde precisamos de container ao redor do texto
  },

  containerCentered: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Estados de erro/validação
  errorText: {
    color: '#EF4444', // Fallback se não usar a prop color
  },

  successText: {
    color: '#10B981', // Fallback se não usar a prop color
  },

  warningText: {
    color: '#F59E0B', // Fallback se não usar a prop color
  },
});

// =============================================================================
// DYNAMIC STYLES - Funções para estilos dinâmicos
// =============================================================================

/**
 * Cria estilo dinâmico para line-height baseado no font-size
 */
export const createLineHeightStyle = (fontSize: number, multiplier: number) => ({
  lineHeight: fontSize * multiplier,
});

/**
 * Cria estilo dinâmico para letter-spacing baseado no font-size
 */
export const createLetterSpacingStyle = (spacing: number) => ({
  letterSpacing: spacing,
});

/**
 * Cria estilo de sombra de texto para efeitos especiais
 */
export const createTextShadow = (
  color: string = ArenaColors.neutral.darkest,
  offset: { width: number; height: number } = { width: 0, height: 1 },
  radius: number = 2
) => ({
  textShadowColor: color,
  textShadowOffset: offset,
  textShadowRadius: radius,
});

/**
 * Cria estilo com opacity customizada
 */
export const createOpacityStyle = (opacity: number) => ({
  opacity: Math.max(0, Math.min(1, opacity)),
});

// =============================================================================
// PRESET STYLE COMBINATIONS - Combinações de estilos para casos comuns
// =============================================================================

/**
 * Estilo para texto de botão
 */
export const buttonTextStyle = [
  styles.baseText,
  styles.interactive,
  {
    textAlign: 'center' as const,
    userSelect: 'none' as any,
  },
];

/**
 * Estilo para texto de input label
 */
export const labelTextStyle = [
  styles.baseText,
  {
    marginBottom: 4,
  },
];

/**
 * Estilo para texto de erro de validação
 */
export const validationErrorStyle = [
  styles.baseText,
  styles.errorText,
  {
    marginTop: 4,
    fontSize: 12,
  },
];

/**
 * Estilo para texto de placeholder
 */
export const placeholderStyle = [
  styles.baseText,
  {
    opacity: 0.6,
  },
];

/**
 * Estilo para texto de link
 */
export const linkTextStyle = [
  styles.baseText,
  styles.interactive,
  {
    color: ArenaColors.brand.primary,
    textDecorationLine: 'underline',
  },
];

/**
 * Estilo para texto de badge/tag
 */
export const badgeTextStyle = [
  styles.baseText,
  {
    textAlign: 'center' as const,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
];

// =============================================================================
// RESPONSIVE UTILITIES - Utilitários para responsividade
// =============================================================================

/**
 * Calcula font-size responsivo baseado no tamanho da tela
 */
export const getResponsiveFontSize = (baseFontSize: number, screenWidth: number) => {
  // Fator de escala baseado em largura padrão de 375px (iPhone)
  const scaleFactor = screenWidth / 375;
  const minScale = 0.85;
  const maxScale = 1.15;

  const finalScale = Math.max(minScale, Math.min(maxScale, scaleFactor));
  return Math.round(baseFontSize * finalScale);
};

/**
 * Ajusta line-height para diferentes tamanhos de fonte
 */
export const getOptimalLineHeight = (fontSize: number) => {
  // Line-height menor para textos grandes, maior para textos pequenos
  if (fontSize >= 32) return 1.1;
  if (fontSize >= 24) return 1.2;
  if (fontSize >= 18) return 1.3;
  if (fontSize >= 16) return 1.4;
  return 1.5;
};