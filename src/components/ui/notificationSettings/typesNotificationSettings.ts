export interface NotificationPreference {
  type: string;
  label: string;
  description?: string;
  enabled: boolean;
}

export interface NotificationSettingsProps {
  preferences: NotificationPreference[];
  onUpdatePreference: (type: string, enabled: boolean) => void;
  onSavePreferences: () => void;
  isLoading?: boolean;
  isSaving?: boolean;
}

export interface NotificationSettingsState {
  localPreferences: NotificationPreference[];
  hasChanges: boolean;
}