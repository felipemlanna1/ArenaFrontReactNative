import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class CreateEventScreen extends BasePage {
  private readonly headerTitle: Locator;
  private readonly backButton: Locator;

  private readonly stepper: Locator;

  private readonly basicInfoSports: Locator;
  private readonly durationOptions: Locator;

  private readonly privacyOptions: Locator;

  private readonly nextButton: Locator;
  private readonly backStepButton: Locator;
  private readonly createButton: Locator;

  private readonly loadingIndicator: Locator;

  constructor(page: Page) {
    super(page);

    this.headerTitle = this.getByText(/Criar Evento|Editar Evento/);
    this.backButton = this.page
      .locator('button')
      .filter({ has: this.page.locator('[name="arrow-back"]') });

    this.stepper = this.page
      .locator('div')
      .filter({ hasText: /Informações.*Privacidade.*Localização.*Revisão/ })
      .first();

    this.basicInfoSports = this.getByTestId('basic-info-sports');
    this.durationOptions = this.page.locator('[data-testid^="duration-"]');

    this.privacyOptions = this.page.locator('[data-testid^="privacy-option-"]');

    this.nextButton = this.getByRole('button', { name: 'Próximo' });
    this.backStepButton = this.getByRole('button', { name: 'Voltar' });
    this.createButton = this.getByRole('button', {
      name: /Criar Evento|Salvar Alterações/,
    });

    this.loadingIndicator = this.getByText(
      /Criando evento|Salvando alterações/
    );
  }

  async waitForPageLoad(): Promise<void> {
    await this.waitForVisible(this.headerTitle, 10000);
    await this.waitForVisible(this.stepper, 5000);
  }

  async isLoaded(): Promise<boolean> {
    return await this.isVisible(this.headerTitle);
  }

  async isEditMode(): Promise<boolean> {
    const title = await this.getText(this.headerTitle);
    return title.includes('Editar');
  }

  async goBack(): Promise<void> {
    await this.click(this.backButton);
  }

  async selectSport(sportName: string): Promise<void> {
    await this.click(this.basicInfoSports);
    await this.page.waitForTimeout(500);
    const sportOption = this.getByText(sportName);
    await this.click(sportOption);
  }

  async fillTitle(title: string): Promise<void> {
    const titleInput = this.page
      .locator('input')
      .filter({ hasText: /Título/ })
      .or(this.page.locator('input[placeholder*="título" i]'));
    await this.fill(titleInput, title);
  }

  async selectDuration(durationValue: string): Promise<void> {
    const durationOption = this.getByTestId(`duration-${durationValue}`);
    await this.click(durationOption);
  }

  async selectDateTime(date: Date): Promise<void> {
    const dateButton = this.page
      .locator('button')
      .filter({ hasText: /Selecionar data|Data/ });
    await this.click(dateButton);
    await this.page.waitForTimeout(500);
  }

  async goToNextStep(): Promise<void> {
    await this.click(this.nextButton);
    await this.page.waitForTimeout(1000);
  }

  async goToPreviousStep(): Promise<void> {
    await this.click(this.backStepButton);
    await this.page.waitForTimeout(1000);
  }

  async selectPrivacy(
    privacy: 'public' | 'private' | 'friends'
  ): Promise<void> {
    const privacyOption = this.getByTestId(`privacy-option-${privacy}`);
    await this.click(privacyOption);
  }

  async setMaxParticipants(max: number): Promise<void> {
    const maxInput = this.page.locator('input[placeholder*="máximo" i]');
    await this.fill(maxInput, max.toString());
  }

  async fillAddress(address: string): Promise<void> {
    const addressInput = this.page.locator('input[placeholder*="endereço" i]');
    await this.fill(addressInput, address);
  }

  async selectCity(city: string): Promise<void> {
    const cityDropdown = this.page
      .locator('button')
      .filter({ hasText: /Cidade/ });
    await this.click(cityDropdown);
    await this.page.waitForTimeout(500);
    const cityOption = this.getByText(city);
    await this.click(cityOption);
  }

  async submit(): Promise<void> {
    await this.click(this.createButton);

    await this.waitForHidden(this.loadingIndicator, 15000);
  }

  async isLoading(): Promise<boolean> {
    return await this.isVisible(this.loadingIndicator);
  }

  async createBasicEvent(data: {
    title: string;
    sportName: string;
    duration: string;
    privacy: 'public' | 'private' | 'friends';
    address: string;
  }): Promise<void> {
    await this.fillTitle(data.title);
    await this.selectSport(data.sportName);
    await this.selectDuration(data.duration);

    await this.goToNextStep();

    await this.selectPrivacy(data.privacy);
    await this.goToNextStep();

    await this.fillAddress(data.address);

    await this.goToNextStep();

    await this.submit();
  }

  static generateTestEvent(
    overrides?: Partial<{
      title: string;
      sportName: string;
      duration: string;
      privacy: 'public' | 'private' | 'friends';
      address: string;
    }>
  ): {
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
