# Arena UI Improvements - Implementation Progress

**Data de Início**: 2025-11-23
**Branch Base**: `feature/new-ui-design`
**Status Geral**: 🚀 **Setup Completo** - Pronto para iniciar Task 1

---

## 📊 Progress Overview

| Fase | Tasks | Concluídas | Em Andamento | Pendentes | Status |
|------|-------|------------|--------------|-----------|--------|
| **Setup** | 1 | ✅ 1 | - | - | ✅ **Completo** |
| **Fase 1 - Foundations** | 5 | - | - | 5 | ⏳ Pendente |
| **Fase 2 - Components Core** | 5 | - | - | 5 | ⏳ Pendente |
| **Fase 3 - Home Screen** | 5 | - | - | 5 | ⏳ Pendente |
| **Fase 4 - Friends Screen** | 4 | - | - | 4 | ⏳ Pendente |
| **Fase 5 - Create Event** | 5 | - | - | 5 | ⏳ Pendente |
| **Fase 6 - Event Details** | 4 | - | - | 4 | ⏳ Pendente |
| **Fase 7 - Profile** | 2 | - | - | 2 | ⏳ Pendente |
| **TOTAL** | **31** | **1** | **0** | **30** | **3% Completo** |

---

## 🎯 Task 0 - Setup (COMPLETO)

**Status**: ✅ **Completo**
**Branch**: `feature/new-ui-design`
**Data**: 2025-11-23
**Duração**: 2 horas

### Deliverables Criados:
- ✅ Branch `feature/new-ui-design` criada
- ✅ Estrutura de pastas (`docs/ux-analysis/tasks/`, `comparisons/`, `scripts/`)
- ✅ Dependências instaladas (`sharp`, `playwright`, `@playwright/test`)
- ✅ Scripts de automação:
  - `setup-ui-improvements.sh`
  - `start-task.sh`
  - `finish-task.sh`
  - `generate-comparison.js`
- ✅ Templates criados:
  - `task-study-template.md`
  - `playwright-screenshot-template.spec.ts`
- ✅ Documento de tracking (`IMPLEMENTATION_PROGRESS.md`)

### Comandos Disponíveis:
```bash
# Iniciar uma task
./scripts/start-task.sh {NUMBER} "{NAME}"

# Finalizar uma task (captura screenshots e gera comparações)
./scripts/finish-task.sh {NUMBER}

# Gerar comparação manual
node scripts/generate-comparison.js before.png after.png output.png [taskNumber]
```

---

## 📋 FASE 1 - Foundations (5 Tasks, 5 Dias)

### Task 1 - Spacing System (#26)
**Status**: ⏳ **Pendente**
**Branch**: `task/1-spacing-system`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#26](../VISUAL_UX_IMPROVEMENTS.md#26)
**Estimativa**: 1 dia

**Objetivo**: Aplicar sistema de spacing do ArenaSpacing consistentemente baseado em hierarquia.

**Componentes Afetados**:
- Todos os componentes de UI
- Telas principais (Home, Friends, CreateEvent, EventDetails, Profile)

**Critérios de Aceitação**:
- [ ] Audit completo de spacing inconsistente
- [ ] xs (4px): label ↔ input, ícone ↔ texto inline
- [ ] sm (8px): linhas de texto no mesmo grupo, itens lista horizontal
- [ ] md (12px): inputs diferentes, cards em grid
- [ ] lg (16px): padding horizontal de telas, margin entre sections
- [ ] 2xl (24px): margin entre grupos grandes, padding sections destacadas
- [ ] 3xl (32px): separação de contextos diferentes
- [ ] Comentários `/* ArenaSpacing.lg */` documentando intenção
- [ ] Visual audit com overlay de grid (baseline 4px)

**Screenshots Necessários**:
- Before/After: Home, Friends, CreateEvent (Step 1), EventDetails, Profile

---

### Task 2 - Typography Hierarchy (#27)
**Status**: ⏳ **Pendente**
**Branch**: `task/2-typography-hierarchy`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#27](../VISUAL_UX_IMPROVEMENTS.md#27)
**Estimativa**: 1 dia

**Objetivo**: Remover fontSize/fontWeight hardcoded, garantir 100% uso de Text variants.

**Componentes Afetados**:
- Todos os componentes de texto
- EventCard, FriendCard, ProfileHeader, CreateEventSteps

