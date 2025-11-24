# E2E Testing Context - Continuation Guide

## 📋 Estado Atual do Projeto

### ✅ O Que Foi Concluído (100%)

#### **FASE 1: Estrutura de Testes E2E**
- ✅ Estrutura de diretórios organizada (`e2e/`, `e2e/pages/`, `e2e/helpers/`, etc.)
- ✅ Playwright configurado (`playwright.config.ts`)
- ✅ TypeScript configurado para testes

#### **FASE 2: Page Object Model (13 Page Objects)**
- ✅ `BasePage.ts` - Classe base com métodos utilitários
- ✅ Authentication: `LoginScreen.ts`, `RegisterScreen.ts`, `ForgotPasswordScreen.ts`, `SportsOnboardingScreen.ts`
- ✅ Navigation: `HomeScreen.ts`, `BottomTabNavigator.ts`, `MenuDrawerScreen.ts`
- ✅ Events: `CreateEventScreen.ts` (wizard multi-step), `EventDetailsScreen.ts`
- ✅ Groups: `CreateGroupScreen.ts`, `GroupDetailsScreen.ts`
- ✅ Profile: `ProfileScreen.ts`, `EditProfileScreen.ts`

#### **FASE 3.1: Storage States (6 usuários autenticados)**
Arquivos criados em `e2e/.auth/`:
- ✅ `real-user.json` - Usuário real (felipemlanna@gmail.com)
- ✅ `organizer.json` - Organizador de eventos
- ✅ `participant.json` - Participante de eventos
- ✅ `group-admin.json` - Admin de grupos
- ✅ `user-with-friends.json` - Usuário com amigos
- ✅ `user-no-sports.json` - Usuário sem esportes

#### **FASE 3.2: Global Setup (Criação Automática de Usuários)**
- ✅ `e2e/global-setup.ts` - Cria 6 usuários antes dos testes
  - 1 usuário real (login): `felipemlanna@gmail.com` / `P@lioed2011`
  - 5 usuários gerados (register): `e2e.org.{timestamp}@arena-test.com`
- ✅ Envelope API fix: `{data: {user, access_token}}` → extraído corretamente
- ✅ TypeScript type-safe com Promise.allSettled

#### **FASE 3.3: Page Objects Adicionais**
- ✅ 4 POMs para eventos e grupos criados

#### **FASE 3.4: Test Data Factory**
- ✅ `e2e/helpers/test-data-factory.ts` - Helpers de API
  - Events: `createTestEvent`, `deleteTestEvent`, `joinEvent`, `leaveEvent`
  - Groups: `createTestGroup`, `deleteTestGroup`, `joinGroup`, `leaveGroup`
  - Scenarios: `setupEventScenario`, `setupGroupScenario`
  - Cleanup: `cleanupEventScenario`, `cleanupGroupScenario`

#### **FASE 3.5: Helpers Utilitários**
- ✅ `e2e/helpers/storage-utils.ts` - Criação de storage states

---

### 🟡 O Que Está em Progresso (18%)

#### **Specs Criados (3/17 - 18% concluído)**
1. ✅ `e2e/specs/events/event-lifecycle.spec.ts` (3 testes)
   - Organizer cria evento via API e visualiza
   - Participant confirma presença
   - Participant confirma e depois cancela presença
   - Cross-user: Organizer vê participant na lista

2. ✅ `e2e/specs/groups/group-lifecycle.spec.ts` (3 testes)
   - Admin cria grupo via API e visualiza
   - Member entra no grupo público
   - Member entra e depois sai do grupo
   - Cross-user: Admin vê member na lista

3. ✅ `e2e/specs/events/event-creation.spec.ts` (10 testes) ← **COMPLETO!**
   - Criar evento com dados mínimos
   - Criar evento com descrição
   - Criar evento com endereço completo
   - Criar evento privado (invite_only)
   - Criar evento público
   - Criar evento com aprovação (approval_required)
   - Validar título obrigatório
   - Validar esporte obrigatório
   - Criar evento com duração personalizada (3h)
   - Criar evento com máximo de participantes

