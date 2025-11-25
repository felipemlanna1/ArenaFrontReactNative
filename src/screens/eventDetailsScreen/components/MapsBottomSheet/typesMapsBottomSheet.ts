/**
 * App de mapas disponível
 * Alinhado com MapOption de useAddressMaps
 */
export interface MapApp {
  id: 'google' | 'waze' | 'apple' | 'uber';
  name: string;
  icon: string;
  available: boolean;
}

/**
 * Props do componente MapsBottomSheet
 */
export interface MapsBottomSheetProps {
  /**
   * Controla visibilidade do modal
   */
  visible: boolean;

  /**
   * Callback quando modal é fechado
   */
  onClose: () => void;

  /**
   * Callback quando usuário seleciona um app
   * @param appId - ID do app selecionado ('google' | 'waze' | 'apple' | 'uber')
   */
  onSelectApp: (appId: string) => void;

  /**
   * Função que retorna lista de apps disponíveis
   */
  getAvailableApps: () => Promise<MapApp[]>;

  /**
   * ID para testes
   * @optional
   */
  testID?: string;
}
