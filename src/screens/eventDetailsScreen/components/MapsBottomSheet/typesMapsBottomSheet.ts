export interface MapApp {
  id: 'google' | 'waze' | 'apple' | 'uber';
  name: string;
  icon: string;
  available: boolean;
}

export interface MapsBottomSheetProps {
  visible: boolean;

  onClose: () => void;

  onSelectApp: (appId: string) => void;

  getAvailableApps: () => Promise<MapApp[]>;

  testID?: string;
}