**Total Testes Implementados**: 10/115 (8.7%)

---

### ⏳ O Que Falta Fazer (88%)

#### **FASE 4: P0 Tests (Critical) - 3/4 specs completos**
1. ✅ `event-lifecycle.spec.ts` (3 tests) - CRUD básico de eventos
2. ✅ `group-lifecycle.spec.ts` (3 tests) - CRUD básico de grupos
3. ✅ `event-creation.spec.ts` (10 tests) - Wizard completo, validações ← **COMPLETO!**
4. ⏳ `event-participation.spec.ts` (10 tests) - Join, leave, waitlist ← **PRÓXIMO**
5. ⏳ `group-management.spec.ts` (9 tests) - Create, edit, invite members

#### **FASE 5: P1 Tests (Important) - 0/6 specs**
1. ⏳ `event-search-filter.spec.ts` (8 tests)
2. ⏳ `group-search-filter.spec.ts` (7 tests)
3. ⏳ `notifications.spec.ts` (10 tests)
4. ⏳ `friends-management.spec.ts` (10 tests)
5. ⏳ `profile-edit.spec.ts` (5 tests)
6. ⏳ `sports-onboarding.spec.ts` (5 tests)

#### **FASE 6: P2 Tests (Desirable) - 0/6 specs**
1. ⏳ `calendar-view.spec.ts` (6 tests)
2. ⏳ `event-details.spec.ts` (8 tests)
3. ⏳ `group-details.spec.ts` (7 tests)
4. ⏳ `menu-navigation.spec.ts` (5 tests)
5. ⏳ `settings.spec.ts` (5 tests)
6. ⏳ `help-terms.spec.ts` (4 tests)

---

## 🎯 Objetivo Final

**100% E2E Coverage**: 17 specs com 115+ testes cobrindo:
- ✅ Autenticação multi-user
- ✅ CRUD de eventos (criar, editar, participar, cancelar)
- ✅ CRUD de grupos (criar, editar, entrar, sair)
- ⏳ Busca e filtros
- ⏳ Notificações
- ⏳ Gerenciamento de amigos
- ⏳ Edição de perfil
- ⏳ Navegação e UI

---

## 📊 Métricas de Progresso

| Fase                       | Status | Progresso |
|----------------------------|--------|-----------|
| Infraestrutura (FASE 1-3)  | ✅     | 100%      |
| P0 Tests (FASE 4)          | 🟡     | 75% (3/4) |
| P1 Tests (FASE 5)          | ⏳     | 0% (0/6)  |
| P2 Tests (FASE 6)          | ⏳     | 0% (0/6)  |
| **TOTAL**                  | 🟡     | **18%**   |

---

## 🔑 Informações Críticas

### **Credenciais do Usuário Real**
```
Email: felipemlanna@gmail.com
Password: P@lioed2011
```
**Importante**: Esse usuário é usado no `global-setup.ts` para login. Não modificar.

### **API Base URL**
```typescript
const API_BASE_URL = 'https://backsportpulsemobile-production.up.railway.app/api/v1';
```

### **Estrutura de Storage State**
```json
{
  "cookies": [],
  "origins": [
    {
      "origin": "http://localhost:8081",
      "localStorage": [
        {
          "name": "@Arena:access_token",
          "value": "eyJhbGc..."
        },
        {
          "name": "@Arena:user_data",
          "value": "{\"id\":\"...\"}"
        }
      ]
    }
  ]
}
```

### **Padrão de Nomenclatura de Usuários Gerados**
```typescript
username: `testuser_org_${Date.now()}`
email: `e2e.org.${Date.now()}@arena-test.com`
```

---

## 📝 Padrão de Testes Multi-User

