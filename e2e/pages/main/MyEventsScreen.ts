import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * MyEventsScreen Page Object
 *
 * Tela "Meus Eventos" - exibe eventos do usuário (como participante ou organizador)
 */
export class MyEventsScreen extends BasePage {
  // Locators - Filtros
  private readonly allFilter: Locator;
  private readonly upcomingFilter: Locator;
  private readonly pastFilter: Locator;
  private readonly organizingFilter: Locator;

  // Locators - Conteúdo
  private readonly emptyStateMessage: Locator;
  private readonly eventsList: Locator;
  private readonly eventCard: Locator;
  private readonly loadingIndicator: Locator;

  constructor(page: Page) {
    super(page);

    // Filtros
    this.allFilter = this.getByTestId('event-filter-all');
    this.upcomingFilter = this.getByTestId('event-filter-upcoming');
    this.pastFilter = this.getByTestId('event-filter-past');
    this.organizingFilter = this.getByTestId('event-filter-organizing');

    // Conteúdo
    this.emptyStateMessage = this.getByText('Você ainda não tem eventos');
    this.eventsList = this.getByTestId('my-events-list');
    this.eventCard = this.page.locator('[data-testid^="event-card-"]');
    this.loadingIndicator = this.page.locator('[data-testid*="loading"]');
  }

  /**
   * Aguarda a tela estar completamente carregada
   */
  async waitForPageLoad(): Promise<void> {
    // Aguarda título ou filtros estarem visíveis
    const eventsText = this.getByText('Meus Eventos').or(this.getByText('EVENTOS'));
    await this.waitForVisible(eventsText.first(), 10000);

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
    const eventsText = this.getByText('Meus Eventos').or(this.getByText('EVENTOS'));
    return await this.isVisible(eventsText.first());
  }

  /**
   * Aguarda eventos carregarem (após mudar filtro ou ação de API)
   */
  async waitForEventsLoad(): Promise<void> {
    // Aguarda skeleton/loading desaparecer
    const hasLoading = await this.loadingIndicator.count() > 0;
    if (hasLoading) {
      await this.waitForHidden(this.loadingIndicator.first(), 15000);
    }

    // Aguarda lista aparecer ou empty state
    await this.sleep(1000); // Aguarda transição de conteúdo
  }

  /**
   * Filtra eventos por "Todos"
   */
  async filterByAll(): Promise<void> {
    await this.click(this.allFilter);
    await this.waitForEventsLoad();
  }

  /**
   * Filtra eventos por "Próximos"
   */
  async filterByUpcoming(): Promise<void> {
    await this.click(this.upcomingFilter);
    await this.waitForEventsLoad();
  }

  /**
   * Filtra eventos por "Passados"
   */
  async filterByPast(): Promise<void> {
    await this.click(this.pastFilter);
    await this.waitForEventsLoad();
  }

  /**
   * Filtra eventos por "Organizando"
   */
  async filterByOrganizing(): Promise<void> {
    await this.click(this.organizingFilter);
    await this.waitForEventsLoad();
  }

  /**
   * Verifica se está mostrando empty state
   */
  async hasEmptyState(): Promise<boolean> {
    return await this.isVisible(this.emptyStateMessage);
  }

  /**
   * Verifica se há eventos na lista
   */
  async hasEvents(): Promise<boolean> {
    const count = await this.count(this.eventCard);
    return count > 0;
  }

  /**
   * Conta quantos eventos estão visíveis
   */
  async countVisibleEvents(): Promise<number> {
    return await this.count(this.eventCard);
  }

  /**
   * Clica no primeiro evento da lista
   */
  async clickFirstEvent(): Promise<void> {
    await this.click(this.eventCard.first());
    await this.sleep(1000); // Aguarda navegação
  }

  /**
   * Clica em evento específico por índice
   * @param index - Índice do evento (0-based)
   */
  async clickEvent(index: number): Promise<void> {
    await this.click(this.eventCard.nth(index));
    await this.sleep(1000); // Aguarda navegação
  }

  /**
   * Obtém título do primeiro evento
   */
  async getFirstEventTitle(): Promise<string> {
    const firstCard = this.eventCard.first();
    const titleElement = firstCard.locator('[data-testid*="event-title"]').first();
    return await this.getText(titleElement);
  }

  /**
   * Verifica se filtro específico está ativo
   * @param filterName - "all" | "upcoming" | "past" | "organizing"
   */
  async isFilterActive(filterName: string): Promise<boolean> {
    const filter = this.getByTestId(`event-filter-${filterName}`);
    // TODO: Verificar atributo/estilo que indica filtro ativo
    return await this.isVisible(filter);
  }
}
