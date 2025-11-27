import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class MenuScreen extends BasePage {
  private readonly menuDrawer: Locator;
  private readonly userAvatar: Locator;
  private readonly userName: Locator;

  private readonly friendsMenuItem: Locator;
  private readonly groupsMenuItem: Locator;
  private readonly invitesMenuItem: Locator;
  private readonly settingsMenuItem: Locator;
  private readonly helpMenuItem: Locator;
  private readonly termsMenuItem: Locator;
  private readonly logoutMenuItem: Locator;

  private readonly invitesBadge: Locator;

  constructor(page: Page) {
    super(page);

    this.menuDrawer = this.getByTestId('menu-drawer');
    this.userAvatar = this.getByTestId('menu-user-avatar');
    this.userName = this.getByTestId('menu-user-name');

    this.friendsMenuItem = this.getByTestId('menu-friends');
    this.groupsMenuItem = this.getByTestId('menu-groups');
    this.invitesMenuItem = this.getByTestId('menu-invites');
    this.settingsMenuItem = this.getByTestId('menu-settings');
    this.helpMenuItem = this.getByTestId('menu-help');
    this.termsMenuItem = this.getByTestId('menu-terms');
    this.logoutMenuItem = this.getByTestId('menu-logout');

    this.invitesBadge = this.getByTestId('menu-invites-badge');
  }

  async waitForPageLoad(): Promise<void> {
    await this.waitForVisible(this.menuDrawer, 5000);
    await this.waitForVisible(this.friendsMenuItem, 5000);
  }

  async isLoaded(): Promise<boolean> {
    return await this.isVisible(this.menuDrawer);
  }

  async isOpen(): Promise<boolean> {
    return await this.isLoaded();
  }

  async close(): Promise<void> {
    await this.page.mouse.click(350, 200);
    await this.waitForHidden(this.menuDrawer, 5000);
  }

  async goToFriends(): Promise<void> {
    await this.click(this.friendsMenuItem);
    await this.sleep(1000);
  }

  async goToGroups(): Promise<void> {
    await this.click(this.groupsMenuItem);
    await this.sleep(1000);
  }

  async goToInvites(): Promise<void> {
    await this.click(this.invitesMenuItem);
    await this.sleep(1000);
  }

  async goToSettings(): Promise<void> {
    await this.click(this.settingsMenuItem);
    await this.sleep(1000);
  }

  async goToHelp(): Promise<void> {
    await this.click(this.helpMenuItem);
    await this.sleep(1000);
  }

  async goToTerms(): Promise<void> {
    await this.click(this.termsMenuItem);
    await this.sleep(1000);
  }

  async logout(): Promise<void> {
    await this.click(this.logoutMenuItem);
    await this.sleep(2000);
  }

  async getUserName(): Promise<string> {
    return await this.getText(this.userName);
  }

  async hasAvatar(): Promise<boolean> {
    return await this.isVisible(this.userAvatar);
  }

  async hasMenuItem(menuItem: string): Promise<boolean> {
    const item = this.getByTestId(`menu-${menuItem}`);
    return await this.isVisible(item);
  }

  async hasInvitesBadge(): Promise<boolean> {
    return await this.isVisible(this.invitesBadge);
  }

  async getInvitesCount(): Promise<number> {
    const isVisible = await this.hasInvitesBadge();
    if (!isVisible) return 0;

    const text = await this.getText(this.invitesBadge);
    return parseInt(text, 10) || 0;
  }

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
