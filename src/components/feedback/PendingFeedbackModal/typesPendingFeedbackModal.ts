export interface PendingFeedbackModalProps {
  visible: boolean;
  onDismiss: () => void;
  onNavigateToPastEvents: () => void;
  pendingCount: number;
  testID?: string;
}
