import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class OnboardingSportsScreen extends BasePage {
  private readonly arenaSymbol: Locator;
  private readonly finishButton: Locator;
  private readonly continueButton: Locator;

  private readonly skillLevelModal: Locator;
  private readonly inicianteOption: Locator;
  private readonly intermediarioOption: Locator;
  private readonly avancadoOption: Locator;

  constructor(page: Page) {
    super(page);

    this.arenaSymbol = this.getByTestId('onboarding-arena-symbol');
    this.finishButton = this.getByText('Finalizar');
    this.continueButton = this.getByText('Continuar');

    this.skillLevelModal = this.page.locator(
      '[data-testid*="skill-level-modal"]'
    );
    this.inicianteOption = this.getByText('Iniciante').first();
    this.intermediarioOption = this.getByText('Intermediário').first();
    this.avancadoOption = this.getByText('Avançado').first();
  }

  async waitForPageLoad(): Promise<void> {
    await this.waitForVisible(this.arenaSymbol, 10000);

    await this.sleep(3000);
  }

  async isLoaded(): Promise<boolean> {
    return await this.isVisible(this.arenaSymbol);
  }

  async selectSport(sportName: string): Promise<void> {
    const sportCard = this.getByText(sportName).first();
    await this.waitForVisible(sportCard, 10000);

    await this.click(sportCard);

    await this.sleep(2000);
  }

  async selectSkillLevel(
    skillLevel: 'Iniciante' | 'Intermediário' | 'Avançado'
  ): Promise<void> {
    let option: Locator;
    switch (skillLevel) {
      case 'Iniciante':
        option = this.inicianteOption;
        break;
      case 'Intermediário':
        option = this.intermediarioOption;
        break;
      case 'Avançado':
        option = this.avancadoOption;
        break;
    }

    await this.waitForVisible(option, 5000);

    await this.click(option);

    await this.sleep(500);
  }

  async closeSkillLevelModal(): Promise<void> {
    await this.waitForVisible(this.continueButton, 5000);
    await this.click(this.continueButton);
    await this.sleep(2000);
  }

  async selectSportWithSkill(
    sportName: string,
    skillLevel: 'Iniciante' | 'Intermediário' | 'Avançado' = 'Intermediário'
  ): Promise<void> {
    await this.selectSport(sportName);
    await this.selectSkillLevel(skillLevel);
    await this.closeSkillLevelModal();
  }

  async finish(): Promise<void> {
    await this.waitForVisible(this.finishButton, 5000);
    await this.click(this.finishButton);
    await this.sleep(3000);
  }

  async completeOnboarding(): Promise<void> {
    await this.waitForPageLoad();
    await this.selectSportWithSkill('Futebol', 'Intermediário');
    await this.finish();
  }
}
