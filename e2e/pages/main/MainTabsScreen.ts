import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class MainTabsScreen extends BasePage {
  private readonly eventosTab: Locator;
  private readonly homeTab: Locator;
  private readonly perfilTab: Locator;
  private readonly menuTab: Locator;

  private readonly eventosText: Locator;
  private readonly menuDrawer: Locator;

  constructor(page: Page) {
    super(page);

    this.eventosTab = this.getByTestId('tab-eventos');
    this.homeTab = this.getByTestId('tab-home');
    this.perfilTab = this.getByTestId('tab-perfil');
    this.menuTab = this.getByTestId('tab-menu');

    this.eventosText = this.getByText('EVENTOS')
      .or(this.getByText('Eventos'))
      .first();
    this.menuDrawer = this.getByTestId('menu-drawer');
  }

  async waitForPageLoad(): Promise<void> {
    await this.waitForVisible(this.eventosTab, 20000);
    await this.waitForVisible(this.homeTab, 5000);
    await this.waitForVisible(this.perfilTab, 5000);
    await this.waitForVisible(this.menuTab, 5000);
  }

  async isLoaded(): Promise<boolean> {
    const eventosVisible = await this.isVisible(this.eventosTab);
    const homeVisible = await this.isVisible(this.homeTab);
    return eventosVisible && homeVisible;
  }

  async goToEventos(): Promise<void> {
    await this.click(this.eventosTab);
    await this.sleep(1000);
  }

  async goToHome(): Promise<void> {
    await this.click(this.homeTab);
    await this.sleep(1000);
  }

  async goToPerfil(): Promise<void> {
    await this.click(this.perfilTab);
    await this.sleep(1000);
  }

  async openMenu(): Promise<void> {
    await this.click(this.menuTab);
    await this.waitForModal(this.menuDrawer, true, 5000);
  }

  async closeMenu(): Promise<void> {
    await this.page.mouse.click(350, 200);
    await this.waitForModal(this.menuDrawer, false, 5000);
  }

  async countTabs(): Promise<number> {
    const tabs = this.page.locator('[role="tab"]');
    return await this.count(tabs);
  }

  async isTabActive(tabName: string): Promise<boolean> {
    const tab = this.getByTestId(`tab-${tabName}`);

    return await this.isVisible(tab);
  }

  async waitForEventosContent(): Promise<void> {
    await this.waitForVisible(this.eventosText, 10000);
  }

  async isMenuOpen(): Promise<boolean> {
    return await this.isVisible(this.menuDrawer);
  }
}
