import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * User data para registro
 */
export interface RegisterUserData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  state: string;
  cityIndex?: number; // Índice da cidade no dropdown (default: 0 = primeira)
}

/**
 * RegisterScreen Page Object
 *
 * Tela de registro de novo usuário
 */
export class RegisterScreen extends BasePage {
  // Locators - Inputs
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly usernameInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;

  // Locators - Dropdowns
  private readonly stateDropdownTrigger: Locator;
  private readonly cityDropdownTrigger: Locator;

  // Locators - Botões
  private readonly submitButton: Locator;
  private readonly backButton: Locator;

  constructor(page: Page) {
    super(page);

    // Inputs
    this.firstNameInput = this.getByTestId('register-first-name-input');
    this.lastNameInput = this.getByTestId('register-last-name-input');
    this.usernameInput = this.getByTestId('register-username-input');
    this.emailInput = this.getByTestId('register-email-input');
    this.passwordInput = this.getByTestId('register-password-input');
    this.confirmPasswordInput = this.getByTestId('register-confirm-password-input');

    // Dropdowns
    this.stateDropdownTrigger = this.getByTestId('register-state-dropdown-trigger');
    this.cityDropdownTrigger = this.getByTestId('register-city-dropdown-trigger');

    // Botões
    this.submitButton = this.getByTestId('register-submit-button');
    this.backButton = this.getByTestId('register-back-button');
  }

  /**
   * Aguarda a tela estar completamente carregada
   */
  async waitForPageLoad(): Promise<void> {
    await this.waitForVisible(this.firstNameInput, 10000);
    await this.waitForVisible(this.submitButton, 5000);
  }

  /**
   * Verifica se a tela está carregada
   */
  async isLoaded(): Promise<boolean> {
    return await this.isVisible(this.firstNameInput);
  }

  /**
   * Preenche campo First Name
   */
  async fillFirstName(value: string): Promise<void> {
    await this.fill(this.firstNameInput, value);
  }

  /**
   * Preenche campo Last Name
   */
  async fillLastName(value: string): Promise<void> {
    await this.fill(this.lastNameInput, value);
  }

  /**
   * Preenche campo Username
   */
  async fillUsername(value: string): Promise<void> {
    await this.fill(this.usernameInput, value);
  }

  /**
   * Preenche campo Email
   */
  async fillEmail(value: string): Promise<void> {
    await this.fill(this.emailInput, value);
  }

  /**
   * Preenche campo Password
   */
  async fillPassword(value: string): Promise<void> {
    await this.fill(this.passwordInput, value);
  }

  /**
   * Preenche campo Confirm Password
   */
  async fillConfirmPassword(value: string): Promise<void> {
    await this.fill(this.confirmPasswordInput, value);
  }

  /**
   * Seleciona estado no dropdown
   */
  async selectState(state: string): Promise<void> {
    // Abre dropdown
    await this.click(this.stateDropdownTrigger);

    // Aguarda opção ficar visível
    const stateOption = this.getByTestId(`register-state-dropdown-state-${state}`);
    await this.waitForVisible(stateOption, 5000);

    // Seleciona opção
    await this.click(stateOption);

    // Aguarda dropdown fechar
    await this.sleep(1000); // TODO: Substituir por wait inteligente
  }

  /**
   * Seleciona cidade no dropdown
   * @param cityIndex - Índice da cidade (default: 0 = primeira cidade)
   */
  async selectCity(cityIndex: number = 0): Promise<void> {
    // Aguarda dropdown de cidade estar habilitado
    await this.waitForVisible(this.cityDropdownTrigger, 5000);

    // Abre dropdown
    await this.click(this.cityDropdownTrigger);

    // Aguarda opções carregarem
    const cityOptions = this.page.locator('[data-testid^="register-city-dropdown-city-"]');
    await this.waitForVisible(cityOptions.first(), 5000);

    // Seleciona cidade pelo índice
    const cityOption = cityOptions.nth(cityIndex);
    await this.click(cityOption);

    // Aguarda dropdown fechar
    await this.sleep(1000); // TODO: Substituir por wait inteligente
  }

  /**
   * Submete formulário de registro
   */
  async submit(): Promise<void> {
    await this.click(this.submitButton);
  }

  /**
   * Volta para WelcomeScreen
   */
  async goBack(): Promise<void> {
    await this.click(this.backButton);
  }

  /**
   * Gera dados de usuário únicos para teste
   */
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

  /**
   * Preenche formulário completo e submete
   * Método de conveniência que combina todas as ações
   */
  async registerUser(userData: RegisterUserData): Promise<void> {
    console.log(`📝 Preenchendo formulário de registro para: ${userData.email}`);

    await this.fillFirstName(userData.firstName);
    await this.fillLastName(userData.lastName);
    await this.fillUsername(userData.username);
    await this.fillEmail(userData.email);
    await this.selectState(userData.state);
    await this.selectCity(userData.cityIndex || 0);
    await this.fillPassword(userData.password);
    await this.fillConfirmPassword(userData.confirmPassword);

    console.log('✅ Formulário preenchido. Submetendo...');
    await this.submit();

    // Aguarda processamento do registro
    await this.sleep(4000); // TODO: Aguardar resposta da API de registro
  }
}
