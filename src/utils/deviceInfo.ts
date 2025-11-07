import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export interface DeviceInfo {
  platform: string;
  osVersion: string;
  appVersion: string;
  deviceModel?: string;
}

export const getDeviceInfo = (): DeviceInfo => {
  return {
    platform: Platform.OS || 'unknown',
    osVersion: `${Device.osName || 'unknown'} ${Device.osVersion || ''}`.trim(),
    appVersion: Constants.expoConfig?.version || '1.0.0',
    deviceModel: Device.modelName || Device.deviceName || undefined,
  };
};
