import { test, expect } from '@playwright/test';
import {
  WelcomeScreen,
  RegisterScreen,
  OnboardingSportsScreen,
  MainTabsScreen,
} from './pages';

/**
 * Authentication Flow E2E Tests - REFATORADO COM PAGE OBJECT MODEL
 *
 * Este arquivo demonstra o uso do Page Object Model para:
 * 1. Reduzir duplicação de código
 * 2. Melhorar manutenibilidade
 * 3. Tornar testes mais legíveis
 * 4. Reduzir uso de waitForTimeout()
 *
 * COMPARE com authFlow.spec.ts para ver as melhorias!
 */

test.describe('Authentication Flow - POM Refactored', () => {
  test.beforeEach(async ({}, testInfo) => {
    testInfo.setTimeout(120000);
  });

  test('[POM] deve completar fluxo completo: Welcome → Register → Onboarding → MainTabs', async ({
    page,
  }) => {
    console.log('🧪 Testando fluxo completo de autenticação com Page Object Model...');

    // ========================================
    // ETAPA 1: WelcomeScreen
    // ========================================
    console.log('📍 ETAPA 1: WelcomeScreen');
    const welcomeScreen = new WelcomeScreen(page);

    await welcomeScreen.goto();
    await welcomeScreen.waitForPageLoad();
    console.log('✅ WelcomeScreen carregada');

    // Verificar que tela está carregada
    expect(await welcomeScreen.isLoaded()).toBe(true);

    // Navegar para RegisterScreen
    await welcomeScreen.goToRegister();

    // ========================================
    // ETAPA 2: RegisterScreen
    // ========================================
    console.log('📍 ETAPA 2: RegisterScreen - Preenchendo formulário');
    const registerScreen = new RegisterScreen(page);

    await registerScreen.waitForPageLoad();
    console.log('✅ RegisterScreen carregada');

    // Gerar dados de teste únicos
    const testUser = RegisterScreen.generateTestUser();
    console.log(`📧 Email gerado: ${testUser.email}`);

    // Preencher e submeter formulário (método de conveniência)
    await registerScreen.registerUser(testUser);

    // ========================================
    // ETAPA 3: OnboardingSportsScreen
    // ========================================
    console.log('📍 ETAPA 3: OnboardingSportsScreen - Seleção de Esporte');
    const onboardingScreen = new OnboardingSportsScreen(page);

    await onboardingScreen.waitForPageLoad();
    console.log('✅ OnboardingSportsScreen carregada');

    // Completar onboarding (seleciona Futebol e finaliza)
    await onboardingScreen.completeOnboarding();

    // ========================================
    // ETAPA 4: MainTabs
    // ========================================
    console.log('📍 ETAPA 4: Verificando chegada no MainTabs');
    const mainTabsScreen = new MainTabsScreen(page);

    await mainTabsScreen.waitForPageLoad();
    console.log('✅ MainTabs carregado');

    // Verificar que chegou no MainTabs
    expect(await mainTabsScreen.isLoaded()).toBe(true);

    // Verificar que existem 4 tabs
    const tabCount = await mainTabsScreen.countTabs();
    expect(tabCount).toBe(4);

    console.log('🎉 FLUXO COMPLETO VALIDADO COM SUCESSO USANDO POM!');
  });

  // TODO: Adicionar testes de navegação em FASE 3 após validar todos os testids
  // test.skip('[POM] deve navegar entre bottom tabs', async ({ page }) => {
  //   ...
  // });
});

/**
 * COMPARAÇÃO: ANTES vs DEPOIS
 *
 * === ANTES (authFlow.spec.ts) ===
 * - 186 linhas com muita repetição
 * - Locators hardcoded em múltiplos lugares
 * - page.waitForTimeout() em 15+ lugares
 * - Lógica misturada com interações de UI
 * - Difícil de manter e escalar
 *
 * Exemplo:
 * ```typescript
 * const createAccountButton = page.locator('[data-testid="welcome-create-account"]');
 * await expect(createAccountButton).toBeVisible({ timeout: 5000 });
 * await createAccountButton.click();
 * await page.waitForTimeout(2000); // ❌ Arbitrário
 * ```
 *
 * === DEPOIS (authFlow.pom.spec.ts) ===
 * - 75 linhas com Page Objects
 * - Locators centralizados em Page Objects
 * - Menos waitForTimeout() - usa waitForPageLoad()
 * - Separação clara entre lógica de negócio e UI
 * - Fácil de manter e escalar
 *
 * Exemplo:
 * ```typescript
 * const welcomeScreen = new WelcomeScreen(page);
 * await welcomeScreen.goto();
 * await welcomeScreen.waitForPageLoad();
 * await welcomeScreen.goToRegister();
 * ```
 *
 * === BENEFÍCIOS ===
 * ✅ 60% menos código nos testes
 * ✅ Locators centralizados (DRY)
 * ✅ Métodos reutilizáveis (registerUser, completeOnboarding)
 * ✅ Waits mais inteligentes
 * ✅ Manutenção mais fácil
 * ✅ Testes mais legíveis
 * ✅ Preparado para multi-user testing (próxima fase)
 */