**Critérios de Aceitação**:
- [ ] Audit completo removendo fontSize, fontWeight, lineHeight em StyleSheet
- [ ] displayPrimary (32px bold): stats, valores destacados
- [ ] headingPrimary (26px bold): títulos de tela
- [ ] titlePrimary (22px semibold): títulos de sections/cards
- [ ] bodyPrimary (15px regular): texto normal
- [ ] captionPrimary (13px medium): labels/metadados
- [ ] Hierarquia de cor: primary (light), secondary (medium)
- [ ] lineHeight sempre 1.5x fontSize
- [ ] ESLint rule bloqueando props tipográficas em styles

**Screenshots Necessários**:
- Before/After: EventCard, FriendCard, ProfileHeader, CreateEventStep1

---

### Task 3 - Shadows & Elevations (#29)
**Status**: ⏳ **Pendente**
**Branch**: `task/3-shadows-elevations`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#29](../VISUAL_UX_IMPROVEMENTS.md#29)
**Estimativa**: 1 dia

**Objetivo**: Implementar sistema de elevação com 4 níveis consistentes.

**Componentes Afetados**:
- Card, Button, Modal, Toast, Header (sticky)

**Critérios de Aceitação**:
- [ ] Elevation 0: texto, dividers, backgrounds (sem shadow)
- [ ] Elevation 1: cards de lista, inputs (opacity 8%, offset 0/2, radius 4)
- [ ] Elevation 2: cards destacados, botões secondary (12%, 0/4, 8)
- [ ] Elevation 3: botões primary, FAB (16%, 0/8, 16)
- [ ] Elevation 4: modals, toasts, overlays (24%, 0/12, 24)
- [ ] Botões pressed: elevation reduz 1 nível (3→2)
- [ ] Headers sticky: elevation 1 apenas quando scrolled
- [ ] shadowColor #000 em todos
- [ ] Comentários `/* elevation 2 */` documentando

**Screenshots Necessários**:
- Before/After: EventCard, Button Primary, Modal CreateEvent, Toast, Header scrolled

---

### Task 4 - Icons Standardization (#28)
**Status**: ⏳ **Pendente**
**Branch**: `task/4-icons-standardization`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#28](../VISUAL_UX_IMPROVEMENTS.md#28)
**Estimativa**: 1 dia

**Objetivo**: Padronizar tamanhos e cores de ícones baseado em contexto.

**Componentes Afetados**:
- Ionicons em todos os componentes
- Buttons, Inputs, Tabs, EmptyStates, Cards

**Critérios de Aceitação**:
- [ ] xs (16px): inline no texto, badges
- [ ] sm (20px): inputs, tabs inativos
- [ ] md (24px): **PADRÃO** - botões, tabs ativos, headers
- [ ] lg (32px): empty states mini, chips de categoria
- [ ] xl (48px): empty states, ícones de esporte em grid
- [ ] xxl (64px): ilustrações empty states hero
- [ ] Cores: brand.primary (interativos), neutral.light (em botões), neutral.medium (inativos)
- [ ] Ícones em botões: 4px menores que altura (lg 56px → 24px)
- [ ] Accessibility labels em ícones standalone

**Screenshots Necessários**:
- Before/After: EmptyStateHome, EventCard, CreateEventGrid, Tabs, Inputs

---

### Task 5 - Button States (#30)
**Status**: ⏳ **Pendente**
**Branch**: `task/5-button-states`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#30](../VISUAL_UX_IMPROVEMENTS.md#30)
**Estimativa**: 1 dia

**Objetivo**: Padronizar estados visuais (pressed, disabled, loading) em todos botões.

**Componentes Afetados**:
- Button component (primary, secondary, ghost, fab)
- Todos os usos de Button na aplicação

**Critérios de Aceitação**:
- [ ] Pressed: opacity 0.8 + scale(0.98) 100ms + haptic light
- [ ] Disabled: opacity 0.5 + elevation 0 + cursor not-allowed
- [ ] Loading: spinner substituindo leftIcon + texto gerúndio + disabled + height fixa
- [ ] Ripple animation: círculo expanding opacity 0.3→0 em 400ms
- [ ] Border radius: 8px (sm/md), 12px (lg/xl)
- [ ] Contraste WCAG AA (4.5:1 text/background)
- [ ] Consistente em todas variants

**Screenshots Necessários**:
- Before/After: Button Primary (normal, pressed, disabled, loading), Button Secondary

---

