import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * CreateEventScreen Page Object
 *
 * Tela de criação de eventos (wizard multi-step).
 * Steps: Basic Info → Privacy → Location → Review
 */
export class CreateEventScreen extends BasePage {
  // Locators - Header
  private readonly headerTitle: Locator;
  private readonly backButton: Locator;

  // Locators - Stepper
  private readonly stepper: Locator;

  // Locators - Step 1: Basic Info
  private readonly basicInfoSports: Locator;
  private readonly durationOptions: Locator;

  // Locators - Step 2: Privacy
  private readonly privacyOptions: Locator;

  // Locators - Navigation Buttons
  private readonly nextButton: Locator;
  private readonly backStepButton: Locator;
  private readonly createButton: Locator;

  // Locators - Loading
  private readonly loadingIndicator: Locator;

  constructor(page: Page) {
    super(page);

    // Header
    this.headerTitle = this.getByText(/Criar Evento|Editar Evento/);
    this.backButton = this.page.locator('button').filter({ has: this.page.locator('[name="arrow-back"]') });

    // Stepper
    this.stepper = this.page.locator('div').filter({ hasText: /Informações.*Privacidade.*Localização.*Revisão/ }).first();

    // Step 1: Basic Info
    this.basicInfoSports = this.getByTestId('basic-info-sports');
    this.durationOptions = this.page.locator('[data-testid^="duration-"]');

    // Step 2: Privacy
    this.privacyOptions = this.page.locator('[data-testid^="privacy-option-"]');

    // Navigation Buttons
    this.nextButton = this.getByRole('button', { name: 'Próximo' });
    this.backStepButton = this.getByRole('button', { name: 'Voltar' });
    this.createButton = this.getByRole('button', { name: /Criar Evento|Salvar Alterações/ });

    // Loading
    this.loadingIndicator = this.getByText(/Criando evento|Salvando alterações/);
  }

  /**
   * Aguarda a tela estar completamente carregada
   */
  async waitForPageLoad(): Promise<void> {
    await this.waitForVisible(this.headerTitle, 10000);
    await this.waitForVisible(this.stepper, 5000);
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
  // STEP 1: BASIC INFO
  // ========================================

  /**
   * Seleciona um esporte (Step 1)
   */
  async selectSport(sportName: string): Promise<void> {
    await this.click(this.basicInfoSports);
    await this.page.waitForTimeout(500); // Wait for sport picker modal
    const sportOption = this.getByText(sportName);
    await this.click(sportOption);
  }

  /**
   * Preenche título do evento (Step 1)
   */
  async fillTitle(title: string): Promise<void> {
    const titleInput = this.page.locator('input').filter({ hasText: /Título/ }).or(
      this.page.locator('input[placeholder*="título" i]')
    );
    await this.fill(titleInput, title);
  }

  /**
   * Seleciona duração (Step 1)
   */
  async selectDuration(durationValue: string): Promise<void> {
    const durationOption = this.getByTestId(`duration-${durationValue}`);
    await this.click(durationOption);
  }

  /**
   * Seleciona data e hora (Step 1)
   */
  async selectDateTime(date: Date): Promise<void> {
    // DatePicker interaction - implementação simplificada
    // Em testes reais, você precisará interagir com os DatePickers específicos
    const dateButton = this.page.locator('button').filter({ hasText: /Selecionar data|Data/ });
    await this.click(dateButton);
    await this.page.waitForTimeout(500);
    // TODO: Implementar seleção de data no picker modal
  }

  /**
   * Avança para próximo step
   */
  async goToNextStep(): Promise<void> {
    await this.click(this.nextButton);
    await this.page.waitForTimeout(1000); // Wait for step transition
  }

  /**
   * Volta para step anterior
   */
  async goToPreviousStep(): Promise<void> {
    await this.click(this.backStepButton);
    await this.page.waitForTimeout(1000); // Wait for step transition
  }

  // ========================================
  // STEP 2: PRIVACY
  // ========================================

  /**
   * Seleciona nível de privacidade (Step 2)
   */
  async selectPrivacy(privacy: 'public' | 'private' | 'friends'): Promise<void> {
    const privacyOption = this.getByTestId(`privacy-option-${privacy}`);
    await this.click(privacyOption);
  }

  /**
   * Define número máximo de participantes (Step 2)
   */
  async setMaxParticipants(max: number): Promise<void> {
    const maxInput = this.page.locator('input[placeholder*="máximo" i]');
    await this.fill(maxInput, max.toString());
  }

  // ========================================
  // STEP 3: LOCATION
  // ========================================

  /**
   * Preenche endereço (Step 3)
   */
  async fillAddress(address: string): Promise<void> {
    const addressInput = this.page.locator('input[placeholder*="endereço" i]');
    await this.fill(addressInput, address);
  }

  /**
   * Seleciona cidade (Step 3)
   */
  async selectCity(city: string): Promise<void> {
    const cityDropdown = this.page.locator('button').filter({ hasText: /Cidade/ });
    await this.click(cityDropdown);
    await this.page.waitForTimeout(500);
    const cityOption = this.getByText(city);
    await this.click(cityOption);
  }

  // ========================================
  // STEP 4: REVIEW & SUBMIT
  // ========================================

  /**
   * Submete o formulário (cria evento)
   */
  async submit(): Promise<void> {
    await this.click(this.createButton);
    // Aguarda loading desaparecer
    await this.waitForHidden(this.loadingIndicator, 15000);
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
   * Cria evento básico (wizard completo com dados mínimos)
   */
  async createBasicEvent(data: {
    title: string;
    sportName: string;
    duration: string;
    privacy: 'public' | 'private' | 'friends';
    address: string;
  }): Promise<void> {
    console.log('📝 CreateEventScreen: Criando evento básico...');

    // Step 1: Basic Info
    await this.fillTitle(data.title);
    await this.selectSport(data.sportName);
    await this.selectDuration(data.duration);
    // TODO: Add date/time selection if needed
    await this.goToNextStep();

    // Step 2: Privacy
    await this.selectPrivacy(data.privacy);
    await this.goToNextStep();

    // Step 3: Location
    await this.fillAddress(data.address);
    // TODO: Add city/state selection if needed
    await this.goToNextStep();

    // Step 4: Review & Submit
    await this.submit();

    console.log('✅ CreateEventScreen: Evento criado!');
  }

  /**
   * Gera dados de teste aleatórios para evento
   */
  static generateTestEvent(overrides?: Partial<{
    title: string;
    sportName: string;
    duration: string;
    privacy: 'public' | 'private' | 'friends';
    address: string;
  }>): {
    title: string;
    sportName: string;
    duration: string;
    privacy: 'public' | 'private' | 'friends';
    address: string;
  } {
    const timestamp = Date.now();
    return {
      title: `Evento Teste ${timestamp}`,
      sportName: 'Futebol',
      duration: '2h',
      privacy: 'public',
      address: 'Rua Teste, 123',
      ...overrides,
    };
  }
}
