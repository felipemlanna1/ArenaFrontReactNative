// Arena Design System - Tokens Semânticos baseados no Manual da Marca
import { Platform } from 'react-native';

// =============================================================================
// ARENA SEMANTIC COLOR TOKENS
// =============================================================================

export const ArenaColors = {
  // Cores Primárias da Marca
  brand: {
    primary: '#FF5301', // Batalão Flame - Cor principal ARENA
    primaryHover: '#E04A00', // Hover state da cor primária
    primaryPressed: '#D23E00', // Pressed state da cor primária
    primarySubtle: 'rgba(255, 83, 1, 0.15)', // Versão sutil da cor primária
  },

  // Cores Neutras da Marca
  neutral: {
    darkest: '#1B1D29', // Abyss V-1 - Fundo mais escuro
    dark: '#20303D', // Radiance Null - Fundo de superfície
    medium: '#B8B8B8', // Silver Star - Texto secundário
    light: '#FFFFFF', // Branco puro - Texto primário
    transparent: 'transparent', // Transparente
  },

  // Estados de Interação
  interaction: {
    hover: {
      primary: '#E04A00',
      neutral: 'rgba(184, 184, 184, 0.1)',
      surface: '#243441',
    },
    pressed: {
      primary: '#D23E00',
      neutral: 'rgba(184, 184, 184, 0.2)',
      surface: '#1C2A35',
    },
    focus: {
      primary: 'rgba(255, 83, 1, 0.2)',
      neutral: 'rgba(184, 184, 184, 0.05)',
      surface: '#20303D',
    },
  },

  // Estados Desabilitados
  disabled: {
    background: 'rgba(255, 83, 1, 0.08)',
    text: 'rgba(184, 184, 184, 0.5)',
    border: 'rgba(255, 83, 1, 0.5)',
    surface: 'rgba(32, 48, 61, 0.5)',
  },
} as const;

// =============================================================================
// ARENA SEMANTIC SPACING TOKENS
// =============================================================================

export const ArenaSpacing = {
  // Micro Spacings - Para elementos muito próximos
  micro: 2,
  xs: 4, // Padding interno de botões pequenos

  // Small Spacings - Para componentes compactos
  sm: 8, // Padding interno padrão de botões
  md: 12, // Espaçamento entre elementos relacionados

  // Medium Spacings - Para seções e grupos
  lg: 16, // Padding interno de cards e containers
  xl: 20, // Espaçamento entre seções pequenas

  // Large Spacings - Para layout e hierarquia
  '2xl': 24, // Espaçamento entre seções relacionadas
  '3xl': 32, // Espaçamento entre grupos principais
  '4xl': 40, // Padding de telas e containers grandes

  // Extra Large Spacings - Para separação visual forte
  '5xl': 48, // Espaçamento entre seções distintas
  '6xl': 64, // Padding de telas com muito conteúdo
  '7xl': 80, // Espaçamento para elementos hero
} as const;

// =============================================================================
// ARENA SEMANTIC TYPOGRAPHY TOKENS
// =============================================================================

export const ArenaTypography = {
  // Font Families - Baseado na identidade ARENA
  family: {
    heading: 'BebasNeue-Regular', // ARENA Display - Para títulos e destaques
    body: 'Helvetica', // ARENA Text - Para corpo de texto
    ui: 'Helvetica', // Para elementos de interface
    mono: 'Menlo-Regular', // Para código e dados técnicos
  },

  // Font Sizes - Escala tipográfica harmônica
  size: {
    // Micro texto
    xs: 11, // Labels pequenos, metadados
    sm: 13, // Texto secundário, legendas

    // Texto base
    md: 15, // PADRÃO - Texto de corpo
    lg: 17, // Texto enfatizado

    // Texto destacado
    xl: 19, // Subtítulos pequenos
    '2xl': 22, // Subtítulos
    '3xl': 26, // Títulos de seção

    // Display
    '4xl': 32, // Títulos principais
    '5xl': 40, // Títulos de tela
    '6xl': 48, // Títulos hero
    '7xl': 64, // Display especial
  },

  // Font Weights - Para hierarquia visual
  weight: {
    light: '300' as const, // Para texto sutil
    regular: '400' as const, // PADRÃO - Peso normal
    medium: '500' as const, // Para destaque suave
    semibold: '600' as const, // Para títulos e botões
    bold: '700' as const, // Para elementos importantes
    extrabold: '800' as const, // Para display (quando disponível)
  },

  // Line Heights - Para legibilidade otimizada
  lineHeight: {
    tight: 1.2, // Para títulos e display
    comfortable: 1.4, // PADRÃO - Para texto de interface
    relaxed: 1.6, // Para texto de leitura
    loose: 1.8, // Para texto longo e acessibilidade
  },

  // Letter Spacing - Para ajustes finos de tipografia
  letterSpacing: {
    tight: -0.5, // Para títulos grandes
    normal: 0, // PADRÃO
    wide: 0.5, // Para labels e botões
    wider: 1, // Para textos em maiúsculo
  },
} as const;

