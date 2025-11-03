import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { NotificationPermissionStatus, PushTokenData } from './typesNotifications';

export const notificationsService = {
  async requestPermissions(): Promise<NotificationPermissionStatus> {
    if (!Device.isDevice) {
      return {
        granted: false,
        canAskAgain: false,
        status: 'denied',
      };
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    return {
      granted: finalStatus === 'granted',
      canAskAgain: finalStatus === 'undetermined',
      status: finalStatus as 'granted' | 'denied' | 'undetermined',
    };
  },

  async getExpoPushToken(): Promise<string | null> {
    if (!Device.isDevice) {
      return null;
    }

    try {
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: 'YOUR_PROJECT_ID',
      });
      return token.data;
    } catch (error) {
      console.error('Error getting push token:', error);
      return null;
    }
  },

  async getPlatformData(): Promise<Omit<PushTokenData, 'token'>> {
    const platform = Platform.OS as 'ios' | 'android' | 'web';
    const deviceId = Device.osInternalBuildId || undefined;

    return {
      platform,
      deviceId,
    };
  },

  async schedulePushNotification(
    title: string,
    body: string,
    data?: Record<string, unknown>,
    seconds: number = 1
  ): Promise<string> {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: true,
      },
      trigger: { seconds },
    });
  },

  async cancelNotification(notificationId: string): Promise<void> {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  },

  async cancelAllNotifications(): Promise<void> {
    await Notifications.cancelAllScheduledNotificationsAsync();
  },

  async getBadgeCount(): Promise<number> {
    return await Notifications.getBadgeCountAsync();
  },

  async setBadgeCount(count: number): Promise<void> {
    await Notifications.setBadgeCountAsync(count);
  },

  async clearBadge(): Promise<void> {
    await Notifications.setBadgeCountAsync(0);
  },
};
