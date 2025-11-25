import { StyleProp, TextStyle } from 'react-native';

export type AnimatedCounterVariant =
  | 'displayPrimary'
  | 'headingPrimary'
  | 'titlePrimary'
  | 'bodyPrimary';

export interface AnimatedCounterProps {
  /**
   * Valor final a ser exibido
   */
  value: number;

  /**
   * Duração da animação em ms
   * @default 1000
   */
  duration?: number;

  /**
   * Variante tipográfica do Text
   * @default 'displayPrimary'
   */
  variant?: AnimatedCounterVariant;

  /**
   * Estilos customizados
   */
  style?: StyleProp<TextStyle>;

  /**
   * ID para testes
   */
  testID?: string;
}
