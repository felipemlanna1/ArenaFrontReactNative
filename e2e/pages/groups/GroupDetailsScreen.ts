import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * GroupDetailsScreen Page Object
 *
 * Tela de detalhes de um grupo.
 * Permite visualizar informações e interagir (entrar, sair, gerenciar, convidar).
 */
export class GroupDetailsScreen extends BasePage {
  // Locators - Hero Section
  private readonly groupName: Locator;
  private readonly groupCoverImage: Locator;
  private readonly backButton: Locator;
  private readonly editFab: Locator;

  // Locators - Info
  private readonly privacyBadge: Locator;
  private readonly groupDescription: Locator;
  private readonly groupLocation: Locator;
  private readonly roleBadge: Locator;

  // Locators - Capacity
  private readonly capacityIndicator: Locator;

  // Locators - Statistics
  private readonly statsSection: Locator;

  // Locators - Rules
  private readonly rulesSection: Locator;

  // Locators - Events
  private readonly eventsSection: Locator;
  private readonly createEventButton: Locator;

  // Locators - Members
  private readonly membersSection: Locator;
  private readonly membersList: Locator;
  private readonly inviteMembersButton: Locator;
  private readonly showAllMembersButton: Locator;

  // Locators - Action Buttons
  private readonly joinButton: Locator;
  private readonly leaveButton: Locator;

  // Locators - Modals
  private readonly confirmationModal: Locator;
  private readonly confirmModalButton: Locator;
  private readonly cancelModalButton: Locator;

  // Locators - Loading
  private readonly loadingIndicator: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Hero Section
    this.groupName = this.page.locator('h1, [variant="headingPrimary"]').first();
    this.groupCoverImage = this.page.locator('img').first();
    this.backButton = this.page.locator('button').filter({ has: this.page.locator('[name="arrow-back"]') });
    this.editFab = this.getByTestId('edit-group-fab');

    // Info
    this.privacyBadge = this.page.locator('div').filter({ hasText: /Grupo Privado/i });
    this.groupDescription = this.page.locator('div, p').filter({ hasText: /Descrição/ });
    this.groupLocation = this.page.locator('div').filter({ hasText: /São Paulo|Rio de Janeiro|Belo Horizonte/ });
    this.roleBadge = this.page.locator('[data-testid^="role-badge-"]');

    // Capacity
    this.capacityIndicator = this.page.locator('div').filter({ hasText: /\d+\/\d+ membros/ });

    // Sections
    this.statsSection = this.page.locator('div').filter({ hasText: /Estatísticas|Eventos realizados/ });
    this.rulesSection = this.page.locator('div').filter({ hasText: /Regras do grupo/ });
    this.eventsSection = this.page.locator('div').filter({ hasText: /Eventos do grupo/ });
    this.membersSection = this.page.locator('div').filter({ hasText: /Membros/ });

    // Members
    this.membersList = this.page.locator('[data-testid^="member-"]');
    this.inviteMembersButton = this.getByRole('button', { name: /Convidar membros/i });
    this.showAllMembersButton = this.getByRole('button', { name: /Ver todos|Mostrar menos/i });

    // Events
    this.createEventButton = this.getByRole('button', { name: /Criar evento/i });

    // Action Buttons
    this.joinButton = this.getByRole('button', { name: /Entrar no grupo/i });
    this.leaveButton = this.getByRole('button', { name: /Sair do grupo/i });

    // Modals
    this.confirmationModal = this.page.locator('[role="dialog"], [data-testid="confirmation-modal"]');
    this.confirmModalButton = this.page.locator('button').filter({ hasText: /Sair|Remover|Confirmar/i });
    this.cancelModalButton = this.page.locator('button').filter({ hasText: /Cancelar/i });

