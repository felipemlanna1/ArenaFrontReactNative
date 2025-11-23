# Arena Mobile - Implementation Roadmap (6 Sprints)

**Data**: 2025-11-23
**Duração Total**: 12 semanas (3 meses)
**Baseado em**: ISSUES_PRIORITIZED_RICE.md (127 issues, RICE scoring)
**Team Size**: 2-3 developers + 1 designer + 1 PM

---

## 📊 Overview do Roadmap

### Timeline Geral

```
┌─────────────────────────────────────────────────────────────────────┐
│ Sprint 1   │ Sprint 2   │ Sprint 3   │ Sprint 4   │ Sprint 5   │ S6 │
│ Quick Wins │ Create Event│ Discovery │ Social     │ Gamification│Polish│
│ Week 1-2   │ Week 3-4   │ Week 5-6   │ Week 7-8   │ Week 9-10  │11-12│
│                                                                       │
│ P0 Issues  │ Event Flow │ Filters    │ Friends    │ Achievements│Perf│
│ (18 issues)│ (15 issues)│ (17 issues)│ (19 issues)│ (16 issues) │(7) │
│                                                                       │
│ RICE: 1,235│ RICE: 650  │ RICE: 720  │ RICE: 380  │ RICE: 220  │210│
└─────────────────────────────────────────────────────────────────────┘
```

### Métricas de Sucesso (6 Meses)

| Métrica | Baseline | Target | Sprint Responsável |
|---------|----------|--------|--------------------|
| **Signup Conversion** | 60% | 85% (+42%) | Sprint 1 |
| **Onboarding Completion** | 60% | 82% (+37%) | Sprint 1 |
| **Create Event Completion** | 50% | 85% (+70%) | Sprint 2 |
| **Event Discovery (filtros)** | 20% | 55% (+175%) | Sprint 3 |
| **Social Connections (avg)** | 2 amigos | 10 amigos (+400%) | Sprint 4 |
| **D7 Retention** | 30% | 55% (+83%) | Sprint 1 + 5 |
| **D30 Retention** | 15% | 35% (+133%) | Sprint 5 |
| **Monthly Engagement** | 8 sessions | 25 sessions (+212%) | Sprint 5 |
| **List Scroll Performance** | 40 FPS | 60 FPS (+50%) | Sprint 6 |

---

## 🚀 SPRINT 1: Quick Wins P0 (Weeks 1-2)

### 🎯 Sprint Goal

**Reduzir drop-offs críticos no onboarding e primeiras experiências**

**Objetivo Mensurável**: Signup conversion 60% → 85% (+42%), D7 retention 30% → 45% (+50%)

---

### 📋 Issues a Implementar (Total: 11 issues, 14.5 dias)

| # | Issue | RICE | Esforço | Dev Owner |
|---|-------|------|---------|-----------|
| **1** | Multi-step Registration (8 campos → 3 steps) | 950 | 3d | Dev 1 |
| **2** | Progressive Sports Disclosure (17 → 6+11) | 1,800 | 1d | Dev 2 |
| **3** | Friends: Expandir Recomendações (defaultExpanded) | 2,720 | 0.5d | Dev 2 |
| **4** | Empty Home: CTA + Social Proof | 1,350 | 2d | Dev 1 |
| **5** | Empty Friends: CTA | 1,360 | 1d | Dev 2 |
| **6** | Empty Calendar: CTA | 1,120 | 1d | Dev 1 |
| **7** | Empty Groups: CTA | 960 | 1d | Dev 2 |
| **10** | Social Login (Google, Apple, Facebook) | 950 | 5d | **Dev 3 (novo)** |
| **11** | Aumentar Botões xs/sm para 44px (WCAG) | 1,000 | 1d | Dev 1 |
| **12** | Mover "Sair" para Sidebar | 900 | 1d | Dev 2 |
| **13** | Event Card: Mostrar Distância | 800 | 0.5d | Dev 1 |

**RICE Médio**: 1,265 (🔥 Ultra Priority)

---

### 👥 Team Composition

- **Dev 1 (Full-Stack Senior)**: Registration flow, empty states, buttons
- **Dev 2 (Mobile Specialist)**: Sports selection, Friends, sidebar
- **Dev 3 (Auth Specialist)**: Social login (Google, Apple, Facebook)
- **Designer**: Empty state illustrations, social proof mockups
- **PM/QA**: User testing, A/B test setup

---

### 📦 Deliverables

#### 1.1 Multi-Step Registration (#1)

**Antes** (8 campos em 1 tela):
```
┌────────────────────────────────┐
│ Nome completo                  │
│ Nome de usuário                │
│ Email                          │
│ Senha                          │
│ Confirmar senha                │
│ Estado                         │
│ Cidade                         │
│ Data de nascimento             │
│ [Criar Conta]                  │
└────────────────────────────────┘
```

**Depois** (3 steps de 2-3 campos):
```
Step 1 (30s):                     Step 2 (20s):                Step 3 (15s):
┌────────────────────────┐        ┌─────────────────────┐      ┌─────────────────────┐
│ Crie sua conta         │        │ Sobre você          │      │ Onde você joga?     │
│                        │        │                     │      │                     │
│ Email *                │        │ Nome completo *     │      │ Estado *            │
│ [___________________]  │        │ [_________________] │      │ [São Paulo ▼]       │
│                        │        │                     │      │                     │
│ Senha *                │        │ Nome de usuário *   │      │ Cidade *            │
│ [___________________]  │        │ [_________________] │      │ [São Paulo ▼]       │
│                        │        │                     │      │                     │
│ [Continuar] (33%)      │        │ [Continuar] (66%)   │      │ [Finalizar] (100%)  │
└────────────────────────┘        └─────────────────────┘      └─────────────────────┘
```

