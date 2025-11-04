const appJson = require('./app.json');

module.exports = () => {
  return {
    ...appJson.expo,
    extra: {
      ...appJson.expo.extra,
      // Inject environment variables from EAS build into the app at build time
      // These will be available via Constants.expoConfig.extra in the compiled app
      EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000',
      EXPO_PUBLIC_API_TIMEOUT: process.env.EXPO_PUBLIC_API_TIMEOUT || '30000',
      EXPO_PUBLIC_ENVIRONMENT: process.env.EXPO_PUBLIC_ENVIRONMENT || 'development',
      EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://mqackbycjhsetihmvdfq.supabase.co',
      EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xYWNrYnljamhzZXRpaG12ZGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MjAyMzYsImV4cCI6MjA3MzA5NjIzNn0.QKHfleZr6G_NWQHBf9JXlFOLO0ya2F9MSTScxSkOn3M',
      EXPO_PUBLIC_AUTH_TOKEN_KEY: process.env.EXPO_PUBLIC_AUTH_TOKEN_KEY || '@arena:auth_token',
      EXPO_PUBLIC_ANALYTICS_ENABLED: process.env.EXPO_PUBLIC_ANALYTICS_ENABLED || 'false',
      EXPO_PUBLIC_ANALYTICS_KEY: process.env.EXPO_PUBLIC_ANALYTICS_KEY || '',
    },
  };
};
