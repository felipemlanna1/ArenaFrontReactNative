const isDevelopment = __DEV__;

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerConfig {
  enabled: boolean;
  minLevel: LogLevel;
}

const config: LoggerConfig = {
  enabled: isDevelopment,
  minLevel: 'debug',
};

const levelPriority: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const shouldLog = (level: LogLevel): boolean => {
  if (!config.enabled) return false;
  return levelPriority[level] >= levelPriority[config.minLevel];
};

export const logger = {
  debug: (message: string, ...args: unknown[]): void => {
    if (shouldLog('debug')) {
      // eslint-disable-next-line no-console
      console.log(`[DEBUG] ${message}`, ...args);
    }
  },

  info: (message: string, ...args: unknown[]): void => {
    if (shouldLog('info')) {
      // eslint-disable-next-line no-console
      console.log(`[INFO] ${message}`, ...args);
    }
  },

  warn: (message: string, ...args: unknown[]): void => {
    if (shouldLog('warn')) {
      // eslint-disable-next-line no-console
      console.warn(`[WARN] ${message}`, ...args);
    }
  },

  error: (message: string, error?: unknown, ...args: unknown[]): void => {
    if (shouldLog('error')) {
      // eslint-disable-next-line no-console
      console.error(`[ERROR] ${message}`, error, ...args);
    }
  },

  configure: (newConfig: Partial<LoggerConfig>): void => {
    Object.assign(config, newConfig);
  },
};