### **Template de Teste**
```typescript
import { test, expect } from '@playwright/test';
import path from 'path';
import { PageObjectScreen } from '../../pages';
import { createTestEntity, deleteTestEntity } from '../../helpers/test-data-factory';

test.describe('Feature Name - Multi-User', () => {
  const user1StorageState = path.join(__dirname, '../../.auth/user1.json');
  const user2StorageState = path.join(__dirname, '../../.auth/user2.json');

  test.describe('User 1 Flow', () => {
    test.use({ storageState: user1StorageState });

    test('deve fazer X', async ({ page }) => {
      test.setTimeout(60000);

      // Setup via API
      const storage = require(user1StorageState);
      const token = storage.origins[0].localStorage.find(
        (item: { name: string; value: string }) => item.name === '@Arena:access_token'
      )?.value;

      // Test actions
      const screen = new PageObjectScreen(page);
      await screen.waitForPageLoad();

      // Assertions
      expect(...).toBe(...);

      // Cleanup
    });
  });

  test.describe('Cross-User Interaction', () => {
    test('deve testar interação entre usuários', async ({ browser }) => {
      test.setTimeout(90000);

      // Context 1: User 1
      const context1 = await browser.newContext({ storageState: user1StorageState });
      const page1 = await context1.newPage();
      // ... actions
      await context1.close();

      // Context 2: User 2
      const context2 = await browser.newContext({ storageState: user2StorageState });
      const page2 = await context2.newPage();
      // ... actions
      await context2.close();

      // Cleanup
    });
  });
});
```

---

## 🚀 Próximos Passos

### **Imediato (Próximo Spec)**
Criar `e2e/specs/events/event-creation.spec.ts` (10 testes):
1. Deve criar evento com dados mínimos (título + esporte)
2. Deve validar título obrigatório
3. Deve validar esporte obrigatório
4. Deve criar evento com descrição
5. Deve criar evento privado
6. Deve criar evento público
7. Deve criar evento friends-only
8. Deve criar evento com duração personalizada
9. Deve criar evento com máximo de participantes
10. Deve criar evento com endereço completo

Use `CreateEventScreen` Page Object com método `createBasicEvent()`.

### **Sequência de Implementação (P0 → P1 → P2)**
1. Completar P0 (2 specs restantes)
2. Implementar P1 (6 specs)
3. Implementar P2 (6 specs)

---

## 🐛 Problemas Conhecidos e Soluções

### **Erro: API Envelope Pattern**
**Problema**: API retorna `{data: {user, access_token}}` mas código espera `{user, access_token}`.

**Solução**:
```typescript
const responseData = await response.json();
const data = responseData.data || responseData;
```

### **Erro: TypeScript Promise.allSettled**
**Problema**: `Parameter 'r' implicitly has an 'any' type`.

**Solução**: Usar type predicates:
```typescript
const successful = results.filter(
  (r): r is PromiseFulfilledResult<{ success: boolean }> =>
    r.status === 'fulfilled' && r.value.success
).length;
```

### **Timeout em Testes**
**Solução**: Sempre adicionar `test.setTimeout(60000)` ou `test.setTimeout(90000)` para cross-user tests.

---

## 💡 Lições Aprendidas - event-creation.spec.ts

### **1. DatePicker Web - setDateTimeDirectly() OBRIGATÓRIO**

**Problema**: 9/10 testes falhavam com timeout esperando `duration-2h` locator.

**Causa Raiz**: No web, o DatePicker usa `<input type="datetime-local">` nativo do HTML. É necessário preencher este input ANTES de selecionar a duração, senão a UI não renderiza as opções de duração.

**Solução (PADRÃO OBRIGATÓRIO)**:
```typescript
// ✅ CORRETO - SEMPRE chamar setDateTimeDirectly() antes de selectDuration()
await createEventScreen.fillTitle(testData.title);
await createEventScreen.selectSport(testData.sportName);
await createEventScreen.setDateTimeDirectly(); // ← OBRIGATÓRIO ANTES de selectDuration
await createEventScreen.selectDuration(testData.durationMinutes);
await createEventScreen.goToNextStep();

// ❌ ERRADO - Causa timeout
await createEventScreen.selectDuration(120); // Timeout: duration-2h não renderiza
```

