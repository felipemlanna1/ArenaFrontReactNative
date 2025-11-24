import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * WelcomeScreen Page Object
 *
 * Tela inicial do app antes do login/registro
 */
export class WelcomeScreen extends BasePage {
  // Locators
  private readonly createAccountButton: Locator;
  private readonly loginButton: Locator;
  private readonly logo: Locator;

  constructor(page: Page) {
    super(page);

    // Definir locators
    this.createAccountButton = this.getByTestId('welcome-create-account');
    this.loginButton = this.getByTestId('welcome-login');
    this.logo = this.getByTestId('welcome-logo');
  }

  /**
   * Aguarda a tela estar completamente carregada
   */
  async waitForPageLoad(): Promise<void> {
    await this.waitForVisible(this.createAccountButton, 10000);
    await this.waitForVisible(this.loginButton, 5000);
  }

  /**
   * Verifica se a tela está carregada
   */
  async isLoaded(): Promise<boolean> {
    return await this.isVisible(this.createAccountButton);
  }

  /**
   * Navega para a RegisterScreen
   */
  async goToRegister(): Promise<void> {
    await this.click(this.createAccountButton);
  }

  /**
   * Navega para a LoginScreen
   */
  async goToLogin(): Promise<void> {
    await this.click(this.loginButton);
  }

  /**
   * Verifica se logo está visível
   */
  async hasLogo(): Promise<boolean> {
    return await this.isVisible(this.logo);
  }
}
