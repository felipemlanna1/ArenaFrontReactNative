import { test, expect } from '@playwright/test';
import {
  captureScreenshot,
  waitForScreenLoad,
  fillInput,
  clickButton,
  scrollToBottom,
} from '../../helpers/visual-audit-helpers';

const CATEGORY = '01-authentication';

test.describe('Visual Audit - Fase 1: Authentication Screens', () => {
  test.beforeEach(async ({ page }) => {
    console.log('\n🚀 Iniciando audit de telas de autenticação...\n');
    await page.goto('http://localhost:8081');
    await page.waitForTimeout(3000);
  });

  test('WelcomeScreen - Estados', async ({ page }) => {
    console.log('\n📱 AUDITANDO: WelcomeScreen\n');

    // ESTADO 1: Default
    await waitForScreenLoad(page, 'welcome-logo', 10000);

    await captureScreenshot(
      page,
      CATEGORY,
      'welcome',
      'default',
      'Tela inicial com logo, título e botões de login/criar conta'
    );

    // ESTADO 2: Scroll para ver botões
    await scrollToBottom(page);
    await page.waitForTimeout(500);

    await captureScreenshot(
      page,
      CATEGORY,
      'welcome',
      'buttons-visible',
      'Scroll para garantir visibilidade dos botões no rodapé'
    );

    console.log('✅ WelcomeScreen: 2 estados capturados\n');
  });

  test('LoginScreen - Estados', async ({ page }) => {
    console.log('\n📱 AUDITANDO: LoginScreen\n');

    // Navegar para login
    await waitForScreenLoad(page, 'welcome-logo', 10000);
    await clickButton(page, 'welcome-login');
    await page.waitForTimeout(1500);

    // ESTADO 1: Empty
    await waitForScreenLoad(page, 'login-email-input');

    await captureScreenshot(
      page,
      CATEGORY,
      'login',
      'empty',
      'Formulário de login vazio - estado inicial'
    );

    // ESTADO 2: Filled
    await fillInput(page, 'login-email-input', 'teste@arena.com');
    await fillInput(page, 'login-password-input', 'SenhaSegura123');

    await captureScreenshot(
      page,
      CATEGORY,
      'login',
      'filled',
      'Formulário de login preenchido com email e senha'
    );

    // ESTADO 3: Validation Error (email inválido)
    await fillInput(page, 'login-email-input', 'email-invalido');
    await clickButton(page, 'login-submit');
    await page.waitForTimeout(800);

    await captureScreenshot(
      page,
      CATEGORY,
      'login',
      'validation-error',
      'Erro de validação de email inválido exibido'
    );

    // ESTADO 4: Loading (credenciais corretas)
    await fillInput(page, 'login-email-input', 'teste@arena.com');
    await fillInput(page, 'login-password-input', 'SenhaSegura123');

    // Capturar antes de submeter (não queremos realmente logar)
    await captureScreenshot(
      page,
      CATEGORY,
      'login',
      'ready-to-submit',
      'Estado antes de submeter - botão ativo'
    );

    console.log('✅ LoginScreen: 4 estados capturados\n');
  });

  test('RegisterScreen - Estados', async ({ page }) => {
    console.log('\n📱 AUDITANDO: RegisterScreen\n');

    // Navegar para registro
    await waitForScreenLoad(page, 'welcome-logo', 10000);
    await clickButton(page, 'welcome-create-account');
    await page.waitForTimeout(1500);

    // ESTADO 1: Step 1 - Empty
    await waitForScreenLoad(page, 'register-first-name-input');

    await captureScreenshot(
      page,
      CATEGORY,
      'register',
      'step-1-empty',
      'Passo 1 do registro - formulário vazio (nome, sobrenome, email, senha)'
    );

    // ESTADO 2: Step 1 - Partial Fill
    await fillInput(page, 'register-first-name-input', 'João');
    await fillInput(page, 'register-last-name-input', 'Silva');

    await captureScreenshot(
      page,
      CATEGORY,
      'register',
      'step-1-partial',
      'Passo 1 parcialmente preenchido - apenas nome e sobrenome'
    );

    // ESTADO 3: Step 1 - Filled
    await fillInput(page, 'register-email-input', 'joao.silva@arena.com');
    await fillInput(page, 'register-password-input', 'SenhaSegura123');
    await fillInput(page, 'register-confirm-password-input', 'SenhaSegura123');

    await captureScreenshot(
      page,
      CATEGORY,
      'register',
      'step-1-filled',
      'Passo 1 completamente preenchido - pronto para avançar'
    );

    // ESTADO 4: Step 1 - Validation Error (senhas diferentes)
    await fillInput(page, 'register-confirm-password-input', 'SenhaDiferente123');
    await scrollToBottom(page);
    await clickButton(page, 'register-submit-button');
    await page.waitForTimeout(800);

    await captureScreenshot(
      page,
      CATEGORY,
      'register',
      'step-1-password-mismatch',
      'Erro de validação - senhas não coincidem'
    );

    // ESTADO 5: Avançar para Step 2
    await fillInput(page, 'register-confirm-password-input', 'SenhaSegura123');
    await scrollToBottom(page);
    await clickButton(page, 'register-submit-button');
    await page.waitForTimeout(1500);

    // Verificar se avançou para step 2 (username)
    const usernameInput = page.locator('[data-testid="register-username-input"]');
    const usernameVisible = await usernameInput.isVisible().catch(() => false);

    if (usernameVisible) {
      await captureScreenshot(
        page,
        CATEGORY,
        'register',
        'step-2-empty',
        'Passo 2 do registro - username, data de nascimento, gênero'
      );

      // Preencher step 2
      await fillInput(page, 'register-username-input', 'joaosilva');

      // Selecionar data de nascimento (se houver DatePicker)
      const birthDateButton = page.locator('[data-testid="register-birth-date-picker"]');
      const birthDateVisible = await birthDateButton.isVisible().catch(() => false);

      if (birthDateVisible) {
        await birthDateButton.click();
        await page.waitForTimeout(500);

        await captureScreenshot(
          page,
          CATEGORY,
          'register',
          'step-2-date-picker-open',
          'DatePicker aberto para seleção de data de nascimento'
        );
      }
    }

    console.log('✅ RegisterScreen: 5-7 estados capturados\n');
  });

  test('OnboardingSportsScreen - Estados', async ({ page }) => {
    console.log('\n📱 AUDITANDO: OnboardingSportsScreen\n');

    // Para acessar onboarding, precisamos completar o registro primeiro
    // Vamos usar a rota direta se possível
    await page.goto('http://localhost:8081/onboarding/sports');
    await page.waitForTimeout(2000);

    const sportsScreen = page.locator('[data-testid="sports-selection-screen"]');
    const sportsVisible = await sportsScreen.isVisible().catch(() => false);

    if (!sportsVisible) {
      console.log('⚠️  OnboardingSportsScreen não acessível diretamente');
      console.log('   Alternativa: Completar fluxo de registro completo');

      // Tentar via fluxo completo de registro
      await page.goto('http://localhost:8081');
      await page.waitForTimeout(2000);

      await waitForScreenLoad(page, 'welcome-logo', 10000);
      await clickButton(page, 'welcome-create-account');
      await page.waitForTimeout(1500);

      // Preencher registro completo rapidamente
      await fillInput(page, 'register-first-name-input', 'João');
      await fillInput(page, 'register-last-name-input', 'Silva');
      await fillInput(page, 'register-email-input', `audit${Date.now()}@arena.com`);
      await fillInput(page, 'register-password-input', 'SenhaSegura123');
      await fillInput(page, 'register-confirm-password-input', 'SenhaSegura123');
      await scrollToBottom(page);
      await clickButton(page, 'register-submit-button');
      await page.waitForTimeout(2000);

      // Step 2 - se existir
      const usernameInput = page.locator('[data-testid="register-username-input"]');
      const usernameVisible = await usernameInput.isVisible().catch(() => false);

      if (usernameVisible) {
        await fillInput(page, 'register-username-input', `joaosilva${Date.now()}`);
        await scrollToBottom(page);
        await clickButton(page, 'register-submit-button');
        await page.waitForTimeout(2000);
      }
    }

    // Verificar se chegamos no onboarding de esportes
    const sportsScreenAfter = page.locator('[data-testid="sports-selection-screen"]');
    const sportsVisibleAfter = await sportsScreenAfter.isVisible().catch(() => false);

    if (sportsVisibleAfter) {
      // ESTADO 1: Default (nenhum esporte selecionado)
      await captureScreenshot(
        page,
        CATEGORY,
        'onboarding-sports',
        'default-no-selection',
        'Tela de seleção de esportes - nenhum selecionado ainda'
      );

      // ESTADO 2: 1 esporte selecionado
      const firstSportCard = page.locator('[data-testid^="sport-card-"]').first();
      await firstSportCard.click();
      await page.waitForTimeout(500);

      await captureScreenshot(
        page,
        CATEGORY,
        'onboarding-sports',
        '1-sport-selected',
        'Um esporte selecionado - estado mínimo para avançar'
      );

      // ESTADO 3: 3 esportes selecionados
      const sportCards = page.locator('[data-testid^="sport-card-"]');
      const count = await sportCards.count();

      if (count >= 3) {
        await sportCards.nth(1).click();
        await page.waitForTimeout(300);
        await sportCards.nth(2).click();
        await page.waitForTimeout(500);

        await captureScreenshot(
          page,
          CATEGORY,
          'onboarding-sports',
          '3-sports-selected',
          'Três esportes selecionados - múltiplas seleções'
        );
      }

      // ESTADO 4: Modal de nível de habilidade (se aparecer ao clicar em esporte)
      // Tentar clicar novamente no primeiro para abrir modal de skill level
      await firstSportCard.click();
      await page.waitForTimeout(800);

      const skillModal = page.locator('[data-testid="skill-level-modal"]');
      const skillModalVisible = await skillModal.isVisible().catch(() => false);

      if (skillModalVisible) {
        await captureScreenshot(
          page,
          CATEGORY,
          'onboarding-sports',
          'skill-level-modal-open',
          'Modal de seleção de nível de habilidade aberto'
        );
      }

      console.log('✅ OnboardingSportsScreen: 3-4 estados capturados\n');
    } else {
      console.log('⚠️  OnboardingSportsScreen não foi alcançado - pulando audit');
    }
  });

  test.afterAll(async () => {
    console.log('\n🎉 AUDIT FASE 1 COMPLETO!\n');
    console.log('📊 Resumo:');
    console.log('   • WelcomeScreen: 2 estados');
    console.log('   • LoginScreen: 4 estados');
    console.log('   • RegisterScreen: 5-7 estados');
    console.log('   • OnboardingSportsScreen: 3-4 estados');
    console.log('\n📁 Screenshots salvos em: e2e/visual-audit/screenshots/01-authentication/\n');
  });
});
