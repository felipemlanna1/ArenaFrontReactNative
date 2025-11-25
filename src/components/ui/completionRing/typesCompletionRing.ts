import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface CompletionRingProps {
  /**
   * Tamanho do anel (largura e altura)
   * @default 120
   */
  size?: number;

  /**
   * Espessura da linha do anel
   * @default 4
   */
  strokeWidth?: number;

  /**
   * Progresso de 0 a 100
   * @default 0
   */
  progress: number;

  /**
   * Conteúdo dentro do anel (geralmente avatar)
   */
  children: ReactNode;

  /**
   * Estilos customizados para o container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * ID para testes
   */
  testID?: string;
}
