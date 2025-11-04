import Constants from 'expo-constants';

const getEnv = (key: string, defaultValue: string = ''): string => {
  // Try process.env first (works in Metro bundler with EXPO_PUBLIC_ prefix)
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] || defaultValue;
  }

  // Fallback to Constants.expoConfig (works in all builds)
  const expoValue = Constants.expoConfig?.extra?.[key];
  if (expoValue !== undefined && expoValue !== null) {
    return String(expoValue);
  }

  return defaultValue;
};

const EXPO_PUBLIC_API_URL = getEnv(
  'EXPO_PUBLIC_API_URL',
  'http://localhost:3000'
);
const API_BASE_URL_RESOLVED = `${EXPO_PUBLIC_API_URL}/api/v1`;

// Debug log for production troubleshooting
console.log('[Arena Config] API URL:', EXPO_PUBLIC_API_URL);
console.log('[Arena Config] Full API Base:', API_BASE_URL_RESOLVED);
console.log('[Arena Config] Environment:', getEnv('EXPO_PUBLIC_ENVIRONMENT', 'development'));

const EXPO_PUBLIC_API_TIMEOUT = getEnv('EXPO_PUBLIC_API_TIMEOUT', '30000');

const EXPO_PUBLIC_AUTH_TOKEN_KEY = getEnv(
  'EXPO_PUBLIC_AUTH_TOKEN_KEY',
  '@arena:auth_token'
);

const EXPO_PUBLIC_ANALYTICS_ENABLED = getEnv(
  'EXPO_PUBLIC_ANALYTICS_ENABLED',
  'false'
);
const EXPO_PUBLIC_ANALYTICS_KEY = getEnv('EXPO_PUBLIC_ANALYTICS_KEY', '');

const EXPO_PUBLIC_ENVIRONMENT = getEnv(
  'EXPO_PUBLIC_ENVIRONMENT',
  'development'
);

export const API_BASE_URL = API_BASE_URL_RESOLVED;
export const API_TIMEOUT_MS = parseInt(EXPO_PUBLIC_API_TIMEOUT, 10);

export const Config = {
  api: {
    url: API_BASE_URL_RESOLVED,
    timeout: parseInt(EXPO_PUBLIC_API_TIMEOUT, 10),
    timeouts: {
      short: 10000,
      medium: 30000,
      long: 60000,
      critical: 5000,
    },
  },
  auth: {
    tokenKey: EXPO_PUBLIC_AUTH_TOKEN_KEY,
  },
  analytics: {
    enabled: EXPO_PUBLIC_ANALYTICS_ENABLED === 'true',
    key: EXPO_PUBLIC_ANALYTICS_KEY,
  },
  connectivity: {
    retryAttempts: 3,
    retryDelay: 1000,
    maxRetryDelay: 10000,
    backoffFactor: 2,
    healthCheckInterval: 30000,
  },
  environment: EXPO_PUBLIC_ENVIRONMENT,
  isDevelopment: EXPO_PUBLIC_ENVIRONMENT === 'development',
  isProduction: EXPO_PUBLIC_ENVIRONMENT === 'production',
};
