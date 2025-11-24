import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:8081';

test.describe('Task 1 - Manual Capture', () => {
  test('Navigate to home and capture states', async ({ page, context }) => {
    // Grant geolocation permission
    await context.grantPermissions(['geolocation'], { origin: BASE_URL });

    // Set geolocation
    await context.setGeolocation({ latitude: -23.5505, longitude: -46.6333 }); // São Paulo

    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);

    // Check if we're on login page
    const pageContent = await page.content();
    console.log('Page loaded, checking for login form...');

    // Dismiss any error modals by clicking OK button
    const okButton = page.getByRole('button', { name: /ok/i });
    if (await okButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await okButton.click();
      await page.waitForTimeout(1000);
      console.log('Dismissed error modal');
    }

    // Try to find login inputs
    const emailInput = page.locator('input[placeholder*="mail" i], input[placeholder*="usuário" i]').first();
    const passwordInput = page.locator('input[type="password"], input[placeholder*="senha" i]').first();

    if (await emailInput.isVisible({ timeout: 5000 }).catch(() => false)) {
      console.log('Login form found, attempting login...');

      await emailInput.fill('felipe@arena.com');
      await passwordInput.fill('senha123');

      const loginButton = page.locator('button:has-text("Entrar"), button:has-text("ENTRAR")').first();
      await loginButton.click();

      // Wait for navigation
      await page.waitForTimeout(5000);
      console.log('Login submitted, waiting for home...');
    }

    // Capture current state (should be home screen)
    await page.screenshot({
      path: 'docs/ux-analysis/screenshots/task-1/after/home-current.png',
      fullPage: true
    });
    console.log('✓ Captured current home screen state');

    // Check for empty state text
    const hasNewCopy = await page.locator('text=/vamos começar/i').isVisible({ timeout: 2000 }).catch(() => false);
    const hasOldCopy = await page.locator('text=/nenhum evento encontrado/i').isVisible({ timeout: 2000 }).catch(() => false);
    const hasTrophyIcon = await page.locator('[name="trophy-outline"]').isVisible({ timeout: 2000 }).catch(() => false);

    console.log('Empty state analysis:');
    console.log('- New friendly copy present:', hasNewCopy);
    console.log('- Old copy present:', hasOldCopy);
    console.log('- Trophy icon present:', hasTrophyIcon);

    // Try to trigger skeleton loading by clicking filter/refresh
    const filterButton = page.locator('button').filter({ hasText: /filtro|filter/i }).first();
    if (await filterButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await filterButton.click();
      await page.waitForTimeout(500);

      const skeletonVisible = await page.locator('[data-testid="skeleton-event-card"]').isVisible({ timeout: 1000 }).catch(() => false);

      if (skeletonVisible) {
        await page.screenshot({
          path: 'docs/ux-analysis/screenshots/task-1/after/skeleton-visible.png',
          fullPage: true
        });
        console.log('✓ Captured skeleton loading state');
      }
    }
  });
});
