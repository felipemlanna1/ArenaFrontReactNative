# 📘 Guia Completo - E2E Testing Arena (Novo Contexto)

> **Documento Master** para continuar o desenvolvimento de testes E2E em um novo contexto Claude.
> **Última Atualização**: 2025-11-24 19:30:00
> **Progresso Atual**: 16/115 testes (14%) | 3/17 specs completos

---

## 📊 1. Estado Atual do Projeto

### ✅ Infraestrutura Completa (100%)

**FASE 1-3**: Toda a infraestrutura de testes está pronta e funcional.

- ✅ **Playwright** configurado com TypeScript strict mode
- ✅ **14 Page Objects** implementados e testados
- ✅ **6 Storage States** criados (6 usuários autenticados)
- ✅ **Global Setup** automático (cria usuários via API antes dos testes)
- ✅ **Test Data Factory** com helpers CRUD (events, groups)
- ✅ **Multi-User Testing** funcionando (browser.newContext)

### ✅ Specs Completos (3/17 - 18%)

| Spec                         | Status | Testes | Descrição                    |
|------------------------------|--------|--------|------------------------------|
| `event-lifecycle.spec.ts`    | ✅     | 3/3    | CRUD básico eventos via API  |
| `group-lifecycle.spec.ts`    | ✅     | 3/3    | CRUD básico grupos via API   |
| `event-creation.spec.ts`     | ✅     | 10/10  | Wizard criação evento (UI)   |
| **TOTAL IMPLEMENTADO**       | 🟡     | **16/115** | **14%**               |

### ⏳ Próximo Spec (PRIORIDADE P0)

**`event-participation.spec.ts`** (10 testes)
- Join, leave, waitlist, approval, notifications
- **Blocker**: Precisa criar `NotificationsScreen` Page Object primeiro
- Helpers API já existem: `joinEvent()`, `leaveEvent()`

### 📈 Roadmap Completo

| Fase          | Specs | Testes | Status | Prioridade |
|---------------|-------|--------|--------|------------|
| P0 (Critical) | 5     | 35     | 60%    | Imediato   |
| P1 (Important)| 6     | 45     | 0%     | Próximo    |
| P2 (Desirable)| 6     | 35     | 0%     | Depois     |
| **TOTAL**     | **17**| **115**| **14%**|            |

---

## 🔥 2. Padrões Críticos Aprendidos (OBRIGATÓRIOS!)

### ⚠️ Padrão #1: setDateTimeDirectly() É OBRIGATÓRIO

**Regra de Ouro**: SEMPRE chamar `setDateTimeDirectly()` ANTES de `selectDuration()`.

```typescript
// ✅ CORRETO - Ordem obrigatória
await createEventScreen.fillTitle('Evento Teste');
await createEventScreen.selectSport('Futebol');
await createEventScreen.setDateTimeDirectly();    // ← OBRIGATÓRIO AQUI
await createEventScreen.selectDuration(120);       // ← Duration só funciona após datetime
await createEventScreen.goToNextStep();

// ❌ ERRADO - Causa timeout em waitForSelector('duration-120')
await createEventScreen.selectDuration(120);  // ❌ Falha: opções não renderizam
```

**Por Quê**:
- Web usa `<input type="datetime-local">` nativo HTML
- React Native Web só renderiza opções de duração APÓS datetime ser preenchido
- Sem datetime, `duration-120` nunca aparece → timeout

