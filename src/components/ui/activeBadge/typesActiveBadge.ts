import { StyleProp, ViewStyle } from 'react-native';

export interface ActiveBadgeProps {
  /**
   * Se o usuário está ativo
   * @default false
   */
  isActive?: boolean;

  /**
   * Estilos customizados
   */
  style?: StyleProp<ViewStyle>;

  /**
   * ID para testes
   */
  testID?: string;
}
