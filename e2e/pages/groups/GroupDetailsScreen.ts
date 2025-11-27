import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class GroupDetailsScreen extends BasePage {
  private readonly groupName: Locator;
  private readonly groupCoverImage: Locator;
  private readonly backButton: Locator;
  private readonly editFab: Locator;

  private readonly privacyBadge: Locator;
  private readonly groupDescription: Locator;
  private readonly groupLocation: Locator;
  private readonly roleBadge: Locator;

  private readonly capacityIndicator: Locator;

  private readonly statsSection: Locator;

  private readonly rulesSection: Locator;

  private readonly eventsSection: Locator;
  private readonly createEventButton: Locator;

  private readonly membersSection: Locator;
  private readonly membersList: Locator;
  private readonly inviteMembersButton: Locator;
  private readonly showAllMembersButton: Locator;

  private readonly joinButton: Locator;
  private readonly leaveButton: Locator;

  private readonly confirmationModal: Locator;
  private readonly confirmModalButton: Locator;
  private readonly cancelModalButton: Locator;

  private readonly loadingIndicator: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.groupName = this.page
      .locator('h1, [variant="headingPrimary"]')
      .first();
    this.groupCoverImage = this.page.locator('img').first();
    this.backButton = this.page
      .locator('button')
      .filter({ has: this.page.locator('[name="arrow-back"]') });
    this.editFab = this.getByTestId('edit-group-fab');

    this.privacyBadge = this.page
      .locator('div')
      .filter({ hasText: /Grupo Privado/i });
    this.groupDescription = this.page
      .locator('div, p')
      .filter({ hasText: /Descrição/ });
    this.groupLocation = this.page
      .locator('div')
      .filter({ hasText: /São Paulo|Rio de Janeiro|Belo Horizonte/ });
    this.roleBadge = this.page.locator('[data-testid^="role-badge-"]');

    this.capacityIndicator = this.page
      .locator('div')
      .filter({ hasText: /\d+\/\d+ membros/ });

    this.statsSection = this.page
      .locator('div')
      .filter({ hasText: /Estatísticas|Eventos realizados/ });
    this.rulesSection = this.page
      .locator('div')
      .filter({ hasText: /Regras do grupo/ });
    this.eventsSection = this.page
      .locator('div')
      .filter({ hasText: /Eventos do grupo/ });
    this.membersSection = this.page
      .locator('div')
      .filter({ hasText: /Membros/ });

    this.membersList = this.page.locator('[data-testid^="member-"]');
    this.inviteMembersButton = this.getByRole('button', {
      name: /Convidar membros/i,
    });
    this.showAllMembersButton = this.getByRole('button', {
      name: /Ver todos|Mostrar menos/i,
    });

    this.createEventButton = this.getByRole('button', {
      name: /Criar evento/i,
    });

    this.joinButton = this.getByRole('button', { name: /Entrar no grupo/i });
    this.leaveButton = this.getByRole('button', { name: /Sair do grupo/i });

    this.confirmationModal = this.page.locator(
      '[role="dialog"], [data-testid="confirmation-modal"]'
    );
    this.confirmModalButton = this.page
      .locator('button')
      .filter({ hasText: /Sair|Remover|Confirmar/i });
    this.cancelModalButton = this.page
      .locator('button')
      .filter({ hasText: /Cancelar/i });

    this.loadingIndicator = this.page.locator('[data-testid="sports-loading"]');
    this.errorMessage = this.getByText(/não encontrado|Erro/i);
  }

  async waitForPageLoad(): Promise<void> {
    await this.waitForHidden(this.loadingIndicator, 15000).catch(() => {});

    await this.waitForVisible(this.groupName, 10000);
  }

  async isLoaded(): Promise<boolean> {
    return await this.isVisible(this.groupName);
  }

  async hasError(): Promise<boolean> {
    return await this.isVisible(this.errorMessage);
  }

  async goBack(): Promise<void> {
    await this.click(this.backButton);
  }

  async getName(): Promise<string> {
    return await this.getText(this.groupName);
  }

  async getDescription(): Promise<string> {
    return await this.getText(this.groupDescription);
  }

  async isPrivate(): Promise<boolean> {
    return await this.isVisible(this.privacyBadge);
  }

  async canManage(): Promise<boolean> {
    return await this.isVisible(this.editFab);
  }

  async getUserRole(): Promise<string | null> {
    if (!(await this.isVisible(this.roleBadge))) {
      return null;
    }
    return await this.getText(this.roleBadge);
  }

  async joinGroup(): Promise<void> {
    await this.click(this.joinButton);

    await this.waitForAPI(/\/groups\/.*\/members/, 10000);
    await this.page.waitForTimeout(1000);
  }

  async leaveGroup(): Promise<void> {
    await this.click(this.leaveButton);

    await this.waitForVisible(this.confirmationModal, 5000);

    await this.click(this.confirmModalButton);

    await this.waitForAPI(/\/groups\/.*\/members/, 10000);
    await this.page.waitForTimeout(1000);
  }

  async isMember(): Promise<boolean> {
    return await this.isVisible(this.leaveButton);
  }

  async canJoin(): Promise<boolean> {
    return await this.isVisible(this.joinButton);
  }

  async editGroup(): Promise<void> {
    if (!(await this.canManage())) {
      throw new Error('Usuário não pode gerenciar o grupo');
    }
    await this.click(this.editFab);
    await this.page.waitForTimeout(2000);
  }

  async inviteMembers(userIds: string[]): Promise<void> {
    if (!(await this.canManage())) {
      throw new Error('Usuário não pode gerenciar o grupo');
    }

    await this.click(this.inviteMembersButton);
    await this.page.waitForTimeout(1000);
    const confirmModalButton = this.page
      .locator('button')
      .filter({ hasText: /Convidar|Enviar/i });
    await this.click(confirmModalButton);
    await this.page.waitForTimeout(1000);
  }

  async createEvent(): Promise<void> {
    await this.click(this.createEventButton);
    await this.page.waitForTimeout(2000);
  }

  async getMembersCount(): Promise<number> {
    return await this.count(this.membersList);
  }

  async showAllMembers(): Promise<void> {
    if (await this.isVisible(this.showAllMembersButton)) {
      const buttonText = await this.getText(this.showAllMembersButton);
      if (buttonText.includes('Ver todos')) {
        await this.click(this.showAllMembersButton);
        await this.page.waitForTimeout(500);
      }
    }
  }

  async hasMembersSection(): Promise<boolean> {
    return await this.isVisible(this.membersSection);
  }

  async hasEventsSection(): Promise<boolean> {
    return await this.isVisible(this.eventsSection);
  }

  async canCreateEvents(): Promise<boolean> {
    return await this.isVisible(this.createEventButton);
  }

  async waitForGroupLoad(): Promise<void> {
    await this.waitForPageLoad();

    if (await this.hasError()) {
      const errorText = await this.getText(this.errorMessage);
      throw new Error(`Erro ao carregar grupo: ${errorText}`);
    }
  }

  async isGroupAvailable(): Promise<boolean> {
    await this.waitForPageLoad();
    return !(await this.hasError());
  }

  async getGroupSummary(): Promise<{
    name: string;
    isPrivate: boolean;
    isMember: boolean;
    canManage: boolean;
    canJoin: boolean;
    canCreateEvents: boolean;
    membersCount: number;
    userRole: string | null;
  }> {
    await this.waitForGroupLoad();

    return {
      name: await this.getName(),
      isPrivate: await this.isPrivate(),
      isMember: await this.isMember(),
      canManage: await this.canManage(),
      canJoin: await this.canJoin(),
      canCreateEvents: await this.canCreateEvents(),
      membersCount: await this.getMembersCount(),
      userRole: await this.getUserRole(),
    };
  }
}