## 📋 FASE 2 - Components Core (5 Tasks, 5 Dias)

### Task 6 - Toasts System (#23)
**Status**: ⏳ **Pendente**
**Branch**: `task/6-toasts-system`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#23](../VISUAL_UX_IMPROVEMENTS.md#23)
**Estimativa**: 1 dia

**Objetivo**: Sistema unificado de toasts não-bloqueantes substituindo alerts.

**Componentes Afetados**:
- Novo componente Toast
- Substituir Alert.alert() em toda aplicação

**Critérios de Aceitação**:
- [ ] Success: verde, checkmark, "Evento criado!"
- [ ] Error: vermelho, X, "Erro ao criar evento"
- [ ] Info: laranja, i, "Evento em 1 hora!"
- [ ] Posição: 80px do topo, max-width 90%
- [ ] Auto-dismiss 3s com progress bar
- [ ] Swipe up para dismiss manual (threshold 50px)
- [ ] Queue de até 3 toasts
- [ ] Shadow elevation 8
- [ ] Botão action opcional "Desfazer"/"Ver Detalhes"

**Screenshots Necessários**:
- After: Toast Success, Toast Error, Toast Info (com action), Queue de 3 toasts

---

### Task 7 - Loading States (#24)
**Status**: ⏳ **Pendente**
**Branch**: `task/7-loading-states`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#24](../VISUAL_UX_IMPROVEMENTS.md#24)
**Estimativa**: 1 dia

**Objetivo**: Padrão de loading baseado em tempo esperado (inline vs overlay).

**Componentes Afetados**:
- Ações rápidas: AddFriend, LikeEvent, JoinEvent
- Ações médias: CreateEvent, UploadPhoto
- Ações longas: ProcessPayment, SyncData

**Critérios de Aceitação**:
- [ ] < 2s: loading inline no botão (sem bloquear tela)
- [ ] 2-5s: inline + backdrop translúcido (rgba(27,29,41,0.8))
- [ ] > 5s: overlay full-screen + SportsLoading + progress bar
- [ ] Timeout 10s: toast "Demorando mais que normal" + botão Cancelar
- [ ] Spinner cor consistente: brand.primary
- [ ] Skeleton screens para listas (Task 8)

**Screenshots Necessários**:
- Before/After: AddFriend loading, CreateEvent loading, Overlay full-screen

---

### Task 8 - Skeleton Screens (#3)
**Status**: ⏳ **Pendente**
**Branch**: `task/8-skeleton-screens`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#3](../VISUAL_UX_IMPROVEMENTS.md#3)
**Estimativa**: 1 dia

**Objetivo**: Skeleton screens ao invés de SportsLoading em listas.

**Componentes Afetados**:
- HomeScreen (lista de eventos)
- FriendsScreen (lista de amigos/recomendações)
- ProfileScreen (histórico de eventos)

**Critérios de Aceitação**:
- [ ] Componente SkeletonEventCard: 320x180 imagem + linhas texto (80%, 60%, 40%)
- [ ] Shimmer effect: gradiente neutral.dark → neutral.medium
- [ ] Animação: shimmer left-to-right loop infinito 1.5s
- [ ] Padding e spacing idênticos aos cards reais (16px, 8px vertical)
- [ ] 3-4 placeholders visíveis
- [ ] Elimina layout shift ao carregar dados reais

**Screenshots Necessários**:
- Before (SportsLoading), After (Skeleton): Home loading, Friends loading

---

### Task 9 - Forms Consistency (#25)
**Status**: ⏳ **Pendente**
**Branch**: `task/9-forms-consistency`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#25](../VISUAL_UX_IMPROVEMENTS.md#25)
**Estimativa**: 1 dia

**Objetivo**: Padronizar inputs e labels em todos formulários.

**Componentes Afetados**:
- RegisterScreen, CreateEvent (4 steps), EditProfile

**Critérios de Aceitação**:
- [ ] Label acima (nunca floating) em labelPrimary (15px medium light)
- [ ] Helper text em captionSecondary (13px medium)
- [ ] Error text em errorPrimary (13px semantic.error)
- [ ] Spacing: 4px label↔input, 4px input↔helper, 16px entre campos
- [ ] Input: height 48px, padding 16px, border radius 8px
- [ ] Background neutral.darkest, border 1px dark → 2px primary (focus)
- [ ] Ícones contextuais à esquerda (20px), ações à direita
- [ ] Transition 200ms easeOut em mudanças de estado

