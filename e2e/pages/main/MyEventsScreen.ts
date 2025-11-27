import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class MyEventsScreen extends BasePage {
  private readonly allFilter: Locator;
  private readonly upcomingFilter: Locator;
  private readonly pastFilter: Locator;
  private readonly organizingFilter: Locator;

  private readonly emptyStateMessage: Locator;
  private readonly eventsList: Locator;
  private readonly eventCard: Locator;
  private readonly loadingIndicator: Locator;

  constructor(page: Page) {
    super(page);

    this.allFilter = this.getByTestId('event-filter-all');
    this.upcomingFilter = this.getByTestId('event-filter-upcoming');
    this.pastFilter = this.getByTestId('event-filter-past');
    this.organizingFilter = this.getByTestId('event-filter-organizing');

    this.emptyStateMessage = this.getByText('Você ainda não tem eventos');
    this.eventsList = this.getByTestId('my-events-list');
    this.eventCard = this.page.locator('[data-testid^="event-card-"]');
    this.loadingIndicator = this.page.locator('[data-testid*="loading"]');
  }

  async waitForPageLoad(): Promise<void> {
    const eventsText = this.getByText('Meus Eventos').or(
      this.getByText('EVENTOS')
    );
    await this.waitForVisible(eventsText.first(), 10000);

    const hasLoading = (await this.loadingIndicator.count()) > 0;
    if (hasLoading) {
      await this.waitForHidden(this.loadingIndicator.first(), 15000);
    }
  }

  async isLoaded(): Promise<boolean> {
    const eventsText = this.getByText('Meus Eventos').or(
      this.getByText('EVENTOS')
    );
    return await this.isVisible(eventsText.first());
  }

  async waitForEventsLoad(): Promise<void> {
    const hasLoading = (await this.loadingIndicator.count()) > 0;
    if (hasLoading) {
      await this.waitForHidden(this.loadingIndicator.first(), 15000);
    }

    await this.sleep(1000);
  }

  async filterByAll(): Promise<void> {
    await this.click(this.allFilter);
    await this.waitForEventsLoad();
  }

  async filterByUpcoming(): Promise<void> {
    await this.click(this.upcomingFilter);
    await this.waitForEventsLoad();
  }

  async filterByPast(): Promise<void> {
    await this.click(this.pastFilter);
    await this.waitForEventsLoad();
  }

  async filterByOrganizing(): Promise<void> {
    await this.click(this.organizingFilter);
    await this.waitForEventsLoad();
  }

  async hasEmptyState(): Promise<boolean> {
    return await this.isVisible(this.emptyStateMessage);
  }

  async hasEvents(): Promise<boolean> {
    const count = await this.count(this.eventCard);
    return count > 0;
  }

  async countVisibleEvents(): Promise<number> {
    return await this.count(this.eventCard);
  }

  async clickFirstEvent(): Promise<void> {
    await this.click(this.eventCard.first());
    await this.sleep(1000);
  }

  async clickEvent(index: number): Promise<void> {
    await this.click(this.eventCard.nth(index));
    await this.sleep(1000);
  }

  async getFirstEventTitle(): Promise<string> {
    const firstCard = this.eventCard.first();
    const titleElement = firstCard
      .locator('[data-testid*="event-title"]')
      .first();
    return await this.getText(titleElement);
  }

  async isFilterActive(filterName: string): Promise<boolean> {
    const filter = this.getByTestId(`event-filter-${filterName}`);

    return await this.isVisible(filter);
  }
}
