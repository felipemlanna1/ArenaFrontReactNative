import React, { createContext, useCallback, useEffect, useState } from 'react';
import { Linking } from 'react-native';
import * as Notifications from 'expo-notifications';
import { notificationsService } from '@/services/notifications/notificationsService';
import { notificationsApi } from '@/services/notifications/notificationsApi';
import {
  NotificationPermissionStatus,
  NotificationPreferences,
} from '@/services/notifications/typesNotifications';
import { useAuth } from './AuthContext';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

interface NotificationsContextData {
  expoPushToken: string | null;
  permissionStatus: NotificationPermissionStatus | null;
  preferences: NotificationPreferences | null;
  isLoading: boolean;
  badgeCount: number;
  requestPermissions: () => Promise<boolean>;
  updatePreferences: (prefs: Partial<NotificationPreferences>) => Promise<void>;
  clearBadge: () => Promise<void>;
  sendTestNotification: () => Promise<void>;
}

export const NotificationsContext = createContext<NotificationsContextData>(
  {} as NotificationsContextData
);

interface NotificationsProviderProps {
  children: React.ReactNode;
}

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({
  children,
}) => {
  const { user, isAuthenticated } = useAuth();
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] =
    useState<NotificationPermissionStatus | null>(null);
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [badgeCount, setBadgeCount] = useState(0);

  const requestPermissions = useCallback(async (): Promise<boolean> => {
    const status = await notificationsService.requestPermissions();
    setPermissionStatus(status);
    return status.granted;
  }, []);

  const registerPushToken = useCallback(
    async (token: string) => {
      try {
        const platformData = await notificationsService.getPlatformData();
        await notificationsApi.registerPushToken({
          token,
          ...platformData,
        });
      } catch (error) {
        console.error('Error registering push token:', error);
      }
    },
    []
  );

  const initializeNotifications = useCallback(async () => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    try {
      const status = await notificationsService.requestPermissions();
      setPermissionStatus(status);

      if (status.granted) {
        const token = await notificationsService.getExpoPushToken();
        if (token) {
          setExpoPushToken(token);
          await registerPushToken(token);
        }

        const prefs = await notificationsApi.getPreferences();
        setPreferences(prefs);

        const badge = await notificationsService.getBadgeCount();
        setBadgeCount(badge);
      }
    } catch (error) {
      console.error('Error initializing notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, registerPushToken]);

  useEffect(() => {
    initializeNotifications();
  }, [initializeNotifications]);

  // Handle notification response (when user taps notification)
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data;
        const entityType = data.entityType as string | undefined;
        const entityId = data.entityId as string | undefined;

        // Navigate based on entityType and entityId
        if (entityType && entityId) {
          let deepLink = '';

          switch (entityType) {
            case 'event':
              deepLink = `arena://event/${entityId}`;
              break;
            case 'group':
              deepLink = `arena://group/${entityId}`;
              break;
            case 'user':
              deepLink = `arena://profile/${entityId}`;
              break;
            case 'message':
              // TODO: Navigate to messages screen when implemented
              deepLink = 'arena://notifications';
              break;
            default:
              deepLink = 'arena://notifications';
          }

          // Open deep link
          Linking.openURL(deepLink).catch((err) =>
            console.error('Error opening deep link:', err)
          );
        } else {
          // If no entityType/entityId, just open notifications screen
          Linking.openURL('arena://notifications').catch((err) =>
            console.error('Error opening notifications screen:', err)
          );
        }
      }
    );

    return () => subscription.remove();
  }, []);

  const updatePreferences = useCallback(
    async (prefs: Partial<NotificationPreferences>) => {
      try {
        const updated = await notificationsApi.updatePreferences(prefs);
        setPreferences(updated);
      } catch (error) {
        console.error('Error updating preferences:', error);
        throw error;
      }
    },
    []
  );

  const clearBadge = useCallback(async () => {
    try {
      await notificationsService.clearBadge();
      setBadgeCount(0);
    } catch (error) {
      console.error('Error clearing badge:', error);
    }
  }, []);

  const sendTestNotification = useCallback(async () => {
    try {
      await notificationsApi.testPushNotification();
    } catch (error) {
      console.error('Error sending test notification:', error);
      throw error;
    }
  }, []);

  return (
    <NotificationsContext.Provider
      value={{
        expoPushToken,
        permissionStatus,
        preferences,
        isLoading,
        badgeCount,
        requestPermissions,
        updatePreferences,
        clearBadge,
        sendTestNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