**Acceptance Criteria**:
- [ ] 3 steps com progress bar (33%, 66%, 100%)
- [ ] Validação em tempo real (todos os campos)
- [ ] Back navigation preserva dados preenchidos
- [ ] Step 1: 2 campos (Email, Senha)
- [ ] Step 2: 2 campos (Nome completo, Username)
- [ ] Step 3: 2 campos (Estado, Cidade)
- [ ] Data de nascimento removido (mover para perfil opcional)
- [ ] Tempo de conclusão: < 90s (vs 180s atual)
- [ ] A/B test: Signup completion 60% → 85%

---

#### 1.2 Progressive Sports Disclosure (#2)

**Antes** (17 esportes de uma vez):
```
┌────────────────────────────────┐
│ Selecione seus esportes        │
│                                │
│ [⚽] [🏀] [🎾]                  │
│ [🏐] [🏊] [🏃]                  │
│ [⚾] [🏈] [🥊]                  │
│ [🎱] [🏒] [🏓]                  │
│ [🎿] [🏸] [🛹]                  │
│ [🏇] [🤸]                       │
│                                │
│ [Continuar]                    │
└────────────────────────────────┘
```

**Depois** (6 principais + "Ver Mais"):
```
┌────────────────────────────────┐
│ O que você pratica?            │
│                                │
│ Esportes populares em SP:      │
│                                │
│ [✓ ⚽ Futebol]    [🏀 Basquete] │ <- Futebol pré-selecionado
│ [🎾 Tênis]       [🏐 Vôlei]    │
│ [🏊 Natação]     [🏃 Corrida]  │
│                                │
│ [+ Ver Mais (11)]              │ <- Progressive disclosure
│                                │
│ [Pular] [Continuar]            │
└────────────────────────────────┘

(Ao clicar "Ver Mais"):
┌────────────────────────────────┐
│ Outros esportes                │
│                                │
│ [⚾ Beisebol]    [🏈 Futebol Am]│
│ [🥊 Boxe]       [🎱 Sinuca]    │
│ [🏒 Hóquei]     [🏓 Tênis Mesa]│
│ ... (mais 5)                   │
│                                │
│ [Voltar]                       │
└────────────────────────────────┘
```

**Acceptance Criteria**:
- [ ] 6 esportes populares sempre visíveis
- [ ] Futebol pré-selecionado (São Paulo context)
- [ ] "Ver Mais" expande modal com 11 adicionais
- [ ] Botão "Pular" permite continuar sem selecionar
- [ ] Tempo de decisão: < 20s (vs 45s atual)
- [ ] A/B test: Onboarding completion +18%

---

#### 1.3 Empty States com CTA (#4-7)

**Template Único para 4 Telas** (Home, Friends, Calendar, Groups):

```typescript
// EmptyState Component (Reusável)
interface EmptyStateProps {
  icon: IconName;
  title: string;
  subtitle: string;
  primaryAction: {
    label: string;
    onPress: () => void;
  };
  secondaryAction?: {
    label: string;
    onPress: () => void;
  };
  socialProof?: string;
}

// Exemplo: Home Screen
<EmptyState
  icon="trophy"
  title="Nenhum evento por aqui ainda"
  subtitle="Seja o primeiro! Crie um evento para reunir atletas da sua região"
  primaryAction={{
    label: "Criar Primeiro Evento",
    onPress: () => navigation.navigate('CreateEvent'),
  }}
  secondaryAction={{
    label: "Ajustar Filtros",
    onPress: () => setFilterModalVisible(true),
  }}
  socialProof="10.234 eventos criados esta semana no Brasil"
/>
```

**Acceptance Criteria (para cada tela)**:
- [ ] Ícone ilustrativo (Ionicons, 64px)
- [ ] Título amigável (não all caps)
- [ ] Subtítulo acionável com orientação
- [ ] CTA primário (Button variant="primary", size="lg")
- [ ] CTA secundário opcional
- [ ] Social proof quando aplicável
- [ ] A/B test: Retention +25% combinado

---

#### 1.4 Social Login (#10)

**Providers Suportados**:
1. ✅ **Google** (Android + iOS + Web)
2. ✅ **Apple** (iOS obrigatório, Android/Web opcional)
3. ✅ **Facebook** (cross-platform)

**Implementação**:
```tsx
<OnboardingStep1_SocialLogin>
  <Logo variant="full" size="lg" />

  <Text variant="headingPrimary">Bem-vindo ao Arena</Text>
  <Text variant="bodySecondary">
    Conecte-se e encontre eventos esportivos perto de você
  </Text>

  <SocialLoginButtons>
    <Button
      variant="social"
      provider="google"
      onPress={handleGoogleLogin}
      leftIcon="logo-google"
    >
      Continuar com Google
    </Button>

    <Button
      variant="social"
      provider="apple"
      onPress={handleAppleLogin}
      leftIcon="logo-apple"
    >
      Continuar com Apple
    </Button>

    <Button
      variant="social"
      provider="facebook"
      onPress={handleFacebookLogin}
      leftIcon="logo-facebook"
    >
      Continuar com Facebook
    </Button>
  </SocialLoginButtons>

  <Divider text="ou" />

  <Button
    variant="ghost"
    onPress={() => navigation.navigate('EmailRegister')}
  >
    Criar com Email
  </Button>
</OnboardingStep1_SocialLogin>
```

**Acceptance Criteria**:
- [ ] Google OAuth 2.0 implementado (react-native-google-signin)
- [ ] Apple Sign In (iOS obrigatório per Apple HIG)
- [ ] Facebook Login SDK
- [ ] Auto-populate nome, email, foto de perfil
- [ ] Skip Step 1 do multi-step (apenas pedir Estado/Cidade)
- [ ] A/B test: Signup conversion +67% (benchmark: Eventbrite)
- [ ] Error handling: network failures, user cancelation

---

### 🔗 Dependencies

