import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const SCREENSHOT_BASE = 'e2e/visual-audit/screenshots';

export interface ScreenshotMetadata {
  screenName: string;
  stateName: string;
  description: string;
  timestamp: string;
  path: string;
}

export const captureScreenshot = async (
  page: Page,
  category: string,
  screenName: string,
  stateName: string,
  description: string
): Promise<void> => {
  const screenshotPath = `${SCREENSHOT_BASE}/${category}/${screenName}/${stateName}.png`;

  await page.waitForTimeout(800);

  await page.screenshot({
    path: screenshotPath,
    fullPage: true,
    animations: 'disabled',
  });

  await saveMetadata({
    screenName,
    stateName,
    description,
    timestamp: new Date().toISOString(),
    path: screenshotPath,
  });
};

const saveMetadata = async (metadata: ScreenshotMetadata): Promise<void> => {
  const metadataDir = path.dirname(
    path.join(SCREENSHOT_BASE, '..', 'reports', 'metadata')
  );

  if (!fs.existsSync(metadataDir)) {
    fs.mkdirSync(metadataDir, { recursive: true });
  }

  const metadataFile = path.join(metadataDir, `${metadata.screenName}.json`);

  let existingData: ScreenshotMetadata[] = [];

  if (fs.existsSync(metadataFile)) {
    const content = fs.readFileSync(metadataFile, 'utf-8');
    existingData = JSON.parse(content);
  }

  existingData.push(metadata);

  fs.writeFileSync(
    metadataFile,
    JSON.stringify(existingData, null, 2),
    'utf-8'
  );
};

export const waitForScreenLoad = async (
  page: Page,
  testId: string,
  timeout: number = 5000
): Promise<void> => {
  await page.waitForSelector(`[data-testid="${testId}"]`, {
    state: 'visible',
    timeout,
  });
};

export const fillInput = async (
  page: Page,
  testId: string,
  value: string
): Promise<void> => {
  const input = page.locator(`[data-testid="${testId}"]`);
  await input.clear();
  await input.fill(value);
};

export const clickButton = async (
  page: Page,
  testId: string
): Promise<void> => {
  await page.locator(`[data-testid="${testId}"]`).click();
};

export const scrollToBottom = async (page: Page): Promise<void> => {
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(500);
};

export const scrollToTop = async (page: Page): Promise<void> => {
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
};
