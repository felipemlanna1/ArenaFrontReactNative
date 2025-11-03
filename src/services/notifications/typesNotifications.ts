export type NotificationType =
  | 'event_invitation'
  | 'event_reminder'
  | 'event_cancelled'
  | 'event_updated'
  | 'event_request_approved'
  | 'event_closure'
  | 'group_invitation'
  | 'group_removed'
  | 'group_request_approved'
  | 'friend_request'
  | 'friend_accepted'
  | 'message'
  | 'general';

export interface NotificationData {
  type: NotificationType;
  entityId?: string;
  entityType?: 'event' | 'group' | 'user' | 'message';
  title: string;
  body: string;
  data?: Record<string, unknown>;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  entityType?: 'event' | 'group' | 'user' | 'message';
  entityId?: string;
  imageUrl?: string;
  isRead: boolean;
  readAt?: string;
  createdAt: string;
}

export interface NotificationsResponse {
  data: Notification[];
  total: number;
  page: number;
  totalPages: number;
}

export interface UnreadCountResponse {
  count: number;
}

export interface PushTokenData {
  token: string;
  platform: 'ios' | 'android' | 'web';
  deviceId?: string;
}

export interface NotificationPreferences {
  eventInvitations: boolean;
  eventReminders: boolean;
  eventUpdates: boolean;
  groupInvitations: boolean;
  friendRequests: boolean;
  messages: boolean;
  general: boolean;
}

export interface RegisterTokenResponse {
  success: boolean;
  tokenId: string;
}

export interface NotificationPermissionStatus {
  granted: boolean;
  canAskAgain: boolean;
  status: 'granted' | 'denied' | 'undetermined';
}
