import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class HomeScreen extends BasePage {
  private readonly eventsTabButton: Locator;
  private readonly groupsTabButton: Locator;
  private readonly friendsTabButton: Locator;

  private readonly eventsEmptyState: Locator;
  private readonly eventsList: Locator;
  private readonly eventCard: Locator;

  private readonly groupsEmptyState: Locator;
  private readonly groupsList: Locator;
  private readonly groupCard: Locator;

  private readonly friendsEmptyState: Locator;
  private readonly friendsList: Locator;
  private readonly friendCard: Locator;

  private readonly loadingIndicator: Locator;

  constructor(page: Page) {
    super(page);

    this.eventsTabButton = this.getByText('Eventos').first();
    this.groupsTabButton = this.getByText('Grupos').first();
    this.friendsTabButton = this.getByText('Amigos').first();

    this.eventsEmptyState = this.getByText('Nenhum evento disponível').or(
      this.getByText('Sem eventos no momento')
    );
    this.eventsList = this.getByTestId('home-events-list');
    this.eventCard = this.page.locator('[data-testid^="home-event-card-"]');

    this.groupsEmptyState = this.getByText('Nenhum grupo disponível').or(
      this.getByText('Sem grupos no momento')
    );
    this.groupsList = this.getByTestId('home-groups-list');
    this.groupCard = this.page.locator('[data-testid^="home-group-card-"]');

    this.friendsEmptyState = this.getByText('Sem recomendações').or(
      this.getByText('Nenhuma recomendação no momento')
    );
    this.friendsList = this.getByTestId('home-friends-list');
    this.friendCard = this.page.locator('[data-testid^="home-friend-card-"]');

    this.loadingIndicator = this.page.locator('[data-testid*="loading"]');
  }

  async waitForPageLoad(): Promise<void> {
    const descobrirText = this.getByText('Descobrir').or(
      this.getByText('DESCOBRIR')
    );
    await this.waitForVisible(descobrirText.first(), 10000);

    await this.waitForVisible(this.eventsTabButton, 5000);
  }

  async isLoaded(): Promise<boolean> {
    return await this.isVisible(this.eventsTabButton);
  }

  async goToEventsTab(): Promise<void> {
    await this.click(this.eventsTabButton);
    await this.sleep(1500);
  }

  async goToGroupsTab(): Promise<void> {
    await this.click(this.groupsTabButton);
    await this.sleep(1500);
  }

  async goToFriendsTab(): Promise<void> {
    await this.click(this.friendsTabButton);
    await this.sleep(1500);
  }

  async eventsHasEmptyState(): Promise<boolean> {
    return await this.isVisible(this.eventsEmptyState);
  }

  async eventsHasItems(): Promise<boolean> {
    const count = await this.count(this.eventCard);
    return count > 0;
  }

  async eventsCount(): Promise<number> {
    return await this.count(this.eventCard);
  }

  async eventsClickFirst(): Promise<void> {
    await this.click(this.eventCard.first());
    await this.sleep(1000);
  }

  async eventsClick(index: number): Promise<void> {
    await this.click(this.eventCard.nth(index));
    await this.sleep(1000);
  }

  async groupsHasEmptyState(): Promise<boolean> {
    return await this.isVisible(this.groupsEmptyState);
  }

  async groupsHasItems(): Promise<boolean> {
    const count = await this.count(this.groupCard);
    return count > 0;
  }

  async groupsCount(): Promise<number> {
    return await this.count(this.groupCard);
  }

  async groupsClickFirst(): Promise<void> {
    await this.click(this.groupCard.first());
    await this.sleep(1000);
  }

  async groupsClick(index: number): Promise<void> {
    await this.click(this.groupCard.nth(index));
    await this.sleep(1000);
  }

  async friendsHasEmptyState(): Promise<boolean> {
    return await this.isVisible(this.friendsEmptyState);
  }

  async friendsHasItems(): Promise<boolean> {
    const count = await this.count(this.friendCard);
    return count > 0;
  }

  async friendsCount(): Promise<number> {
    return await this.count(this.friendCard);
  }

  async friendsClickFirst(): Promise<void> {
    await this.click(this.friendCard.first());
    await this.sleep(1000);
  }

  async friendsClick(index: number): Promise<void> {
    await this.click(this.friendCard.nth(index));
    await this.sleep(1000);
  }

  async friendsAddFirst(): Promise<void> {
    const firstCard = this.friendCard.first();
    const addButton = firstCard.locator('[data-testid*="add-friend"]').first();
    await this.click(addButton);
    await this.sleep(1000);
  }

  async waitForContentLoad(): Promise<void> {
    const hasLoading = (await this.loadingIndicator.count()) > 0;
    if (hasLoading) {
      await this.waitForHidden(this.loadingIndicator.first(), 15000);
    }

    await this.sleep(1000);
  }

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

    return await this.isVisible(tab);
  }
}