| Issue | Depende De | Blocker? |
|-------|-----------|----------|
| #1 (Multi-step) | - | Não |
| #2 (Sports) | - | Não |
| #10 (Social Login) | #1 (Multi-step) | Sim (Skip Step 1) |
| #4-7 (Empty States) | EmptyState component design | Não (paralelo) |
| #11 (Buttons 44px) | - | Não |
| #12 (Sidebar) | - | Não |

**Critical Path**: #1 → #10 (Social Login depende de Multi-step estar pronto)

---

### 📊 Success Metrics

**Tracking** (Google Analytics + Mixpanel):

```javascript
// Sprint 1 KPIs
analytics.track('onboarding_started', {sprint: 1});
analytics.track('onboarding_step_completed', {step: 1, time: seconds});
analytics.track('onboarding_completed', {method: 'email|google|apple|facebook'});
analytics.track('empty_state_viewed', {screen: 'home|friends|calendar|groups'});
analytics.track('empty_state_cta_clicked', {screen, action: 'primary|secondary'});
```

**Success Criteria**:
- ✅ Signup conversion: 60% → **85%** (+42%)
- ✅ Onboarding time: 180s → **90s** (-50%)
- ✅ Empty state CTA clicks: 0% → **35%**
- ✅ D7 retention: 30% → **45%** (+50%)
- ✅ Social login adoption: 0% → **60%**

---

### ⚠️ Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| **Apple Sign In rejection** | Média | Alto | Implementar Google primeiro, Apple depois |
| **Multi-step: Dados perdidos** | Baixa | Alto | LocalStorage backup a cada step |
| **Social Login: Email conflicts** | Média | Médio | Merge accounts flow |
| **Empty State: Design delays** | Média | Baixo | Usar placeholders text-only |
| **WCAG buttons: Regression bugs** | Baixa | Médio | Comprehensive regression suite |

---

### ✅ Definition of Done

- [ ] Code reviewed (2 approvals)
- [ ] Unit tests: 80%+ coverage
- [ ] E2E tests: Onboarding happy path
- [ ] A/B tests configurados (Firebase Remote Config)
- [ ] Analytics events implementados
- [ ] Designer approval (visual QA)
- [ ] PM approval (acceptance criteria)
- [ ] Deployed to staging
- [ ] 50% rollout to production (canary)
- [ ] Metrics dashboard atualizado
- [ ] Documentation: README updates

---

## 🎨 SPRINT 2: Create Event Flow (Weeks 3-4)

### 🎯 Sprint Goal

**Aumentar eventos criados eliminando fricção no formulário**

**Objetivo Mensurável**: Create Event completion 50% → 85% (+70%), eventos/user 1.2 → 2.5 (+108%)

---

### 📋 Issues a Implementar (Total: 15 issues, 18 dias)

| # | Issue | RICE | Esforço | Dev Owner |
|---|-------|------|---------|-----------|
| **8** | Smart Defaults (esporte, local, vagas) | 2,250 | 2d | Dev 1 |
| **9** | 4 steps → 2 steps | 850 | 3d | Dev 1 |
| **48** | Default Vagas por Esporte (Futebol=10) | 675 | 1d | Dev 2 |
| **49** | Default Data/Hora (Sáb/Dom 18h) | 540 | 1d | Dev 2 |
| **50** | "Usar Minha Localização" | 720 | 2d | Dev 2 |
| **51** | Quadras Favoritas (salvar locais) | 300 | 3d | Dev 3 |
| **53** | Preview antes de publicar | 425 | 2d | Dev 1 |
| **61** | Cancelar Evento: Confirmação + notif | 450 | 1d | Dev 3 |
| **64** | Salvar Rascunho (AsyncStorage) | 540 | 3d | Dev 2 |
| **66** | Grid 17 Esportes → Cards Maiores | 360 | 2d | Dev 1 |

**Issues Secundários**:
| **52** | Templates Recorrentes | 240 | 5d | Future sprint |
| **54** | IA: Gerar Descrição | 200 | 10d | Future sprint |
| **59** | WhatsApp Convite | 400 | 3d | Dev 3 |
| **62** | Duplicar Evento | 180 | 1d | Dev 2 |
| **65** | Validação em Tempo Real | 300 | 2d | Dev 1 |

**RICE Médio**: 650

---

### 📦 Deliverables

#### 2.1 Smart Defaults (#8)

**Lógica de Pre-Fill Inteligente**:

```typescript
// useCreateEventSmartDefaults.ts
export const useCreateEventSmartDefaults = () => {
  const { user } = useAuth();
  const { recentEvents } = useUserEvents();

  return {
    sport: user.favoriteSport || 'Futebol',  // Do onboarding ou popular
    location: user.city || geolocate(),       // Do perfil ou IP
    date: getNextWeekendEvening(),           // Sáb/Dom 18h
    time: '18:00',                           // Peak time
    players: getSportAveragePlayers(sport),  // Futebol=10, Tênis=4
    level: user.level || 'intermediate',     // Do perfil
    description: generateBasicDescription(sport, date, location),
  };
};

// Smart defaults por esporte
const getSportAveragePlayers = (sport: Sport): number => {
  const defaults = {
    'Futebol': 10,        // 5v5
    'Futebol Society': 14, // 7v7
    'Futsal': 10,         // 5v5
    'Vôlei': 12,          // 6v6
    'Basquete': 10,       // 5v5
    'Tênis': 4,           // 2v2 duplas
    'Padel': 4,           // 2v2
  };
  return defaults[sport] || 10;
};

// Data/hora inteligente
const getNextWeekendEvening = (): Date => {
  const now = new Date();
  const dayOfWeek = now.getDay();

  // Se Seg-Qui, sugere Sábado 18h
  if (dayOfWeek >= 1 && dayOfWeek <= 4) {
    const daysUntilSaturday = 6 - dayOfWeek;
    return addDays(setHours(now, 18), daysUntilSaturday);
  }

  // Se Sex-Dom, sugere próximo Sábado 18h
  return addDays(setHours(now, 18), 7 - dayOfWeek + 6);
};
```

