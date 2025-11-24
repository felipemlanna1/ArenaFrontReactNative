import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * CreateGroupScreen Page Object
 *
 * Tela de criação/edição de grupos.
 * Single-page form (não é wizard como CreateEventScreen).
 */
export class CreateGroupScreen extends BasePage {
  // Locators - Header
  private readonly headerTitle: Locator;
  private readonly backButton: Locator;

  // Locators - Basic Info
  private readonly nameInput: Locator;
  private readonly descriptionInput: Locator;
  private readonly coverImageButton: Locator;
  private readonly coverImage: Locator;

  // Locators - Sports Selection
  private readonly sportsSection: Locator;
  private readonly sportCards: Locator;

  // Locators - Location
  private readonly stateDropdown: Locator;
  private readonly cityDropdown: Locator;

  // Locators - Settings
  private readonly publicSwitch: Locator;
  private readonly maxMembersInput: Locator;

  // Locators - Actions
  private readonly createButton: Locator;
  private readonly cancelButton: Locator;

  // Locators - Loading
  private readonly loadingIndicator: Locator;

  constructor(page: Page) {
    super(page);

    // Header
    this.headerTitle = this.getByText(/Criar Grupo|Editar Grupo/);
    this.backButton = this.page.locator('button').filter({ has: this.page.locator('[name="arrow-back"]') });

    // Basic Info
    this.nameInput = this.page.locator('input[placeholder*="Nome do grupo" i]');
    this.descriptionInput = this.page.locator('textarea[placeholder*="Descreva o objetivo" i]');
    this.coverImageButton = this.page.locator('button, div').filter({ hasText: /Toque para adicionar|Toque para alterar/ });
    this.coverImage = this.page.locator('img').filter({ hasText: /cover|capa/i }).or(
      this.page.locator('[style*="coverPreview"]')
    );

    // Sports
    this.sportsSection = this.page.locator('div').filter({ hasText: /Esportes/ });
    this.sportCards = this.page.locator('[data-testid^="sport-card-"]');

    // Location
    this.stateDropdown = this.page.locator('button, select').filter({ hasText: /Estado|UF/ }).first();
    this.cityDropdown = this.page.locator('button, select').filter({ hasText: /Cidade/ }).first();

    // Settings
    this.publicSwitch = this.page.locator('[role="switch"]').filter({ hasText: /Grupo público/i });
    this.maxMembersInput = this.page.locator('input[placeholder*="Máximo de membros" i]');

    // Actions
    this.createButton = this.getByRole('button', { name: /Criar Grupo|Salvar Alterações/i });
    this.cancelButton = this.getByRole('button', { name: /Cancelar/i });

    // Loading
    this.loadingIndicator = this.page.locator('[data-testid="sports-loading"]');
  }

  /**
   * Aguarda a tela estar completamente carregada
   */
  async waitForPageLoad(): Promise<void> {
    await this.waitForVisible(this.headerTitle, 10000);
    await this.waitForVisible(this.nameInput, 5000);
  }

  /**
   * Verifica se a tela está carregada
   */
  async isLoaded(): Promise<boolean> {
    return await this.isVisible(this.headerTitle);
  }

  /**
   * Verifica se está em modo de edição
   */
  async isEditMode(): Promise<boolean> {
    const title = await this.getText(this.headerTitle);
    return title.includes('Editar');
  }

  /**
   * Navega de volta (cancela criação)
   */
  async goBack(): Promise<void> {
    await this.click(this.backButton);
  }

  // ========================================
  // BASIC INFO
  // ========================================

  /**
   * Preenche nome do grupo
   */
  async fillName(name: string): Promise<void> {
    await this.fill(this.nameInput, name);
  }

  /**
   * Preenche descrição do grupo
   */
  async fillDescription(description: string): Promise<void> {
    await this.fill(this.descriptionInput, description);
  }

  /**
   * Seleciona imagem de capa (mock - apenas clica no botão)
   */
  async selectCoverImage(): Promise<void> {
    // Em testes E2E reais, seria necessário mock do image picker
    await this.click(this.coverImageButton);
    await this.page.waitForTimeout(500);
    // TODO: Mock image picker para testes automatizados
  }

  // ========================================
  // SPORTS SELECTION
  // ========================================

  /**
   * Seleciona um esporte específico
   */
  async selectSport(sportName: string): Promise<void> {
    // Procura card com o nome do esporte
    const sportCard = this.page.locator('div, button').filter({ hasText: sportName }).first();
    await this.click(sportCard);
    await this.page.waitForTimeout(300);
  }