**Screenshots Necessários**:
- Before/After: RegisterScreen, CreateEvent Step 1, EditProfile

---

### Task 10 - Transitions (#22)
**Status**: ⏳ **Pendente**
**Branch**: `task/10-transitions`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#22](../VISUAL_UX_IMPROVEMENTS.md#22)
**Estimativa**: 1 dia

**Objetivo**: Transições customizadas consistentes entre telas.

**Componentes Afetados**:
- React Navigation (Stack, Tabs)
- Todas as navegações da app

**Critérios de Aceitação**:
- [ ] Tabs principais: fade 250ms (Home, Friends, Calendar, Groups, Profile)
- [ ] Detalhes: slide from right + parallax -20px
- [ ] Modals: slide from bottom + backdrop fade
- [ ] Spring animation ao fechar modals (pull down)
- [ ] Timing consistente: 250ms easeOut
- [ ] Gesture swipe back (iOS/Android) com preview

**Screenshots Necessários**:
- Video/GIF: Navegação entre tabs, Modal CreateEvent, Swipe back

---

## 📋 FASE 3 - Home Screen (5 Tasks, 5 Dias)

### Task 11 - Empty State Home (#1)
**Status**: ⏳ **Pendente**
**Branch**: `task/11-empty-state-home`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#1](../VISUAL_UX_IMPROVEMENTS.md#1)
**Estimativa**: 1 dia

**Objetivo**: Empty state com hierarquia clara, ícone, mensagem acionável e CTAs.

**Componentes Afetados**:
- HomeScreen (empty state)

**Critérios de Aceitação**:
- [ ] Título: "Nenhum evento por aqui ainda" (sentence case, titlePrimary)
- [ ] Ícone troféu cinza suave (64px) centralizado acima
- [ ] Mensagem: "Seja o primeiro! Crie um evento..." (bodySecondary)
- [ ] Botão primário: "Criar Primeiro Evento" (lg 56px, laranja)
- [ ] Botão secundário ghost: "Ajustar Filtros"
- [ ] Social proof: "10.234 eventos criados esta semana no Brasil" (captionSecondary)
- [ ] Spacing: 24px entre grupos (ícone, texto, botões, social proof)
- [ ] Hierarquia: 22px → 15px → 13px

**Screenshots Necessários**:
- Before/After: HomeScreen empty

---

### Task 12 - Event Cards (#2)
**Status**: ⏳ **Pendente**
**Branch**: `task/12-event-cards`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#2](../VISUAL_UX_IMPROVEMENTS.md#2)
**Estimativa**: 1 dia

**Objetivo**: Hierarquia tipográfica clara, spacing, divider, shadow, pressed state.

**Componentes Afetados**:
- EventCard component
- HomeScreen, EventsListScreen

**Critérios de Aceitação**:
- [ ] Título: titlePrimary (19px bold)
- [ ] Data/hora: bodyPrimary (15px medium) + ícone calendário laranja
- [ ] Localização: bodySecondary (15px regular) + ícone pin laranja
- [ ] Participantes: captionPrimary (13px) + ícone pessoas
- [ ] Spacing vertical: 8px entre linhas
- [ ] Divider: 1px neutral.dark 10% opacity (imagem ↔ info)
- [ ] Padding interno: 16px (antes 12px)
- [ ] Background: neutral.darkest, border radius 12px, elevation 2
- [ ] Pressed: scale(0.98) + opacity 0.9

**Screenshots Necessários**:
- Before/After: EventCard (normal), EventCard (pressed)

---

### Task 13 - Pull-to-Refresh (#4)
**Status**: ⏳ **Pendente**
**Branch**: `task/13-pull-to-refresh`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#4](../VISUAL_UX_IMPROVEMENTS.md#4)
**Estimativa**: 1 dia

**Objetivo**: Animação customizada de pull-to-refresh com feedback claro.

**Componentes Afetados**:
- HomeScreen (FlatList)
- EventsListScreen

**Critérios de Aceitação**:
- [ ] Ícone refresh laranja: 0→32px conforme puxa
- [ ] Rotação: 0→180deg proporcional ao deslocamento
- [ ] Texto: "Puxe para atualizar" → "Solte para atualizar" (threshold 80px)
- [ ] Haptic feedback light ao atingir threshold
- [ ] Ao soltar: ícone vira spinner mini (24px) com ícones esporte
- [ ] Confirmação: "Atualizado agora" (fade in/out 1.5s)
- [ ] Usa react-native-reanimated

