export type LoadingMode = 'backdrop' | 'fullscreen' | 'overlay';

export interface LoadingOverlayProps {
  visible: boolean;
  mode?: LoadingMode;
  message?: string;
  progress?: number;
  onCancel?: () => void;
  testID?: string;
}
