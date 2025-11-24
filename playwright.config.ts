import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Arena Mobile (Web)
 * Tests run against Expo Web on localhost:8081
 */
export default defineConfig({
  testDir: './scripts/screenshots',
  fullyParallel: false, // Run tests sequentially para screenshots consistentes
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Single worker para evitar conflitos
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:8081',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Webserver opcional (se quiser que Playwright inicie o Expo automaticamente)
  // webServer: {
  //   command: 'npx expo start --web --port 8081',
  //   url: 'http://localhost:8081',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120000,
  // },
});
