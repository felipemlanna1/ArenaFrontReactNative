import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:8081';

const TEST_USER = {
  username: 'felipe@arena.com',
  password: 'senha123',
};

test.describe('Task 1 - AFTER Screenshots', () => {
  test('Capture empty state with friendly copy and icon', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 });

    // Wait for page to load
    await page.waitForTimeout(3000);

    // Try to find login form - if it exists, login
    const emailInput = page.getByPlaceholder(/email ou nome de usuário/i);

    if (await emailInput.isVisible({ timeout: 5000 }).catch(() => false)) {
      await emailInput.fill(TEST_USER.username);
      await page.getByPlaceholder(/senha/i).fill(TEST_USER.password);
      await page.getByRole('button', { name: /entrar/i }).click();

      // Wait for navigation to home
      await page.waitForURL(/.*home/, { timeout: 10000 });
      await page.waitForTimeout(2000);
    }

    // Capture empty state screenshot
    await page.screenshot({
      path: 'docs/ux-analysis/screenshots/task-1/after/empty-state.png',
      fullPage: true
    });

    console.log('✓ Captured empty state screenshot');
  });

  test('Capture loading state with SkeletonCard', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);

    const emailInput = page.getByPlaceholder(/email ou nome de usuário/i);

    if (await emailInput.isVisible({ timeout: 5000 }).catch(() => false)) {
      await emailInput.fill(TEST_USER.username);
      await page.getByPlaceholder(/senha/i).fill(TEST_USER.password);
      await page.getByRole('button', { name: /entrar/i }).click();

      await page.waitForURL(/.*home/, { timeout: 10000 });
    }

    // Reload to trigger loading state
    await page.reload({ waitUntil: 'domcontentloaded' });

    // Try to capture skeleton if visible
    const skeleton = page.locator('[data-testid="skeleton-event-card"]');

    if (await skeleton.first().isVisible({ timeout: 2000 }).catch(() => false)) {
      await page.screenshot({
        path: 'docs/ux-analysis/screenshots/task-1/after/loading-skeleton.png',
        fullPage: true
      });
      console.log('✓ Captured loading state with SkeletonCard');
    } else {
      console.log('⚠ SkeletonCard not visible, capturing current state');
      await page.screenshot({
        path: 'docs/ux-analysis/screenshots/task-1/after/loading-skeleton.png',
        fullPage: true
      });
    }
  });

  test('Capture empty search state', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);

    const emailInput = page.getByPlaceholder(/email ou nome de usuário/i);

    if (await emailInput.isVisible({ timeout: 5000 }).catch(() => false)) {
      await emailInput.fill(TEST_USER.username);
      await page.getByPlaceholder(/senha/i).fill(TEST_USER.password);
      await page.getByRole('button', { name: /entrar/i }).click();

      await page.waitForURL(/.*home/, { timeout: 10000 });
      await page.waitForTimeout(2000);
    }

    // Find search input and search for non-existent event
    const searchInput = page.getByPlaceholder(/buscar/i);

    if (await searchInput.isVisible({ timeout: 5000 }).catch(() => false)) {
      await searchInput.fill('evento inexistente xyz');
      await page.waitForTimeout(1500);

      await page.screenshot({
        path: 'docs/ux-analysis/screenshots/task-1/after/empty-search.png',
        fullPage: true
      });
      console.log('✓ Captured empty search state');
    } else {
      console.log('⚠ Search input not found');
    }
  });
});
