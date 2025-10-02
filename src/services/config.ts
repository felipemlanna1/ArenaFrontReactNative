import {
  ANALYTICS_ENABLED,
  ANALYTICS_KEY,
  API_TIMEOUT,
  API_URL,
  AUTH_TOKEN_KEY,
  ENVIRONMENT,
} from '@env';

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_BASE_URL_RESOLVED = EXPO_PUBLIC_API_URL
  ? `${EXPO_PUBLIC_API_URL}/api/v1`
  : API_URL || 'http://localhost:3000/api/v1';

export const API_BASE_URL = API_BASE_URL_RESOLVED;
export const API_TIMEOUT_MS = parseInt(API_TIMEOUT || '30000', 10);

export const Config = {
  api: {
    url: API_BASE_URL_RESOLVED,
    timeout: parseInt(API_TIMEOUT || '30000', 10),
    timeouts: {
      short: 10000,
      medium: 30000,
      long: 60000,
      critical: 5000,
    },
  },
  auth: {
    tokenKey: AUTH_TOKEN_KEY || '@arena:auth_token',
  },
  analytics: {
    enabled: ANALYTICS_ENABLED === 'true',
    key: ANALYTICS_KEY || '',
  },
  connectivity: {
    retryAttempts: 3,
    retryDelay: 1000,
    maxRetryDelay: 10000,
    backoffFactor: 2,
    healthCheckInterval: 30000,
  },
  environment: ENVIRONMENT || 'development',
  isDevelopment: (ENVIRONMENT || 'development') === 'development',
  isProduction: (ENVIRONMENT || 'development') === 'production',
};
