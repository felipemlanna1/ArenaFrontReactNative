# Arena Mobile - Inventário Completo de Telas e Componentes

**Data**: 2025-11-23
**Versão**: 1.0

---

## 📊 Resumo Executivo

| Métrica | Quantidade |
|---------|-----------|
| **Total de Screens** | 21 |
| **Total de UI Components** | 40 |
| **Text Variants** | 25 |
| **Button Variants** | 9 |
| **Bottom Tabs** | 5 |
| **Modal Screens** | 7 |

---

## 1. 📱 SCREENS (21 Total)

### Autenticação (4 telas)

| Screen | Arquivo | Hook | Propósito |
|--------|---------|------|-----------|
| **Welcome** | `welcomeScreen/index.tsx` | `useWelcomeScreen.ts` | Tela inicial de boas-vindas (splash) |
| **Login** | `loginScreen/index.tsx` | `useLoginScreen.ts` | Autenticação de usuários existentes |
| **Register** | `registerScreen/index.tsx` | `useRegisterScreen.ts` | Criação de novos usuários (multi-step) |
| **Onboarding Sports** | `onboardingSportsScreen/index.tsx` | `useOnboardingSportsScreen.ts` | Seleção de esportes favoritos (primeiro acesso) |

### Telas Principais - Bottom Tab (5 telas)

| Screen | Tab | Ícone | Propósito |
|--------|-----|-------|-----------|
| **Home** | HomeTab | `home/home-outline` | Feed de eventos descobertos |
| **Friends** | FriendsTab | `people/people-outline` | Gerenciamento de amigos e recomendações |
| **My Events** | MyEventsTab | `calendar/calendar-outline` | Eventos criados/participando |
| **Groups List** | GroupsTab | `account-group` | Lista e gerenciamento de grupos |
| **Profile** | ProfileTab | `person/person-outline` | Perfil do usuário autenticado |

### Telas de Detalhe (5 telas)

| Screen | Apresentação | Propósito |
|--------|--------------|-----------|
| **Event Details** | Card | Detalhes de evento específico + participantes |
| **Group Details** | Card | Detalhes de grupo + membros + eventos |
| **Create Event** | Card | Assistente multi-passo de criação de evento |
| **Create Group** | Card | Formulário de criação de grupo |
| **Edit Profile** | Card | Edição de informações do perfil |

### Telas Auxiliares (7 telas)

| Screen | Apresentação | Propósito |
|--------|--------------|-----------|
| **Filter Screen** | Modal | Filtros avançados de eventos/grupos |
| **Notifications** | Card | Centro de notificações |
| **Explore** | Fullscreen | Explorador de esportes/eventos |
| **Components Showcase** | Fullscreen | Demo do Design System (dev) |

---

## 2. 🧩 COMPONENTES UI (40 Total)

### Input & Forms (9 componentes)

| Componente | Variantes | Uso Primário |
|-----------|-----------|--------------|
| **Input** | default, error, success, warning | Campos de texto (9 tipos: text, email, password, phone, number, url, search, textarea, otp) |
| **Label** | form, section, inline, helper | Labels de formulário com asterisco required |
| **DatePicker** | datetime, date, time | Seleção de data/hora com validação |
| **Checkbox** | - | Seleção binária simples |
| **CheckboxGroup** | - | Múltipla seleção em lista vertical |
| **CardCheckbox** | - | Seleção em grid com ícone (usado em esportes) |
| **RadioButton** | - | Seleção única em grupo |
| **Switch** | brand | Toggle on/off (usado em configurações) |
| **Dropdown** | - | Seleção com busca (estados, cidades) |

### Navegação & Ação (5 componentes)

| Componente | Variantes | Tamanhos |
|-----------|-----------|----------|
| **Button** | primary, secondary, subtle, destructive, success, ghost, outline-light, fab, outline-primary | xs, sm, md, lg, xl |
| **Link** | primary, secondary | - |
| **Card** | default, outlined, elevated | - |
| **Fab** | - | md (fixo) |
| **Dropdown** | - | - |

### Feedback & Status (5 componentes)

| Componente | Variantes | Uso |
|-----------|-----------|-----|
| **Badge** | default, primary, success, error, outlined | Tags/etiquetas removíveis |
| **SportsLoading** | - | Indicador animado (4 tamanhos: xs, sm, md, lg) |
| **Alert** | success, error, warning, info | Mensagens de sistema |
| **ProgressBar** | - | Barra de progresso com % |
| **Stepper** | dots, numbers, bars | Navegação multi-passo |

### Tipografia (1 componente, 25 variantes)

**Text** - OBRIGATÓRIO prop `variant`:

| Categoria | Variantes |
|-----------|-----------|
| **Display** | displayPrimary, displayAccent |
| **Headings** | headingPrimary, headingAccent |
| **Titles** | titlePrimary, titleSecondary, titleAccent, titleAccentBold |
| **Body** | bodyPrimary, bodySecondary, bodyBold, bodyBoldAccent, bodyMuted, bodyError, bodySuccess, bodyAccent |
| **Captions** | captionSecondary, captionMuted, captionError |
| **Labels** | labelPrimary, labelSecondary, labelError |

