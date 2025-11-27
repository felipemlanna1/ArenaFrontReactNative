import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class ProfileScreen extends BasePage {
  private readonly profileAvatar: Locator;
  private readonly userName: Locator;
  private readonly userBio: Locator;
  private readonly editProfileButton: Locator;

  private readonly eventsCount: Locator;
  private readonly groupsCount: Locator;
  private readonly friendsCount: Locator;

  private readonly sportsSection: Locator;
  private readonly sportChip: Locator;

  private readonly recentActivitySection: Locator;
  private readonly activityItem: Locator;

  private readonly loadingIndicator: Locator;

  constructor(page: Page) {
    super(page);

    this.profileAvatar = this.getByTestId('profile-avatar');
    this.userName = this.getByTestId('profile-user-name');
    this.userBio = this.getByTestId('profile-user-bio');
    this.editProfileButton = this.getByTestId('profile-edit-button').or(
      this.getByText('Editar Perfil')
    );

    this.eventsCount = this.getByTestId('profile-events-count');
    this.groupsCount = this.getByTestId('profile-groups-count');
    this.friendsCount = this.getByTestId('profile-friends-count');

    this.sportsSection = this.getByTestId('profile-sports-section');
    this.sportChip = this.page.locator('[data-testid^="profile-sport-chip-"]');

    this.recentActivitySection = this.getByTestId('profile-recent-activity');
    this.activityItem = this.page.locator(
      '[data-testid^="profile-activity-item-"]'
    );

    this.loadingIndicator = this.page.locator('[data-testid*="loading"]');
  }

  async waitForPageLoad(): Promise<void> {
    await this.waitForVisible(this.userName, 10000);

    const hasLoading = (await this.loadingIndicator.count()) > 0;
    if (hasLoading) {
      await this.waitForHidden(this.loadingIndicator.first(), 15000);
    }
  }

  async isLoaded(): Promise<boolean> {
    return await this.isVisible(this.userName);
  }

  async goToEditProfile(): Promise<void> {
    await this.click(this.editProfileButton);
    await this.sleep(1000);
  }

  async getUserName(): Promise<string> {
    return await this.getText(this.userName);
  }

  async getUserBio(): Promise<string> {
    const isVisible = await this.isVisible(this.userBio);
    if (!isVisible) return '';
    return await this.getText(this.userBio);
  }

  async getEventsCount(): Promise<number> {
    const text = await this.getText(this.eventsCount);
    return parseInt(text, 10) || 0;
  }

  async getGroupsCount(): Promise<number> {
    const text = await this.getText(this.groupsCount);
    return parseInt(text, 10) || 0;
  }

  async getFriendsCount(): Promise<number> {
    const text = await this.getText(this.friendsCount);
    return parseInt(text, 10) || 0;
  }

  async hasSports(): Promise<boolean> {
    const count = await this.count(this.sportChip);
    return count > 0;
  }

  async countSports(): Promise<number> {
    return await this.count(this.sportChip);
  }

  async hasRecentActivity(): Promise<boolean> {
    const count = await this.count(this.activityItem);
    return count > 0;
  }

  async countActivityItems(): Promise<number> {
    return await this.count(this.activityItem);
  }

  async clickEventsStats(): Promise<void> {
    const eventsStatsButton = this.eventsCount.locator('..');
    await this.click(eventsStatsButton);
    await this.sleep(1000);
  }

  async clickGroupsStats(): Promise<void> {
    const groupsStatsButton = this.groupsCount.locator('..');
    await this.click(groupsStatsButton);
    await this.sleep(1000);
  }

  async clickFriendsStats(): Promise<void> {
    const friendsStatsButton = this.friendsCount.locator('..');
    await this.click(friendsStatsButton);
    await this.sleep(1000);
  }

  async hasAvatar(): Promise<boolean> {
    return await this.isVisible(this.profileAvatar);
  }
}
