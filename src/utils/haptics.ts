/**
 * Haptic Feedback Utilities
 *
 * Wrapper para expo-haptics com padrões consistentes Arena.
 * Usado em: buttons, toggles, success/error states, microinteractions.
 *
 * @module utils/haptics
 */

import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

/**
 * Light impact - Para interações leves
 * Uso: Button press, card tap, input focus
 */
export const light = (): void => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
};

/**
 * Medium impact - Para interações médias
 * Uso: Toggle switch, checkbox, radio button
 */
export const medium = (): void => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }
};

/**
 * Heavy impact - Para interações fortes
 * Uso: Raramente usado - apenas ações muito importantes
 */
export const heavy = (): void => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }
};

/**
 * Success notification - Ação bem-sucedida
 * Uso: Event joined, profile saved, achievement unlocked
 */
export const success = (): void => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }
};

/**
 * Error notification - Ação falhou
 * Uso: Form validation error, API error, join event failed
 */
export const error = (): void => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }
};

/**
 * Warning notification - Alerta
 * Uso: Form warning, "only 2 spots left", streak about to break
 */
export const warning = (): void => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  }
};

/**
 * Selection - Mudança de seleção
 * Uso: Picker scroll, stepper increment/decrement, tab change
 */
export const selection = (): void => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    Haptics.selectionAsync();
  }
};

/**
 * Celebration sequence - Pattern especial para achievements
 * Uso: Achievement unlock, milestone reached, level up
 *
 * Pattern: Success + pause + Success + pause + Success (3 taps celebration)
 */
export const celebration = (): void => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    success();
    setTimeout(() => success(), 150);
    setTimeout(() => success(), 300);
  }
};

/**
 * Pull-to-refresh trigger - Haptic ao atingir threshold
 * Uso: Pull-to-refresh quando passa de 80px
 */
export const pullTrigger = (): void => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    medium();
  }
};

/**
 * Wrapper consolidado com todos os métodos
 * Uso preferencial: import { haptic } from '@/utils/haptics'
 */
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

/**
 * Hook para controle de haptic settings
 * (Futuro: Permitir usuário desabilitar haptics via Settings)
 */
export interface HapticSettings {
  enabled: boolean;
  intensity: 'off' | 'minimal' | 'full';
}

// Default settings (pode ser substituído por AsyncStorage no futuro)
let hapticSettings: HapticSettings = {
  enabled: true,
  intensity: 'full',
};

/**
 * Atualizar settings de haptic
 * (Será integrado com Settings screen no futuro)
 */
export const setHapticSettings = (settings: Partial<HapticSettings>): void => {
  hapticSettings = { ...hapticSettings, ...settings };
};

/**
 * Get current haptic settings
 */
export const getHapticSettings = (): HapticSettings => {
  return hapticSettings;
};

/**
 * Wrapper condicional baseado em settings
 * Usado internamente pelos métodos acima (futuro)
 */
const executeIfEnabled = (callback: () => void): void => {
  if (!hapticSettings.enabled || hapticSettings.intensity === 'off') {
    return;
  }

  if (hapticSettings.intensity === 'minimal') {
    // Em minimal, só executa success/error/warning (feedback crítico)
    // Light/Medium/Heavy são suprimidos
    // (Implementação futura)
  }

  callback();
};

// Export default para compatibility
export default haptic;