**Acceptance Criteria**:
- [ ] Esporte: Pre-fill do onboarding ou perfil
- [ ] Local: Pre-fill cidade do cadastro
- [ ] Data: Próximo Sáb/Dom 18h
- [ ] Vagas: Baseado no esporte (10 para futebol)
- [ ] Nível: Do perfil do usuário
- [ ] Descrição: Template básico auto-gerado
- [ ] Usuário pode editar todos os campos
- [ ] A/B test: Time to create 5min → 2min

---

#### 2.2 Reduzir 4 Steps → 2 Steps (#9)

**Antes** (4 steps, 20 campos):
```
Step 1: Informações Básicas (8 campos)
Step 2: Localização (4 campos)
Step 3: Jogadores (5 campos)
Step 4: Confirmação (3 campos)
```

**Depois** (2 steps, 3 campos obrigatórios):
```
Step 1: Criar Evento (3 campos obrigatórios)
┌────────────────────────────────┐
│ Criar Evento                   │
│                                │
│ Esporte *                      │
│ [⚽ Futebol ▼]     <- Pre-fill │
│                                │
│ Data e Hora *                  │
│ [Sáb, 30 Nov • 18:00]          │ <- Smart default
│                                │
│ Local *                        │
│ [📍 São Paulo - SP]            │ <- Pre-fill
│ [🗺️ Usar Minha Localização]   │
│                                │
│ [Continuar]                    │
└────────────────────────────────┘

Step 2: Detalhes (Tudo opcional)
┌────────────────────────────────┐
│ Detalhes do Evento             │
│                                │
│ Vagas (opcional)               │
│ [10] <- Padrão p/ Futebol      │
│                                │
│ Nível (opcional)               │
│ [Intermediário ▼] <- Pre-fill  │
│                                │
│ Descrição (opcional)           │
│ [Pelada de Futebol no Sábado]  │ <- Auto-generated
│ [Editar]                       │
│                                │
│ [Preview] [Publicar Evento]    │
└────────────────────────────────┘
```

**Acceptance Criteria**:
- [ ] Step 1: Apenas 3 campos obrigatórios
- [ ] Step 2: Tudo opcional (smart defaults aplicados)
- [ ] Progress bar removido (apenas 2 steps)
- [ ] Preview antes de publicar (modal)
- [ ] Salvar rascunho a cada mudança (AsyncStorage)
- [ ] A/B test: Completion 50% → 85% (+70%)

---

#### 2.3 Salvar Rascunho (#64)

**Problema Atual**: Usuário perde dados se sair do formulário.

**Solução**: Auto-save em AsyncStorage a cada mudança.

```typescript
// useDraftEvent.ts
export const useDraftEvent = () => {
  const [draft, setDraft] = useState<CreateEventDraft | null>(null);

  // Load draft on mount
  useEffect(() => {
    const loadDraft = async () => {
      const saved = await AsyncStorage.getItem('@create_event_draft');
      if (saved) setDraft(JSON.parse(saved));
    };
    loadDraft();
  }, []);

  // Auto-save on every change (debounced 1s)
  const saveDraft = useCallback(
    debounce(async (data: CreateEventDraft) => {
      await AsyncStorage.setItem('@create_event_draft', JSON.stringify(data));
      analytics.track('create_event_draft_saved');
    }, 1000),
    []
  );

  // Clear draft after successful publish
  const clearDraft = async () => {
    await AsyncStorage.removeItem('@create_event_draft');
  };

  return { draft, saveDraft, clearDraft };
};

// CreateEventScreen
const CreateEventScreen = () => {
  const { draft, saveDraft, clearDraft } = useDraftEvent();
  const [formData, setFormData] = useState(draft || smartDefaults);

  // Auto-save on every field change
  useEffect(() => {
    if (formData !== draft) {
      saveDraft(formData);
    }
  }, [formData]);

  const handlePublish = async () => {
    await createEvent(formData);
    await clearDraft();  // Clear after success
  };

  return (
    <>
      {draft && (
        <Alert variant="info">
          Rascunho salvo há {formatDistanceToNow(draft.savedAt)}
        </Alert>
      )}
      {/* Form fields */}
    </>
  );
};
```

**Acceptance Criteria**:
- [ ] Auto-save a cada 1s (debounced)
- [ ] Load draft on mount
- [ ] Banner mostra "Rascunho salvo há X minutos"
- [ ] Clear draft após publicar
- [ ] Clear draft se usuário clicar "Cancelar"
- [ ] A/B test: Completion +35% (menos abandono)

---

### 📊 Success Metrics

**KPIs**:
- ✅ Create Event completion: 50% → **85%** (+70%)
- ✅ Time to create: 5min → **2min** (-60%)
- ✅ Draft saves: 0 → **50%** usuários usam
- ✅ Eventos/user/mês: 1.2 → **2.5** (+108%)
- ✅ Preview usage: 0% → **60%**

---

## 🔍 SPRINT 3: Event Discovery & Filters (Weeks 5-6)

### 🎯 Sprint Goal

**Melhorar descoberta de eventos com filtros avançados e relevância**

**Objetivo Mensurável**: Filter usage 20% → 55% (+175%), event discovery quality +40%

---

### 📋 Issues a Implementar (Total: 17 issues, 15 dias)

| # | Issue | RICE | Esforço | Dev Owner |
|---|-------|------|---------|-----------|
| **14** | Event Card: Social Proof ("8 amigos vão") | 1,445 | 1d | Dev 1 |
| **15** | Event Card: Quick RSVP (botão direto) | 1,440 | 1d | Dev 1 |
| **16** | Filtros: Data (Hoje, Amanhã, Semana) | 765 | 2d | Dev 2 |
| **17** | Filtros: Distância (km slider) | 1,445 | 1d | Dev 2 |
| **18** | Filtros: Nível (Iniciante/Inter/Avançado) | 1,200 | 2d | Dev 2 |
| **19** | Filtros: Disponibilidade (Vagas/Lotado) | 525 | 1d | Dev 3 |
| **70** | Search: Autocomplete | 300 | 2d | Dev 3 |
| **72** | Map View de Eventos | 400 | 5d | Dev 1 |
| **73** | "Eventos Perto de Mim" | 600 | 2d | Dev 2 |
| **74** | "Eventos Populares" (trending) | 360 | 2d | Dev 3 |
| **75** | "Eventos que Amigos Vão" | 480 | 2d | Dev 1 |
| **77** | Pull-to-Refresh | 540 | 0.5d | Dev 2 |