**Screenshots Necessários**:
- Video/GIF: Pull-to-refresh (pulling, threshold, loading, success)

---

### Task 14 - Header Home (#5)
**Status**: ⏳ **Pendente**
**Branch**: `task/14-header-home`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#5](../VISUAL_UX_IMPROVEMENTS.md#5)
**Estimativa**: 1 dia

**Objetivo**: Hierarquia, espaçamento, badge de notificações, hiding pattern.

**Componentes Afetados**:
- HomeScreen header

**Critérios de Aceitação**:
- [ ] Logo: md (36px) ao invés de lg (48px)
- [ ] Padding horizontal: 16px (alinhado com cards)
- [ ] Área de toque ícones: 44px (ícone 24px + padding 10px)
- [ ] Badge numérico vermelho (16px) em notificações quando > 0
- [ ] Background: neutral.darkest + shadow elevation 1
- [ ] Hiding pattern: 64px → 56px ao scrollar down, volta a 64px ao up
- [ ] Animação suave (animated value)

**Screenshots Necessários**:
- Before/After: Header normal, Header com badge, Header hidden (scrolled)

---

### Task 15 - Integration Home
**Status**: ⏳ **Pendente**
**Branch**: `task/15-integration-home`
**Estimativa**: 0.5 dia

**Objetivo**: Integrar Tasks 11-14 e validar HomeScreen completa.

**Critérios de Aceitação**:
- [ ] Empty state funcionando
- [ ] Event cards com nova hierarquia
- [ ] Pull-to-refresh animado
- [ ] Header com hiding pattern
- [ ] Screenshots comparativos completos
- [ ] Testes Playwright passando

**Screenshots Necessários**:
- Before/After: HomeScreen completa (empty, com eventos, scrolled)

---

## 📋 FASE 4 - Friends Screen (4 Tasks, 4 Dias)

### Task 16 - Accordions Estado Inteligente (#6)
**Status**: ⏳ **Pendente**
**Branch**: `task/16-accordions-smart-state`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#6](../VISUAL_UX_IMPROVEMENTS.md#6)
**Estimativa**: 1 dia

**Componentes Afetados**: FriendsScreen accordions
**Screenshots Necessários**: Before/After FriendsScreen accordions

---

### Task 17 - Friend Cards Social Proof (#7)
**Status**: ⏳ **Pendente**
**Branch**: `task/17-friend-cards`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#7](../VISUAL_UX_IMPROVEMENTS.md#7)
**Estimativa**: 1 dia

**Componentes Afetados**: FriendCard component
**Screenshots Necessários**: Before/After FriendCard

---

### Task 18 - Empty States Accordions (#8)
**Status**: ⏳ **Pendente**
**Branch**: `task/18-empty-accordions`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#8](../VISUAL_UX_IMPROVEMENTS.md#8)
**Estimativa**: 1 dia

**Componentes Afetados**: FriendsScreen empty states
**Screenshots Necessários**: Before/After Accordions empty

---

### Task 19 - Search Bar States (#9)
**Status**: ⏳ **Pendente**
**Branch**: `task/19-search-bar`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#9](../VISUAL_UX_IMPROVEMENTS.md#9)
**Estimativa**: 1 dia

**Componentes Afetados**: FriendsScreen search bar
**Screenshots Necessários**: Before/After Search (normal, focused, with results)

---

## 📋 FASE 5 - Create Event (5 Tasks, 5 Dias)

### Task 20 - Form Steps Progress (#10)
**Status**: ⏳ **Pendente**
**Branch**: `task/20-form-steps-progress`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#10](../VISUAL_UX_IMPROVEMENTS.md#10)
**Estimativa**: 1 dia

**Componentes Afetados**: CreateEventScreen stepper
**Screenshots Necessários**: Before/After Stepper (steps 1, 2, 3, 4)

---

### Task 21 - Input Validation Real-Time (#11)
**Status**: ⏳ **Pendente**
**Branch**: `task/21-input-validation`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#11](../VISUAL_UX_IMPROVEMENTS.md#11)
**Estimativa**: 1 dia

**Componentes Afetados**: CreateEventScreen inputs
**Screenshots Necessários**: Before/After Input (error, success, char counter)

---

