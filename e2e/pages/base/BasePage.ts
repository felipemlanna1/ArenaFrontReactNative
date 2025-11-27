import { Page, Locator } from '@playwright/test';
import {
  waitForVisible,
  waitForHidden,
  waitForAPIResponse,
  waitForListLoad,
  waitForModal,
  waitForNavigation,
} from '../../helpers/wait-helpers';

export abstract class BasePage {
  protected page: Page;
  protected baseURL: string;

  constructor(page: Page, baseURL: string = 'http://localhost:8081') {
    this.page = page;
    this.baseURL = baseURL;
  }

  async goto(): Promise<void> {
    await this.page.goto(this.baseURL);
  }

  async waitForVisible(locator: Locator, timeout?: number): Promise<void> {
    await waitForVisible(locator, timeout);
  }

  async waitForHidden(locator: Locator, timeout?: number): Promise<void> {
    await waitForHidden(locator, timeout);
  }

  async waitForAPI(
    urlPattern: string | RegExp,
    timeout?: number
  ): Promise<void> {
    await waitForAPIResponse(this.page, urlPattern, timeout);
  }

  async waitForListLoad(
    contentLocator: Locator,
    timeout?: number
  ): Promise<void> {
    await waitForListLoad(this.page, contentLocator, timeout);
  }

  async waitForModal(
    modalLocator: Locator,
    shouldBeVisible: boolean,
    timeout?: number
  ): Promise<void> {
    await waitForModal(this.page, modalLocator, shouldBeVisible, timeout);
  }

  async click(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    await locator.click();
  }

  async clickAndWaitForNavigation(
    locator: Locator,
    timeout?: number
  ): Promise<void> {
    await waitForNavigation(
      this.page,
      async () => {
        await this.click(locator);
      },
      timeout
    );
  }

  async fill(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    await locator.fill(value);
  }

  async selectOption(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    await locator.selectOption(value);
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  async isHidden(locator: Locator): Promise<boolean> {
    return await locator.isHidden();
  }

  async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    return (await locator.textContent()) || '';
  }

  async getValue(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    return (await locator.inputValue()) || '';
  }

  async count(locator: Locator): Promise<number> {
    return await locator.count();
  }

  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  async sleep(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  protected getByTestId(testId: string): Locator {
    return this.page.locator(`[data-testid="${testId}"]`);
  }

  protected getByText(text: string | RegExp): Locator {
    return this.page.getByText(text);
  }

  protected getByRole(
    role: Parameters<Page['getByRole']>[0],
    options?: { name?: string | RegExp }
  ): Locator {
    return this.page.getByRole(role, options);
  }

  async screenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `e2e/screenshots/debug/${name}.png` });
  }

  async mockAPIResponse(
    urlPattern: string,
    responseBody: unknown,
    status: number = 200
  ): Promise<void> {
    await this.page.route(urlPattern, route => {
      route.fulfill({
        status,
        contentType: 'application/json',
        body: JSON.stringify(responseBody),
      });
    });
  }

  async clearAPIMocks(): Promise<void> {
    await this.page.unrouteAll();
  }

  abstract waitForPageLoad(): Promise<void>;

  abstract isLoaded(): Promise<boolean>;
}
