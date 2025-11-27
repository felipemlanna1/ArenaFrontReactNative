import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export const light = (): void => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
};

export const medium = (): void => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }
};

export const heavy = (): void => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }
};

export const success = (): void => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }
};

export const error = (): void => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }
};

export const warning = (): void => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  }
};

export const selection = (): void => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    Haptics.selectionAsync();
  }
};

export const celebration = (): void => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    success();
    setTimeout(() => success(), 150);
    setTimeout(() => success(), 300);
  }
};

export const pullTrigger = (): void => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    medium();
  }
};

export const haptic = {
  light,
  medium,
  heavy,
  success,
  error,
  warning,
  selection,
  celebration,
  pullTrigger,
};

export interface HapticSettings {
  enabled: boolean;
  intensity: 'off' | 'minimal' | 'full';
}

let hapticSettings: HapticSettings = {
  enabled: true,
  intensity: 'full',
};

export const setHapticSettings = (settings: Partial<HapticSettings>): void => {
  hapticSettings = { ...hapticSettings, ...settings };
};

export const getHapticSettings = (): HapticSettings => {
  return hapticSettings;
};