**Implementação do setDateTimeDirectly()** (e2e/pages/events/CreateEventScreen.ts:136-154):
```typescript
async setDateTimeDirectly(): Promise<void> {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(14, 0, 0, 0);

  // Format: YYYY-MM-DDTHH:mm para datetime-local input
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  const hours = String(tomorrow.getHours()).padStart(2, '0');
  const minutes = String(tomorrow.getMinutes()).padStart(2, '0');
  const dateStr = `${year}-${month}-${day}T${hours}:${minutes}`;

  const dateTimeInput = this.getByTestId('datetime-input-web');
  await this.fill(dateTimeInput, dateStr);
  await this.page.waitForTimeout(500); // Dar tempo para UI reagir
}
```

### **2. Switch Component - click({ force: true }) Necessário**

**Problema**: Clicks normais em Switch não funcionavam (strict mode violation com 2 elementos).

**Causa Raiz**: O componente `<Switch>` do Arena renderiza:
- Um `<div>` wrapper com role="switch" (visual)
- Um `<input type="checkbox">` hidden com `aria-label` (funcional)

**Solução**:
```typescript
// ✅ CORRETO - Localizar pelo input hidden e force click
const maxParticipantsSwitch = page.locator('input[aria-label="Limitar número de participantes"]');
await maxParticipantsSwitch.click({ force: true });

// ❌ ERRADO - getByRole('switch') retorna 2 elementos
const switchEl = page.getByRole('switch', { name: 'Limitar' }); // Strict mode violation
```

**Análise do Componente** (src/screens/createEventScreen/components/PrivacyStep/index.tsx):
```tsx
// O Switch renderiza um input checkbox hidden
<input
  type="checkbox"
  aria-label="Limitar número de participantes"
  style={{ display: 'none' }}
  checked={isLimited}
  onChange={() => setIsLimited(!isLimited)}
/>
```

### **3. TypeScript Types - Sempre Seguir Interface Exata**

**Problema**: Testes usando propriedades incorretas causavam falhas silenciosas.

**Erros Comuns Corrigidos**:
```typescript
// ❌ ERRADO - Propriedades não existem na interface
const testData = generateTestEvent({
  duration: '2h',        // ❌ Não existe
  address: 'Rua X',      // ❌ Não existe
  privacy: 'private',    // ❌ Valor inválido
  privacy: 'friends',    // ❌ Valor inválido
});

// ✅ CORRETO - Seguir interface TypeScript
const testData = generateTestEvent({
  durationMinutes: 120,          // ✅ Interface espera number em minutos
  cep: '01310100',               // ✅ Interface espera CEP string
  privacy: 'invite_only',        // ✅ EventPrivacy válido
  privacy: 'approval_required',  // ✅ EventPrivacy válido
});
```

**Interface de Referência** (e2e/helpers/test-data-factory.ts):
```typescript
export interface TestEventData {
  title: string;
  sportName: string;
  durationMinutes: number; // NÃO 'duration'
  description?: string;
  cep?: string;            // NÃO 'address'
  privacy?: EventPrivacy;  // 'PUBLIC' | 'GROUP_ONLY' | 'APPROVAL_REQUIRED' | 'INVITE_ONLY'
  maxParticipants?: number;
}
```

### **4. Max Participants - Location Step, Não Privacy Step**

**Problema**: Teste tentava configurar max participants no Step 2 (Privacy), mas o campo está no Step 3 (Location).

**Estrutura do Wizard CreateEvent**:
- **Step 1 (BasicInfoStep)**: Título, Esporte, Data/Hora, Duração, Descrição
- **Step 2 (PrivacyStep)**: Privacy (PUBLIC/GROUP_ONLY/APPROVAL_REQUIRED/INVITE_ONLY), Grupo (se GROUP_ONLY)
- **Step 3 (LocationStep)**: CEP, Endereço, **Max Participants Switch + Input**
- **Step 4 (ReviewStep)**: Confirmação final

