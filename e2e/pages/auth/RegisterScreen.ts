import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export interface RegisterUserData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  state: string;
  cityIndex?: number;
}

export class RegisterScreen extends BasePage {
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly usernameInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;

  private readonly stateDropdownTrigger: Locator;
  private readonly cityDropdownTrigger: Locator;

  private readonly submitButton: Locator;
  private readonly backButton: Locator;

  constructor(page: Page) {
    super(page);

    this.firstNameInput = this.getByTestId('register-first-name-input');
    this.lastNameInput = this.getByTestId('register-last-name-input');
    this.usernameInput = this.getByTestId('register-username-input');
    this.emailInput = this.getByTestId('register-email-input');
    this.passwordInput = this.getByTestId('register-password-input');
    this.confirmPasswordInput = this.getByTestId(
      'register-confirm-password-input'
    );

    this.stateDropdownTrigger = this.getByTestId(
      'register-state-dropdown-trigger'
    );
    this.cityDropdownTrigger = this.getByTestId(
      'register-city-dropdown-trigger'
    );

    this.submitButton = this.getByTestId('register-submit-button');
    this.backButton = this.getByTestId('register-back-button');
  }

  async waitForPageLoad(): Promise<void> {
    await this.waitForVisible(this.firstNameInput, 10000);
    await this.waitForVisible(this.submitButton, 5000);
  }

  async isLoaded(): Promise<boolean> {
    return await this.isVisible(this.firstNameInput);
  }

  async fillFirstName(value: string): Promise<void> {
    await this.fill(this.firstNameInput, value);
  }

  async fillLastName(value: string): Promise<void> {
    await this.fill(this.lastNameInput, value);
  }

  async fillUsername(value: string): Promise<void> {
    await this.fill(this.usernameInput, value);
  }

  async fillEmail(value: string): Promise<void> {
    await this.fill(this.emailInput, value);
  }

  async fillPassword(value: string): Promise<void> {
    await this.fill(this.passwordInput, value);
  }

  async fillConfirmPassword(value: string): Promise<void> {
    await this.fill(this.confirmPasswordInput, value);
  }

  async selectState(state: string): Promise<void> {
    await this.click(this.stateDropdownTrigger);

    const stateOption = this.getByTestId(
      `register-state-dropdown-state-${state}`
    );
    await this.waitForVisible(stateOption, 5000);

    await this.click(stateOption);

    await this.sleep(1000);
  }

  async selectCity(cityIndex: number = 0): Promise<void> {
    await this.waitForVisible(this.cityDropdownTrigger, 5000);

    await this.click(this.cityDropdownTrigger);

    const cityOptions = this.page.locator(
      '[data-testid^="register-city-dropdown-city-"]'
    );
    await this.waitForVisible(cityOptions.first(), 5000);

    const cityOption = cityOptions.nth(cityIndex);
    await this.click(cityOption);

    await this.sleep(1000);
  }

  async submit(): Promise<void> {
    await this.click(this.submitButton);
  }

  async goBack(): Promise<void> {
    await this.click(this.backButton);
  }

  static generateTestUser(): RegisterUserData {
    const timestamp = Date.now();
    return {
      firstName: 'Teste',
      lastName: 'Arena',
      username: `teste_${timestamp}`,
      email: `teste${timestamp}@arena.com`,
      password: 'Senha@123',
      confirmPassword: 'Senha@123',
      state: 'SP',
      cityIndex: 0,
    };
  }

  async registerUser(userData: RegisterUserData): Promise<void> {
    await this.fillFirstName(userData.firstName);
    await this.fillLastName(userData.lastName);
    await this.fillUsername(userData.username);
    await this.fillEmail(userData.email);
    await this.selectState(userData.state);
    await this.selectCity(userData.cityIndex || 0);
    await this.fillPassword(userData.password);
    await this.fillConfirmPassword(userData.confirmPassword);

    await this.submit();

    await this.sleep(4000);
  }
}
