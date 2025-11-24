import { Page, Locator, expect } from '@playwright/test';

/**
 * Smart Wait Helpers
 *
 * Substitui waitForTimeout() por waits inteligentes baseados em estado da UI.
 * Segue best practices do Playwright para testes confiáveis e rápidos.
 */

/**
 * Aguarda um elemento específico estar visível
 * @param locator - Locator do elemento
 * @param timeout - Timeout em ms (default: 10000)
 */
export const waitForVisible = async (
  locator: Locator,
  timeout: number = 10000
): Promise<void> => {
  await expect(locator).toBeVisible({ timeout });
};

/**
 * Aguarda um elemento específico estar oculto
 * @param locator - Locator do elemento
 * @param timeout - Timeout em ms (default: 10000)
 */
export const waitForHidden = async (
  locator: Locator,
  timeout: number = 10000
): Promise<void> => {
  await expect(locator).toBeHidden({ timeout });
};

/**
 * Aguarda resposta de API específica
 * @param page - Página do Playwright
 * @param urlPattern - Padrão da URL (pode usar glob ou regex)
 * @param timeout - Timeout em ms (default: 30000)
 */
export const waitForAPIResponse = async (
  page: Page,
  urlPattern: string | RegExp,
  timeout: number = 30000
): Promise<void> => {
  await page.waitForResponse(
    response => {
      const url = response.url();
      if (typeof urlPattern === 'string') {
        return url.includes(urlPattern);
      }
      return urlPattern.test(url);
    },
    { timeout }
  );
};

/**
 * Aguarda múltiplas respostas de API em paralelo
 * @param page - Página do Playwright
 * @param urlPatterns - Array de padrões de URL
 * @param timeout - Timeout em ms (default: 30000)
 */
export const waitForMultipleAPIResponses = async (
  page: Page,
  urlPatterns: Array<string | RegExp>,
  timeout: number = 30000
): Promise<void> => {
  await Promise.all(
    urlPatterns.map(pattern => waitForAPIResponse(page, pattern, timeout))
  );
};

/**
 * Aguarda página estar completamente carregada
 * @param page - Página do Playwright
 * @param state - Estado de load ('load' | 'domcontentloaded' | 'networkidle')
 * @param timeout - Timeout em ms (default: 30000)
 */
export const waitForPageLoad = async (
  page: Page,
  state: 'load' | 'domcontentloaded' | 'networkidle' = 'networkidle',
  timeout: number = 30000
): Promise<void> => {
  await page.waitForLoadState(state, { timeout });
};

/**
 * Aguarda navegação completar (após clicar em link/botão)
 * @param page - Página do Playwright
 * @param action - Função que dispara a navegação (ex: clicar em botão)
 * @param timeout - Timeout em ms (default: 30000)
 */
export const waitForNavigation = async (
  page: Page,
  action: () => Promise<void>,
  timeout: number = 30000
): Promise<void> => {
  await Promise.all([
    page.waitForLoadState('networkidle', { timeout }),
    action(),
  ]);
};

/**
 * Aguarda elemento estar estável (não animando)
 * @param locator - Locator do elemento
 * @param timeout - Timeout em ms (default: 5000)
 */
export const waitForStable = async (
  locator: Locator,
  timeout: number = 5000
): Promise<void> => {
  await locator.waitFor({ state: 'visible', timeout });
  // Aguarda elemento estar attached e stable
  await expect(locator).toBeVisible({ timeout });
  await expect(locator).not.toBeDisabled({ timeout });
};

/**
 * Aguarda lista carregar (FlashList/FlatList)
 * Detecta quando skeleton/loading foi substituído por conteúdo real
 * @param page - Página do Playwright
 * @param contentLocator - Locator do primeiro item da lista
 * @param timeout - Timeout em ms (default: 15000)
 */
export const waitForListLoad = async (
  page: Page,
  contentLocator: Locator,
  timeout: number = 15000
): Promise<void> => {
  // Aguarda skeleton desaparecer (se existir)
  const skeleton = page.locator('[data-testid*="skeleton"]');
  const hasSkeletons = await skeleton.count() > 0;

  if (hasSkeletons) {
    await expect(skeleton.first()).toBeHidden({ timeout: timeout / 2 });
  }

  // Aguarda primeiro item da lista aparecer
  await expect(contentLocator).toBeVisible({ timeout: timeout / 2 });
};

/**
 * Aguarda modal/drawer abrir ou fechar
 * @param page - Página do Playwright
 * @param modalLocator - Locator do modal/drawer
 * @param shouldBeVisible - true para abrir, false para fechar
 * @param timeout - Timeout em ms (default: 5000)
 */
export const waitForModal = async (
  page: Page,
  modalLocator: Locator,
  shouldBeVisible: boolean,
  timeout: number = 5000
): Promise<void> => {
  if (shouldBeVisible) {
    await expect(modalLocator).toBeVisible({ timeout });
  } else {
    await expect(modalLocator).toBeHidden({ timeout });
  }
};

/**
 * Aguarda texto mudar (útil para contadores, status)
 * @param locator - Locator do elemento com texto
 * @param expectedText - Texto esperado (pode usar regex)
 * @param timeout - Timeout em ms (default: 5000)
 */
export const waitForTextChange = async (
  locator: Locator,
  expectedText: string | RegExp,
  timeout: number = 5000
): Promise<void> => {
  await expect(locator).toHaveText(expectedText, { timeout });
};

/**
 * Aguarda atributo mudar (útil para estados disabled, aria-checked, etc.)
 * @param locator - Locator do elemento
 * @param attribute - Nome do atributo
 * @param expectedValue - Valor esperado
 * @param timeout - Timeout em ms (default: 5000)
 */
export const waitForAttributeChange = async (
  locator: Locator,
  attribute: string,
  expectedValue: string | RegExp,
  timeout: number = 5000
): Promise<void> => {
  await expect(locator).toHaveAttribute(attribute, expectedValue, { timeout });
};

/**
 * Polling helper - executa função até retornar true ou timeout
 * Útil para casos complexos não cobertos pelos helpers acima
 * @param condition - Função que retorna true quando condição é satisfeita
 * @param timeout - Timeout em ms (default: 10000)
 * @param interval - Intervalo entre checks em ms (default: 500)
 */
export const waitForCondition = async (
  condition: () => Promise<boolean>,
  timeout: number = 10000,
  interval: number = 500
): Promise<void> => {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    if (await condition()) {
      return;
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }

  throw new Error(`Timeout waiting for condition after ${timeout}ms`);
};

/**
 * Aguarda com retry - tenta ação múltiplas vezes antes de falhar
 * Útil para ações que podem falhar temporariamente (cliques em elementos animando)
 * @param action - Função a ser executada
 * @param retries - Número de tentativas (default: 3)
 * @param delayMs - Delay entre tentativas em ms (default: 1000)
 */
export const retryAction = async <T>(
  action: () => Promise<T>,
  retries: number = 3,
  delayMs: number = 1000
): Promise<T> => {
  let lastError: Error | null = null;

  for (let i = 0; i < retries; i++) {
    try {
      return await action();
    } catch (error) {
      lastError = error as Error;
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError || new Error('Action failed after retries');
};