    // Loading
    this.loadingIndicator = this.page.locator('[data-testid="sports-loading"]');
    this.errorMessage = this.getByText(/não encontrado|Erro/i);
  }

  /**
   * Aguarda a tela estar completamente carregada
   */
  async waitForPageLoad(): Promise<void> {
    // Aguarda loading desaparecer
    await this.waitForHidden(this.loadingIndicator, 15000).catch(() => {
      // Loading pode já ter sumido
    });

    // Aguarda nome do grupo aparecer
    await this.waitForVisible(this.groupName, 10000);
  }

  /**
   * Verifica se a tela está carregada
   */
  async isLoaded(): Promise<boolean> {
    return await this.isVisible(this.groupName);
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
  // GROUP INFO GETTERS
  // ========================================

  /**
   * Obtém nome do grupo
   */
  async getName(): Promise<string> {
    return await this.getText(this.groupName);
  }

  /**
   * Obtém descrição do grupo
   */
  async getDescription(): Promise<string> {
    return await this.getText(this.groupDescription);
  }

  /**
   * Verifica se o grupo é privado
   */
  async isPrivate(): Promise<boolean> {
    return await this.isVisible(this.privacyBadge);
  }

  /**
   * Verifica se usuário tem role de gerenciamento (OWNER/ADMIN)
   */
  async canManage(): Promise<boolean> {
    return await this.isVisible(this.editFab);
  }

  /**
   * Obtém role do usuário atual
   */
  async getUserRole(): Promise<string | null> {
    if (!(await this.isVisible(this.roleBadge))) {
      return null;
    }
    return await this.getText(this.roleBadge);
  }

  // ========================================
  // MEMBER ACTIONS
  // ========================================

  /**
   * Entra no grupo (join)
   */
  async joinGroup(): Promise<void> {
    console.log('📝 GroupDetailsScreen: Entrando no grupo...');
    await this.click(this.joinButton);
    // Aguarda API response
    await this.waitForAPI(/\/groups\/.*\/members/, 10000);
    await this.page.waitForTimeout(1000); // Wait for UI update
    console.log('✅ GroupDetailsScreen: Entrou no grupo!');
  }

  /**
   * Sai do grupo (leave)
   */
  async leaveGroup(): Promise<void> {
    console.log('📝 GroupDetailsScreen: Saindo do grupo...');
    await this.click(this.leaveButton);

    // Aguarda modal de confirmação
    await this.waitForVisible(this.confirmationModal, 5000);

    // Confirma saída
    await this.click(this.confirmModalButton);

    // Aguarda API response
    await this.waitForAPI(/\/groups\/.*\/members/, 10000);
    await this.page.waitForTimeout(1000); // Wait for UI update
    console.log('✅ GroupDetailsScreen: Saiu do grupo!');
  }

  /**
   * Verifica se já é membro
   */
  async isMember(): Promise<boolean> {
    return await this.isVisible(this.leaveButton);
  }

  /**
   * Verifica se pode entrar no grupo
   */
  async canJoin(): Promise<boolean> {
    return await this.isVisible(this.joinButton);
  }

  // ========================================
  // ADMIN ACTIONS
  // ========================================

  /**
   * Abre tela de edição (se pode gerenciar)
   */
  async editGroup(): Promise<void> {
    if (!(await this.canManage())) {
      throw new Error('Usuário não pode gerenciar o grupo');
    }
    await this.click(this.editFab);
    await this.page.waitForTimeout(2000); // Wait for navigation
  }

  /**
   * Convida membros (se pode gerenciar)
   */
  async inviteMembers(userIds: string[]): Promise<void> {
    if (!(await this.canManage())) {
      throw new Error('Usuário não pode gerenciar o grupo');
    }

    await this.click(this.inviteMembersButton);
    await this.page.waitForTimeout(1000); // Wait for modal

    // TODO: Implementar seleção de usuários no modal
    // Isso dependerá da estrutura do InviteUsersModal

    // Confirmar convite
    const confirmModalButton = this.page.locator('button').filter({ hasText: /Convidar|Enviar/i });
    await this.click(confirmModalButton);
    await this.page.waitForTimeout(1000);
  }

  /**
   * Cria evento para o grupo (se pode criar eventos)
   */
  async createEvent(): Promise<void> {
    await this.click(this.createEventButton);
    await this.page.waitForTimeout(2000); // Wait for navigation
  }

  // ========================================
  // MEMBERS INFO
  // ========================================

  /**
   * Conta número de membros exibidos
   */
  async getMembersCount(): Promise<number> {
    return await this.count(this.membersList);
  }

  /**
   * Exibe todos os membros (se houver botão "Ver todos")
   */
  async showAllMembers(): Promise<void> {
    if (await this.isVisible(this.showAllMembersButton)) {
      const buttonText = await this.getText(this.showAllMembersButton);
      if (buttonText.includes('Ver todos')) {
        await this.click(this.showAllMembersButton);
        await this.page.waitForTimeout(500);
      }
    }
  }

  /**
   * Verifica se seção de membros está visível
   */
  async hasMembersSection(): Promise<boolean> {
    return await this.isVisible(this.membersSection);
  }

  // ========================================
  // EVENTS INFO
  // ========================================

  /**
   * Verifica se seção de eventos está visível
   */
  async hasEventsSection(): Promise<boolean> {
    return await this.isVisible(this.eventsSection);
  }

  /**
   * Verifica se pode criar eventos
   */
  async canCreateEvents(): Promise<boolean> {
    return await this.isVisible(this.createEventButton);
  }

  // ========================================
  // CONVENIENCE METHODS
  // ========================================

  /**
   * Aguarda grupo carregar e verifica se está disponível
   */
  async waitForGroupLoad(): Promise<void> {
    await this.waitForPageLoad();

    if (await this.hasError()) {
      const errorText = await this.getText(this.errorMessage);
      throw new Error(`Erro ao carregar grupo: ${errorText}`);
    }
  }

  /**
   * Verifica se grupo está disponível (não tem erro)
   */
  async isGroupAvailable(): Promise<boolean> {
    await this.waitForPageLoad();
    return !(await this.hasError());
  }

  /**
   * Obtém informações resumidas do grupo
   */
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