**Solução**:
```typescript
// Step 2: Privacy
await createEventScreen.selectPrivacy('public');
await createEventScreen.goToNextStep();

// Step 3: Location + Max Participants
await createEventScreen.fillCEP('01310100');
await page.waitForTimeout(2000); // CEP API call

// ✅ CORRETO - Max participants é configurado no Step 3
const maxParticipantsSwitch = page.locator('input[aria-label="Limitar número de participantes"]');
await maxParticipantsSwitch.click({ force: true });

const maxParticipantsInput = page.getByTestId('max-participants-input');
await maxParticipantsInput.fill('20');
```

### **5. Padrão "Seguir Exemplos" - Análise de Código Funcional**

**Lição Crítica**: Quando 1 teste passa e outros falham, **SEMPRE** analisar o teste que passa e replicar o padrão exato.

**Exemplo Prático**:
- ✅ Teste 1 (passou): Usava `setDateTimeDirectly()` antes de `selectDuration()`
- ❌ Testes 2-10 (falharam): Não usavam `setDateTimeDirectly()`

**Ação**: Comparar diffs entre teste que passou e testes que falharam → Identificar padrão → Replicar em todos.

### **6. testID > CSS Selectors > Text Locators**

**Hierarquia de Preferência**:
1. **testID** (mais estável): `page.getByTestId('datetime-input-web')`
2. **aria-label** (acessibilidade): `page.locator('input[aria-label="Limitar"]')`
3. **CSS selectors** (frágil): `page.locator('.duration-button')`
4. **Text locators** (muito frágil): `page.getByText('2 horas')` ← Evitar

**Por Quê**: testIDs não mudam com refactorings de UI, traduções ou restyling.

### **7. Waiters Estratégicos**

**Quando Usar `waitForTimeout()`**:
```typescript
// ✅ Após preencher CEP (API call de geocoding)
await createEventScreen.fillCEP('01310100');
await page.waitForTimeout(2000); // API externa

// ✅ Após preencher datetime-local (UI precisa reagir)
await this.fill(dateTimeInput, dateStr);
await this.page.waitForTimeout(500);

// ❌ EVITAR waiters arbitrários
await page.waitForTimeout(5000); // Tempo fixo desnecessário
```

**Preferir Waiters Específicos**:
```typescript
// ✅ Aguardar elemento específico
await page.waitForSelector('[data-testid="duration-120"]', { state: 'visible' });

// ✅ Aguardar rede
await page.waitForResponse(response => response.url().includes('/geocode'));
```

---

## 📂 Estrutura de Arquivos Atual

```
e2e/
├── .auth/                          # Storage states (6 arquivos JSON)
│   ├── real-user.json
│   ├── organizer.json
│   ├── participant.json
│   ├── group-admin.json
│   ├── user-with-friends.json
│   └── user-no-sports.json
├── helpers/
│   ├── storage-utils.ts            # Criação de storage states
│   └── test-data-factory.ts        # Helpers de API (CRUD eventos/grupos)
├── pages/
│   ├── base/
│   │   └── BasePage.ts             # Classe base com métodos utilitários
│   ├── auth/
│   │   ├── LoginScreen.ts
│   │   ├── RegisterScreen.ts
│   │   ├── ForgotPasswordScreen.ts
│   │   └── SportsOnboardingScreen.ts
│   ├── navigation/
│   │   ├── HomeScreen.ts
│   │   ├── BottomTabNavigator.ts
│   │   └── MenuDrawerScreen.ts
│   ├── events/
│   │   ├── CreateEventScreen.ts    # Wizard multi-step
│   │   └── EventDetailsScreen.ts
│   ├── groups/
│   │   ├── CreateGroupScreen.ts
│   │   └── GroupDetailsScreen.ts
│   ├── profile/
│   │   ├── ProfileScreen.ts
│   │   └── EditProfileScreen.ts
│   └── index.ts                    # Export centralizado
├── specs/
│   ├── events/
│   │   ├── event-lifecycle.spec.ts     ✅ COMPLETO (3 testes)
│   │   └── event-creation.spec.ts      ✅ COMPLETO (10 testes)
│   └── groups/
│       └── group-lifecycle.spec.ts     ✅ COMPLETO (3 testes)
├── global-setup.ts                 # Cria 6 usuários antes dos testes
└── E2E_CONTEXT_CONTINUATION.md     # ESTE ARQUIVO
```

