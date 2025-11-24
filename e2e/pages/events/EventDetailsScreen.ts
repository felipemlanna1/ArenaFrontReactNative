import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * EventDetailsScreen Page Object
 *
 * Tela de detalhes de um evento.
 * Permite visualizar informações e interagir (entrar, sair, editar).
 */
export class EventDetailsScreen extends BasePage {
  // Locators - Hero Section
  private readonly eventTitle: Locator;
  private readonly eventImage: Locator;
  private readonly backButton: Locator;
  private readonly shareButton: Locator;
  private readonly editFab: Locator;

  // Locators - Event Info
  private readonly dateInfo: Locator;
  private readonly locationInfo: Locator;
  private readonly organizerCard: Locator;
  private readonly description: Locator;

  // Locators - Participants
  private readonly participantsSection: Locator;
  private readonly participantsList: Locator;

  // Locators - Action Buttons
  private readonly joinButton: Locator;
  private readonly leaveButton: Locator;
  private readonly confirmButton: Locator;
  private readonly inviteButton: Locator;

  // Locators - Loading/Error
  private readonly loadingIndicator: Locator;
  private readonly errorMessage: Locator;
  private readonly retryButton: Locator;

  constructor(page: Page) {
    super(page);

    // Hero Section
    this.eventTitle = this.page.locator('h1, [variant="headingPrimary"]').first();
    this.eventImage = this.page.locator('img').first();
    this.backButton = this.page.locator('button').filter({ has: this.page.locator('[name="arrow-back"]') });
    this.shareButton = this.page.locator('button').filter({ has: this.page.locator('[name="share-social"]') });
    this.editFab = this.getByTestId('edit-event-fab');

    // Event Info
    this.dateInfo = this.page.locator('div').filter({ hasText: /\d{2}\/\d{2}\/\d{4}/ }).first();
    this.locationInfo = this.page.locator('div').filter({ hasText: /Rua|Avenida|Local/ }).first();
    this.organizerCard = this.page.locator('div').filter({ hasText: /Organizador|Organizado por/ }).first();
    this.description = this.page.locator('div').filter({ hasText: /Descrição/ }).first();

    // Participants
    this.participantsSection = this.page.locator('div').filter({ hasText: /Participantes/ });
    this.participantsList = this.page.locator('[data-testid^="participant-"]');

    // Action Buttons
    this.joinButton = this.getByRole('button', { name: /Confirmar presença|Entrar/i });
    this.leaveButton = this.getByRole('button', { name: /Sair do evento|Cancelar presença/i });
    this.confirmButton = this.getByRole('button', { name: /Confirmar/i });
    this.inviteButton = this.getByRole('button', { name: /Convidar participantes/i });

    // Loading/Error
    this.loadingIndicator = this.page.locator('[data-testid="sports-loading"]');
    this.errorMessage = this.getByText(/Erro ao carregar|não encontrado/i);
    this.retryButton = this.getByRole('button', { name: /Tentar novamente/i });
  }

  /**
   * Aguarda a tela estar completamente carregada
   */
  async waitForPageLoad(): Promise<void> {
    // Aguarda loading desaparecer
    await this.waitForHidden(this.loadingIndicator, 15000).catch(() => {
      // Loading pode já ter sumido
    });

    // Aguarda título do evento aparecer
    await this.waitForVisible(this.eventTitle, 10000);
  }

  /**
   * Verifica se a tela está carregada
   */
  async isLoaded(): Promise<boolean> {
    return await this.isVisible(this.eventTitle);
  }

  /**
   * Verifica se há erro
   */
  async hasError(): Promise<boolean> {
    return await this.isVisible(this.errorMessage);
  }

  /**
   * Navega de volta
   */
  async goBack(): Promise<void> {
    await this.click(this.backButton);
  }

  // ========================================
  // EVENT INFO GETTERS
  // ========================================

  /**
   * Obtém título do evento
   */
  async getTitle(): Promise<string> {
    return await this.getText(this.eventTitle);
  }

  /**
   * Obtém descrição do evento
   */
  async getDescription(): Promise<string> {
    return await this.getText(this.description);
  }

