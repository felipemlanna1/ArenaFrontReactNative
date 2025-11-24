import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * HomeScreen Page Object
 *
 * Tela "Descobrir" com 3 tabs internas:
 * - Events (eventos públicos disponíveis)
 * - Groups (grupos disponíveis)
 * - Friends (recomendações de amigos)
 */
export class HomeScreen extends BasePage {
  // Locators - Tab Navigation
  private readonly eventsTabButton: Locator;
  private readonly groupsTabButton: Locator;
  private readonly friendsTabButton: Locator;

  // Locators - Events Tab
  private readonly eventsEmptyState: Locator;
  private readonly eventsList: Locator;
  private readonly eventCard: Locator;

  // Locators - Groups Tab
  private readonly groupsEmptyState: Locator;
  private readonly groupsList: Locator;
  private readonly groupCard: Locator;

  // Locators - Friends Tab
  private readonly friendsEmptyState: Locator;
  private readonly friendsList: Locator;
  private readonly friendCard: Locator;

  // Locators - Loading
  private readonly loadingIndicator: Locator;

  constructor(page: Page) {
    super(page);

    // Tab navigation
    this.eventsTabButton = this.getByText('Eventos').first();
    this.groupsTabButton = this.getByText('Grupos').first();
    this.friendsTabButton = this.getByText('Amigos').first();

    // Events tab content
    this.eventsEmptyState = this.getByText('Nenhum evento disponível')
      .or(this.getByText('Sem eventos no momento'));
    this.eventsList = this.getByTestId('home-events-list');
    this.eventCard = this.page.locator('[data-testid^="home-event-card-"]');

    // Groups tab content
    this.groupsEmptyState = this.getByText('Nenhum grupo disponível')
      .or(this.getByText('Sem grupos no momento'));
    this.groupsList = this.getByTestId('home-groups-list');
    this.groupCard = this.page.locator('[data-testid^="home-group-card-"]');

    // Friends tab content
    this.friendsEmptyState = this.getByText('Sem recomendações')
      .or(this.getByText('Nenhuma recomendação no momento'));
    this.friendsList = this.getByTestId('home-friends-list');
    this.friendCard = this.page.locator('[data-testid^="home-friend-card-"]');

    // Loading
    this.loadingIndicator = this.page.locator('[data-testid*="loading"]');
  }

  /**
   * Aguarda a tela estar completamente carregada
   */
  async waitForPageLoad(): Promise<void> {
    // Aguarda título "Descobrir" ou tabs estarem visíveis
    const descobrirText = this.getByText('Descobrir').or(this.getByText('DESCOBRIR'));
    await this.waitForVisible(descobrirText.first(), 10000);

    // Aguarda tabs internas estarem visíveis
    await this.waitForVisible(this.eventsTabButton, 5000);
  }

  /**
   * Verifica se a tela está carregada
   */
  async isLoaded(): Promise<boolean> {
    return await this.isVisible(this.eventsTabButton);
  }

  // ========================================
  // Tab Navigation
  // ========================================

  /**
   * Navega para a tab Events
   */
  async goToEventsTab(): Promise<void> {
    await this.click(this.eventsTabButton);
    await this.sleep(1500); // Aguarda transição e conteúdo carregar
  }

  /**
   * Navega para a tab Groups
   */
  async goToGroupsTab(): Promise<void> {
    await this.click(this.groupsTabButton);
    await this.sleep(1500); // Aguarda transição e conteúdo carregar
  }

  /**
   * Navega para a tab Friends
   */
  async goToFriendsTab(): Promise<void> {
    await this.click(this.friendsTabButton);
    await this.sleep(1500); // Aguarda transição e conteúdo carregar
  }

  // ========================================
  // Events Tab Methods
  // ========================================

  /**
   * Verifica se Events tab está mostrando empty state
   */
  async eventsHasEmptyState(): Promise<boolean> {
    return await this.isVisible(this.eventsEmptyState);
  }

  /**
   * Verifica se há eventos na lista
   */
  async eventsHasItems(): Promise<boolean> {
    const count = await this.count(this.eventCard);
    return count > 0;
  }

