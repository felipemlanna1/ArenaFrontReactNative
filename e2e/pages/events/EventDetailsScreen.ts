import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class EventDetailsScreen extends BasePage {
  private readonly eventTitle: Locator;
  private readonly eventImage: Locator;
  private readonly backButton: Locator;
  private readonly shareButton: Locator;
  private readonly editFab: Locator;

  private readonly dateInfo: Locator;
  private readonly locationInfo: Locator;
  private readonly organizerCard: Locator;
  private readonly description: Locator;

  private readonly participantsSection: Locator;
  private readonly participantsList: Locator;

  private readonly joinButton: Locator;
  private readonly leaveButton: Locator;
  private readonly confirmButton: Locator;
  private readonly inviteButton: Locator;

  private readonly loadingIndicator: Locator;
  private readonly errorMessage: Locator;
  private readonly retryButton: Locator;

  constructor(page: Page) {
    super(page);

    this.eventTitle = this.page
      .locator('h1, [variant="headingPrimary"]')
      .first();
    this.eventImage = this.page.locator('img').first();
    this.backButton = this.page
      .locator('button')
      .filter({ has: this.page.locator('[name="arrow-back"]') });
    this.shareButton = this.page
      .locator('button')
      .filter({ has: this.page.locator('[name="share-social"]') });
    this.editFab = this.getByTestId('edit-event-fab');

    this.dateInfo = this.page
      .locator('div')
      .filter({ hasText: /\d{2}\/\d{2}\/\d{4}/ })
      .first();
    this.locationInfo = this.page
      .locator('div')
      .filter({ hasText: /Rua|Avenida|Local/ })
      .first();
    this.organizerCard = this.page
      .locator('div')
      .filter({ hasText: /Organizador|Organizado por/ })
      .first();
    this.description = this.page
      .locator('div')
      .filter({ hasText: /Descrição/ })
      .first();

    this.participantsSection = this.page
      .locator('div')
      .filter({ hasText: /Participantes/ });
    this.participantsList = this.page.locator('[data-testid^="participant-"]');

    this.joinButton = this.getByRole('button', {
      name: /Confirmar presença|Entrar/i,
    });
    this.leaveButton = this.getByRole('button', {
      name: /Sair do evento|Cancelar presença/i,
    });
    this.confirmButton = this.getByRole('button', { name: /Confirmar/i });
    this.inviteButton = this.getByRole('button', {
      name: /Convidar participantes/i,
    });

    this.loadingIndicator = this.page.locator('[data-testid="sports-loading"]');
    this.errorMessage = this.getByText(/Erro ao carregar|não encontrado/i);
    this.retryButton = this.getByRole('button', { name: /Tentar novamente/i });
  }

  async waitForPageLoad(): Promise<void> {
    await this.waitForHidden(this.loadingIndicator, 15000).catch(() => {});

    await this.waitForVisible(this.eventTitle, 10000);
  }

  async isLoaded(): Promise<boolean> {
    return await this.isVisible(this.eventTitle);
  }

  async hasError(): Promise<boolean> {
    return await this.isVisible(this.errorMessage);
  }

  async goBack(): Promise<void> {
    await this.click(this.backButton);
  }

  async getTitle(): Promise<string> {
    return await this.getText(this.eventTitle);
  }

  async getDescription(): Promise<string> {
    return await this.getText(this.description);
  }

  async isOwner(): Promise<boolean> {
    return await this.isVisible(this.editFab);
  }

  async joinEvent(): Promise<void> {
    await this.click(this.joinButton);

    await this.waitForAPI(/\/events\/.*\/participants/, 10000);
    await this.page.waitForTimeout(1000);
  }

  async leaveEvent(): Promise<void> {
    await this.click(this.leaveButton);

    await this.waitForAPI(/\/events\/.*\/participants/, 10000);
    await this.page.waitForTimeout(1000);
  }

  async isParticipating(): Promise<boolean> {
    return await this.isVisible(this.leaveButton);
  }

  async canJoin(): Promise<boolean> {
    return await this.isVisible(this.joinButton);
  }

  async editEvent(): Promise<void> {
    if (!(await this.isOwner())) {
      throw new Error('Usuário não é owner do evento');
    }
    await this.click(this.editFab);
    await this.page.waitForTimeout(2000);
  }

  async inviteParticipants(userIds: string[]): Promise<void> {
    if (!(await this.isOwner())) {
      throw new Error('Usuário não é owner do evento');
    }

    await this.click(this.inviteButton);
    await this.page.waitForTimeout(1000);
    const confirmModalButton = this.page
      .locator('button')
      .filter({ hasText: /Convidar|Enviar/i });
    await this.click(confirmModalButton);
    await this.page.waitForTimeout(1000);
  }

  async shareEvent(): Promise<void> {
    await this.click(this.shareButton);

    await this.page.waitForTimeout(500);
  }

  async getParticipantsCount(): Promise<number> {
    return await this.count(this.participantsList);
  }

  async hasParticipantsSection(): Promise<boolean> {
    return await this.isVisible(this.participantsSection);
  }

  async waitForEventLoad(): Promise<void> {
    await this.waitForPageLoad();

    if (await this.hasError()) {
      const errorText = await this.getText(this.errorMessage);
      throw new Error(`Erro ao carregar evento: ${errorText}`);
    }
  }

  async isEventAvailable(): Promise<boolean> {
    await this.waitForPageLoad();
    return !(await this.hasError());
  }

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
