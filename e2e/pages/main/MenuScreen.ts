import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * MenuScreen Page Object
 *
 * Menu Drawer com opções de navegação e configurações
 */
export class MenuScreen extends BasePage {
  // Locators - Header
  private readonly menuDrawer: Locator;
  private readonly userAvatar: Locator;
  private readonly userName: Locator;

  // Locators - Menu Items
  private readonly friendsMenuItem: Locator;
  private readonly groupsMenuItem: Locator;
  private readonly invitesMenuItem: Locator;
  private readonly settingsMenuItem: Locator;
  private readonly helpMenuItem: Locator;
  private readonly termsMenuItem: Locator;
  private readonly logoutMenuItem: Locator;

  // Locators - Badges
  private readonly invitesBadge: Locator;

  constructor(page: Page) {
    super(page);

    // Header
    this.menuDrawer = this.getByTestId('menu-drawer');
    this.userAvatar = this.getByTestId('menu-user-avatar');
    this.userName = this.getByTestId('menu-user-name');

    // Menu items
    this.friendsMenuItem = this.getByTestId('menu-friends');
    this.groupsMenuItem = this.getByTestId('menu-groups');
    this.invitesMenuItem = this.getByTestId('menu-invites');
    this.settingsMenuItem = this.getByTestId('menu-settings');
    this.helpMenuItem = this.getByTestId('menu-help');
    this.termsMenuItem = this.getByTestId('menu-terms');
    this.logoutMenuItem = this.getByTestId('menu-logout');

    // Badges
    this.invitesBadge = this.getByTestId('menu-invites-badge');
  }

  /**
   * Aguarda a tela estar completamente carregada
   */
  async waitForPageLoad(): Promise<void> {
    await this.waitForVisible(this.menuDrawer, 5000);
    await this.waitForVisible(this.friendsMenuItem, 5000);
  }

  /**
   * Verifica se a tela está carregada (drawer está aberto)
   */
  async isLoaded(): Promise<boolean> {
    return await this.isVisible(this.menuDrawer);
  }

  /**
   * Verifica se o drawer está aberto
   */
  async isOpen(): Promise<boolean> {
    return await this.isLoaded();
  }

  /**
   * Fecha o drawer (clica no overlay)
   */
  async close(): Promise<void> {
    // Clica fora do drawer para fechar
    await this.page.mouse.click(350, 200);
    await this.waitForHidden(this.menuDrawer, 5000);
  }

  // ========================================
  // Navigation Methods
  // ========================================

  /**
   * Navega para tela de Amigos
   */
  async goToFriends(): Promise<void> {
    await this.click(this.friendsMenuItem);
    await this.sleep(1000); // Aguarda navegação
  }

  /**
   * Navega para tela de Grupos
   */
  async goToGroups(): Promise<void> {
    await this.click(this.groupsMenuItem);
    await this.sleep(1000); // Aguarda navegação
  }

  /**
   * Navega para tela de Convites
   */
  async goToInvites(): Promise<void> {
    await this.click(this.invitesMenuItem);
    await this.sleep(1000); // Aguarda navegação
  }

  /**
   * Navega para tela de Configurações
   */
  async goToSettings(): Promise<void> {
    await this.click(this.settingsMenuItem);
    await this.sleep(1000); // Aguarda navegação
  }

  /**
   * Navega para tela de Ajuda
   */
  async goToHelp(): Promise<void> {
    await this.click(this.helpMenuItem);
    await this.sleep(1000); // Aguarda navegação
  }

  /**
   * Navega para tela de Termos de Uso
   */
  async goToTerms(): Promise<void> {
    await this.click(this.termsMenuItem);
    await this.sleep(1000); // Aguarda navegação
  }

  /**
   * Realiza logout
   */
  async logout(): Promise<void> {
    await this.click(this.logoutMenuItem);
    await this.sleep(2000); // Aguarda processo de logout e navegação
  }

  // ========================================
  // Verification Methods
  // ========================================

  /**
   * Obtém nome do usuário exibido no menu
   */
  async getUserName(): Promise<string> {
    return await this.getText(this.userName);
  }

  /**
   * Verifica se avatar está visível
   */
  async hasAvatar(): Promise<boolean> {
    return await this.isVisible(this.userAvatar);
  }

  /**
   * Verifica se item de menu está visível
   * @param menuItem - "friends" | "groups" | "invites" | "settings" | "help" | "terms" | "logout"
   */
  async hasMenuItem(menuItem: string): Promise<boolean> {
    const item = this.getByTestId(`menu-${menuItem}`);
    return await this.isVisible(item);
  }

  /**
   * Verifica se há badge de convites
   */
  async hasInvitesBadge(): Promise<boolean> {
    return await this.isVisible(this.invitesBadge);
  }

  /**
   * Obtém número de convites pendentes (do badge)
   */
  async getInvitesCount(): Promise<number> {
    const isVisible = await this.hasInvitesBadge();
    if (!isVisible) return 0;

    const text = await this.getText(this.invitesBadge);
    return parseInt(text, 10) || 0;
  }

  /**
   * Verifica se todos os itens principais estão visíveis
   */
  async hasAllMainMenuItems(): Promise<boolean> {
    const items = [
      this.friendsMenuItem,
      this.groupsMenuItem,
      this.invitesMenuItem,
      this.settingsMenuItem,
      this.helpMenuItem,
      this.termsMenuItem,
      this.logoutMenuItem,
    ];

    for (const item of items) {
      const visible = await this.isVisible(item);
      if (!visible) return false;
    }

    return true;
  }
}
