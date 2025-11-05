import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Device from 'expo-device';

/**
 * Detecta e retorna a URL correta da API baseado na plataforma e tipo de dispositivo
 *
 * - Web: usa localhost:3000
 * - iOS Simulator: usa localhost:3000
 * - Android Emulator: usa 10.0.2.2:3000
 * - Dispositivos físicos: usa o IP da máquina ou URL de produção
 */
export const getApiUrl = (defaultUrl: string): string => {
  // Se a URL não é localhost, retorna ela mesma (produção)
  if (!defaultUrl.includes('localhost')) {
    return defaultUrl;
  }

  // Para Web, usa localhost normalmente
  if (Platform.OS === 'web') {
    return defaultUrl;
  }

  // Para iOS Simulator, usa localhost
  if (Platform.OS === 'ios' && !Device.isDevice) {
    return defaultUrl;
  }

  // Para Android Emulator, usa 10.0.2.2
  if (Platform.OS === 'android' && !Device.isDevice) {
    // Substitui localhost por 10.0.2.2 (IP especial do emulador Android)
    return defaultUrl.replace('localhost', '10.0.2.2');
  }

  // Para dispositivos físicos (iOS ou Android)
  if (Device.isDevice) {
    // Em desenvolvimento, você precisaria colocar o IP da sua máquina aqui
    // Por exemplo: 192.168.1.100:3000
    // Por segurança, mantemos localhost e deixamos o desenvolvedor configurar
    console.warn(
      '[Arena] Dispositivo físico detectado. Configure EXPO_PUBLIC_API_URL com o IP da sua máquina para desenvolvimento local.'
    );

    // Tenta usar o debuggerHost do Expo como fallback
    const debuggerHost = Constants.expoConfig?.hostUri;
    if (debuggerHost) {
      const hostname = debuggerHost.split(':')[0];
      if (hostname && hostname !== 'localhost') {
        // Usa o IP detectado pelo Expo
        return defaultUrl.replace('localhost', hostname);
      }
    }

    return defaultUrl;
  }

  // Fallback para o padrão
  return defaultUrl;
};

/**
 * Detecta se está rodando em um emulador/simulator
 */
export const isEmulator = (): boolean => {
  return !Device.isDevice;
};

/**
 * Detecta o tipo de plataforma e dispositivo para debug
 */
export const getDeviceInfo = () => {
  return {
    platform: Platform.OS,
    isDevice: Device.isDevice,
    isEmulator: !Device.isDevice,
    deviceName: Device.deviceName,
    osName: Device.osName,
    osVersion: Device.osVersion,
  };
};