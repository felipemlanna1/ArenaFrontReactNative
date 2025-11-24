# Page Objects - Arena E2E Tests

Este diretório contém os **Page Objects** para testes E2E seguindo o padrão **Page Object Model (POM)**.

## 📁 Estrutura

```
e2e/pages/
├── base/
│   └── BasePage.ts           # Classe base abstrata para todos os Page Objects
├── auth/
│   ├── WelcomeScreen.ts      # Tela inicial (Welcome/Login)
│   ├── RegisterScreen.ts     # Tela de registro
│   └── OnboardingSportsScreen.ts  # Onboarding de esportes
├── main/
│   └── MainTabsScreen.ts     # Bottom Tab Navigator
├── index.ts                  # Export central
└── README.md                 # Este arquivo
```

## 🎯 O que é Page Object Model?

Page Object Model (POM) é um padrão de design que:

1. **Encapsula** elementos da UI e interações em classes
2. **Centraliza** locators em um único lugar
3. **Reduz** duplicação de código
4. **Melhora** manutenibilidade
5. **Torna** testes mais legíveis

## 📋 Como Usar

### Importar Page Objects

```typescript
import {
  WelcomeScreen,
  RegisterScreen,
  OnboardingSportsScreen,
  MainTabsScreen,
} from './pages';
```

### Exemplo Básico

```typescript
test('deve completar fluxo de registro', async ({ page }) => {
  // 1. WelcomeScreen
  const welcomeScreen = new WelcomeScreen(page);
  await welcomeScreen.goto();
  await welcomeScreen.waitForPageLoad();
  await welcomeScreen.goToRegister();

  // 2. RegisterScreen
  const registerScreen = new RegisterScreen(page);
  await registerScreen.waitForPageLoad();

  const testUser = RegisterScreen.generateTestUser();
  await registerScreen.registerUser(testUser);

  // 3. OnboardingSportsScreen
  const onboardingScreen = new OnboardingSportsScreen(page);
  await onboardingScreen.waitForPageLoad();
  await onboardingScreen.completeOnboarding();

  // 4. MainTabs
  const mainTabsScreen = new MainTabsScreen(page);
  await mainTabsScreen.waitForPageLoad();
  expect(await mainTabsScreen.isLoaded()).toBe(true);
});
```

## 🏗️ Estrutura de um Page Object

Todo Page Object deve:

### 1. Estender BasePage

```typescript
export class MyScreen extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}
```

### 2. Definir Locators como Propriedades Privadas

```typescript
private readonly submitButton: Locator;
private readonly titleText: Locator;

constructor(page: Page) {
  super(page);
  this.submitButton = this.getByTestId('submit-button');
  this.titleText = this.getByText('Título');
}
```

### 3. Implementar Métodos Abstratos Obrigatórios

```typescript
/**
 * Aguarda a tela estar completamente carregada
 */
async waitForPageLoad(): Promise<void> {
  await this.waitForVisible(this.titleText, 10000);
}

/**
 * Verifica se a tela está carregada
 */
async isLoaded(): Promise<boolean> {
  return await this.isVisible(this.titleText);
}
```

### 4. Criar Métodos de Interação

```typescript
/**
 * Clica no botão de submit
 */
async submit(): Promise<void> {
  await this.click(this.submitButton);
}

/**
 * Preenche formulário completo (método de conveniência)
 */
async fillForm(data: FormData): Promise<void> {
  await this.fillName(data.name);
  await this.fillEmail(data.email);
  await this.submit();
}
```

## 🔧 BasePage - Métodos Disponíveis

### Navegação

- `goto()` - Navega para a URL base
- `clickAndWaitForNavigation(locator)` - Clica e aguarda navegação completar

### Interações

- `click(locator)` - Clica em elemento (com wait automático)
- `fill(locator, value)` - Preenche input
- `selectOption(locator, value)` - Seleciona opção em dropdown

### Waits

- `waitForVisible(locator, timeout?)` - Aguarda elemento visível
- `waitForHidden(locator, timeout?)` - Aguarda elemento oculto
- `waitForAPI(urlPattern, timeout?)` - Aguarda resposta de API
- `waitForListLoad(contentLocator, timeout?)` - Aguarda lista carregar
- `waitForModal(modalLocator, shouldBeVisible, timeout?)` - Aguarda modal

### Verificações

- `isVisible(locator)` - Verifica se elemento está visível
- `isHidden(locator)` - Verifica se elemento está oculto
- `getText(locator)` - Obtém texto de elemento
- `getValue(locator)` - Obtém valor de input
- `count(locator)` - Conta elementos

### Locators

- `getByTestId(testId)` - Obtém locator por data-testid
- `getByText(text)` - Obtém locator por texto
- `getByRole(role, options?)` - Obtém locator por role

### API Mocking

- `mockAPIResponse(urlPattern, responseBody, status?)` - Mocka resposta de API
- `clearAPIMocks()` - Remove todos os mocks

### Debug

- `screenshot(name)` - Tira screenshot
- `sleep(ms)` - Wait arbitrário (⚠️ usar apenas quando necessário)

## 📐 Padrões e Convenções

### Nomenclatura

- **Classes**: `PascalCase` terminando com `Screen` (ex: `WelcomeScreen`)
- **Locators**: `camelCase` descritivo (ex: `submitButton`, `emailInput`)
- **Métodos**: `camelCase` com verbo (ex: `goToRegister()`, `fillEmail()`)

### Locators

✅ **Preferir** (ordem de prioridade):

1. `data-testid` - `this.getByTestId('submit-button')`
2. `text` - `this.getByText('Criar conta')`
3. `role` - `this.getByRole('button', { name: 'Submit' })`

❌ **Evitar**:

- CSS Selectors complexos (`.class > div:nth-child(2)`)
- XPath
- IDs dinâmicos

### Métodos de Conveniência

Sempre criar métodos que combinam múltiplas ações comuns:

```typescript
// ✅ BOM
async registerUser(userData: RegisterUserData): Promise<void> {
  await this.fillFirstName(userData.firstName);
  await this.fillLastName(userData.lastName);
  await this.fillEmail(userData.email);
  await this.submit();
}

// ❌ RUIM - obrigar testes a chamar 4 métodos separados
```

### Waits Inteligentes

❌ **Evitar** `page.waitForTimeout()`:

```typescript
// ❌ RUIM
await page.waitForTimeout(5000);
```

✅ **Usar** waits baseados em estado:

```typescript
// ✅ BOM
await this.waitForVisible(this.submitButton);
await this.waitForAPI('**/api/register');
```

## 🚀 Próximos Passos

### FASE 2: Expandir Page Objects

Criar Page Objects para todas as screens principais:

- [ ] EventsScreen
- [ ] EventDetailsScreen
- [ ] HomeScreen
- [ ] GroupDetailsScreen
- [ ] ProfileScreen
- [ ] CreateEventScreen
- [ ] CreateGroupScreen

### FASE 3: Multi-User Testing

Implementar storage states para testes com múltiplos usuários:

- [ ] Organizer persona
- [ ] Participant persona
- [ ] Admin persona

### FASE 4: Remover waitForTimeout

Refatorar todos os testes existentes para usar waits inteligentes.

### FASE 5: CRUD Tests

Criar testes completos para operações CRUD:

- [ ] Events CRUD
- [ ] Groups CRUD
- [ ] Friends CRUD

## 📚 Referências

- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Smart Wait Strategies](https://playwright.dev/docs/api/class-locator#locator-wait-for)