---

## 🔧 Comandos Úteis

### **Rodar Todos os Testes**
```bash
npx playwright test
```

### **Rodar Spec Específico**
```bash
npx playwright test e2e/specs/events/event-lifecycle.spec.ts
```

### **Rodar em Headed Mode (ver navegador)**
```bash
npx playwright test --headed
```

### **Rodar Global Setup Manualmente**
```bash
npx ts-node e2e/global-setup.ts
```

### **Limpar Storage States**
```bash
rm -rf e2e/.auth/*.json
```

---

## 📖 Referências Importantes

### **Playwright Docs**
- Storage State: https://playwright.dev/docs/auth#reuse-signed-in-state
- Multi-user testing: https://playwright.dev/docs/browser-contexts
- Global Setup: https://playwright.dev/docs/test-global-setup-teardown

### **Page Object Model**
- Padrão: https://playwright.dev/docs/pom
- Best practices: https://playwright.dev/docs/best-practices

### **Arena API**
- Base URL: `https://backsportpulsemobile-production.up.railway.app/api/v1`
- Endpoints:
  - POST `/auth/register` - Registro
  - POST `/auth/login` - Login
  - POST `/events` - Criar evento
  - DELETE `/events/:id` - Deletar evento
  - POST `/events/:id/participants` - Entrar em evento
  - DELETE `/events/:id/participants` - Sair de evento
  - POST `/groups` - Criar grupo
  - DELETE `/groups/:id` - Deletar grupo
  - POST `/groups/:id/members` - Entrar em grupo
  - DELETE `/groups/:id/members` - Sair de grupo

---

## ✅ Checklist para Cada Novo Spec

Ao criar um novo spec, verificar:

1. ✅ Importa Page Objects corretos de `../../pages`
2. ✅ Importa helpers de `../../helpers/test-data-factory`
3. ✅ Define storage states com `path.join(__dirname, '../../.auth/...')`
4. ✅ Usa `test.describe()` para agrupar testes
5. ✅ Usa `test.use({ storageState })` para autenticação
6. ✅ Define `test.setTimeout(60000)` ou `90000` para cross-user
7. ✅ Carrega token do storage state via `require()`
8. ✅ Faz setup via API (rápido) ao invés de UI (lento)
9. ✅ Usa Page Object methods (`waitForPageLoad()`, `getEventSummary()`, etc.)
10. ✅ Adiciona logs com `console.log('✅ ...')` para debugging
11. ✅ Implementa cleanup em `afterEach()` ou `finally {}`
12. ✅ Usa `expect()` do Playwright para assertions
13. ✅ Testa cenário positivo E negativo (quando aplicável)
14. ✅ Para cross-user, usa `browser.newContext()` com storage states diferentes

---

## 🎯 Meta Final

**Quando o projeto estiver completo (100%)**:
- 17 specs implementados
- 115+ testes executando
- Cobertura E2E completa de todas as features críticas
- CI/CD com testes automatizados
- Documentação completa de cada spec

**Status Atual**: 18% completo (3/17 specs, 10/115 testes)

---

**Última Atualização**: Acabamos de completar `event-creation.spec.ts` (10/10 testes passando). Próximo spec: `event-participation.spec.ts`.

**Branch**: `feature/ux-improvements-phase-3` (ou branch atual do projeto)

**Commits Importantes**:
- `136b3c5` - "feat: Complete FASE 3 - Multi-User E2E Testing Infrastructure"
- `018d86a` - "feat: Add critical UI components and screens - Phase 3"
