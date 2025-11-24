import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * MainTabsScreen Page Object
 *
 * Representa o Bottom Tab Navigator com as 4 tabs principais:
 * - Eventos (Meus Eventos)
 * - Descobrir (Home)
 * - Perfil
 * - Menu
 */
export class MainTabsScreen extends BasePage {
  // Locators - Bottom Tabs
  private readonly eventosTab: Locator;
  private readonly homeTab: Locator;
  private readonly perfilTab: Locator;
  private readonly menuTab: Locator;

  // Locators - Indicadores de conteúdo
  private readonly eventosText: Locator;
  private readonly menuDrawer: Locator;

  constructor(page: Page) {
    super(page);

    // Bottom tabs
    this.eventosTab = this.getByTestId('tab-eventos');
    this.homeTab = this.getByTestId('tab-home');
    this.perfilTab = this.getByTestId('tab-perfil');
    this.menuTab = this.getByTestId('tab-menu');

    // Indicadores de conteúdo
    this.eventosText = this.getByText('EVENTOS')
      .or(this.getByText('Eventos'))
      .first();
    this.menuDrawer = this.getByTestId('menu-drawer');
  }

  /**
   * Aguarda a tela estar completamente carregada
   */
  async waitForPageLoad(): Promise<void> {
    // Aguarda bottom tabs renderizarem
    await this.waitForVisible(this.eventosTab, 20000);
    await this.waitForVisible(this.homeTab, 5000);
    await this.waitForVisible(this.perfilTab, 5000);
    await this.waitForVisible(this.menuTab, 5000);
  }

  /**
   * Verifica se a tela está carregada
   */
  async isLoaded(): Promise<boolean> {
    const eventosVisible = await this.isVisible(this.eventosTab);
    const homeVisible = await this.isVisible(this.homeTab);
    return eventosVisible && homeVisible;
  }

  /**
   * Navega para tab Eventos (Meus Eventos)
   */
  async goToEventos(): Promise<void> {
    await this.click(this.eventosTab);
    await this.sleep(1000); // Aguarda transição
  }

  /**
   * Navega para tab Home (Descobrir)
   */
  async goToHome(): Promise<void> {
    await this.click(this.homeTab);
    await this.sleep(1000); // Aguarda transição
  }

  /**
   * Navega para tab Perfil
   */
  async goToPerfil(): Promise<void> {
    await this.click(this.perfilTab);
    await this.sleep(1000); // Aguarda transição
  }

  /**
   * Abre Menu Drawer
   */
  async openMenu(): Promise<void> {
    await this.click(this.menuTab);
    await this.waitForModal(this.menuDrawer, true, 5000);
  }

  /**
   * Fecha Menu Drawer (clicando fora do drawer)
   */
  async closeMenu(): Promise<void> {
    // Clica fora do drawer para fechar (overlay)
    await this.page.mouse.click(350, 200);
    await this.waitForModal(this.menuDrawer, false, 5000);
  }

  /**
   * Verifica se existem 4 tabs
   */
  async countTabs(): Promise<number> {
    const tabs = this.page.locator('[role="tab"]');
    return await this.count(tabs);
  }

  /**
   * Verifica se tab específica está ativa
   * @param tabName - "eventos" | "home" | "perfil" | "menu"
   */
  async isTabActive(tabName: string): Promise<boolean> {
    const tab = this.getByTestId(`tab-${tabName}`);
    // TODO: Verificar atributo ou estilo que indica tab ativa
    return await this.isVisible(tab);
  }

  /**
   * Aguarda conteúdo de Eventos carregar
   */
  async waitForEventosContent(): Promise<void> {
    await this.waitForVisible(this.eventosText, 10000);
  }

  /**
   * Verifica se Menu Drawer está aberto
   */
  async isMenuOpen(): Promise<boolean> {
    return await this.isVisible(this.menuDrawer);
  }
}
