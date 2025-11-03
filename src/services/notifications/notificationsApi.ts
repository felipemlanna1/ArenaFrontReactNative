import { httpService } from '../http';
import {
  PushTokenData,
  RegisterTokenResponse,
  NotificationPreferences,
  NotificationsResponse,
  UnreadCountResponse,
} from './typesNotifications';

export class NotificationsApi {
  private readonly basePath = '/notifications';

  async getUserNotifications(
    page: number = 1,
    limit: number = 20
  ): Promise<NotificationsResponse> {
    return httpService.get<NotificationsResponse>(
      `${this.basePath}?page=${page}&limit=${limit}`
    );
  }

  async getUnreadCount(): Promise<UnreadCountResponse> {
    return httpService.get<UnreadCountResponse>(
      `${this.basePath}/unread-count`
    );
  }

  async markAsRead(notificationId: string): Promise<void> {
    await httpService.patch(`${this.basePath}/${notificationId}/read`);
  }

  async markAllAsRead(): Promise<void> {
    await httpService.patch(`${this.basePath}/mark-all-read`);
  }

  async deleteNotification(notificationId: string): Promise<void> {
    await httpService.delete(`${this.basePath}/${notificationId}`);
  }

  async deleteAllNotifications(): Promise<void> {
    await httpService.delete(`${this.basePath}`);
  }

  async registerPushToken(
    tokenData: PushTokenData
  ): Promise<RegisterTokenResponse> {
    return httpService.post<RegisterTokenResponse>(
      `${this.basePath}/device-tokens`,
      tokenData
    );
  }

  async unregisterPushToken(token: string): Promise<void> {
    await httpService.delete(`${this.basePath}/device-tokens`, {
      data: { token },
    });
  }

  async getPreferences(): Promise<NotificationPreferences> {
    const response = await httpService.get<{ data: NotificationPreferences }>(
      `${this.basePath}/preferences`
    );
    return response.data;
  }

  async updatePreferences(
    preferences: Partial<NotificationPreferences>
  ): Promise<NotificationPreferences> {
    const response = await httpService.patch<{ data: NotificationPreferences }>(
      `${this.basePath}/preferences`,
      preferences
    );
    return response.data;
  }

  async testPushNotification(): Promise<{ message: string }> {
    return httpService.postMessage(`${this.basePath}/test`);
  }
}

export const notificationsApi = new NotificationsApi();
