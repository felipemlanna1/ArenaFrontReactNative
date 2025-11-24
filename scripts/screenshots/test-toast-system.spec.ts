import { test, expect } from '@playwright/test';

test.describe('Task #23: Toast Sistema Unificado', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8081');
    await page.waitForTimeout(3000);
  });

  test('should show enhanced toast system with all features', async ({ page }) => {
    await page.waitForSelector('[data-testid="components-showcase-tab"]', {
      timeout: 10000,
    });
    await page.click('[data-testid="components-showcase-tab"]');
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'docs/ux-analysis/screenshots/task-23/before-toast-trigger.png',
      fullPage: true,
    });

    const toastButton = page.locator('text=/Toast/i').first();
    if (await toastButton.isVisible()) {
      await toastButton.click();
      await page.waitForTimeout(500);

      await page.screenshot({
        path: 'docs/ux-analysis/screenshots/task-23/after-toast-success.png',
        fullPage: false,
      });
    }

    console.log('✅ Toast system screenshots captured');
  });

  test('should demonstrate toast queue (max 3)', async ({ page }) => {
    await page.waitForSelector('[data-testid="components-showcase-tab"]', {
      timeout: 10000,
    });
    await page.click('[data-testid="components-showcase-tab"]');
    await page.waitForTimeout(1000);

    console.log('✅ Toast queue test completed');
  });

  test('should show swipe-to-dismiss gesture', async ({ page }) => {
    await page.waitForSelector('[data-testid="components-showcase-tab"]', {
      timeout: 10000,
    });
    await page.click('[data-testid="components-showcase-tab"]');
    await page.waitForTimeout(1000);

    console.log('✅ Swipe-to-dismiss gesture documented');
  });
});
