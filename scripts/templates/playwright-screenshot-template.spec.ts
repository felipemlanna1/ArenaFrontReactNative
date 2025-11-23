import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:8081';
const TEST_USER = {
  username: 'uxtest2325',
  email: 'uxtest2325@arena.test',
  password: 'TestArena@2325'
};

test.describe('{TASK_NAME} - Screenshots', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar para a aplicação
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Fazer login
    await page.getByPlaceholder('Email ou nome de usuário').fill(TEST_USER.username);
    await page.getByPlaceholder('Senha').fill(TEST_USER.password);
    await page.getByRole('button', { name: 'Entrar' }).click();

    // Aguardar navegação pós-login
    await page.waitForURL(/.*home/, { timeout: 10000 });
    await page.waitForLoadState('networkidle');
  });

  test('Capturar {SCREEN_NAME}', async ({ page }) => {
    // Navegar para a tela específica (ajustar conforme necessário)
    // await page.goto(`${BASE_URL}/{ROUTE}`);
    // await page.waitForLoadState('networkidle');

    // Aguardar elementos críticos carregarem
    // await page.waitForSelector('[data-testid="critical-element"]');

    // Capturar screenshot
    await page.screenshot({
      path: `docs/ux-analysis/comparisons/task-{TASK_NUMBER}-after-{SCREEN_SLUG}.png`,
      fullPage: true
    });
  });
});