  /**
   * Verifica se é proprietário do evento
   */
  async isOwner(): Promise<boolean> {
    return await this.isVisible(this.editFab);
  }

  // ========================================
  // PARTICIPANT ACTIONS
  // ========================================

  /**
   * Confirma presença no evento (Join)
   */
  async joinEvent(): Promise<void> {
    console.log('📝 EventDetailsScreen: Confirmando presença...');
    await this.click(this.joinButton);
    // Aguarda API response
    await this.waitForAPI(/\/events\/.*\/participants/, 10000);
    await this.page.waitForTimeout(1000); // Wait for UI update
    console.log('✅ EventDetailsScreen: Presença confirmada!');
  }

  /**
   * Cancela presença no evento (Leave)
   */
  async leaveEvent(): Promise<void> {
    console.log('📝 EventDetailsScreen: Cancelando presença...');
    await this.click(this.leaveButton);
    // Aguarda API response
    await this.waitForAPI(/\/events\/.*\/participants/, 10000);
    await this.page.waitForTimeout(1000); // Wait for UI update
    console.log('✅ EventDetailsScreen: Presença cancelada!');
  }

  /**
   * Verifica se já está participando
   */
  async isParticipating(): Promise<boolean> {
    return await this.isVisible(this.leaveButton);
  }

  /**
   * Verifica se pode confirmar presença
   */
  async canJoin(): Promise<boolean> {
    return await this.isVisible(this.joinButton);
  }

  // ========================================
  // ORGANIZER ACTIONS
  // ========================================

  /**
   * Abre tela de edição (se for owner)
   */
  async editEvent(): Promise<void> {
    if (!(await this.isOwner())) {
      throw new Error('Usuário não é owner do evento');
    }
    await this.click(this.editFab);
    await this.page.waitForTimeout(2000); // Wait for navigation
  }

  /**
   * Convida participantes (se for owner)
   */
  async inviteParticipants(userIds: string[]): Promise<void> {
    if (!(await this.isOwner())) {
      throw new Error('Usuário não é owner do evento');
    }

    await this.click(this.inviteButton);
    await this.page.waitForTimeout(1000); // Wait for modal

    // TODO: Implementar seleção de usuários no modal
    // Isso dependerá da estrutura do InviteUsersModal

    // Confirmar convite
    const confirmModalButton = this.page.locator('button').filter({ hasText: /Convidar|Enviar/i });
    await this.click(confirmModalButton);
    await this.page.waitForTimeout(1000);
  }

  // ========================================
  // SHARING
  // ========================================

  /**
   * Compartilha evento
   */
  async shareEvent(): Promise<void> {
    await this.click(this.shareButton);
    // Share action triggers native share sheet
    await this.page.waitForTimeout(500);
  }

  // ========================================
  // PARTICIPANTS INFO
  // ========================================

  /**
   * Conta número de participantes exibidos
   */
  async getParticipantsCount(): Promise<number> {
    return await this.count(this.participantsList);
  }

  /**
   * Verifica se seção de participantes está visível
   */
  async hasParticipantsSection(): Promise<boolean> {
    return await this.isVisible(this.participantsSection);
  }

  // ========================================
  // CONVENIENCE METHODS
  // ========================================

  /**
   * Aguarda evento carregar e verifica se está disponível
   */
  async waitForEventLoad(): Promise<void> {
    await this.waitForPageLoad();

    if (await this.hasError()) {
      const errorText = await this.getText(this.errorMessage);
      throw new Error(`Erro ao carregar evento: ${errorText}`);
    }
  }

  /**
   * Verifica se evento está disponível (não tem erro)
   */
  async isEventAvailable(): Promise<boolean> {
    await this.waitForPageLoad();
    return !(await this.hasError());
  }

  /**
   * Obtém informações resumidas do evento
   */
  async getEventSummary(): Promise<{
    title: string;
    isOwner: boolean;
    isParticipating: boolean;
    canJoin: boolean;
    participantsCount: number;
  }> {
    await this.waitForEventLoad();

    return {
      title: await this.getTitle(),
      isOwner: await this.isOwner(),
      isParticipating: await this.isParticipating(),
      canJoin: await this.canJoin(),
      participantsCount: await this.getParticipantsCount(),
    };
  }
}
