import { Page, Locator, expect } from '@playwright/test';

export const waitForVisible = async (
  locator: Locator,
  timeout: number = 10000
): Promise<void> => {
  await expect(locator).toBeVisible({ timeout });
};

export const waitForHidden = async (
  locator: Locator,
  timeout: number = 10000
): Promise<void> => {
  await expect(locator).toBeHidden({ timeout });
};

export const waitForAPIResponse = async (
  page: Page,
  urlPattern: string | RegExp,
  timeout: number = 30000
): Promise<void> => {
  await page.waitForResponse(
    response => {
      const url = response.url();
      if (typeof urlPattern === 'string') {
        return url.includes(urlPattern);
      }
      return urlPattern.test(url);
    },
    { timeout }
  );
};

export const waitForMultipleAPIResponses = async (
  page: Page,
  urlPatterns: (string | RegExp)[],
  timeout: number = 30000
): Promise<void> => {
  await Promise.all(
    urlPatterns.map(pattern => waitForAPIResponse(page, pattern, timeout))
  );
};

export const waitForPageLoad = async (
  page: Page,
  state: 'load' | 'domcontentloaded' | 'networkidle' = 'networkidle',
  timeout: number = 30000
): Promise<void> => {
  await page.waitForLoadState(state, { timeout });
};

export const waitForNavigation = async (
  page: Page,
  action: () => Promise<void>,
  timeout: number = 30000
): Promise<void> => {
  await Promise.all([
    page.waitForLoadState('networkidle', { timeout }),
    action(),
  ]);
};

export const waitForStable = async (
  locator: Locator,
  timeout: number = 5000
): Promise<void> => {
  await locator.waitFor({ state: 'visible', timeout });

  await expect(locator).toBeVisible({ timeout });
  await expect(locator).not.toBeDisabled({ timeout });
};

export const waitForListLoad = async (
  page: Page,
  contentLocator: Locator,
  timeout: number = 15000
): Promise<void> => {
  const skeleton = page.locator('[data-testid*="skeleton"]');
  const hasSkeletons = (await skeleton.count()) > 0;

  if (hasSkeletons) {
    await expect(skeleton.first()).toBeHidden({ timeout: timeout / 2 });
  }

  await expect(contentLocator).toBeVisible({ timeout: timeout / 2 });
};

export const waitForModal = async (
  page: Page,
  modalLocator: Locator,
  shouldBeVisible: boolean,
  timeout: number = 5000
): Promise<void> => {
  if (shouldBeVisible) {
    await expect(modalLocator).toBeVisible({ timeout });
  } else {
    await expect(modalLocator).toBeHidden({ timeout });
  }
};

export const waitForTextChange = async (
  locator: Locator,
  expectedText: string | RegExp,
  timeout: number = 5000
): Promise<void> => {
  await expect(locator).toHaveText(expectedText, { timeout });
};

export const waitForAttributeChange = async (
  locator: Locator,
  attribute: string,
  expectedValue: string | RegExp,
  timeout: number = 5000
): Promise<void> => {
  await expect(locator).toHaveAttribute(attribute, expectedValue, { timeout });
};

export const waitForCondition = async (
  condition: () => Promise<boolean>,
  timeout: number = 10000,
  interval: number = 500
): Promise<void> => {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    if (await condition()) {
      return;
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }

  throw new Error(`Timeout waiting for condition after ${timeout}ms`);
};

export const retryAction = async <T>(
  action: () => Promise<T>,
  retries: number = 3,
  delayMs: number = 1000
): Promise<T> => {
  let lastError: Error | null = null;

  for (let i = 0; i < retries; i++) {
    try {
      return await action();
    } catch (error) {
      lastError = error as Error;
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError || new Error('Action failed after retries');
};
