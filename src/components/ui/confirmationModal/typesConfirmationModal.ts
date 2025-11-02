export interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'destructive';
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  testID?: string;
}
