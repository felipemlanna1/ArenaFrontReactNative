import { Page, Locator } from '@playwright/test';
import {
  waitForVisible,
  waitForHidden,
  waitForAPIResponse,
  waitForListLoad,
  waitForModal,
  waitForNavigation,
} from '../../helpers/wait-helpers';

/**
 * BasePage
 *
 * Classe base para todos os Page Objects.
 * Fornece métodos comuns e utilitários para interação com a UI.
 *
 * Pattern: Page Object Model (POM)
 */
export abstract class BasePage {
  protected page: Page;
  protected baseURL: string;

  constructor(page: Page, baseURL: string = 'http://localhost:8081') {
    this.page = page;
    this.baseURL = baseURL;
  }

  /**
   * Navega para a URL base
   */
  async goto(): Promise<void> {
    await this.page.goto(this.baseURL);
  }

  /**
   * Aguarda elemento estar visível
   */
  async waitForVisible(locator: Locator, timeout?: number): Promise<void> {
    await waitForVisible(locator, timeout);
  }

  /**
   * Aguarda elemento estar oculto
   */
  async waitForHidden(locator: Locator, timeout?: number): Promise<void> {
    await waitForHidden(locator, timeout);
  }

  /**
   * Aguarda resposta de API
   */
  async waitForAPI(urlPattern: string | RegExp, timeout?: number): Promise<void> {
    await waitForAPIResponse(this.page, urlPattern, timeout);
  }

  /**
   * Aguarda lista carregar
   */
  async waitForListLoad(contentLocator: Locator, timeout?: number): Promise<void> {
    await waitForListLoad(this.page, contentLocator, timeout);
  }

  /**
   * Aguarda modal/drawer
   */
  async waitForModal(
    modalLocator: Locator,
    shouldBeVisible: boolean,
    timeout?: number
  ): Promise<void> {
    await waitForModal(this.page, modalLocator, shouldBeVisible, timeout);
  }

  /**
   * Clica em elemento com wait automático
   */
  async click(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    await locator.click();
  }

  /**
   * Clica e aguarda navegação completar
   */
  async clickAndWaitForNavigation(locator: Locator, timeout?: number): Promise<void> {
    await waitForNavigation(
      this.page,
      async () => {
        await this.click(locator);
      },
      timeout
    );
  }

  /**
   * Preenche input com wait automático
   */
  async fill(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    await locator.fill(value);
  }

  /**
   * Seleciona opção em dropdown
   */
  async selectOption(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    await locator.selectOption(value);
  }

  /**
   * Verifica se elemento está visível
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Verifica se elemento está oculto
   */
  async isHidden(locator: Locator): Promise<boolean> {
    return await locator.isHidden();
  }

  /**
   * Obtém texto de elemento
   */
  async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    return (await locator.textContent()) || '';
  }

  /**
   * Obtém valor de input
   */
  async getValue(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    return (await locator.inputValue()) || '';
  }

  /**
   * Conta elementos que correspondem ao locator
   */
  async count(locator: Locator): Promise<number> {
    return await locator.count();
  }

  /**
   * Scroll até elemento
   */
  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Aguarda timeout (usar APENAS quando absolutamente necessário)
   * @deprecated Prefira usar wait-helpers ao invés de timeout arbitrário
   */
  async sleep(ms: number): Promise<void> {
    console.warn(
      `⚠️  Usando sleep(${ms}ms) - considere usar wait-helpers ao invés de timeout arbitrário`
    );
    await this.page.waitForTimeout(ms);
  }

  /**
   * Obtém locator por testID
   */
  protected getByTestId(testId: string): Locator {
    return this.page.locator(`[data-testid="${testId}"]`);
  }

  /**
   * Obtém locator por texto
   */
  protected getByText(text: string): Locator {
    return this.page.locator(`text=${text}`);
  }

  /**
   * Obtém locator por role
   */
  protected getByRole(role: string, options?: { name?: string }): Locator {
    return this.page.getByRole(role as any, options);
  }

  /**
   * Tira screenshot (útil para debug)
   */
  async screenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `e2e/screenshots/debug/${name}.png` });
  }

  /**
   * Mock de resposta de API
   */
  async mockAPIResponse(urlPattern: string, responseBody: unknown, status: number = 200): Promise<void> {
    await this.page.route(urlPattern, route => {
      route.fulfill({
        status,
        contentType: 'application/json',
        body: JSON.stringify(responseBody),
      });
    });
  }

  /**
   * Remove todos os mocks de API
   */
  async clearAPIMocks(): Promise<void> {
    await this.page.unrouteAll();
  }

  /**
   * Aguarda a tela estar completamente carregada
   * Implementação específica em cada Page Object
   */
  abstract waitForPageLoad(): Promise<void>;

  /**
   * Verifica se a tela está visível
   * Implementação específica em cada Page Object
   */
  abstract isLoaded(): Promise<boolean>;
}
