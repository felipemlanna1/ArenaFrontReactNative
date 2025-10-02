/**
 * Arena Shadow Tokens
 *
 * Usando sintaxe CSS boxShadow para React Native (suportado por Reanimated)
 * Formato: offset-x offset-y blur-radius spread-radius color
 *
 * Padrão de Fonte de Luz:
 * - Luz vindo do topo-esquerda (ângulo ~20-25°)
 * - Sombras projetadas para baixo-direita
 * - offsetX ≈ offsetY / 2 para consistência angular
 */
export const ArenaShadows = {
  none: 'none',

  // Sombras básicas com fonte de luz consistente
  subtle: '1px 2px 4px 0px rgba(0, 0, 0, 0.15)',
  soft: '2px 4px 8px 0px rgba(0, 0, 0, 0.22)',
  medium: '3px 6px 12px 0px rgba(0, 0, 0, 0.26)',
  strong: '4px 9px 16px 0px rgba(0, 0, 0, 0.28)',
  elevated: '4px 9px 16px 0px rgba(0, 0, 0, 0.25)',

  // Sombras para componentes específicos
  button: '2px 4px 8px 0px rgba(0, 0, 0, 0.25)',
  input: '1px 2px 6px 0px rgba(0, 0, 0, 0.15)',
  card: '3px 6px 12px 0px rgba(0, 0, 0, 0.24)',

  // Glows (sem offset, apenas blur)
  inputFocused: '0px 0px 10px 0px rgba(255, 83, 1, 0.3)',
  brandGlow: '0px 0px 12px 0px rgba(255, 83, 1, 0.4)',
  errorGlow: '0px 0px 12px 0px rgba(239, 68, 68, 0.35)',
} as const;

export type ArenaShadowKey = keyof typeof ArenaShadows;