  /**
   * Conta quantos eventos estão visíveis
   */
  async eventsCount(): Promise<number> {
    return await this.count(this.eventCard);
  }

  /**
   * Clica no primeiro evento
   */
  async eventsClickFirst(): Promise<void> {
    await this.click(this.eventCard.first());
    await this.sleep(1000); // Aguarda navegação
  }

  /**
   * Clica em evento específico por índice
   */
  async eventsClick(index: number): Promise<void> {
    await this.click(this.eventCard.nth(index));
    await this.sleep(1000); // Aguarda navegação
  }

  // ========================================
  // Groups Tab Methods
  // ========================================

  /**
   * Verifica se Groups tab está mostrando empty state
   */
  async groupsHasEmptyState(): Promise<boolean> {
    return await this.isVisible(this.groupsEmptyState);
  }

  /**
   * Verifica se há grupos na lista
   */
  async groupsHasItems(): Promise<boolean> {
    const count = await this.count(this.groupCard);
    return count > 0;
  }

  /**
   * Conta quantos grupos estão visíveis
   */
  async groupsCount(): Promise<number> {
    return await this.count(this.groupCard);
  }

  /**
   * Clica no primeiro grupo
   */
  async groupsClickFirst(): Promise<void> {
    await this.click(this.groupCard.first());
    await this.sleep(1000); // Aguarda navegação
  }

  /**
   * Clica em grupo específico por índice
   */
  async groupsClick(index: number): Promise<void> {
    await this.click(this.groupCard.nth(index));
    await this.sleep(1000); // Aguarda navegação
  }

  // ========================================
  // Friends Tab Methods
  // ========================================

  /**
   * Verifica se Friends tab está mostrando empty state
   */
  async friendsHasEmptyState(): Promise<boolean> {
    return await this.isVisible(this.friendsEmptyState);
  }

  /**
   * Verifica se há recomendações de amigos
   */
  async friendsHasItems(): Promise<boolean> {
    const count = await this.count(this.friendCard);
    return count > 0;
  }

  /**
   * Conta quantos amigos recomendados estão visíveis
   */
  async friendsCount(): Promise<number> {
    return await this.count(this.friendCard);
  }

  /**
   * Clica no primeiro amigo recomendado
   */
  async friendsClickFirst(): Promise<void> {
    await this.click(this.friendCard.first());
    await this.sleep(1000); // Aguarda ação/navegação
  }

  /**
   * Clica em amigo específico por índice
   */
  async friendsClick(index: number): Promise<void> {
    await this.click(this.friendCard.nth(index));
    await this.sleep(1000); // Aguarda ação/navegação
  }

  /**
   * Clica no botão "Adicionar Amigo" do primeiro card
   */
  async friendsAddFirst(): Promise<void> {
    const firstCard = this.friendCard.first();
    const addButton = firstCard.locator('[data-testid*="add-friend"]').first();
    await this.click(addButton);
    await this.sleep(1000); // Aguarda ação
  }

  // ========================================
  // Generic Methods
  // ========================================

  /**
   * Aguarda conteúdo carregar (após trocar de tab)
   */
  async waitForContentLoad(): Promise<void> {
    // Aguarda loading desaparecer (se houver)
    const hasLoading = await this.loadingIndicator.count() > 0;
    if (hasLoading) {
      await this.waitForHidden(this.loadingIndicator.first(), 15000);
    }

    await this.sleep(1000); // Aguarda transição de conteúdo
  }

  /**
   * Verifica qual tab está ativa
   * @param tabName - "events" | "groups" | "friends"
   */
  async isTabActive(tabName: string): Promise<boolean> {
    let tab: Locator;
    switch (tabName) {
      case 'events':
        tab = this.eventsTabButton;
        break;
      case 'groups':
        tab = this.groupsTabButton;
        break;
      case 'friends':
        tab = this.friendsTabButton;
        break;
      default:
        return false;
    }

    // TODO: Verificar atributo/estilo que indica tab ativa
    return await this.isVisible(tab);
  }
}