### Task 22 - Grid Esportes Hierarquia (#12)
**Status**: ⏳ **Pendente**
**Branch**: `task/22-grid-esportes`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#12](../VISUAL_UX_IMPROVEMENTS.md#12)
**Estimativa**: 1 dia

**Componentes Afetados**: CreateEventScreen sports grid
**Screenshots Necessários**: Before/After Grid (collapsed, expanded)

---

### Task 23 - Date/Time Pickers Contexto (#13)
**Status**: ⏳ **Pendente**
**Branch**: `task/23-date-time-pickers`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#13](../VISUAL_UX_IMPROVEMENTS.md#13)
**Estimativa**: 1 dia

**Componentes Afetados**: CreateEventScreen date/time inputs
**Screenshots Necessários**: Before/After DatePicker (quick select, selected)

---

### Task 24 - Preview Button Feedback (#14)
**Status**: ⏳ **Pendente**
**Branch**: `task/24-preview-button`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#14](../VISUAL_UX_IMPROVEMENTS.md#14)
**Estimativa**: 1 dia

**Componentes Afetados**: CreateEventScreen final step, PreviewModal
**Screenshots Necessários**: Before/After Preview modal, Success animation

---

## 📋 FASE 6 - Event Details (4 Tasks, 4 Dias)

### Task 25 - Hero Section Hierarquia (#15)
**Status**: ⏳ **Pendente**
**Branch**: `task/25-hero-section`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#15](../VISUAL_UX_IMPROVEMENTS.md#15)
**Estimativa**: 1 dia

**Componentes Afetados**: EventDetailsScreen hero
**Screenshots Necessários**: Before/After Hero section

---

### Task 26 - Participants Avatars (#16)
**Status**: ⏳ **Pendente**
**Branch**: `task/26-participants-avatars`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#16](../VISUAL_UX_IMPROVEMENTS.md#16)
**Estimativa**: 1 dia

**Componentes Afetados**: EventDetailsScreen participants section
**Screenshots Necessários**: Before/After Participants (row, modal)

---

### Task 27 - Description Expandable (#17)
**Status**: ⏳ **Pendente**
**Branch**: `task/27-description-expandable`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#17](../VISUAL_UX_IMPROVEMENTS.md#17)
**Estimativa**: 1 dia

**Componentes Afetados**: EventDetailsScreen description
**Screenshots Necessários**: Before/After Description (collapsed, expanded)

---

### Task 28 - Action Buttons Estados (#18)
**Status**: ⏳ **Pendente**
**Branch**: `task/28-action-buttons`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#18](../VISUAL_UX_IMPROVEMENTS.md#18)
**Estimativa**: 1 dia

**Componentes Afetados**: EventDetailsScreen join button
**Screenshots Necessários**: Before/After Button (normal, loading, success, error)

---

## 📋 FASE 7 - Profile (2 Tasks, 2 Dias)

### Task 29 - Profile Header Hierarquia (#19)
**Status**: ⏳ **Pendente**
**Branch**: `task/29-profile-header`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#19](../VISUAL_UX_IMPROVEMENTS.md#19)
**Estimativa**: 1 dia

**Componentes Afetados**: ProfileScreen header
**Screenshots Necessários**: Before/After Profile header

---