**RICE Médio**: 720

---

### 📦 Deliverables

#### 3.1 Filtros Avançados (#16-19)

**Nova Filter Screen** (4 filtros principais):

```typescript
<FilterScreen>
  {/* Filtro 1: Data */}
  <FilterGroup title="Data">
    <FilterOption value="today" icon="today">Hoje</FilterOption>
    <FilterOption value="tomorrow">Amanhã</FilterOption>
    <FilterOption value="week">Esta Semana</FilterOption>
    <FilterOption value="month">Este Mês</FilterOption>
    <FilterOption value="custom">Personalizado...</FilterOption>
  </FilterGroup>

  {/* Filtro 2: Distância (slider) */}
  <FilterGroup title="Distância">
    <Slider
      min={1}
      max={50}
      value={distance}
      onValueChange={setDistance}
      step={1}
      label={(val) => `${val} km de você`}
    />
  </FilterGroup>

  {/* Filtro 3: Nível (EXCLUSIVO ARENA) */}
  <FilterGroup title="Nível de Habilidade">
    <FilterOption value="beginner" icon="flag">
      🟢 Iniciante - "Jogo por diversão"
    </FilterOption>
    <FilterOption value="intermediate" icon="star">
      🟡 Intermediário - "Jogo regularmente"
    </FilterOption>
    <FilterOption value="advanced" icon="trophy">
      🔴 Avançado - "Jogo competitivo"
    </FilterOption>
  </FilterGroup>

  {/* Filtro 4: Disponibilidade */}
  <FilterGroup title="Disponibilidade">
    <FilterOption value="open">Vagas Disponíveis</FilterOption>
    <FilterOption value="full">Evento Lotado (lista de espera)</FilterOption>
  </FilterGroup>

  {/* Footer */}
  <FilterFooter>
    <Button variant="ghost" onPress={clearFilters}>
      Limpar Filtros
    </Button>
    <Button variant="primary" onPress={applyFilters}>
      Aplicar Filtros ({count})
    </Button>
  </FilterFooter>
</FilterScreen>
```

**Acceptance Criteria**:
- [ ] 4 filtros principais implementados
- [ ] Filtros salvos em AsyncStorage (preferências)
- [ ] Badge numérico mostra quantos filtros ativos
- [ ] "Limpar Filtros" restaura defaults
- [ ] Analytics track por filtro usado
- [ ] A/B test: Filter usage 20% → 55%

---

#### 3.2 Event Card com Social Proof (#14, #15)

**Redesign do Event Card**:

```
Antes (genérico):
┌────────────────────────────────┐
│ [Photo 320x180]                │
│ Futebol Sábado                 │
│ Sáb, 30 Nov • 18:00            │
│ 15 confirmados                 │
│ [Ver Detalhes]                 │
└────────────────────────────────┘

Depois (social proof + quick action):
┌────────────────────────────────┐
│ [Photo 320x180]                │
│ ⚽ Futebol Sábado               │
│ Sáb, 30 Nov • 18:00            │
│ Vila Madalena • 2.3km          │ <- Distância
│                                │
│ 👥 15 confirmados (2 vagas)    │
│ 👤 João, Maria +8 amigos vão   │ <- Social proof
│                                │
│ [Participar] [Compartilhar]    │ <- Quick RSVP
└────────────────────────────────┘
```

**Acceptance Criteria**:
- [ ] Mostrar distância em km
- [ ] Social proof: "X amigos vão participar"
- [ ] Quick RSVP: Botão direto no card (não vai para detalhes)
- [ ] Vagas restantes destacadas
- [ ] A/B test: RSVP rate +35% (combinado)

---

#### 3.3 Map View (#72)

**Nova View Mode**: List vs Map toggle

```typescript
<HomeScreen>
  <ViewModeToggle>
    <ToggleButton value="list" icon="list" />
    <ToggleButton value="map" icon="map" />
  </ViewModeToggle>

  {viewMode === 'map' ? (
    <MapView
      provider="google"
      region={{
        latitude: userLocation.lat,
        longitude: userLocation.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {events.map((event) => (
        <Marker
          key={event.id}
          coordinate={{
            latitude: event.location.lat,
            longitude: event.location.lng,
          }}
          title={event.title}
          description={`${event.participants} confirmados`}
        >
          <CustomMarker sport={event.sport} />
        </Marker>
      ))}

      {/* User location */}
      <Marker
        coordinate={userLocation}
        pinColor="blue"
        title="Você está aqui"
      />
    </MapView>
  ) : (
    <FlatList data={events} renderItem={renderEventCard} />
  )}
</HomeScreen>
```

**Acceptance Criteria**:
- [ ] Toggle List/Map preserva filtros
- [ ] Markers customizados por esporte (⚽ 🏀 🎾)
- [ ] Cluster markers quando zoom out
- [ ] Tap marker abre EventCard preview
- [ ] Geolocation permission requested
- [ ] A/B test: Map usage 30% usuários

---

### 📊 Success Metrics

**KPIs**:
- ✅ Filter usage: 20% → **55%** (+175%)
- ✅ Event discovery quality: +40% (match score)
- ✅ RSVP rate: 15% → **35%** (+133%)
- ✅ Map view usage: 0% → **30%**
- ✅ Search usage: 10% → **25%**

---

## 👥 SPRINT 4: Social Features (Weeks 7-8)