### Mídia & Brand (4 componentes)

| Componente | Variantes | Uso |
|-----------|-----------|-----|
| **Logo** | full, symbol | Logo da marca Arena |
| **Symbol** | primary, secondary | Símbolo isolado |
| **AppIcon** | - | Ícone do aplicativo |
| **OptimizedImage** | - | Imagens com lazy loading e cache |

### Layout & Containers (6 componentes)

| Componente | Props Principais | Uso |
|-----------|------------------|-----|
| **ArenaKeyboardAwareScrollView** | bottomOffset, keyboardShouldPersistTaps | ScrollView que ajusta com teclado |
| **Accordion** | items, variant, mode (single/multiple) | Seções expansíveis |
| **FilterModal** | visible, filters, onApply | Modal de filtros complexos |
| **SelectionModal** | visible, items, onSelect | Seleção de lista |
| **ConfirmationModal** | title, message, onConfirm | Confirmação de ação |
| **InviteUsersModal** | visible, onInvite | Convite com busca |

### Domain-Specific (10 componentes)

| Componente | Uso |
|-----------|-----|
| **GroupCard** | Card customizado para grupos |
| **GroupMemberItem** | Item de membro em lista |
| **RoleBadge** | Badge de papel (admin, moderator, member) |
| **PrivacyBadge** | Indicador de privacidade (public, private) |
| **MultiSelectSports** | Grid multi-seleção de esportes |
| **CityDropdown** | Dropdown de cidades (baseado em estado) |
| **StateDropdown** | Dropdown de estados brasileiros |
| **GroupDropdown** | Dropdown de grupos do usuário |
| **SkillLevelModal** | Modal de seleção de nível (iniciante, intermediário, avançado, expert) |
| **NotificationSettings** | Configurações de notificações por tipo |

---

## 3. 🗺️ ESTRUTURA DE NAVEGAÇÃO

### Root Navigator (Stack)

```
NavigationContainer (Dark Theme)
│
├─ [SEM AUTENTICAÇÃO]
│  ├─ Welcome
│  ├─ Login
│  ├─ Register
│  └─ ComponentsShowcase
│
├─ [ONBOARDING]
│  └─ OnboardingSports
│
└─ [AUTENTICADO]
   │
   ├─ BOTTOM TAB NAVIGATOR (5 tabs)
   │  ├─ HomeTab → Home
   │  ├─ FriendsTab → Friends
   │  ├─ MyEventsTab → MyEvents
   │  ├─ GroupsTab → GroupsList + GroupDetails + CreateGroup
   │  └─ ProfileTab → Profile
   │
   └─ MODAL/CARD SCREENS
      ├─ FilterScreen (modal)
      ├─ CreateEvent (card)
      ├─ EventDetails (card)
      ├─ GroupDetails (card)
      ├─ Profile (card - visitado)
      ├─ EditProfile (card)
      └─ Notifications (card)
```

### Deep Linking

Suporta as seguintes URLs:
- `arena://tabs` → MainTabs (Home)
- `arena://event/:eventId` → EventDetails
- `arena://group/:groupId` → GroupDetails
- `arena://profile/:userId` → Profile (visitado)
- `arena://notifications` → Notifications

---

## 4. 🎨 DESIGN TOKENS

### Cores (ArenaColors)

| Token | Hex | Uso |
|-------|-----|-----|
| `brand.primary` | #FF5301 | CTA primário, destaques |
| `neutral.darkest` | #1B1D29 | Background principal |
| `neutral.dark` | #20303D | Cards, containers |
| `neutral.medium` | #B8B8B8 | Texto secundário |
| `neutral.light` | #FFFFFF | Texto primário |

### Espaçamento (ArenaSpacing)

| Token | Valor | Uso Comum |
|-------|-------|-----------|
| `xs` | 4px | Entre label e input |
| `sm` | 8px | Entre cards em grid |
| `md` | 12px | Entre inputs/components |
| `lg` | 16px | Entre sections, padding horizontal |
| `xl` | 20px | - |
| `2xl` | 24px | Padding vertical de telas |

### Tipografia (ArenaTypography)

| Token | Tamanho | Peso | Uso |
|-------|---------|------|-----|
| `size.xs` | 11px | - | Captions |
| `size.sm` | 13px | - | Labels |
| `size.md` | 15px | - | Body |
| `size.lg` | 17px | - | Títulos |
| `size.2xl` | 22px | - | Headings |
| `weight.regular` | 400 | - | Body text |
| `weight.medium` | 500 | - | Labels |
| `weight.semibold` | 600 | - | Headings |
| `weight.bold` | 700 | - | Títulos importantes |

---