**Implementação** ([e2e/pages/events/CreateEventScreen.ts:136-154](e2e/pages/events/CreateEventScreen.ts#L136-L154)):
```typescript
async setDateTimeDirectly(): Promise<void> {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(14, 0, 0, 0);

  // Format YYYY-MM-DDTHH:mm para datetime-local
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  const hours = String(tomorrow.getHours()).padStart(2, '0');
  const minutes = String(tomorrow.getMinutes()).padStart(2, '0');
  const dateStr = `${year}-${month}-${day}T${hours}:${minutes}`;

  const dateTimeInput = this.getByTestId('datetime-input-web');
  await this.fill(dateTimeInput, dateStr);
  await this.page.waitForTimeout(500); // UI precisa reagir
}
```

### ⚠️ Padrão #2: Switch Components - click({ force: true })

**Problema**: `<Switch>` renderiza 2 elementos (wrapper div + input hidden) → strict mode violation.

```typescript
// ✅ CORRETO - Localizar input hidden com aria-label
const maxParticipantsSwitch = page.locator('input[aria-label="Limitar número de participantes"]');
await maxParticipantsSwitch.click({ force: true });  // force: true é obrigatório

// ❌ ERRADO - getByRole('switch') retorna 2 elementos
const switchEl = page.getByRole('switch', { name: 'Limitar' });  // Strict mode error
await switchEl.click();
```

**Anatomia do Switch** ([src/screens/createEventScreen/components/PrivacyStep/index.tsx](src/screens/createEventScreen/components/PrivacyStep/index.tsx)):
```tsx
// Componente renderiza 2 elementos
<div role="switch" aria-checked={isChecked}>  {/* Visual wrapper */}
  <input
    type="checkbox"
    aria-label="Limitar número de participantes"  {/* Funcional - TARGET */}
    style={{ display: 'none' }}                    {/* Hidden! */}
    checked={isChecked}
  />
</div>
```

### ⚠️ Padrão #3: TypeScript Types Devem Ser Exatos

**Erro Comum**: Usar propriedades que não existem na interface → falhas silenciosas.

```typescript
// ❌ ERRADO - Propriedades incorretas
const testData = generateTestEvent({
  duration: '2h',           // ❌ Não existe (deveria ser durationMinutes)
  address: 'Rua X, 123',    // ❌ Não existe (deveria ser cep)
  privacy: 'private',       // ❌ Valor inválido (deveria ser 'invite_only')
  privacy: 'friends',       // ❌ Valor inválido (deveria ser 'approval_required')
});

// ✅ CORRETO - Seguir interface exata
const testData = generateTestEvent({
  durationMinutes: 120,           // ✅ number em minutos
  cep: '01310100',                // ✅ CEP string (8 dígitos)
  privacy: 'invite_only',         // ✅ EventPrivacy válido
  privacy: 'approval_required',   // ✅ EventPrivacy válido
});
```

**Interface de Referência** ([e2e/helpers/test-data-factory.ts](e2e/helpers/test-data-factory.ts)):
```typescript
export interface TestEventData {
  title: string;
  sportName: string;
  durationMinutes: number;     // NÃO 'duration' ← number em minutos
  description?: string;
  cep?: string;                // NÃO 'address' ← CEP 8 dígitos
  privacy?: EventPrivacy;      // 'PUBLIC' | 'GROUP_ONLY' | 'APPROVAL_REQUIRED' | 'INVITE_ONLY'
  maxParticipants?: number;
}

type EventPrivacy = 'PUBLIC' | 'GROUP_ONLY' | 'APPROVAL_REQUIRED' | 'INVITE_ONLY';
// NÃO 'private', 'friends', 'public-only' ← valores inválidos
```

### ⚠️ Padrão #4: Max Participants = Step 3 (Location)

**Estrutura do Wizard CreateEventScreen**:
- **Step 1 (BasicInfoStep)**: Título, Esporte, Data/Hora, Duração, Descrição
- **Step 2 (PrivacyStep)**: Privacy (PUBLIC/GROUP_ONLY/etc), Grupo (se GROUP_ONLY)
- **Step 3 (LocationStep)**: CEP, Endereço, **← MAX PARTICIPANTS AQUI**
- **Step 4 (ReviewStep)**: Confirmação final

```typescript
// ❌ ERRADO - Tentar configurar max participants no Step 2
await createEventScreen.selectPrivacy('public');
const switchEl = page.locator('input[aria-label="Limitar"]');  // ❌ Não existe aqui
await switchEl.click();  // Falha: elemento não encontrado

// ✅ CORRETO - Configurar no Step 3
await createEventScreen.selectPrivacy('public');
await createEventScreen.goToNextStep();  // → Step 3

await createEventScreen.fillCEP('01310100');
await page.waitForTimeout(2000);  // API geocoding

// Agora sim, configurar max participants
const maxParticipantsSwitch = page.locator('input[aria-label="Limitar número de participantes"]');
await maxParticipantsSwitch.click({ force: true });

const maxParticipantsInput = page.getByTestId('max-participants-input');
await maxParticipantsInput.fill('20');
```

### ⚠️ Padrão #5: Seguir Padrão de Teste que Passou

**Lição Crítica**: Quando 1 teste passa e 9 falham, SEMPRE analisar o teste que passou.

**Exemplo Real**:
- ✅ Teste 1 "deve criar evento com dados mínimos" - **PASSOU**
- ❌ Testes 2-10 - **FALHARAM** (timeout em `duration-120`)

**Ação**:
1. Abrir diff entre teste 1 (passou) e teste 2 (falhou)
2. Identificar diferença: teste 1 usava `setDateTimeDirectly()`, teste 2 não
3. Replicar padrão exato em todos os 9 testes restantes
4. **Resultado**: 10/10 testes passando ✅

**Processo**:
```bash
# Comparar testes
git diff --no-index teste_passou.ts teste_falhou.ts

# Identificar padrão
# Teste que passou: ✅ setDateTimeDirectly() → selectDuration()
# Teste que falhou: ❌ selectDuration() direto

# Replicar em todos
for test in tests_2_to_10:
    add_line: await createEventScreen.setDateTimeDirectly();
```

### ⚠️ Padrão #6: testID > aria-label > CSS > Text

**Hierarquia de Preferência** (do mais estável ao mais frágil):

1. **testID** (preferencial): `page.getByTestId('datetime-input-web')`
   - ✅ Não muda com refactoring de UI
   - ✅ Não muda com traduções (i18n)
   - ✅ Não muda com restyling

2. **aria-label**: `page.locator('input[aria-label="Limitar número de participantes"]')`
   - ✅ Semântico (acessibilidade)
   - ⚠️ Pode mudar com traduções

3. **CSS selectors**: `page.locator('button.duration-btn[data-value="120"]')`
   - ⚠️ Frágil (muda com restyling)
   - ⚠️ Classes CSS podem ser renomeadas

4. **Text locators**: `page.getByText('2 horas')`
   - ❌ Muito frágil (muda com traduções)
   - ❌ Quebra com mudanças de copy

**Exemplo Prático**:
```typescript
// ✅ MELHOR - testID (não muda nunca)
const dateTimeInput = page.getByTestId('datetime-input-web');

// ✅ BOM - aria-label (acessibilidade)
const switchEl = page.locator('input[aria-label="Limitar número de participantes"]');

// ⚠️ ACEITÁVEL - CSS específico
const durationBtn = page.locator('button[data-testid="duration-120"]');

// ❌ EVITAR - Text (muito frágil)
const submitBtn = page.getByText('Criar Evento');  // Quebra se mudar para "Confirmar Criação"
```

### ⚠️ Padrão #7: Waiters Estratégicos

**Quando Usar `waitForTimeout()`**:

```typescript
// ✅ Após preencher CEP (API externa de geocoding)
await createEventScreen.fillCEP('01310100');
await page.waitForTimeout(2000);  // ViaCEP API pode demorar

// ✅ Após preencher datetime-local (UI precisa reagir)
await this.fill(dateTimeInput, dateStr);
await this.page.waitForTimeout(500);  // React precisa re-renderizar

// ❌ EVITAR - Waiters arbitrários sem motivo
await page.waitForTimeout(5000);  // Por que 5 segundos? Não use!
```

**Preferir Waiters Específicos**:
```typescript
// ✅ MELHOR - Aguardar elemento específico
await page.waitForSelector('[data-testid="duration-120"]', { state: 'visible' });

// ✅ MELHOR - Aguardar resposta de rede
await page.waitForResponse(response =>
  response.url().includes('/geocode') && response.status() === 200
);

// ✅ MELHOR - Aguardar navegação
await Promise.all([
  page.waitForNavigation({ url: /\/events\/\d+/ }),
  page.click('button[type="submit"]')
]);
```

---

## 🏗️ 3. Page Objects Disponíveis (14 POMs)

### 📂 Estrutura: e2e/pages/

```
e2e/pages/
├── base/
│   └── BasePage.ts                    # Classe base com métodos utilitários
├── auth/
│   ├── LoginScreen.ts                 # Login de usuário
│   ├── RegisterScreen.ts              # Registro de usuário
│   ├── ForgotPasswordScreen.ts        # Recuperação de senha
│   └── SportsOnboardingScreen.ts      # Onboarding de esportes
├── navigation/
│   ├── HomeScreen.ts                  # Tela inicial (feed de eventos)
│   ├── BottomTabNavigator.ts          # Tab navigation (Home, Calendar, Menu)
│   └── MenuDrawerScreen.ts            # Menu lateral (Perfil, Grupos, Config)
├── events/
│   ├── CreateEventScreen.ts           # ⭐ Wizard 4 steps (CRÍTICO)
│   └── EventDetailsScreen.ts          # Detalhes de evento
├── groups/
│   ├── CreateGroupScreen.ts           # Criação de grupo
│   └── GroupDetailsScreen.ts          # Detalhes de grupo
├── profile/
│   ├── ProfileScreen.ts               # Perfil do usuário
│   └── EditProfileScreen.ts           # Edição de perfil
└── index.ts                            # Export centralizado
```

### ⭐ CreateEventScreen (POM Crítico)

**Por Que É Crítico**: Wizard multi-step com 4 passos, usado em 10/115 testes (8.7%).

**Métodos Principais**:
```typescript
class CreateEventScreen extends BasePage {
  // Step 1: Basic Info
  async fillTitle(title: string): Promise<void>
  async selectSport(sportName: string): Promise<void>
  async setDateTimeDirectly(): Promise<void>           // ⚠️ OBRIGATÓRIO antes de duration
  async selectDuration(minutes: number): Promise<void>  // 60, 90, 120, 150, 180, etc.
  async fillDescription(text: string): Promise<void>

  // Step 2: Privacy
  async selectPrivacy(privacy: 'public' | 'group_only' | 'approval_required' | 'invite_only'): Promise<void>
  async selectGroup(groupName: string): Promise<void>  // Se privacy = 'group_only'

  // Step 3: Location
  async fillCEP(cep: string): Promise<void>            // Auto-preenche endereço via ViaCEP

  // Step 4: Review & Submit
  async submitEvent(): Promise<void>

  // Navigation
  async goToNextStep(): Promise<void>
  async goToPreviousStep(): Promise<void>

  // Validation
  async getValidationError(fieldName: string): Promise<string | null>
}
```

**Exemplo de Uso Completo**:
```typescript
const createEventScreen = new CreateEventScreen(page);
await createEventScreen.waitForPageLoad();

// Step 1
await createEventScreen.fillTitle('Pelada no Parque');
await createEventScreen.selectSport('Futebol');
await createEventScreen.setDateTimeDirectly();  // ← OBRIGATÓRIO
await createEventScreen.selectDuration(120);    // 2 horas
await createEventScreen.fillDescription('Racha de sábado');
await createEventScreen.goToNextStep();

// Step 2
await createEventScreen.selectPrivacy('public');
await createEventScreen.goToNextStep();

// Step 3
await createEventScreen.fillCEP('01310100');  // Av Paulista
await page.waitForTimeout(2000);              // ViaCEP API
await createEventScreen.goToNextStep();

// Step 4
await createEventScreen.submitEvent();

// Aguardar navegação para detalhes
await page.waitForURL(/\/events\/\d+/);
```

### 🔑 EventDetailsScreen (POM Essencial)

**Métodos Principais**:
```typescript
class EventDetailsScreen extends BasePage {
  // Leitura de Dados
  async getEventTitle(): Promise<string>
  async getEventSport(): Promise<string>
  async getEventDateTime(): Promise<string>
  async getEventLocation(): Promise<string>
  async getEventDescription(): Promise<string>

  // Ações de Participação
  async confirmParticipation(): Promise<void>
  async cancelParticipation(): Promise<void>
  async joinWaitlist(): Promise<void>
  async leaveWaitlist(): Promise<void>

  // Ações de Organizer
  async editEvent(): Promise<void>
  async deleteEvent(): Promise<void>
  async approveParticipant(username: string): Promise<void>
  async rejectParticipant(username: string): Promise<void>

  // Validações
  async isParticipating(): Promise<boolean>
  async isInWaitlist(): Promise<boolean>
  async getParticipantCount(): Promise<number>
  async getParticipantsList(): Promise<string[]>
}
```

### 📋 Outros POMs Importantes

**HomeScreen** (feed de eventos):
```typescript
async navigateToCreateEvent(): Promise<void>  // FAB button
async getEventCards(): Promise<string[]>      // Lista de títulos
async clickEventCard(title: string): Promise<void>
```

**BottomTabNavigator** (navegação principal):
```typescript
async navigateToHome(): Promise<void>
async navigateToCalendar(): Promise<void>
async navigateToMenu(): Promise<void>
```

**GroupDetailsScreen** (detalhes de grupo):
```typescript
async getGroupName(): Promise<string>
async joinGroup(): Promise<void>
async leaveGroup(): Promise<void>
async getMembersList(): Promise<string[]>
```

---

## 🛠️ 4. Test Data Factory & Helpers

### 📍 Arquivo: e2e/helpers/test-data-factory.ts

**Funções Principais**:

#### Events (CRUD)
```typescript
// Criar evento via API (rápido, não usa UI)
async function createTestEvent(token: string, eventData: TestEventData): Promise<string>
// Retorna eventId

// Deletar evento via API (cleanup)
async function deleteTestEvent(token: string, eventId: string): Promise<void>

// Join/Leave evento via API
async function joinEvent(token: string, eventId: string): Promise<void>
async function leaveEvent(token: string, eventId: string): Promise<void>
```

#### Groups (CRUD)
```typescript
// Criar grupo via API
async function createTestGroup(token: string, groupData: TestGroupData): Promise<string>
// Retorna groupId

// Deletar grupo via API
async function deleteTestGroup(token: string, groupId: string): Promise<void>

// Join/Leave grupo via API
async function joinGroup(token: string, groupId: string): Promise<void>
async function leaveGroup(token: string, groupId: string): Promise<void>
```

#### Scenarios (Setup Complexo)
```typescript
// Setup: Cria evento + participants + waitlist
async function setupEventScenario(
  organizerToken: string,
  participantTokens: string[]
): Promise<EventScenario>

// Cleanup: Deleta evento e todos os dados relacionados
async function cleanupEventScenario(
  organizerToken: string,
  eventId: string
): Promise<void>

// Setup: Cria grupo + members
async function setupGroupScenario(
  adminToken: string,
  memberTokens: string[]
): Promise<GroupScenario>

// Cleanup: Deleta grupo
async function cleanupGroupScenario(
  adminToken: string,
  groupId: string
): Promise<void>
```

#### Test Data Generators
```typescript
// Gera dados de evento com valores padrão + overrides
function generateTestEvent(overrides?: Partial<TestEventData>): TestEventData

// Gera dados de grupo
function generateTestGroup(overrides?: Partial<TestGroupData>): TestGroupData

// Exemplo de uso
const eventData = generateTestEvent({
  title: 'Evento Customizado',
  durationMinutes: 180,  // 3 horas
  privacy: 'invite_only',
  maxParticipants: 20,
});
```

### 🔐 Extrair Token de Storage State

**Pattern Comum** (usado em todos os specs):
```typescript
import path from 'path';

const organizerStorageState = path.join(__dirname, '../../.auth/organizer.json');

test('deve criar evento', async ({ page }) => {
  // Carregar storage state
  const storage = require(organizerStorageState);

  // Extrair token
  const token = storage.origins[0].localStorage.find(
    (item: { name: string; value: string }) => item.name === '@Arena:access_token'
  )?.value;

  if (!token) {
    throw new Error('Token not found in storage state');
  }

  // Usar token para API calls
  const eventId = await createTestEvent(token, eventData);

  // ... resto do teste

  // Cleanup
  await deleteTestEvent(token, eventId);
});
```

---

## 🎯 5. Próximos Specs a Implementar

### 📌 P0 (Critical) - Completar URGENTE

#### ⏳ event-participation.spec.ts (10 testes)
**Blocker**: Precisa criar `NotificationsScreen` POM primeiro.

**Testes**:
1. Participant deve confirmar presença em evento público
2. Participant deve cancelar presença confirmada
3. Participant deve entrar na waitlist de evento lotado
4. Participant deve sair da waitlist
5. Organizer deve aprovar solicitação (approval_required event)
6. Organizer deve rejeitar solicitação (approval_required event)
7. Participant deve receber notificação de confirmação
8. Participant não pode entrar em evento invite_only sem convite
9. Participant deve ver evento na lista "Meus Eventos" após confirmar
10. Cross-user: Organizer vê participant na lista de confirmados

**Dependências**:
- ✅ `CreateEventScreen` POM - Existe
- ✅ `EventDetailsScreen` POM - Existe
- ✅ `joinEvent()`, `leaveEvent()` helpers - Existem
- ❌ **`NotificationsScreen` POM** - **PRECISA CRIAR**
- ❌ **`MyEventsScreen` POM** - **PRECISA CRIAR** (ou usar filtro no HomeScreen)

**Ação Imediata**:
```bash
# Criar POMs necessários
touch e2e/pages/navigation/NotificationsScreen.ts
touch e2e/pages/events/MyEventsScreen.ts
```

#### ⏳ group-management.spec.ts (9 testes)
**Testes**:
1. Admin deve criar grupo via UI
2. Admin deve editar nome do grupo
3. Admin deve editar descrição do grupo
4. Admin deve convidar membro para grupo privado
5. Admin deve remover membro do grupo
6. Member deve aceitar convite de grupo privado
7. Member deve recusar convite de grupo privado
8. Cross-user: Convite aparece nas notificações do member
9. Cross-user: Admin vê member na lista após aceite

**Dependências**:
- ✅ `CreateGroupScreen` POM - Existe
- ✅ `GroupDetailsScreen` POM - Existe
- ✅ `joinGroup()`, `leaveGroup()` helpers - Existem
- ✅ `NotificationsScreen` POM - Será criado no spec anterior

### 📌 P1 (Important) - Próxima Fase

#### event-search-filter.spec.ts (8 testes)
Busca e filtros de eventos (por esporte, data, localização).

#### group-search-filter.spec.ts (7 testes)
Busca e filtros de grupos (por esporte, tipo, visibilidade).

#### notifications.spec.ts (10 testes)
Centro de notificações completo (event invites, group invites, participation confirmations).

#### friends-management.spec.ts (10 testes)
Adicionar, remover, bloquear amigos.

#### profile-edit.spec.ts (5 testes)
Edição de perfil (nome, bio, foto, esportes).

#### sports-onboarding.spec.ts (5 testes)
Onboarding de esportes para novos usuários.

### 📌 P2 (Desirable) - Última Fase

6 specs de UI/navegação (calendar, menu, settings, help, terms).

---

## ✅ 6. Checklist de Implementação

### Antes de Criar Novo Spec

- [ ] Verificar se Page Objects necessários existem
- [ ] Verificar se helpers API existem (test-data-factory.ts)
- [ ] Verificar se storage states necessários existem (.auth/)
- [ ] Ler specs similares como referência (event-creation.spec.ts)
- [ ] Planejar setup via API vs UI (preferir API para setup)

### Durante Implementação

- [ ] Usar `test.describe()` para agrupar testes relacionados
- [ ] Usar `test.use({ storageState })` para autenticação
- [ ] Definir `test.setTimeout(60000)` ou `90000` para cross-user
- [ ] Fazer setup via API quando possível (rápido)
- [ ] Usar Page Object methods (não locators diretos no teste)
- [ ] Adicionar logs com `console.log('✅ ...')` para debugging
- [ ] Implementar cleanup em `afterEach()` ou `try/finally`

### Após Implementação

- [ ] Todos os testes passando (npx playwright test spec-name.spec.ts)
- [ ] Cleanup funcionando (sem lixo no banco após testes)
- [ ] Logs claros (easy debugging)
- [ ] TypeScript sem `any` (strict mode)
- [ ] Atualizar E2E_CONTEXT_CONTINUATION.md com progresso

### Padrões de Código Obrigatórios

- [ ] `setDateTimeDirectly()` antes de `selectDuration()` (eventos)
- [ ] `click({ force: true })` para Switch components
- [ ] TypeScript types exatos (durationMinutes, cep, privacy)
- [ ] testIDs preferenciais sobre text locators
- [ ] Waiters estratégicos (2000ms para CEP, 500ms para datetime)

---

## 🐛 7. Problemas Conhecidos & Soluções

### ❌ Problema 1: Timeout em duration locator

**Erro**:
```
Test timeout of 60000ms exceeded
Waiting for locator('button[data-testid="duration-120"]')
```

**Causa**: `setDateTimeDirectly()` não foi chamado antes de `selectDuration()`.

**Solução**:
```typescript
// ✅ SEMPRE chamar setDateTimeDirectly() primeiro
await createEventScreen.setDateTimeDirectly();
await createEventScreen.selectDuration(120);
```

### ❌ Problema 2: Strict mode violation em Switch

**Erro**:
```
Error: strict mode violation
locator resolved to 2 elements:
  <div role="switch">...</div>
  <input type="checkbox" aria-label="...">
```

**Solução**:
```typescript
// ✅ Localizar pelo input hidden com aria-label
const switchEl = page.locator('input[aria-label="Limitar número de participantes"]');
await switchEl.click({ force: true });
```

### ❌ Problema 3: TypeScript Property Does Not Exist

**Erro**:
```typescript
Property 'duration' does not exist on type 'TestEventData'
Property 'address' does not exist on type 'TestEventData'
```

**Solução**:
```typescript
// ✅ Usar propriedades corretas
const testData = generateTestEvent({
  durationMinutes: 120,  // NÃO duration
  cep: '01310100',       // NÃO address
  privacy: 'invite_only' // NÃO 'private'
});
```

### ❌ Problema 4: API Envelope Pattern

**Problema**: API retorna `{data: {user, access_token}}` mas código espera `{user, access_token}`.

**Solução**:
```typescript
const responseData = await response.json();
const data = responseData.data || responseData;  // Handle envelope
const { user, access_token } = data;
```

### ❌ Problema 5: TypeScript Promise.allSettled

**Erro**: `Parameter 'r' implicitly has an 'any' type`.

**Solução**:
```typescript
const successful = results.filter(
  (r): r is PromiseFulfilledResult<{ success: boolean }> =>
    r.status === 'fulfilled' && r.value.success
).length;
```

---

## 📋 8. Prompt Completo para Copiar (Novo Contexto)

**Use este prompt ao iniciar um novo contexto Claude:**

```
Olá! Estou continuando o desenvolvimento de testes E2E para o projeto Arena Mobile.

📊 ESTADO ATUAL:
- 16/115 testes implementados (14%)
- 3/17 specs completos: event-lifecycle, group-lifecycle, event-creation
- Infraestrutura 100% pronta (Playwright, POMs, storage states, helpers)

🎯 PRÓXIMO SPEC: event-participation.spec.ts (10 testes)

🔥 PADRÕES CRÍTICOS (OBRIGATÓRIOS!):
1. ⚠️ SEMPRE chamar setDateTimeDirectly() ANTES de selectDuration()
2. ⚠️ Switch components: click({ force: true }) no input hidden com aria-label
3. ⚠️ TypeScript types exatos: durationMinutes (não duration), cep (não address), privacy: 'invite_only' (não 'private')
4. ⚠️ Max participants está no Step 3 (Location), NÃO no Step 2 (Privacy)
5. ⚠️ testID > aria-label > CSS > text locators (hierarquia de preferência)
6. ⚠️ Waiters estratégicos: 2000ms após CEP, 500ms após datetime-local
7. ⚠️ Seguir padrão de teste que passou (comparar diffs)

📂 ARQUIVOS IMPORTANTES:
- e2e/E2E_CONTEXT_CONTINUATION.md - Progresso completo
- e2e/GUIA_COMPLETO_NOVO_CONTEXTO.md - Este guia (referência rápida)
- e2e/PROMPT_NEW_CONTEXT.md - Estado crítico atual
- e2e/pages/events/CreateEventScreen.ts - POM crítico (wizard 4 steps)
- e2e/helpers/test-data-factory.ts - Helpers API (createTestEvent, joinEvent, etc)
- e2e/specs/events/event-creation.spec.ts - Referência de spec completo (10/10 testes passando)

🚧 BLOCKER ATUAL:
Preciso criar NotificationsScreen POM antes de implementar event-participation.spec.ts.

🚀 COMANDOS ÚTEIS:
# Iniciar servidor
npx expo start --web &
sleep 15

# Rodar spec específico
npx playwright test e2e/specs/events/event-creation.spec.ts --project=chromium

# Rodar todos os testes
npx playwright test

Por favor, leia:
1. e2e/GUIA_COMPLETO_NOVO_CONTEXTO.md (este arquivo) - visão geral
2. e2e/E2E_CONTEXT_CONTINUATION.md - progresso detalhado
3. e2e/specs/events/event-creation.spec.ts - exemplo de spec completo

Depois me diga: estou pronto para continuar. Qual é o próximo passo?
```

---

## 🔗 Referências Rápidas

### API Base URL
```
https://backsportpulsemobile-production.up.railway.app/api/v1
```

### Storage States (6 usuários)
```
e2e/.auth/real-user.json           (felipemlanna@gmail.com / P@lioed2011)
e2e/.auth/organizer.json           (testuser_org_TIMESTAMP)
e2e/.auth/participant.json         (testuser_participant_TIMESTAMP)
e2e/.auth/group-admin.json         (testuser_group_TIMESTAMP)
e2e/.auth/user-with-friends.json   (testuser_friends_TIMESTAMP)
e2e/.auth/user-no-sports.json      (testuser_nosports_TIMESTAMP)
```

### Comandos Essenciais
```bash
# Rodar global setup (criar usuários)
npx ts-node e2e/global-setup.ts

# Rodar testes (precisa do servidor web rodando)
npx expo start --web &
sleep 15
npx playwright test

# Rodar spec específico
npx playwright test e2e/specs/events/event-creation.spec.ts

# Rodar com UI (ver navegador)
npx playwright test --headed

# Limpar storage states (forçar re-criação)
rm -rf e2e/.auth/*.json
```

### Estrutura de Diretórios
```
e2e/
├── .auth/                    # Storage states (6 JSON files)
├── pages/                    # Page Objects (14 POMs)
│   ├── base/BasePage.ts
│   ├── auth/                 (4 POMs)
│   ├── navigation/           (3 POMs)
│   ├── events/               (2 POMs)
│   ├── groups/               (2 POMs)
│   ├── profile/              (2 POMs)
│   └── index.ts
├── helpers/
│   ├── test-data-factory.ts  # API helpers (CRUD)
│   └── storage-utils.ts      # Storage state helpers
├── specs/
│   ├── events/
│   │   ├── event-lifecycle.spec.ts       (3 tests ✅)
│   │   ├── event-creation.spec.ts        (10 tests ✅)
│   │   └── event-participation.spec.ts   (10 tests ⏳ PRÓXIMO)
│   └── groups/
│       └── group-lifecycle.spec.ts       (3 tests ✅)
├── global-setup.ts           # Cria 6 usuários automaticamente
├── E2E_CONTEXT_CONTINUATION.md
├── PROMPT_NEW_CONTEXT.md
└── GUIA_COMPLETO_NOVO_CONTEXTO.md  # ESTE ARQUIVO
```

---

**🎯 OBJETIVO FINAL**: 17 specs | 115+ testes | Cobertura E2E completa

**📈 PROGRESSO ATUAL**: 3 specs | 16 testes | 14%

**⏳ PRÓXIMO MILESTONE**: Completar P0 (5 specs, 35 testes) → 30% total

**🚀 VAMOS LÁ!**