### 🎯 Sprint Goal

**Aumentar conexões sociais e engagement com recursos de comunidade**

**Objetivo Mensurável**: Avg friends 2 → 10 (+400%), social interactions +500%

---

### 📋 Issues a Implementar (Total: 19 issues, 20 dias)

| # | Issue | RICE | Esforço | Dev Owner |
|---|-------|------|---------|-----------|
| **81** | Friends: Social Proof ("12 amigos em comum") | 720 | 1d | Dev 1 |
| **82** | Friends: Activity Feed | 400 | 5d | Dev 1 |
| **85** | Groups: Live Activity ("12 jogaram hoje") | 480 | 2d | Dev 2 |
| **90** | Kudos/Reactions (❤️ 🔥 💪) | 640 | 3d | Dev 2 |
| **91** | Comments em Eventos | 480 | 5d | Dev 3 |
| **92** | Share Event (WhatsApp, Instagram) | 720 | 2d | Dev 1 |
| **94** | Tag Friends em Evento | 360 | 2d | Dev 2 |

**RICE Médio**: 380

---

### 📦 Deliverables

#### 4.1 Activity Feed (#82)

**Nova Tab "Feed"** (Strava-like):

```
┌────────────────────────────────┐
│ Feed de Atividades             │
│                                │
│ ┌──────────────────────────┐  │
│ │ João Silva                │  │
│ │ Jogou Futebol • há 2h     │  │
│ │ [Foto do evento]          │  │
│ │ "Que pelada! 🔥"          │  │
│ │ ❤️ 12  💬 3  🔥 5         │  │ <- Reactions
│ └──────────────────────────┘  │
│                                │
│ ┌──────────────────────────┐  │
│ │ Maria Santos              │  │
│ │ Criou evento de Vôlei     │  │
│ │ Amanhã 18h • 2.3km        │  │
│ │ [Participar]              │  │ <- Quick action
│ │ ❤️ 8  👥 12 confirmados   │  │
│ └──────────────────────────┘  │
└────────────────────────────────┘
```

**Acceptance Criteria**:
- [ ] Feed mostra atividades de amigos
- [ ] Tipos: "jogou evento", "criou evento", "achievement"
- [ ] Reactions: ❤️ (like), 🔥 (fire), 💪 (strong), 👏 (applause)
- [ ] Comments thread
- [ ] Pull-to-refresh
- [ ] Infinite scroll (FlatList)
- [ ] A/B test: D7 retention +15%

---

#### 4.2 Kudos/Reactions System (#90)

**Implementação**:

```typescript
// Reactions disponíveis (Strava-inspired)
export const REACTION_TYPES = {
  like: { emoji: '❤️', label: 'Curti' },
  fire: { emoji: '🔥', label: 'Fogo' },
  strong: { emoji: '💪', label: 'Forte' },
  applause: { emoji: '👏', label: 'Palmas' },
  laugh: { emoji: '😂', label: 'Engraçado' },
} as const;

// Event Card com reactions
<EventActivityCard>
  <EventInfo />

  <ReactionBar>
    {Object.entries(REACTION_TYPES).map(([type, { emoji, label }]) => (
      <ReactionButton
        key={type}
        emoji={emoji}
        count={event.reactions[type].length}
        isActive={userHasReacted(type)}
        onPress={() => toggleReaction(type)}
      />
    ))}
  </ReactionBar>

  <ReactionSummary>
    {event.reactions.like.length > 0 && (
      <Text>
        {formatNames(event.reactions.like.slice(0, 3))} e mais{' '}
        {event.reactions.like.length - 3} curtiram
      </Text>
    )}
  </ReactionSummary>
</EventActivityCard>
```

**Acceptance Criteria**:
- [ ] 5 tipos de reactions
- [ ] Toggle on/off (pode remover reaction)
- [ ] Real-time updates (WebSocket futuro)
- [ ] Summary mostra quem reagiu
- [ ] Analytics track por reaction type
- [ ] A/B test: Engagement +40%

---

### 📊 Success Metrics

**KPIs**:
- ✅ Avg friends: 2 → **10** (+400%)
- ✅ Social interactions/user: 5/mês → **30/mês** (+500%)
- ✅ Reactions given: 0 → **15/user/mês**
- ✅ Comments: 0 → **8/user/mês**
- ✅ Shares: 0 → **5/user/mês**

---

## 🏆 SPRINT 5: Gamification & Engagement (Weeks 9-10)

### 🎯 Sprint Goal

**Aumentar retenção com gamification e habit loops**

**Objetivo Mensurável**: D30 retention 15% → 35% (+133%), monthly engagement +212%

---

### 📋 Issues a Implementar (Total: 16 issues, 25 dias)

| # | Issue | RICE | Esforço | Dev Owner |
|---|-------|------|---------|-----------|
| **20** | Achievement System (badges) | 255 | 10d | Dev 1 + Dev 2 |
| **21** | Leaderboards | 225 | 8d | Dev 2 |
| **22** | Progress Bars | 360 | 2d | Dev 3 |
| **99** | Streaks (5, 10, 25 eventos) | 320 | 3d | Dev 1 |
| **107** | Monthly Stats | 360 | 2d | Dev 3 |

**RICE Médio**: 220

---

### 📦 Deliverables

#### 5.1 Achievement System (#20)

**Badges Automáticos** (Strava-inspired):