## 5. 📋 PADRÕES OBRIGATÓRIOS

### Text Component

```tsx
// ❌ ERRADO - Sem variant (causará erro)
<Text>Olá</Text>

// ❌ ERRADO - Propriedades tipográficas em styles
const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF'
  }
});

// ✅ CORRETO
<Text variant="titlePrimary">Olá</Text>

const styles = StyleSheet.create({
  title: {
    textAlign: 'center', // Apenas layout
    marginTop: ArenaSpacing.md
  }
});
```

### Loading States

```tsx
// ❌ NUNCA
<ActivityIndicator size="large" />

// ✅ SEMPRE
<SportsLoading size="lg" animationSpeed="normal" />
```

### Ícones

```tsx
// ❌ NUNCA emojis
<Text>🏆</Text>

// ✅ SEMPRE @expo/vector-icons
<Ionicons name="trophy" size={20} color={ArenaColors.brand.primary} />
```

### Lists Padding

```tsx
// ✅ OBRIGATÓRIO padding horizontal
<FlatList
  data={items}
  renderItem={renderItem}
  contentContainerStyle={{
    paddingHorizontal: ArenaSpacing.lg, // 16px OBRIGATÓRIO
    paddingVertical: ArenaSpacing.md
  }}
/>
```

### Keyboard Handling

```tsx
// ✅ SEMPRE usar wrapper Arena
<ArenaKeyboardAwareScrollView
  contentContainerStyle={styles.content}
  bottomOffset={60} // 60/100/120 conforme tipo de tela
>
  <Input label="Nome" />
</ArenaKeyboardAwareScrollView>
```

---

## 6. 🔍 COMPONENTES CUSTOMIZADOS POR TELA

### HomeScreen

- FilterBar (horizontal chips)
- EventCard (card customizado de evento)
- EmptyState ("Nenhum evento encontrado")

### FriendsScreen

- Accordion (Meus Amigos, Solicitações, Recomendações)
- FriendCard (card de amigo com avatar)
- FriendRequestItem (solicitação com accept/reject)

### GroupsListScreen

- GroupCard (card de grupo com membros preview)
- EmptyState ("Você ainda não participa de nenhum grupo")
- SearchBar (busca de grupos)

### CreateEventScreen (Multi-Step)

**Step 1 - Informações Básicas:**
- Input (título)
- MultiSelectSports
- DatePicker
- DurationPicker

**Step 2 - Localização:**
- StateDropdown
- CityDropdown
- Input (endereço, CEP)

**Step 3 - Detalhes:**
- Input (descrição, textarea)
- Input (número de participantes)
- PrivacyToggle
- GroupDropdown (opcional)

**Step 4 - Revisão:**
- SummaryCard (resumo editável)
- ConfirmButton

### ProfileScreen

- Avatar (circular com upload)
- SportsGrid (esportes praticados)
- StatsRow (eventos, amigos, grupos)
- Accordion ("Sobre", "Configurações")

---

## 7. 📐 CONVENÇÕES DE CÓDIGO

### Nomenclatura

```typescript
// Screens
src/screens/[screenName]/
  ├─ index.tsx                 // ScreenName (PascalCase)
  ├─ use[ScreenName].ts       // hook
  ├─ styles[ScreenName].ts    // estilos
  └─ types[ScreenName].ts     // tipos

// Components
src/components/ui/[ComponentName]/
  ├─ index.tsx
  ├─ use[ComponentName].ts
  ├─ styles[ComponentName].ts
  └─ types[ComponentName].ts

// Variáveis e funções: camelCase
// Componentes e interfaces: PascalCase
// Diretórios: kebab-case
```

### Estrutura de Arquivo

```typescript
// index.tsx
import React from 'react';
import { View } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';
import { styles } from './stylesComponentName';
import { ComponentNameProps } from './typesComponentName';
import { useComponentName } from './useComponentName';

export const ComponentName: React.FC<ComponentNameProps> = ({ prop1 }) => {
  const { state, handleAction } = useComponentName(prop1);

  return (
    <View style={styles.container}>
      {/* JSX */}
    </View>
  );
};
```

---

## 8. 🚀 PRÓXIMOS PASSOS PARA ANÁLISE

### Fase 1 - Descoberta ✅
- [x] Mapear todas as screens
- [x] Inventariar componentes UI
- [ ] Analisar hierarquia de informação (em andamento)
- [ ] Identificar padrões inconsistentes

### Fase 2 - Auditoria
- [ ] Heurísticas de Nielsen
- [ ] Fluxos do usuário
- [ ] Acessibilidade WCAG
- [ ] Performance percebida

### Fase 3 - Recomendações
- [ ] Problemas priorizados (Critical/High/Medium/Low)
- [ ] Wireframes de melhorias
- [ ] Roadmap de implementação

---

**Última Atualização**: 2025-11-23
**Próximo Documento**: `INFORMATION_HIERARCHY.md`
