import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * OnboardingSportsScreen Page Object
 *
 * Tela de seleção de esportes no onboarding
 */
export class OnboardingSportsScreen extends BasePage {
  // Locators
  private readonly arenaSymbol: Locator;
  private readonly finishButton: Locator;
  private readonly continueButton: Locator;

  // Modal de Skill Level
  private readonly skillLevelModal: Locator;
  private readonly inicianteOption: Locator;
  private readonly intermediarioOption: Locator;
  private readonly avancadoOption: Locator;

  constructor(page: Page) {
    super(page);

    // Elementos principais
    this.arenaSymbol = this.getByTestId('onboarding-arena-symbol');
    this.finishButton = this.getByText('Finalizar');
    this.continueButton = this.getByText('Continuar');

    // Modal de Skill Level
    this.skillLevelModal = this.page.locator('[data-testid*="skill-level-modal"]');
    this.inicianteOption = this.getByText('Iniciante').first();
    this.intermediarioOption = this.getByText('Intermediário').first();
    this.avancadoOption = this.getByText('Avançado').first();
  }

  /**
   * Aguarda a tela estar completamente carregada
   */
  async waitForPageLoad(): Promise<void> {
    await this.waitForVisible(this.arenaSymbol, 10000);
    // Aguarda cards de esportes carregarem
    await this.sleep(3000); // TODO: Aguardar API de esportes carregar
  }

  /**
   * Verifica se a tela está carregada
   */
  async isLoaded(): Promise<boolean> {
    return await this.isVisible(this.arenaSymbol);
  }

  /**
   * Seleciona um esporte pelo nome
   * @param sportName - Nome do esporte (ex: "Futebol", "Vôlei")
   */
  async selectSport(sportName: string): Promise<void> {
    console.log(`⚽ Selecionando esporte: ${sportName}...`);

    // Localiza card do esporte
    const sportCard = this.getByText(sportName).first();
    await this.waitForVisible(sportCard, 10000);

    // Clica no card
    await this.click(sportCard);

    // Aguarda modal de skill level abrir
    await this.sleep(2000); // TODO: Aguardar modal abrir
    console.log('✅ Sport card clicado, modal deve abrir');
  }

  /**
   * Seleciona nível de habilidade no modal
   * @param skillLevel - "Iniciante" | "Intermediário" | "Avançado"
   */
  async selectSkillLevel(skillLevel: 'Iniciante' | 'Intermediário' | 'Avançado'): Promise<void> {
    console.log(`📊 Selecionando nível de habilidade: ${skillLevel}...`);

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

    // Aguarda opção estar visível
    await this.waitForVisible(option, 5000);

    // Seleciona opção
    await this.click(option);
    console.log(`✅ Nível "${skillLevel}" selecionado`);

    // Aguarda um pouco após seleção
    await this.sleep(500);
  }

  /**
   * Fecha modal de skill level clicando em "Continuar"
   */
  async closeSkillLevelModal(): Promise<void> {
    await this.waitForVisible(this.continueButton, 5000);
    await this.click(this.continueButton);
    await this.sleep(2000); // Aguarda modal fechar
    console.log('✅ Modal fechado (botão Continuar)');
  }

  /**
   * Seleciona esporte com skill level (método de conveniência)
   * @param sportName - Nome do esporte
   * @param skillLevel - Nível de habilidade
   */
  async selectSportWithSkill(
    sportName: string,
    skillLevel: 'Iniciante' | 'Intermediário' | 'Avançado' = 'Intermediário'
  ): Promise<void> {
    await this.selectSport(sportName);
    await this.selectSkillLevel(skillLevel);
    await this.closeSkillLevelModal();
  }

  /**
   * Finaliza onboarding
   */
  async finish(): Promise<void> {
    console.log('🏁 Finalizando onboarding...');
    await this.waitForVisible(this.finishButton, 5000);
    await this.click(this.finishButton);
    await this.sleep(3000); // Aguarda navegação para MainTabs
    console.log('✅ Botão Finalizar clicado');
  }

  /**
   * Completa fluxo de onboarding (método de conveniência)
   * Seleciona Futebol com nível Intermediário e finaliza
   */
  async completeOnboarding(): Promise<void> {
    await this.waitForPageLoad();
    await this.selectSportWithSkill('Futebol', 'Intermediário');
    await this.finish();
  }
}
