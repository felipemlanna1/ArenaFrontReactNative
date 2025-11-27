import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class WelcomeScreen extends BasePage {
  private readonly createAccountButton: Locator;
  private readonly loginButton: Locator;
  private readonly logo: Locator;

  constructor(page: Page) {
    super(page);

    this.createAccountButton = this.getByTestId('welcome-create-account');
    this.loginButton = this.getByTestId('welcome-get-started');
    this.logo = this.getByTestId('welcome-logo');
  }

  async waitForPageLoad(): Promise<void> {
    await this.waitForVisible(this.createAccountButton, 10000);
    await this.waitForVisible(this.loginButton, 5000);
  }

  async isLoaded(): Promise<boolean> {
    return await this.isVisible(this.createAccountButton);
  }

  async goToRegister(): Promise<void> {
    await this.click(this.createAccountButton);
  }

  async goToLogin(): Promise<void> {
    await this.click(this.loginButton);
  }

  async hasLogo(): Promise<boolean> {
    return await this.isVisible(this.logo);
  }
}
