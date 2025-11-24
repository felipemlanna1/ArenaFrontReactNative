# 🎯 Prompt para Novo Contexto - Event Creation E2E Tests

## 📋 ESTADO ATUAL (CRÍTICO!)

### ✅ TODOS OS 10 TESTES PASSARAM! 🎉

```bash
✓ [chromium] › event-creation.spec.ts:18 specs passed
10 passed (2.5m)
```

**Progresso**: 10/10 event-creation (100%) ✅ | 16/115 total (14%)

---

## 🔑 PROBLEMA CRÍTICO RESOLVIDO: DatePicker Web

### ❌ Problema
DatePicker React Native não funciona na web Expo.

### ✅ Solução
Input HTML `datetime-local` com `Platform.OS` conditional.

**Arquivo**: `src/screens/createEventScreen/components/BasicInfoStep/index.tsx`

Veja arquivo completo para código detalhado (linhas 107-157).

---

## 🏷️ TestIDs Adicionados

1. `event-detail-title` - EventHeroSection título
2. `datetime-input-web` - BasicInfoStep datetime input

---

## 🛠️ Problemas Resolvidos

1. ✅ DatePicker web (input datetime-local)
2. ✅ Global setup sports (addUserSports função)
3. ✅ FAB navigation (handleCreateEvent)
4. ✅ TestIDs corretos (duration-120, privacy-option-public, etc)
5. ✅ Page Objects robustos (usando getByTestId)

---

## 🎯 PRÓXIMOS PASSOS

### ✅ event-creation.spec.ts - COMPLETO (10/10)
1. ✅ deve criar evento com dados mínimos
2. ✅ deve criar evento com descrição
3. ✅ deve criar evento com endereço completo
4. ✅ deve criar evento privado (invite_only)
5. ✅ deve criar evento público
6. ✅ deve criar evento com aprovação (approval_required)
7. ✅ deve validar título obrigatório
8. ✅ deve validar esporte obrigatório
9. ✅ deve criar evento com duração personalizada (3h)
10. ✅ deve criar evento com máximo de participantes

### ⏳ Próximo Spec: event-participation.spec.ts (10 testes)
**Objetivo**: Testar fluxo de participação em eventos (join, leave, waitlist, notifications)

**Dependências**:
- ✅ CreateEventScreen POM - Existe
- ✅ EventDetailsScreen POM - Existe
- ❌ NotificationsScreen POM - **PRECISA CRIAR**
- ✅ Test Data Factory - `joinEvent()`, `leaveEvent()` helpers existem

**Testes a Implementar**:
1. Participant deve confirmar presença em evento público
2. Participant deve cancelar presença confirmada
3. Participant deve entrar na waitlist de evento lotado
4. Participant deve sair da waitlist
5. Organizer deve aprovar solicitação (approval_required)
6. Organizer deve rejeitar solicitação (approval_required)
7. Participant deve receber notificação de confirmação
8. Participant não pode entrar em evento invite_only sem convite
9. Participant deve ver evento na lista "Meus Eventos" após confirmar
10. Cross-user: Organizer vê participant na lista de confirmados

**Ação Imediata**: Criar `e2e/pages/navigation/NotificationsScreen.ts` POM antes de iniciar os testes.

---

## 📂 Arquivos Modificados

1. `src/screens/createEventScreen/components/BasicInfoStep/index.tsx` - datetime-local web
2. `src/screens/eventDetailsScreen/components/EventHeroSection/index.tsx` - testID
3. `e2e/pages/events/CreateEventScreen.ts` - setDateTimeDirectly()
4. `e2e/pages/events/EventDetailsScreen.ts` - getByTestId()
5. `src/screens/eventsScreen/useEventsScreen.ts` - handleCreateEvent()
6. `e2e/global-setup.ts` - addUserSports()

---

## 🎓 Lições Críticas - 7 Padrões Obrigatórios

### 1. **setDateTimeDirectly() É OBRIGATÓRIO**
```typescript
// ✅ SEMPRE chamar antes de selectDuration()
await createEventScreen.setDateTimeDirectly(); // ← OBRIGATÓRIO
await createEventScreen.selectDuration(120);
```
**Por quê**: No web, duration options só renderizam após datetime-local ser preenchido.

### 2. **Switch Components Precisam de force: true**
```typescript
// ✅ CORRETO
const switchEl = page.locator('input[aria-label="Limitar número de participantes"]');
await switchEl.click({ force: true });
```
**Por quê**: Switch renderiza div wrapper + input hidden, causando strict mode violation.

### 3. **TypeScript Types Devem Ser Exatos**
```typescript
// ❌ ERRADO
duration: '2h', address: 'Rua X', privacy: 'private'

// ✅ CORRETO
durationMinutes: 120, cep: '01310100', privacy: 'invite_only'
```

### 4. **Max Participants = Step 3 (Location), NÃO Step 2**
O campo de limite de participantes está no LocationStep, não no PrivacyStep.

### 5. **Seguir Padrão de Teste que Passou**
Quando 1 teste passa e outros falham, SEMPRE comparar diffs e replicar padrão exato.

### 6. **testID > aria-label > CSS > Text**
Hierarquia de preferência para locators (testID é o mais estável).

### 7. **Waiters Estratégicos**
- `waitForTimeout(2000)` após CEP (API geocoding)
- `waitForTimeout(500)` após datetime-local fill
- Preferir `waitForSelector()` específico quando possível

---

## 🔧 Correções Críticas Aplicadas

1. ✅ DatePicker: Platform.OS conditional sempre
2. ✅ TestIDs > Locators frágeis (event-detail-title, datetime-input-web)
3. ✅ Duration: valores em minutos (duration-120)
4. ✅ Privacy: backend values (invite_only, approval_required, não private/friends)
5. ✅ API: /sports/users/:id/sports (não /users/:id/sports)
6. ✅ setDateTimeDirectly() antes de selectDuration() em TODOS os testes
7. ✅ Switch: force click no input hidden com aria-label
8. ✅ Max participants no Step 3, não Step 2

---

## 🚀 Comandos

```bash
# Iniciar servidor
npx expo start --web &
sleep 15

# Verificar primeiro teste
npx playwright test e2e/specs/events/event-creation.spec.ts -g "deve criar evento com dados mínimos" --project=chromium

# Rodar todos
npx playwright test e2e/specs/events/event-creation.spec.ts --project=chromium
```

---

**Atualização**: 2025-11-24 19:30:00
**Branch**: feature/ux-improvements-phase-3
**Progresso**: 10/10 event-creation ✅ | 16/115 total (14%)
**Status**: Todos os testes de criação de eventos passando! Próximo: event-participation.spec.ts