```typescript
// Achievement definitions
export const ACHIEVEMENTS = {
  // Participation
  first_event: {
    id: 'first_event',
    title: '🎉 Primeiro Evento',
    description: 'Participou do primeiro evento',
    trigger: { type: 'event_participated', count: 1 },
  },
  streak_5: {
    id: 'streak_5',
    title: '🔥 Sequência de 5',
    description: '5 eventos consecutivos (1 por semana)',
    trigger: { type: 'event_streak', count: 5 },
  },
  century: {
    id: 'century',
    title: '💯 Centurião',
    description: '100 eventos participados',
    trigger: { type: 'event_participated', count: 100 },
  },

  // Social
  social_butterfly: {
    id: 'social_butterfly',
    title: '🦋 Borboleta Social',
    description: '50 amigos adicionados',
    trigger: { type: 'friends_added', count: 50 },
  },

  // Organizer
  event_organizer: {
    id: 'event_organizer',
    title: '👨‍💼 Organizador',
    description: 'Criou 10 eventos',
    trigger: { type: 'event_created', count: 10 },
  },

  // Sport-specific
  soccer_master: {
    id: 'soccer_master',
    title: '⚽ Mestre do Futebol',
    description: '50 jogos de futebol',
    trigger: { type: 'event_participated', sport: 'Futebol', count: 50 },
  },
};

// Auto-unlock system
export const useAchievementUnlock = () => {
  const checkAchievements = useCallback(async (userId: string) => {
    const userStats = await getUserStats(userId);
    const unlockedAchievements = [];

    for (const [id, achievement] of Object.entries(ACHIEVEMENTS)) {
      const isUnlocked = evaluateTrigger(achievement.trigger, userStats);
      if (isUnlocked && !userStats.achievements.includes(id)) {
        unlockedAchievements.push(achievement);
        await unlockAchievement(userId, id);
        showUnlockAnimation(achievement);  // 🎉 Celebration
      }
    }

    return unlockedAchievements;
  }, []);

  return { checkAchievements };
};
```

**Acceptance Criteria**:
- [ ] 20 achievements iniciais
- [ ] Auto-unlock após evento/ação
- [ ] Animation celebrando unlock
- [ ] Profile mostra badges
- [ ] Share achievement (social proof)
- [ ] A/B test: D30 retention +20%

---

#### 5.2 Leaderboards (#21)

**Rankings Diversos**:

```
┌────────────────────────────────┐
│ Leaderboards                   │
│                                │
│ [Todos] [Amigos] [Região]      │ <- Tabs
│                                │
│ 🏆 Top Jogadores (Este Mês)    │
│ ┌──────────────────────────┐  │
│ │ 🥇 1. Carlos M. - 12 jogos│  │
│ │ 🥈 2. Ana S.   - 11 jogos │  │
│ │ 🥉 3. Pedro L. - 10 jogos │  │
│ │ ...                       │  │
│ │ 🏅 12. VOCÊ    - 8 jogos  │  │ <- User position
│ │ ...                       │  │
│ │ [Ver Top 100]             │  │
│ └──────────────────────────┘  │
│                                │
│ Seu Ranking: #12 (Top 5%)      │ <- Percentile
└────────────────────────────────┘
```

**Leaderboards Disponíveis**:
- 🏆 Top Jogadores (mais eventos/mês)
- ⚽ Por Esporte (Futebol, Basquete, etc)
- 📍 Por Região (São Paulo, Rio, etc)
- 🔥 Streaks (maior sequência ativa)
- 👥 Organizadores (mais eventos criados)

**Acceptance Criteria**:
- [ ] 5 leaderboards implementados
- [ ] Real-time updates (cache 5min)
- [ ] User position sempre visível
- [ ] Percentile calculation ("Top 5%")
- [ ] Filter: Global vs Amigos vs Região
- [ ] A/B test: Competição +25%

---

### 📊 Success Metrics

**KPIs**:
- ✅ D30 retention: 15% → **35%** (+133%)
- ✅ Monthly engagement: 8 → **25 sessions** (+212%)
- ✅ Achievement unlocks: 0 → **5/user/mês**
- ✅ Leaderboard views: 0% → **40%** usuários

---

## ⚡ SPRINT 6: Performance & Polish (Weeks 11-12)

### 🎯 Sprint Goal

**Otimizar performance e finalizar polish de UX**

**Objetivo Mensurável**: List scroll 40 FPS → 60 FPS (+50%), perceived speed +30%

---

### 📋 Issues a Implementar (Total: 7 issues, 18 dias)

| # | Issue | RICE | Esforço | Dev Owner |
|---|-------|------|---------|-----------|
| **23** | Skeleton Screens | 600 | 3d | Dev 1 |
| **24** | ScrollView → FlatList (65 conversões) | 192 | 8d | Dev 2 + Dev 3 |
| **121** | getItemLayout em FlatLists | 180 | 2d | Dev 2 |
| **125** | Spacing Hierarchy (Proximity) | 270 | 2d | Dev 1 |
| **126** | Profile: Spacing entre sections | 180 | 0.5d | Dev 1 |

**RICE Médio**: 210

---

### 📦 Deliverables

#### 6.1 Skeleton Screens (#23)

**Substituir SportsLoading por Skeleton em listas**:

```typescript
// Before: Generic loading
{isLoading && <SportsLoading size="lg" />}

// After: Content-specific skeleton
{isLoading ? (
  <EventCardSkeleton count={5} />
) : (
  <FlatList data={events} renderItem={renderEventCard} />
)}

// EventCardSkeleton Component
export const EventCardSkeleton: React.FC<{ count: number }> = ({ count }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i}>
        <SkeletonImage width={320} height={180} />
        <SkeletonText width="80%" height={20} />
        <SkeletonText width="60%" height={16} />
        <SkeletonText width="40%" height={14} />
      </SkeletonCard>
    ))}
  </>
);
```

**Telas com Skeleton**:
- [ ] Home (EventList)
- [ ] Friends (FriendsList)
- [ ] Groups (GroupsList)
- [ ] Event Details (Comments, Participants)
- [ ] Profile (EventHistory)

**Acceptance Criteria**:
- [ ] Skeleton match final content shape
- [ ] Shimmer animation (pulse effect)
- [ ] A/B test: Perceived speed +30%

---

#### 6.2 ScrollView → FlatList (#24)

**65 ScrollViews para converter**:

```typescript
// ❌ ANTES: ScrollView com .map()
<ScrollView>
  {events.map((event) => (
    <EventCard key={event.id} event={event} />
  ))}
</ScrollView>

// ✅ DEPOIS: FlatList com virtualization
<FlatList
  data={events}
  renderItem={({ item }) => <EventCard event={item} />}
  keyExtractor={(item) => item.id}

  // Performance optimizations
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
  getItemLayout={getEventCardLayout}  // ⚡ 20-30% faster

  // Memory management
  removeClippedSubviews={true}

  // Pagination
  onEndReached={loadMore}
  onEndReachedThreshold={0.5}
  ListFooterComponent={renderFooter}
/>
```

**Conversion Priority** (baseado em PERFORMANCE_AUDIT.md):
1. 🔴 HomeScreen (events list) - 200+ items
2. 🔴 FriendsScreen (friends list) - 100+ items
3. 🔴 GroupsScreen (groups list) - 50+ items
4. 🟠 EventDetailsScreen (participants) - 50+ items
5. 🟠 ProfileScreen (event history) - 100+ items

**Acceptance Criteria**:
- [ ] Top 5 screens convertidas
- [ ] getItemLayout implementado (fixed heights)
- [ ] Performance tests: 60 FPS scroll
- [ ] Memory tests: < 200MB RAM
- [ ] A/B test: Scroll performance +200%

---

### 📊 Success Metrics

**KPIs**:
- ✅ List scroll FPS: 40 → **60** (+50%)
- ✅ Perceived speed: +30% (skeleton screens)
- ✅ Memory usage: 300MB → **200MB** (-33%)
- ✅ Time to Interactive: 2s → **1.2s** (-40%)

---

## 📈 Overall Roadmap Success Metrics

### Consolidated KPIs (6 Meses)

| Métrica | Baseline | Sprint 1 | Sprint 2 | Sprint 3 | Sprint 4 | Sprint 5 | Sprint 6 | Target Final |
|---------|----------|----------|----------|----------|----------|----------|----------|--------------|
| **Signup Conv** | 60% | **85%** | 85% | 85% | 85% | 85% | 85% | **85%** (+42%) |
| **Create Event** | 50% | 50% | **85%** | 85% | 85% | 85% | 85% | **85%** (+70%) |
| **D7 Retention** | 30% | **45%** | 45% | 45% | 50% | **55%** | 55% | **55%** (+83%) |
| **D30 Retention** | 15% | 18% | 20% | 22% | 25% | **35%** | 35% | **35%** (+133%) |
| **Avg Friends** | 2 | 4 | 5 | 6 | **10** | 10 | 10 | **10** (+400%) |
| **Sessions/Mês** | 8 | 10 | 12 | 15 | 18 | **25** | 25 | **25** (+212%) |
| **Eventos/User** | 1.2 | 1.5 | **2.5** | 2.8 | 3.0 | **3.2** | 3.2 | **3.2** (+167%) |

---

### Crescimento Projetado (MAU)

**Premissa**: 10,000 MAU inicial

```
Month 1 (Sprint 1-2): 10,000 → 12,000 MAU (+20% signup conv)
Month 2 (Sprint 3-4): 12,000 → 15,000 MAU (+25% retention)
Month 3 (Sprint 5-6): 15,000 → 17,000 MAU (+13% virality)

TOTAL: 10,000 → 17,000 MAU (+70%) em 3 meses
```

---

## ⚠️ Risks & Dependencies

### Critical Risks

| Risk | Probability | Impact | Mitigation | Owner |
|------|-------------|--------|-----------|-------|
| **Social Login: Apple rejection** | Média | Alto | Google primeiro, Apple após approval | PM |
| **Gamification: Scope creep** | Alta | Alto | MVP com 10 badges, expandir depois | PM |
| **FlatList: Performance regressions** | Média | Alto | Incremental rollout, 10 screens/sprint | Tech Lead |
| **API: Rate limits** | Baixa | Médio | Caching strategy, Redis | Backend |
| **Team: Vacation/Sick leave** | Média | Médio | Cross-training, buffer de 20% | PM |

---

### Inter-Sprint Dependencies

```
Sprint 1 → Sprint 2:
  - Multi-step (#1) deve estar pronto para Social Login (#10) integrar

Sprint 2 → Sprint 3:
  - Event creation flow (#9) necessário para testar filtros (#16-19)

Sprint 3 → Sprint 4:
  - Event cards (#14, #15) devem estar prontos para activity feed (#82)

Sprint 4 → Sprint 5:
  - Social interactions (#90, #91) necessários para achievements (#20)

Sprint 5 → Sprint 6:
  - Gamification (#20, #21) gera dados para leaderboards otimizados (#24)
```

---

## 🎯 Conclusion

### Summary

✅ **6 sprints** (12 semanas = 3 meses)
✅ **92 issues implementados** (73% dos 127 totais)
✅ **ROI projetado**: +70% MAU, +83% D7 retention, +167% eventos criados
✅ **Team**: 2-3 devs + 1 designer + 1 PM
✅ **Budget**: ~$150k (3 meses × $50k/mês team cost)

### Next Steps

1. **Week 0 (Pre-Sprint 1)**:
   - [ ] Team kickoff meeting
   - [ ] Setup analytics (Mixpanel + Firebase)
   - [ ] Setup A/B testing (Firebase Remote Config)
   - [ ] Design sprint (empty states, social proof)
   - [ ] Backend API planning (social features)

2. **Sprint 1 Start** (Week 1):
   - [ ] Sprint planning (issues #1-15)
   - [ ] Dev environment setup
   - [ ] First commits

3. **Post-Sprint 6** (Week 13):
   - [ ] Retrospective de todos os 6 sprints
   - [ ] Análise de métricas vs targets
   - [ ] Plan Sprint 7+ (remaining 35 issues)

---

**Próximo Documento**: Atualizar [UX_ANALYSIS_ROADMAP.md](./UX_ANALYSIS_ROADMAP.md) com status da Fase 3