### Task 30 - Event History Tabs (#20)
**Status**: ⏳ **Pendente**
**Branch**: `task/30-event-history-tabs`
**Issue**: [VISUAL_UX_IMPROVEMENTS.md#20](../VISUAL_UX_IMPROVEMENTS.md#20)
**Estimativa**: 1 dia

**Componentes Afetados**: ProfileScreen event history
**Screenshots Necessários**: Before/After Tabs (Próximos, Passados, Organizados)

---

## 🔄 Workflow de Cada Task

### 1. Pre-Implementação (30min - 1h)

```bash
# Iniciar task
./scripts/start-task.sh {NUMBER} "{NAME}"

# Editar documento de estudo
open docs/ux-analysis/tasks/task-{NUMBER}-study.md
```

**Checklist**:
- [ ] Re-estudar princípios UX/UI (Jakob's, Fitts's, Hick's, Gestalt)
- [ ] Analisar screenshots existentes
- [ ] Identificar problemas visuais
- [ ] Scoring PRÉ-implementação (0-10 em 5 critérios)
- [ ] Planejar implementação (componentes, tokens, estimativa)

---

### 2. Implementação (3-6h)

**Regras OBRIGATÓRIAS** (CLAUDE.md):
- ✅ TypeScript strict, sem `any`
- ✅ Componentes < 150 linhas
- ✅ Text SEMPRE com `variant` (nunca fontSize/fontWeight em styles)
- ✅ SEMPRE usar tokens Arena (ArenaColors, ArenaSpacing, ArenaTypography)
- ✅ FlatList/ScrollView com `paddingHorizontal: ArenaSpacing.lg`
- ✅ Ícones via `@expo/vector-icons` (nunca emojis)
- ✅ Keyboard handling com `ArenaKeyboardAwareScrollView`

**Implementar**:
- [ ] Modificar componentes afetados
- [ ] Adicionar testes (se aplicável)
- [ ] Validar lint/prettier: `npm run lint`
- [ ] Testar em Expo Web (port 8081)

---

### 3. Testing & Screenshots (1-2h)

**Playwright Testing**:
```bash
# Garantir Expo rodando
npx expo start --web --port 8081

# Criar spec de screenshot (se não existir)
cp scripts/templates/playwright-screenshot-template.spec.ts \
   scripts/screenshots/task-{NUMBER}-screenshots.spec.ts

# Editar spec para capturar telas afetadas

# Executar
npx playwright test scripts/screenshots/task-{NUMBER}-screenshots.spec.ts
```

**User de Teste**:
- Username: `uxtest2325`
- Email: `uxtest2325@arena.test`
- Password: `TestArena@2325`

---

### 4. Finalização (30min)

```bash
# Capturar screenshots e gerar comparações
./scripts/finish-task.sh {NUMBER}
```

**Checklist**:
- [ ] Screenshots capturados (task-{N}-after-*.png)
- [ ] Comparações geradas (task-{N}-comparison-*.png)
- [ ] Scoring PÓS-implementação completo
- [ ] Calcular melhoria (+X pontos)
- [ ] Documento de estudo completo

---

### 5. Pull Request

```bash
# Commit
git add .
git commit -m "feat(ui): implement task {N} - {NAME}

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push e criar PR
git push origin task/{N}-{SLUG}
gh pr create --base feature/new-ui-design \
  --title "Task {N}: {NAME}" \
  --body "## Screenshots Comparativos

Veja comparações em \`docs/ux-analysis/comparisons/task-{N}-*.png\`

## Scoring Visual

| Critério | Antes | Depois | Melhoria |
|----------|-------|--------|----------|
| Hierarquia | X | Y | +Z |
| Espaçamento | X | Y | +Z |
| Feedback | X | Y | +Z |
| Consistência | X | Y | +Z |
| Affordance | X | Y | +Z |
| **MÉDIA** | **X** | **Y** | **+Z** |

## Checklist

- [x] Testes Playwright passando
- [x] Screenshots capturados
- [x] Comparações geradas
- [x] Scoring completo
- [ ] Revisão aprovada
- [ ] Merged em feature/new-ui-design"
```

---

### 6. Merge & Próxima Task

```bash
# Após aprovação
gh pr merge --squash

# Voltar para feature branch
git checkout feature/new-ui-design
git pull origin feature/new-ui-design

# Próxima task
./scripts/start-task.sh {NEXT_N} "{NEXT_NAME}"
```

---

## 📊 Métricas de Sucesso

### Por Task

- **Tempo médio**: 4-6 horas (meta: < 8h)
- **Scoring melhoria**: +2.0 pontos mínimo
- **Screenshots**: Todas telas afetadas (antes/depois)
- **Testes**: 100% passando

### Geral (30 Tasks)

- **Duração total**: ~27 dias úteis (meta: < 30 dias)
- **Scoring médio inicial**: ~5.5/10
- **Scoring médio final**: ~8.5/10 (meta: +3.0 pontos)
- **Consistência visual**: 95%+ (spacing, tipografia, elevations)

---

## 🎯 Próximos Passos

**Agora (Task 1)**:
```bash
./scripts/start-task.sh 1 "Spacing System"
```

**Após Fase 7 (Task 30)**:
1. ✅ Todas 30 tasks completas
2. ✅ Regression testing completo
3. ✅ Documentação atualizada
4. ✅ Merge `feature/new-ui-design` → `main`
5. ✅ Deploy para produção
6. 📊 Monitorar métricas (conversão, retenção, engagement)

---

**Última Atualização**: 2025-11-23
**Responsável**: Claude Code + UX Team
**Status**: 🚀 **Ready to Start Task 1**
