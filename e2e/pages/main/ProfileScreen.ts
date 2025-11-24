import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * ProfileScreen Page Object
 *
 * Tela de perfil do usuário
 */
export class ProfileScreen extends BasePage {
  // Locators - Header/Avatar
  private readonly profileAvatar: Locator;
  private readonly userName: Locator;
  private readonly userBio: Locator;
  private readonly editProfileButton: Locator;

  // Locators - Stats
  private readonly eventsCount: Locator;
  private readonly groupsCount: Locator;
  private readonly friendsCount: Locator;

  // Locators - Sports Section
  private readonly sportsSection: Locator;
  private readonly sportChip: Locator;

  // Locators - Recent Activity
  private readonly recentActivitySection: Locator;
  private readonly activityItem: Locator;

  // Locators - Loading
  private readonly loadingIndicator: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Avatar
    this.profileAvatar = this.getByTestId('profile-avatar');
    this.userName = this.getByTestId('profile-user-name');
    this.userBio = this.getByTestId('profile-user-bio');
    this.editProfileButton = this.getByTestId('profile-edit-button')
      .or(this.getByText('Editar Perfil'));

    // Stats
    this.eventsCount = this.getByTestId('profile-events-count');
    this.groupsCount = this.getByTestId('profile-groups-count');
    this.friendsCount = this.getByTestId('profile-friends-count');

    // Sports
    this.sportsSection = this.getByTestId('profile-sports-section');
    this.sportChip = this.page.locator('[data-testid^="profile-sport-chip-"]');

    // Activity
    this.recentActivitySection = this.getByTestId('profile-recent-activity');
    this.activityItem = this.page.locator('[data-testid^="profile-activity-item-"]');

    // Loading
    this.loadingIndicator = this.page.locator('[data-testid*="loading"]');
  }

  /**
   * Aguarda a tela estar completamente carregada
   */
  async waitForPageLoad(): Promise<void> {
    // Aguarda avatar ou nome estarem visíveis
    await this.waitForVisible(this.userName, 10000);

    // Aguarda loading desaparecer (se houver)
    const hasLoading = await this.loadingIndicator.count() > 0;
    if (hasLoading) {
      await this.waitForHidden(this.loadingIndicator.first(), 15000);
    }
  }

  /**
   * Verifica se a tela está carregada
   */
  async isLoaded(): Promise<boolean> {
    return await this.isVisible(this.userName);
  }

  /**
   * Clica no botão "Editar Perfil"
   */
  async goToEditProfile(): Promise<void> {
    await this.click(this.editProfileButton);
    await this.sleep(1000); // Aguarda navegação
  }

  /**
   * Obtém nome do usuário exibido
   */
  async getUserName(): Promise<string> {
    return await this.getText(this.userName);
  }

  /**
   * Obtém bio do usuário
   */
  async getUserBio(): Promise<string> {
    const isVisible = await this.isVisible(this.userBio);
    if (!isVisible) return '';
    return await this.getText(this.userBio);
  }

  /**
   * Obtém contagem de eventos
   */
  async getEventsCount(): Promise<number> {
    const text = await this.getText(this.eventsCount);
    return parseInt(text, 10) || 0;
  }

  /**
   * Obtém contagem de grupos
   */
  async getGroupsCount(): Promise<number> {
    const text = await this.getText(this.groupsCount);
    return parseInt(text, 10) || 0;
  }

  /**
   * Obtém contagem de amigos
   */
  async getFriendsCount(): Promise<number> {
    const text = await this.getText(this.friendsCount);
    return parseInt(text, 10) || 0;
  }

  /**
   * Verifica se tem esportes favoritos exibidos
   */
  async hasSports(): Promise<boolean> {
    const count = await this.count(this.sportChip);
    return count > 0;
  }

  /**
   * Conta quantos esportes favoritos estão exibidos
   */
  async countSports(): Promise<number> {
    return await this.count(this.sportChip);
  }

  /**
   * Verifica se tem atividades recentes
   */
  async hasRecentActivity(): Promise<boolean> {
    const count = await this.count(this.activityItem);
    return count > 0;
  }

  /**
   * Conta quantas atividades recentes estão exibidas
   */
  async countActivityItems(): Promise<number> {
    return await this.count(this.activityItem);
  }

  /**
   * Clica em estatística de Eventos (navega para lista de eventos)
   */
  async clickEventsStats(): Promise<void> {
    const eventsStatsButton = this.eventsCount.locator('..'); // Parent element
    await this.click(eventsStatsButton);
    await this.sleep(1000); // Aguarda navegação
  }

  /**
   * Clica em estatística de Grupos (navega para lista de grupos)
   */
  async clickGroupsStats(): Promise<void> {
    const groupsStatsButton = this.groupsCount.locator('..'); // Parent element
    await this.click(groupsStatsButton);
    await this.sleep(1000); // Aguarda navegação
  }

  /**
   * Clica em estatística de Amigos (navega para lista de amigos)
   */
  async clickFriendsStats(): Promise<void> {
    const friendsStatsButton = this.friendsCount.locator('..'); // Parent element
    await this.click(friendsStatsButton);
    await this.sleep(1000); // Aguarda navegação
  }

  /**
   * Verifica se avatar está visível
   */
  async hasAvatar(): Promise<boolean> {
    return await this.isVisible(this.profileAvatar);
  }
}
