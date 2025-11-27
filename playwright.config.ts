import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Arena Mobile (Web)
 * Tests run against Expo Web on localhost:8081
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: false, // Run tests sequentially para screenshots consistentes
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Single worker para evitar conflitos
  reporter: [['html'], ['list']],
  globalSetup: './e2e/global-setup.ts', // Setup de usuários de teste

  use: {
    baseURL: 'http://localhost:8081',
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'on',
    headless: false,
    // iPhone 15 Pro viewport (modo responsivo)
    viewport: { width: 393, height: 852 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
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
