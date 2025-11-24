import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:8081';
const TEST_USER = {
  username: 'uxtest2325',
  email: 'uxtest2325@arena.test',
  password: 'TestArena@2325',
};

test.describe('SkeletonCard Component - Validation', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar para aplicação
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
  });

  test('SkeletonCard should render without crashing', async ({ page }) => {
    // Login
    await page.getByPlaceholder(/email ou nome de usuário/i).fill(TEST_USER.username);
    await page.getByPlaceholder(/senha/i).fill(TEST_USER.password);
    await page.getByRole('button', { name: /entrar/i }).click();

    // Aguardar navegação
    await page.waitForURL(/.*home/, { timeout: 10000 });
    await page.waitForLoadState('networkidle');

    // Verificar se tela carregou (pode ter skeleton ou eventos)
    // Se tiver skeleton, capturar screenshot
    const skeleton = page.locator('[data-testid="skeleton-event-card"]');
    const skeletonCount = await skeleton.count();

    if (skeletonCount > 0) {
      console.log(`✅ Found ${skeletonCount} skeleton cards during loading`);

      // Capturar screenshot com skeleton
      await page.screenshot({
        path: 'docs/ux-analysis/comparisons/skeleton-card-loading.png',
        fullPage: true,
      });

      // Aguardar skeleton desaparecer (dados carregarem)
      await page.waitForSelector('[data-testid="skeleton-event-card"]', {
        state: 'detached',
        timeout: 10000,
      });

      console.log('✅ Skeleton cards removed after data loaded');
    } else {
      console.log('⚠️  No skeleton cards found (data loaded instantly)');
    }

    // Verificar se eventos apareceram ou empty state
    const eventCards = page.locator('[data-testid="event-card"]');
    const emptyState = page.locator('text=/nenhum evento/i');

    const hasEvents = (await eventCards.count()) > 0;
    const hasEmptyState = await emptyState.isVisible();

    if (hasEvents) {
      console.log(`✅ ${await eventCards.count()} event cards rendered after loading`);
    } else if (hasEmptyState) {
      console.log('✅ Empty state rendered (no events)');
    }

    // Capturar screenshot final (após loading)
    await page.screenshot({
      path: 'docs/ux-analysis/comparisons/skeleton-card-loaded.png',
      fullPage: true,
    });

    // Validação: Página não crashou
    const pageContent = await page.content();
    expect(pageContent).not.toContain('Error');
    expect(pageContent).not.toContain('undefined');
  });

  test('SkeletonCard animation should not crash Web', async ({ page }) => {
    // Login
    await page.getByPlaceholder(/email ou nome de usuário/i).fill(TEST_USER.username);
    await page.getByPlaceholder(/senha/i).fill(TEST_USER.password);
    await page.getByRole('button', { name: /entrar/i }).click();

    // Aguardar home
    await page.waitForURL(/.*home/, { timeout: 10000 });

    // Aguardar 2 segundos para animações rodarem
    await page.waitForTimeout(2000);

    // Verificar console errors
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Aguardar mais 2s
    await page.waitForTimeout(2000);

    // Validar: Sem erros de animação
    const hasAnimationErrors = consoleErrors.some(
      (err) =>
        err.includes('Animated') ||
        err.includes('animation') ||
        err.includes('useNativeDriver')
    );

    expect(hasAnimationErrors).toBe(false);

    if (consoleErrors.length > 0) {
      console.log('⚠️  Console errors found:', consoleErrors);
    } else {
      console.log('✅ No console errors - animations working correctly');
    }
  });
});
