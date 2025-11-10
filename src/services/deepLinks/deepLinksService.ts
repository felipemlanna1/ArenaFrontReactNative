import Constants from 'expo-constants';

interface DeepLinkConfig {
  apiUrl: string;
}

class DeepLinksService {
  private config: DeepLinkConfig;

  constructor() {
    this.config = {
      apiUrl:
        Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL ||
        process.env.EXPO_PUBLIC_API_URL ||
        'https://backsportpulsemobile-production.up.railway.app',
    };
  }

  generateEventLink(eventId: string): string {
    const baseUrl = this.config.apiUrl.replace(/\/$/, '');
    return `${baseUrl}/event/${eventId}`;
  }

  generateGroupLink(groupId: string): string {
    const baseUrl = this.config.apiUrl.replace(/\/$/, '');
    return `${baseUrl}/group/${groupId}`;
  }

  generateProfileLink(userId: string): string {
    const baseUrl = this.config.apiUrl.replace(/\/$/, '');
    return `${baseUrl}/profile/${userId}`;
  }
}

export const deepLinksService = new DeepLinksService();