  /**
   * Seleciona múltiplos esportes
   */
  async selectSports(sportNames: string[]): Promise<void> {
    for (const sportName of sportNames) {
      await this.selectSport(sportName);
    }
  }

  /**
   * Conta número de esportes selecionados
   */
  async getSelectedSportsCount(): Promise<number> {
    // Procura cards com estado "selected" (geralmente tem cor diferente ou ícone de check)
    const selectedCards = this.page.locator('[data-selected="true"], [aria-selected="true"]');
    return await this.count(selectedCards);
  }

  // ========================================
  // LOCATION
  // ========================================

  /**
   * Seleciona estado
   */
  async selectState(state: string): Promise<void> {
    await this.click(this.stateDropdown);
    await this.page.waitForTimeout(500); // Wait for dropdown open
    const stateOption = this.getByText(state);
    await this.click(stateOption);
    await this.page.waitForTimeout(500);
  }

  /**
   * Seleciona cidade
   */
  async selectCity(city: string): Promise<void> {
    await this.click(this.cityDropdown);
    await this.page.waitForTimeout(500); // Wait for dropdown open
    const cityOption = this.getByText(city);
    await this.click(cityOption);
    await this.page.waitForTimeout(500);
  }

  // ========================================
  // SETTINGS
  // ========================================

  /**
   * Define se o grupo é público
   */
  async setPublic(isPublic: boolean): Promise<void> {
    const switchElement = this.publicSwitch;
    const currentState = await switchElement.getAttribute('aria-checked');
    const isCurrentlyPublic = currentState === 'true';

    if (isCurrentlyPublic !== isPublic) {
      await this.click(switchElement);
      await this.page.waitForTimeout(300);
    }
  }

  /**
   * Define número máximo de membros
   */
  async setMaxMembers(maxMembers: number): Promise<void> {
    await this.fill(this.maxMembersInput, maxMembers.toString());
  }

  // ========================================
  // SUBMIT
  // ========================================

  /**
   * Submete o formulário (cria/edita grupo)
   */
  async submit(): Promise<void> {
    await this.click(this.createButton);
    // Aguarda loading desaparecer
    await this.waitForHidden(this.loadingIndicator, 15000).catch(() => {
      // Loading pode já ter sumido
    });
    // Aguarda navegação completar
    await this.page.waitForTimeout(2000);
  }

  /**
   * Cancela criação/edição
   */
  async cancel(): Promise<void> {
    await this.click(this.cancelButton);
  }

  /**
   * Verifica se está em estado de loading
   */
  async isLoading(): Promise<boolean> {
    return await this.isVisible(this.loadingIndicator);
  }

  // ========================================
  // CONVENIENCE METHODS
  // ========================================

  /**
   * Cria grupo básico (formulário completo com dados mínimos)
   */
  async createBasicGroup(data: {
    name: string;
    description: string;
    sports: string[];
    state: string;
    city: string;
    isPublic: boolean;
    maxMembers?: number;
  }): Promise<void> {
    console.log('📝 CreateGroupScreen: Criando grupo básico...');

    // Basic Info
    await this.fillName(data.name);
    await this.fillDescription(data.description);

    // Sports
    await this.selectSports(data.sports);

    // Location
    await this.selectState(data.state);
    await this.selectCity(data.city);

    // Settings
    await this.setPublic(data.isPublic);
    if (data.maxMembers) {
      await this.setMaxMembers(data.maxMembers);
    }

    // Submit
    await this.submit();

    console.log('✅ CreateGroupScreen: Grupo criado!');
  }

  /**
   * Gera dados de teste aleatórios para grupo
   */
  static generateTestGroup(overrides?: Partial<{
    name: string;
    description: string;
    sports: string[];
    state: string;
    city: string;
    isPublic: boolean;
    maxMembers?: number;
  }>): {
    name: string;
    description: string;
    sports: string[];
    state: string;
    city: string;
    isPublic: boolean;
    maxMembers?: number;
  } {
    const timestamp = Date.now();
    return {
      name: `Grupo Teste ${timestamp}`,
      description: `Descrição do grupo de teste ${timestamp}`,
      sports: ['Futebol'],
      state: 'SP',
      city: 'São Paulo',
      isPublic: true,
      maxMembers: 50,
      ...overrides,
    };
  }
}
