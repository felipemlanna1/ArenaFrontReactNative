import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Device from 'expo-device';

export const getApiUrl = (defaultUrl: string): string => {
  if (!defaultUrl.includes('localhost')) {
    return defaultUrl;
  }

  if (Platform.OS === 'web') {
    return defaultUrl;
  }

  if (Platform.OS === 'ios' && !Device.isDevice) {
    return defaultUrl;
  }

  if (Platform.OS === 'android' && !Device.isDevice) {
    const androidUrl = defaultUrl.replace('localhost', '10.0.2.2');
    return androidUrl;
  }

  if (Device.isDevice) {
    const debuggerHost = Constants.expoConfig?.hostUri;
    if (debuggerHost) {
      const hostname = debuggerHost.split(':')[0];
      if (hostname && hostname !== 'localhost') {
        const physicalUrl = defaultUrl.replace('localhost', hostname);
        return physicalUrl;
      }
    }

    return defaultUrl;
  }

  return defaultUrl;
};

export const isEmulator = (): boolean => {
  return !Device.isDevice;
};

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