// =============================================================================
// ARENA SEMANTIC BORDER TOKENS
// =============================================================================

export const ArenaBorders = {
  // Border Radius - Baseado na identidade visual ARENA (bordas quadradas como padrão)
  radius: {
    none: 0, // PADRÃO ARENA - Bordas quadradas para todos elementos
    xs: 2, // Micro arredondamento (apenas quando necessário)
    sm: 4, // Arredondamento sutil
    md: 6, // Para elementos que precisam suavização
    lg: 8, // Para cards especiais
    xl: 12, // Para containers únicos
    '2xl': 16, // Para elementos destacados
    '3xl': 20, // Para elementos hero especiais
    pill: 9999, // Para botões pill (quando explicitamente necessário)
    circle: 9999, // Para avatares e elementos circulares
  },

  // Border Width - Para diferentes níveis de destaque
  width: {
    none: 0, // Sem borda
    hairline: 0.5, // Borda muito fina (divisores)
    thin: 1, // PADRÃO - Borda fina (inputs, cards)
    medium: 1.5, // Borda média (elementos destacados)
    thick: 2, // Borda grossa (focus states)
    bold: 3, // Borda muito grossa (estados especiais)
  },
} as const;

// =============================================================================
// ARENA SEMANTIC SHADOW TOKENS
// =============================================================================

export const ArenaShadows = {
  // Sombras Neutras - Para profundidade e hierarquia
  none: Platform.select({
    ios: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
    },
    android: { elevation: 0 },
  }),

  subtle: Platform.select({
    ios: {
      shadowColor: ArenaColors.neutral.darkest,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    android: { elevation: 1 },
  }),

  soft: Platform.select({
    ios: {
      shadowColor: ArenaColors.neutral.darkest,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
    },
    android: { elevation: 2 },
  }),

  medium: Platform.select({
    ios: {
      shadowColor: ArenaColors.neutral.darkest,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    android: { elevation: 4 },
  }),

  strong: Platform.select({
    ios: {
      shadowColor: ArenaColors.neutral.darkest,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 16,
    },
    android: { elevation: 8 },
  }),

  // Sombras de Marca - Para elementos destacados com a cor ARENA
  brandGlow: Platform.select({
    ios: {
      shadowColor: ArenaColors.brand.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 12,
    },
    android: { elevation: 6 },
  }),
} as const;

// =============================================================================
// TYPESCRIPT TYPES - Para melhor DX e type safety
// =============================================================================

// Color Types
export type ArenaBrandColor = keyof typeof ArenaColors.brand;
export type ArenaNeutralColor = keyof typeof ArenaColors.neutral;

// Spacing Types
export type ArenaSpacingKey = keyof typeof ArenaSpacing;

// Border Types
export type ArenaBorderRadius = keyof typeof ArenaBorders.radius;
export type ArenaBorderWidth = keyof typeof ArenaBorders.width;

// Shadow Types
export type ArenaShadowKey = keyof typeof ArenaShadows;

// Typography Types
export type ArenaFontFamily = keyof typeof ArenaTypography.family;
export type ArenaFontSize = keyof typeof ArenaTypography.size;
export type ArenaFontWeight = keyof typeof ArenaTypography.weight;
export type ArenaLineHeight = keyof typeof ArenaTypography.lineHeight;

// =============================================================================
// UTILITY FUNCTIONS - Para facilitar o uso dos tokens
// =============================================================================

// Função para obter spacing
export const getArenaSpacing = (size: ArenaSpacingKey) => {
  return ArenaSpacing[size];
};

// Função para obter cor
export const getArenaBrandColor = (color: ArenaBrandColor) => {
  return ArenaColors.brand[color];
};

export const getArenaNeutralColor = (color: ArenaNeutralColor) => {
  return ArenaColors.neutral[color];
};
