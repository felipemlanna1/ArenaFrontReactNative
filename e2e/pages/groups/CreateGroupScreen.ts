import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class CreateGroupScreen extends BasePage {
  private readonly headerTitle: Locator;
  private readonly backButton: Locator;

  private readonly nameInput: Locator;
  private readonly descriptionInput: Locator;
  private readonly coverImageButton: Locator;
  private readonly coverImage: Locator;

  private readonly sportsSection: Locator;
  private readonly sportCards: Locator;

  private readonly stateDropdown: Locator;
  private readonly cityDropdown: Locator;

  private readonly publicSwitch: Locator;
  private readonly maxMembersInput: Locator;

  private readonly createButton: Locator;
  private readonly cancelButton: Locator;

  private readonly loadingIndicator: Locator;

  constructor(page: Page) {
    super(page);

    this.headerTitle = this.getByText(/Criar Grupo|Editar Grupo/);
    this.backButton = this.page
      .locator('button')
      .filter({ has: this.page.locator('[name="arrow-back"]') });

    this.nameInput = this.page.locator('input[placeholder*="Nome do grupo" i]');
    this.descriptionInput = this.page.locator(
      'textarea[placeholder*="Descreva o objetivo" i]'
    );
    this.coverImageButton = this.page
      .locator('button, div')
      .filter({ hasText: /Toque para adicionar|Toque para alterar/ });
    this.coverImage = this.page
      .locator('img')
      .filter({ hasText: /cover|capa/i })
      .or(this.page.locator('[style*="coverPreview"]'));

    this.sportsSection = this.page
      .locator('div')
      .filter({ hasText: /Esportes/ });
    this.sportCards = this.page.locator('[data-testid^="sport-card-"]');

    this.stateDropdown = this.page
      .locator('button, select')
      .filter({ hasText: /Estado|UF/ })
      .first();
    this.cityDropdown = this.page
      .locator('button, select')
      .filter({ hasText: /Cidade/ })
      .first();

    this.publicSwitch = this.page
      .locator('[role="switch"]')
      .filter({ hasText: /Grupo público/i });
    this.maxMembersInput = this.page.locator(
      'input[placeholder*="Máximo de membros" i]'
    );

    this.createButton = this.getByRole('button', {
      name: /Criar Grupo|Salvar Alterações/i,
    });
    this.cancelButton = this.getByRole('button', { name: /Cancelar/i });

    this.loadingIndicator = this.page.locator('[data-testid="sports-loading"]');
  }

  async waitForPageLoad(): Promise<void> {
    await this.waitForVisible(this.headerTitle, 10000);
    await this.waitForVisible(this.nameInput, 5000);
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

  async fillName(name: string): Promise<void> {
    await this.fill(this.nameInput, name);
  }

  async fillDescription(description: string): Promise<void> {
    await this.fill(this.descriptionInput, description);
  }

  async selectCoverImage(): Promise<void> {
    await this.click(this.coverImageButton);
    await this.page.waitForTimeout(500);
  }

  async selectSport(sportName: string): Promise<void> {
    const sportCard = this.page
      .locator('div, button')
      .filter({ hasText: sportName })
      .first();
    await this.click(sportCard);
    await this.page.waitForTimeout(300);
  }

  async selectSports(sportNames: string[]): Promise<void> {
    for (const sportName of sportNames) {
      await this.selectSport(sportName);
    }
  }

  async getSelectedSportsCount(): Promise<number> {
    const selectedCards = this.page.locator(
      '[data-selected="true"], [aria-selected="true"]'
    );
    return await this.count(selectedCards);
  }

  async selectState(state: string): Promise<void> {
    await this.click(this.stateDropdown);
    await this.page.waitForTimeout(500);
    const stateOption = this.getByText(state);
    await this.click(stateOption);
    await this.page.waitForTimeout(500);
  }

  async selectCity(city: string): Promise<void> {
    await this.click(this.cityDropdown);
    await this.page.waitForTimeout(500);
    const cityOption = this.getByText(city);
    await this.click(cityOption);
    await this.page.waitForTimeout(500);
  }

  async setPublic(isPublic: boolean): Promise<void> {
    const switchElement = this.publicSwitch;
    const currentState = await switchElement.getAttribute('aria-checked');
    const isCurrentlyPublic = currentState === 'true';

    if (isCurrentlyPublic !== isPublic) {
      await this.click(switchElement);
      await this.page.waitForTimeout(300);
    }
  }

  async setMaxMembers(maxMembers: number): Promise<void> {
    await this.fill(this.maxMembersInput, maxMembers.toString());
  }

  async submit(): Promise<void> {
    await this.click(this.createButton);

    await this.waitForHidden(this.loadingIndicator, 15000).catch(() => {});

    await this.page.waitForTimeout(2000);
  }

  async cancel(): Promise<void> {
    await this.click(this.cancelButton);
  }

  async isLoading(): Promise<boolean> {
    return await this.isVisible(this.loadingIndicator);
  }

  async createBasicGroup(data: {
    name: string;
    description: string;
    sports: string[];
    state: string;
    city: string;
    isPublic: boolean;
    maxMembers?: number;
  }): Promise<void> {
    await this.fillName(data.name);
    await this.fillDescription(data.description);

    await this.selectSports(data.sports);

    await this.selectState(data.state);
    await this.selectCity(data.city);

    await this.setPublic(data.isPublic);
    if (data.maxMembers) {
      await this.setMaxMembers(data.maxMembers);
    }

    await this.submit();
  }

  static generateTestGroup(
    overrides?: Partial<{
      name: string;
      description: string;
      sports: string[];
      state: string;
      city: string;
      isPublic: boolean;
      maxMembers?: number;
    }>
  ): {
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
