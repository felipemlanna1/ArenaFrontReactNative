# Arena Mobile - Instruções para Claude Code

## 🎯 Visão Geral do Projeto

Este é um aplicativo React Native com Expo para a plataforma Arena. O projeto segue rigorosamente os princípios SOLID, Clean Code e padrões específicos de desenvolvimento mobile.

## 📋 Regras Obrigatórias

### TypeScript

- **SEMPRE** usar TypeScript com modo strict (`"strict": true`)
- **NUNCA** usar `any` - usar `unknown` quando necessário
- Tipar todas as props, estados e retornos de função
- Usar `React.FC<Props>` para componentes funcionais

### Estrutura de Código

- Componentes funcionais apenas (sem classes)
- **Máximo 150 linhas por arquivo** (função/componente/hook)
- Separar lógica (hooks) da UI (componentes)
- Um arquivo por componente
- Exports nomeados, não default

### 🚫 Comentários no Código (arena-no-comments)

**REGRA CRÍTICA**: Comentários são **PROIBIDOS** no código Arena. O código deve ser **auto-explicativo** (self-documenting).

**Filosofia**: Código limpo não precisa de comentários. Use nomes descritivos de variáveis, funções e componentes.

#### ❌ NUNCA Permitido

```typescript
// ❌ Comentários de linha
const x = 10; // ❌ Explicação inline

/* ❌ Comentários de bloco */

// ❌ TODO: Implementar feature
// ❌ FIXME: Corrigir bug
```

#### ✅ Exceções Permitidas

```typescript
// ✅ Copyright/License (apenas primeiras 10 linhas)
// Copyright 2024 Arena
// SPDX-License-Identifier: MIT

// ✅ Diretivas do linter (quando absolutamente necessário)
// eslint-disable-next-line react-hooks/exhaustive-deps
// @ts-expect-error - Tipo externo incorreto

/** ✅ JSDoc para interfaces/tipos EXPORTADOS apenas */
export interface UserProps {
  id: string;
  name: string;
}

// ❌ JSDoc NÃO permitido para funções internas
function internalHelper() {}
```

#### 📂 Arquivos Excluídos da Regra

- `src/config/sportsConfig.ts`
- `src/components/error-boundary/**`
- Arquivos `.config.js` e `.config.ts`

#### 💡 Como Escrever Código Auto-Explicativo

```typescript
// ❌ ERRADO - Precisa de comentário
const d = new Date();
// Calcula idade em anos

// ✅ CORRETO - Nome descritivo
const calculateAgeInYears = (birthDate: Date): number => {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  return age;
};

// ❌ ERRADO - Magic number com comentário
const timeout = 3000; // 3 segundos

// ✅ CORRETO - Constante nomeada
const AUTHENTICATION_TIMEOUT_MS = 3000;
```

#### ⚠️ Consequências

- **Auto-fix ativo**: `npm run lint -- --fix` remove comentários automaticamente
- **Build falha**: Comentários bloqueiam CI/CD
- **Code review**: PRs com comentários são rejeitados

### Nomenclatura

```
camelCase: variáveis, funções, hooks (useAuth, handleSubmit)
PascalCase: componentes, interfaces (UserCard, ActivityProps)
kebab-case: diretórios (user-profile, activity-list)
```

### Estrutura de Pastas

```
src/
├── screens/           # Telas do aplicativo
│   └── [ScreenName]/
│       ├── hooks/              # Hooks específicos da screen (opcional)
│       ├── utils/              # Utilitários específicos da screen (opcional)
│       ├── use[ScreenName].ts  # Hook principal da tela
│       ├── index.tsx           # Tela principal
│       ├── styles.ts           # Estilos da tela
│       ├── types.ts            # Tipos específicos da screen
│       └── README.md           # Documentação
├── components/         # TODOS os componentes reutilizáveis
│   └── [ComponentName]/    # Componentes funcionais
│       ├── index.tsx
│       ├── styles[ComponentName].ts        # Estilos identificados
│       ├── types[ComponentName].ts         # Tipos identificados
│       ├── use[ComponentName].ts          # Hook no mesmo nível
│       └── README.md
├── hooks/             # Hooks globais
├── services/          # APIs e serviços
├── constants/         # Design tokens Arena
│   └── arenaTokens.ts # Tokens principais Arena
└── utils/             # Utilitários
```

## 🎨 Design System Arena

### Tokens de Design

**REGRA**: Usar SEMPRE os tokens do `arenaTokens.ts`. Nunca valores hardcoded.

```tsx
import { ArenaColors, ArenaSpacing } from '@/constants';
import { Text } from '@/components/ui/text';

// ✅ CORRETO - Usar variantes de Text
const styles = StyleSheet.create({
  container: {
    padding: ArenaSpacing.lg,
    backgroundColor: ArenaColors.neutral.dark,
  },
  title: {
    textAlign: 'center', // Apenas propriedades de layout
  },
});

// No componente
<Text variant="titlePrimary" style={styles.title}>
  Título
</Text>;

// ❌ ERRADO - Propriedades tipográficas em styles
const styles = StyleSheet.create({
  container: {
    padding: 16, // Valor hardcoded
    backgroundColor: '#20303D', // Cor hardcoded
  },
  title: {
    fontSize: 22, // ❌ Usar variant ao invés
    fontWeight: '600', // ❌ Usar variant ao invés
  },
});
```

### 🚨 REGRA CRÍTICA: Text Component

#### 1. Variant é OBRIGATÓRIA

**TODO `<Text>` DEVE ter a prop `variant`**. Nunca use `<Text>` sem `variant` - isso causará erro em runtime.

#### 2. NUNCA Use Propriedades Tipográficas em Styles

**NUNCA** usar propriedades tipográficas (`fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`, `fontFamily`, `color`) em `StyleSheet.create()`.

**SEMPRE** usar a prop `variant` do componente `<Text>`:

```tsx
// ❌ ERRADO - Sem variant (causará erro)
<Text>Olá Mundo</Text>
<Text style={styles.title}>Título</Text>

// ❌ ERRADO - Propriedades tipográficas em styles
const styles = StyleSheet.create({
  title: {
    fontSize: ArenaTypography.size.lg,
    fontWeight: ArenaTypography.weight.bold,
    color: ArenaColors.neutral.light,
    lineHeight: 24,
  },
});
<Text variant="titlePrimary" style={styles.title}>Título</Text>

// ✅ CORRETO - Sempre com variant
<Text variant="bodyPrimary">Olá Mundo</Text>
<Text variant="titlePrimary">Título</Text>

// ✅ CORRETO - Variant + apenas propriedades de layout
const styles = StyleSheet.create({
  title: {
    // Apenas propriedades de layout/posicionamento
    textAlign: 'center',
    marginTop: ArenaSpacing.md,
  },
});
<Text variant="titlePrimary" style={styles.title}>Título</Text>
```

#### 3. ESLint Enforcement

A regra `arena/arena-text-requires-variant` garante que todo `<Text>` tenha `variant`:

```bash
# ❌ Isso causará erro ESLint
<Text>Hello</Text>
# Error: Text component from "@/components/ui/text" must have a "variant" prop

# ✅ Correto
<Text variant="bodyPrimary">Hello</Text>
```

**Variantes Disponíveis (25 total)**:

| Categoria            | Variantes                                                                                              | Uso                          |
| -------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------- |
| **Display/Headings** | `displayPrimary`, `headingPrimary`, `headingSecondary`                                                 | Títulos grandes e principais |
| **Titles**           | `titlePrimary`, `titleSecondary`                                                                       | Títulos de seções e cards    |
| **Subtitles**        | `subtitlePrimary`, `subtitleSecondary`                                                                 | Subtítulos                   |
| **Body**             | `bodyPrimary`, `bodySecondary`                                                                         | Texto de corpo/parágrafos    |
| **Captions**         | `captionPrimary`, `captionSecondary`                                                                   | Legendas e textos pequenos   |
| **Labels**           | `labelPrimary`, `labelSecondary`                                                                       | Labels de formulários        |
| **Links**            | `linkPrimary`, `linkSecondary`                                                                         | Links clicáveis              |
| **Buttons**          | `buttonPrimary`, `buttonSecondary`                                                                     | Texto dentro de botões       |
| **Inputs**           | `inputPrimary`, `inputSecondary`, `placeholderPrimary`                                                 | Inputs de formulário         |
| **States**           | `errorPrimary`, `errorSecondary`, `successPrimary`, `warningPrimary`, `infoPrimary`, `disabledPrimary` | Estados de UI                |

**Propriedades Permitidas em Styles**:

- ✅ Layout: `textAlign`, `textDecorationLine`, `textTransform`
- ✅ Espaçamento: `margin*`, `padding*`
- ✅ Posicionamento: `position`, `top`, `left`, `right`, `bottom`
- ✅ Outros: `opacity`, `backgroundColor` (para highlight)

**Propriedades PROIBIDAS em Styles** (use variantes):

- ❌ `fontSize` → Use variant apropriada
- ❌ `fontWeight` → Use variant apropriada
- ❌ `fontFamily` → Use variant apropriada
- ❌ `lineHeight` → Use variant apropriada
- ❌ `letterSpacing` → Use variant apropriada
- ❌ `color` → Use variant apropriada (exceto casos especiais como highlight)

### Cores Arena

- **Primária**: `ArenaColors.brand.primary` (#FF5301)
- **Neutra Escura**: `ArenaColors.neutral.darkest` (#1B1D29)
- **Neutra Média**: `ArenaColors.neutral.medium` (#B8B8B8)
- **Neutra Clara**: `ArenaColors.neutral.light` (#FFFFFF)

### 🎨 Ícones - SEMPRE Use @expo/vector-icons

**REGRA CRÍTICA**: NUNCA use emojis (🏆, ✓, 👥, ⭐, etc.) como ícones. SEMPRE use componentes da biblioteca `@expo/vector-icons`.

```tsx
// ❌ ERRADO - Emojis como ícones
<Text>🏆</Text>
const icon = '⭐';

// ✅ CORRETO - Ionicons da biblioteca
import Ionicons from '@expo/vector-icons/Ionicons';
<Ionicons name="trophy" size={20} color={ArenaColors.brand.primary} />
<Ionicons name="star" size={24} color={ArenaColors.semantic.warning} />
```

**Bibliotecas Disponíveis**:

- `Ionicons` (preferencial - mais completa)
- `MaterialIcons`
- `FontAwesome`
- `FontAwesome5`
- `Feather`

**Regra ESLint**: `arena/arena-no-emoji-icons` bloqueia uso de emojis em props de ícones.

### 📱 FlatList & ScrollView - SEMPRE Com Padding Horizontal

**REGRA CRÍTICA**: TODOS os `<FlatList>` e `<ScrollView>` DEVEM ter padding horizontal (`ArenaSpacing.lg = 16px`) para prevenir que o conteúdo fique colado nas bordas do telefone.

**PROBLEMA**: Sem padding horizontal, o conteúdo fica colado nas bordas em Android/iOS/Web, causando má experiência do usuário.

```tsx
import { FlatList, ScrollView, View } from 'react-native';
import { ArenaSpacing } from '@/constants';

// ✅ SOLUÇÃO 1 (Recomendada): contentContainerStyle com paddingHorizontal
<FlatList
  data={items}
  renderItem={renderItem}
  contentContainerStyle={styles.listContainer}  // ← OBRIGATÓRIO
/>

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: ArenaSpacing.lg,  // 16px - OBRIGATÓRIO
    paddingVertical: ArenaSpacing.md,    // 12px (opcional)
  },
});

// ✅ SOLUÇÃO 2: Wrapper View com padding
<View style={styles.container}>
  <FlatList data={items} renderItem={renderItem} />
</View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: ArenaSpacing.lg,  // 16px - OBRIGATÓRIO
  },
});

// ✅ SCROLLVIEW - Preferir contentContainerStyle
<ScrollView
  contentContainerStyle={styles.scrollContent}  // ← Preferencial
>
  {children}
</ScrollView>

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: ArenaSpacing.lg,  // 16px - OBRIGATÓRIO
  },
});

// ❌ ERRADO - Sem padding (conteúdo colado nas bordas)
<FlatList
  data={items}
  renderItem={renderItem}
  // ❌ FALTA contentContainerStyle com paddingHorizontal
/>

// ❌ ERRADO - Valor hardcoded
contentContainerStyle={{ paddingHorizontal: 16 }}  // ❌ Use ArenaSpacing.lg
```

**Regra ESLint**: `arena/arena-list-padding` detecta automaticamente listas sem padding e fornece soluções detalhadas.

**Por Que É Crítico**:

- ✅ Consistência cross-platform (iOS, Android, Web)
- ✅ Aderência ao Design System Arena
- ✅ Melhor UX - espaço respirável nas bordas
- ✅ Evita bugs visuais que só aparecem em produção

**Token Obrigatório**: `ArenaSpacing.lg` (16px) para padding horizontal de listas.

## 🚀 Padrões de Implementação

### Componentes

```tsx
// arquivo: ComponentName/index.tsx
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';
import { styles } from './stylesComponentName';

interface ComponentNameProps {
  prop1: string;
  prop2: () => void;
  prop3?: boolean;
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  prop1,
  prop2,
  prop3 = false,
}) => {
  // Hooks no topo
  const handleAction = useCallback(() => {
    prop2();
  }, [prop2]);

  // Renderização condicional clara
  if (!prop1) return null;

  return <View style={styles.container}>{/* JSX */}</View>;
};
```

### Arquivos de Estilo

```tsx
// arquivo: ComponentName/stylesComponentName.ts
import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    // Usar tokens Arena
    padding: ArenaSpacing.lg,
    borderRadius: ArenaBorders.radius.md,
    backgroundColor: ArenaColors.neutral.dark,
  },
  // Outros estilos...
});
```

### Hooks Customizados

```tsx
// Hook com tipagem completa
interface UseFeatureNameReturn {
  data: FeatureData | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useFeatureName = (params: FeatureParams): UseFeatureNameReturn => {
  const [data, setData] = useState<FeatureData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await api.getFeatureData(params);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
};
```

## ⚠️ Regras Críticas

### NUNCA FAZER

1. ❌ Usar `any` no TypeScript
2. ❌ Criar componentes com mais de 150 linhas
3. ❌ Usar estilos inline
4. ❌ Funções anônimas em renderItem
5. ❌ Lógica de negócio em componentes
6. ❌ Ignorar estados de loading/error
7. ❌ Usar class components
8. ❌ Valores hardcoded (usar tokens Arena)

### SEMPRE FAZER

1. ✅ Tipar todas as props e estados
2. ✅ Separar lógica em hooks
3. ✅ Usar tokens Arena do constants/
4. ✅ Otimizar listas com FlatList
5. ✅ Tratar erros explicitamente
6. ✅ Usar path aliases (@/, @components/, etc.)
7. ✅ Seguir nomenclatura com prefixos

## 📋 Checklist para Cada Arquivo

Ao criar ou modificar qualquer arquivo, SEMPRE verificar:

1. **TypeScript**: Sem `any`, tipos explícitos
2. **Tamanho**: Máximo 150 linhas de lógica
3. **Nomenclatura**: Segue convenções (camel/Pascal/kebab)
4. **Performance**: React.memo, useCallback onde necessário
5. **Estilos**: Em arquivo separado `stylesX.ts`, usa tokens Arena, não inline
6. **Erros**: Tratamento explícito
7. **Imports**: Path aliases usados
8. **Separação**: Estilos em `stylesX.ts`, tipos em `typesX.ts`, lógica em hooks

## 🎯 Brand Arena

- **Nome**: Arena
- **Cores**: Laranja (#FF5301) + Azul Escuro (#1B1D29) + Cinza (#B8B8B8)
- **Identidade**: Moderna, Esportiva, Confiável
- **Tom**: Direto, Motivacional, Técnico

## 🏷️ Labels - OBRIGATÓRIO

### Componente Label

**REGRA CRÍTICA**: SEMPRE usar `Label` component para labels de formulários. NUNCA usar `<Text>` direto para labels.

```tsx
import { Label } from '@/components/ui/label';

// ✅ CORRETO - Label para campos de formulário
<Label variant="form" required>
  Nome completo
</Label>

// ✅ CORRETO - Label para seções/headings
<Label variant="section" required>
  Informações básicas
</Label>

// ✅ CORRETO - Label inline (switch, checkbox)
<Label variant="inline">
  Notificações ativas
</Label>

// ✅ CORRETO - Helper text/descrição
<Label variant="helper">
  Mínimo 8 caracteres
</Label>

// ❌ ERRADO - Text direto para label
<Text style={styles.label}>Nome *</Text>
```

### Variants do Label

| Variant     | Uso                                      | Size      | Weight         | Color  |
| ----------- | ---------------------------------------- | --------- | -------------- | ------ |
| **form**    | Campos de formulário (Input, DatePicker) | sm (13px) | medium (500)   | light  |
| **section** | Section headings (Esporte, Duração)      | md (15px) | semibold (600) | light  |
| **inline**  | Labels inline (Switch, Checkbox)         | sm (13px) | regular (400)  | light  |
| **helper**  | Helper text/descrição                    | xs (11px) | regular (400)  | medium |

### Props do Label

```typescript
interface LabelProps {
  children: string; // Texto do label
  variant?: LabelVariant; // 'form' | 'section' | 'inline' | 'helper'
  size?: LabelSize; // Override de size (xs, sm, md, lg)
  required?: boolean; // Exibe asterisco vermelho (*)
  disabled?: boolean; // Estado disabled
  htmlFor?: string; // ID para acessibilidade
  style?: TextStyle; // Estilos customizados
  testID?: string; // ID para testes
}
```

## 🔄 Loading States - OBRIGATÓRIO

### Componente SportsLoading

**REGRA CRÍTICA**: SEMPRE usar `SportsLoading` para indicadores de carregamento. NUNCA usar `ActivityIndicator` do React Native.

```tsx
import { SportsLoading } from '@/components/ui/sportsLoading';

// ✅ CORRETO - Loading em tela cheia
<View style={styles.loadingContainer}>
  <SportsLoading size="lg" animationSpeed="normal" />
</View>

// ✅ CORRETO - Loading em lista (pagination)
<View style={styles.footer}>
  <SportsLoading size="sm" animationSpeed="fast" />
</View>

// ❌ ERRADO - Nunca usar ActivityIndicator
<ActivityIndicator size="large" />
```

---

## 🧩 Componentes UI Arena - OBRIGATÓRIOS

**REGRA CRÍTICA**: SEMPRE usar componentes do Design System Arena ao invés de primitivos React Native ou libs externas sem wrapper.

### ❌ NUNCA Usar Diretamente

| Primitivo React Native                   | ✅ Usar Componente Arena      | Localização                               |
| ---------------------------------------- | ----------------------------- | ----------------------------------------- |
| `<Switch>`                               | `<Switch>`                    | `@/components/ui/switch`                  |
| `<Text>`                                 | `<Text>`                      | `@/components/ui/text`                    |
| `<ActivityIndicator>`                    | `<SportsLoading>`             | `@/components/ui/sportsLoading`           |
| `<Image>`                                | `<OptimizedImage>`            | `@/components/ui/optimizedImage`          |
| `<TouchableOpacity>` (botão)             | `<Button>`                    | `@/components/ui/button`                  |
| `<TouchableOpacity>` (card)              | `<Card>`                      | `@/components/ui/card`                    |
| `@react-native-community/datetimepicker` | `<DatePicker>`                | `@/components/ui/datePicker`              |
| Chips customizados                       | `<Badge>` ou `<CardCheckbox>` | `@/components/ui/badge` ou `cardCheckbox` |

### ✅ Componentes UI Disponíveis

#### **Inputs & Forms**

```tsx
// Input de texto
import { Input } from '@/components/ui/input';
<Input label="Nome" value={name} onChangeText={setName} error={errors.name} />;

// Switch/Toggle
import { Switch } from '@/components/ui/switch';
<Switch
  value={isEnabled}
  onValueChange={setIsEnabled}
  label="Notificações"
  variant="brand"
/>;

// DatePicker
import { DatePicker } from '@/components/ui/datePicker';
<DatePicker
  label="Data de Nascimento"
  variant="date"
  value={birthDate}
  onChange={setBirthDate}
  error={errors.birthDate}
/>;

// Checkbox
import { Checkbox } from '@/components/ui/checkbox';
<Checkbox
  checked={agreed}
  onPress={() => setAgreed(!agreed)}
  label="Aceito os termos"
/>;

// CardCheckbox (para seleção em grid)
import { CardCheckbox } from '@/components/ui/cardCheckbox';
<CardCheckbox
  label="Futebol"
  icon="⚽"
  checked={selectedSport === 'football'}
  onPress={() => setSelectedSport('football')}
/>;

// CheckboxGroup
import { CheckboxGroup } from '@/components/ui/checkboxGroup';
<CheckboxGroup
  options={sports}
  selectedValues={selectedSports}
  onChange={setSelectedSports}
/>;

// Dropdown
import { Dropdown } from '@/components/ui/dropdown';
<Dropdown trigger={<Button>Opções</Button>} items={menuItems} />;

// RadioButton
import { RadioButton } from '@/components/ui/radioButton';
<RadioButton checked={selected} onPress={handleSelect} label="Opção 1" />;
```

#### **Layout & Navigation**

```tsx
// Button - NUNCA use <Text> dentro de <Button>
import { Button } from '@/components/ui/button';

// ✅ CORRETO - String direta como children
<Button variant="primary" onPress={handleSubmit} size="lg">
  Enviar
</Button>

// ❌ ERRADO - Nunca use <Text> dentro
<Button variant="primary" onPress={handleSubmit}>
  <Text>Enviar</Text>  {/* ❌ NÃO FAÇA ISSO */}
</Button>

// Card
import { Card } from '@/components/ui/card';
<Card variant="outlined" onPress={handlePress}>
  {children}
</Card>

// Accordion
import { Accordion } from '@/components/ui/accordion';
<Accordion
  variant="default"
  mode="single"
  items={[{
    id: 'section1',
    title: 'Seção 1',
    content: <View>Conteúdo</View>
  }]}
/>

// Link
import { Link } from '@/components/ui/link';
<Link href="/terms" variant="primary">
  <Text>Termos de Uso</Text>
</Link>

// ProgressBar
import { ProgressBar } from '@/components/ui/progressBar';
<ProgressBar progress={75} size="md" showPercentage />

// Stepper (wizard navigation)
import { Stepper } from '@/components/ui/stepper';
<Stepper
  currentStep={2}
  totalSteps={5}
  variant="dots"
/>
```

#### **Feedback & Status**

```tsx
// Badge
import { Badge } from '@/components/ui/badge';
<Badge variant="primary" size="md">Novo</Badge>

// SportsLoading
import { SportsLoading } from '@/components/ui/sportsLoading';
<SportsLoading size="lg" animationSpeed="normal" />

// Text (com variantes semânticas)
import { Text } from '@/components/ui/text';
<Text variant="headingPrimary">Título</Text>
<Text variant="bodyPrimary">Corpo</Text>
<Text variant="caption">Legenda</Text>
```

#### **Brand & Media**

```tsx
// Logo
import { Logo } from '@/components/ui/logo';
<Logo variant="full" size="lg" />;

// Symbol
import { Symbol } from '@/components/ui/symbol';
<Symbol size="md" variant="primary" />;

// AppIcon
import { AppIcon } from '@/components/ui/appIcon';
<AppIcon size="lg" />;

// OptimizedImage
import { OptimizedImage } from '@/components/ui/optimizedImage';
<OptimizedImage
  source={require('@/assets/image.png')}
  style={styles.image}
  contentFit="cover"
  priority="high"
/>;
```

### 📐 Guia de Espaçamento Arena

**Hierarquia de Espaçamento**:

```tsx
// 1. Entre Telas/Screens
paddingVertical: ArenaSpacing['2xl']; // 24px

// 2. Entre Sections
gap: ArenaSpacing.lg; // 16px
marginBottom: ArenaSpacing.lg; // 16px

// 3. Entre Inputs/Components
gap: ArenaSpacing.md; // 12px

// 4. Entre Cards em Grid
gap: ArenaSpacing.sm; // 8px

// 5. Entre Label e Input
marginBottom: ArenaSpacing.xs; // 4px

// Padding de Container
paddingHorizontal: ArenaSpacing.lg; // 16px
paddingVertical: ArenaSpacing.md; // 12px
```

**Exemplo Prático**:

```tsx
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
  },
  sectionsContainer: {
    gap: ArenaSpacing.lg, // Entre sections
  },
  section: {
    gap: ArenaSpacing.md, // Entre inputs
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ArenaSpacing.sm, // Entre cards
  },
});
```

### 🎨 Mapeamento de Tokens Tipografia

**SEMPRE usar tokens ao invés de valores hardcoded**:

```tsx
// ❌ ERRADO
fontSize: 16;
fontWeight: '600';

// ✅ CORRETO
fontSize: ArenaTypography.size.md;
fontWeight: ArenaTypography.weight.semibold;
```

**Mapeamento Completo**:

```tsx
// Font Sizes
11 → ArenaTypography.size.xs
13 → ArenaTypography.size.sm
15 → ArenaTypography.size.md
17 → ArenaTypography.size.lg
19 → ArenaTypography.size.xl
22 → ArenaTypography.size['2xl']
26 → ArenaTypography.size['3xl']
32 → ArenaTypography.size['4xl']

// Font Weights
'300' → ArenaTypography.weight.light
'400' → ArenaTypography.weight.regular
'500' → ArenaTypography.weight.medium
'600' → ArenaTypography.weight.semibold
'700' → ArenaTypography.weight.bold
'800' → ArenaTypography.weight.extrabold
```

### 🔒 Regras de Seleção de Componentes

**Para Seleção de Itens**:

- ❌ NUNCA criar "Chip" component
- ✅ Seleção única em grid → `<CardCheckbox>` com `icon` prop
- ✅ Seleção múltipla em grid → `<CardCheckbox>` com `icon` prop
- ✅ Tags/Labels estáticos → `<Badge>` com `variant` apropriado
- ✅ Seleção em lista → `<Checkbox>` ou `<RadioButton>`

**Para Navegação/Ação**:

- ❌ NUNCA usar `<TouchableOpacity>` diretamente para botões
- ✅ Botão primário/secundário → `<Button variant="primary|secondary">`
- ✅ Card clicável → `<Card onPress={...}>`
- ✅ Link/navegação → `<Link href="...">`
- ✅ FAB (floating) → `<Button variant="fab" iconOnly>`

**Para Datas**:

- ❌ NUNCA usar `@react-native-community/datetimepicker` diretamente
- ✅ SEMPRE usar `<DatePicker variant="datetime|date|time">`

**Para Loading**:

- ❌ NUNCA usar `<ActivityIndicator>`
- ✅ SEMPRE usar `<SportsLoading size="xs|sm|md|lg">`

**Para Imagens**:

- ❌ NUNCA usar `<Image>` do React Native
- ✅ SEMPRE usar `<OptimizedImage>` com `priority` e `contentFit`

### 📦 Import Paths Corretos

```tsx
// ✅ SEMPRE usar path alias
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArenaColors, ArenaSpacing, ArenaTypography } from '@/constants';

// ❌ NUNCA usar imports relativos para UI
import { Button } from '../../../components/ui/button';

// ❌ NUNCA usar imports diretos de libs externas (sem wrapper Arena)
import { Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
```

---

## 🔒 Regras de Componentes UI - Restrições de Children

### Componentes que NUNCA devem conter `<Text>` como children

Alguns componentes já gerenciam seu próprio texto internamente. **NUNCA** passe `<Text>` como children:

#### ❌ Button

```tsx
// ❌ ERRADO - Nunca use <Text> dentro
<Button variant="primary">
  <Text variant="bodyPrimary">Enviar</Text>  {/* ❌ CAUSARÁ ERRO */}
</Button>

// ✅ CORRETO - String direta
<Button variant="primary">Enviar</Button>
```

#### ❌ Badge

```tsx
// ❌ ERRADO
<Badge variant="primary">
  <Text variant="captionPrimary">Novo</Text>  {/* ❌ CAUSARÁ ERRO */}
</Badge>

// ✅ CORRETO
<Badge variant="primary">Novo</Badge>
```

#### ❌ Input, Label, RadioButton, Checkbox

Esses componentes recebem texto via **prop `label`**, NÃO como children:

```tsx
// ❌ ERRADO - Children não é aceito
<Input>
  <Text>Nome</Text>  {/* ❌ NÃO FUNCIONA */}
</Input>

// ✅ CORRETO - Use prop label
<Input label="Nome" value={name} onChangeText={setName} />
<Label variant="form" required>Nome completo</Label>
<RadioButton label="Opção 1" selected={selected} onPress={handleSelect} />
<Checkbox label="Aceito os termos" checked={checked} onPress={handlePress} />
```

### Componentes que ACEITAM `<Text>` como children

Apenas use `<Text>` dentro destes componentes quando necessário:

#### ✅ Card, View, ScrollView

```tsx
// ✅ Permitido - Containers genéricos
<Card variant="outlined">
  <Text variant="titlePrimary">Título do Card</Text>
  <Text variant="bodySecondary">Descrição do card...</Text>
</Card>

<View style={styles.container}>
  <Text variant="headingPrimary">Bem-vindo</Text>
</View>
```

#### ✅ Link

```tsx
// ✅ Link pode conter Text (mas precisa de variant)
<Link href="/terms">
  <Text variant="linkPrimary">Ver Termos de Uso</Text>
</Link>
```

### Resumo: Quando Usar `<Text>`

| Situação                           | Usar `<Text>`         | Como Passar Texto                          |
| ---------------------------------- | --------------------- | ------------------------------------------ |
| **Dentro de View/Card/ScrollView** | ✅ Sim, com `variant` | `<Text variant="bodyPrimary">Texto</Text>` |
| **Dentro de Button**               | ❌ Nunca              | String direta: `<Button>Enviar</Button>`   |
| **Dentro de Badge**                | ❌ Nunca              | String direta: `<Badge>Novo</Badge>`       |
| **Input/Label/Checkbox/Radio**     | ❌ Nunca              | Via prop: `label="Nome"`                   |
| **Textos livres na UI**            | ✅ Sempre             | `<Text variant="bodyPrimary">Texto</Text>` |

### ESLint Rules que Validam

- `arena/arena-text-requires-variant` - Garante que `<Text>` sempre tenha `variant`
- `arena/arena-use-ui-components` - Bloqueia uso de componentes primitivos do React Native

---

## ⌨️ Keyboard Handling - ArenaKeyboardAwareScrollView

### 🚨 REGRA CRÍTICA: Gerenciamento de Teclado

**NUNCA** use `KeyboardAwareScrollView` diretamente da lib `react-native-keyboard-controller`. **SEMPRE** use o wrapper customizado `ArenaKeyboardAwareScrollView`.

### Por que usar ArenaKeyboardAwareScrollView?

O componente `ArenaKeyboardAwareScrollView` é um wrapper que resolve problemas de plataforma:

- **iOS**: Usa `ScrollView` nativo com `automaticallyAdjustKeyboardInsets={true}` (solução estável sem bugs)
- **Android**: Usa `KeyboardAwareScrollView` da lib `react-native-keyboard-controller` (funciona perfeitamente)

### Problema com KeyboardAwareScrollView no iOS

A lib `react-native-keyboard-controller` tem um **bug conhecido (Issue #338)** onde o `KeyboardAwareScrollView` não funciona no primeiro launch após instalação no iOS. Funciona apenas após reload do app.

### ✅ Uso Correto

```tsx
import { ArenaKeyboardAwareScrollView } from '@/components/ui/arenaKeyboardAwareScrollView';

// ✅ CORRETO - Wrapper Arena
<ArenaKeyboardAwareScrollView
  contentContainerStyle={styles.scrollContent}
  showsVerticalScrollIndicator={false}
  keyboardShouldPersistTaps="handled"
  bottomOffset={60}
>
  <Input label="Nome" value={name} onChangeText={setName} />
  <Input label="Email" value={email} onChangeText={setEmail} />
</ArenaKeyboardAwareScrollView>;

// ❌ ERRADO - Lib direta
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
<KeyboardAwareScrollView>...</KeyboardAwareScrollView>;
```

### Props do ArenaKeyboardAwareScrollView

| Prop                           | Tipo                               | Default     | Descrição                                     |
| ------------------------------ | ---------------------------------- | ----------- | --------------------------------------------- |
| `children`                     | `ReactNode`                        | -           | Conteúdo do scroll                            |
| `contentContainerStyle`        | `StyleProp<ViewStyle>`             | -           | Estilos do container de conteúdo              |
| `showsVerticalScrollIndicator` | `boolean`                          | `false`     | Exibir indicador de scroll                    |
| `keyboardShouldPersistTaps`    | `'always' \| 'never' \| 'handled'` | `'handled'` | Comportamento de toque com teclado aberto     |
| `bottomOffset`                 | `number`                           | `60`        | Espaço entre input e teclado (apenas Android) |
| `testID`                       | `string`                           | -           | ID para testes                                |

### bottomOffset - Valores Recomendados

- **60px**: Telas sem footer fixo (RegisterScreen, LoginScreen, CreateEventScreen steps)
- **100px**: Telas com footer fixo (EditProfileScreen, FilterScreen, FilterModal)
- **120px**: Modais complexos com múltiplos botões (SelectionModal)

**Nota**: No iOS, `bottomOffset` é ignorado pois `automaticallyAdjustKeyboardInsets` calcula automaticamente o espaço necessário.

### Implementação Interna

```tsx
// iOS - ScrollView nativo
if (Platform.OS === 'ios') {
  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="handled"
      {...props}
    >
      {children}
    </ScrollView>
  );
}

// Android - KeyboardAwareScrollView da lib
return (
  <KeyboardAwareScrollView
    disableScrollOnKeyboardHide={false}
    bottomOffset={bottomOffset}
    keyboardShouldPersistTaps="handled"
    {...props}
  >
    {children}
  </KeyboardAwareScrollView>
);
```

### 🔒 Regras Obrigatórias

1. **NUNCA** importe `KeyboardAwareScrollView` diretamente de `react-native-keyboard-controller`
2. **SEMPRE** use `ArenaKeyboardAwareScrollView` para telas com inputs
3. **SEMPRE** defina `keyboardShouldPersistTaps="handled"`
4. Use `bottomOffset` apropriado para o tipo de tela (60/100/120)
5. NO iOS, confie no `automaticallyAdjustKeyboardInsets` - não tente ajustar manualmente

### Benefícios

- ✅ **Cross-platform**: Comportamento idêntico em iOS e Android
- ✅ **iOS estável**: Usa solução nativa sem bugs conhecidos
- ✅ **Android otimizado**: Usa lib testada e funcional
- ✅ **Simples**: API única para ambas plataformas
- ✅ **Mantível**: Centraliza lógica de plataforma em um componente

---

## 📱 Safe Area Protection

### 🚨 REGRA CRÍTICA: Safe Area via HOC Global

**NUNCA** adicionar `<SafeAreaView>` dentro de componentes de tela.
A proteção de safe area é **automática** via `withAndroidScreenWrapper` HOC configurado no `AppNavigator.tsx`.

### 🌟 Proteção Automática (PADRÃO ATUAL)

**TODAS as 32 telas** são automaticamente envolvidas por `withAndroidScreenWrapper` no `AppNavigator.tsx`:

```tsx
// ❌ ERRADO - SafeAreaView manual (REDUNDANTE)
export const MyScreen: React.FC = () => {
  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <View style={styles.container}>...</View>
    </SafeAreaView>
  );
};

// ✅ CORRETO - Wrapper HOC no AppNavigator gerencia automaticamente
export const MyScreen: React.FC = () => {
  return (
    <View style={styles.container}>...</View>
  );
};
```

**Por que não incluir 'bottom'?**
- Telas de abas: Bottom tab bar gerencia bottom inset
- Telas de stack: Navegação gerencia bottom inset
- Telas com footer fixo: Usar `useSafeAreaInsets()` para padding dinâmico no footer

### Configuração no AppNavigator

**Configuração padrão** (aplicada automaticamente):

```tsx
// arquivo: src/navigation/AppNavigator.tsx
const WrappedMyScreen = withAndroidScreenWrapper(MyScreen, {
  enableScroll: false,
});
// Automaticamente aplica edges={['top', 'left', 'right']}
```

**Telas com AppLayout** (DEVEM usar `safeAreaEdges: false`):

```tsx
// arquivo: src/navigation/AppNavigator.tsx
const WrappedProfileScreen = withAndroidScreenWrapper(ProfileScreen, {
  safeAreaEdges: false, // ← OBRIGATÓRIO para evitar duplicação
});
```

### Constantes SafeAreaEdges Disponíveis

Use no `AppNavigator.tsx` quando necessário personalizar:

- `DEFAULT`: `['top', 'left', 'right']` - Maioria das telas (padrão automático)
- `FULL_SCREEN`: `['top', 'bottom', 'left', 'right']` - Map, Camera
- `TAB_SCREEN`: `['top', 'left', 'right']` - Telas em tabs
- `MODAL`: `['top', 'left', 'right']` - Modais
- `BOTTOM_MODAL`: `['bottom', 'left', 'right']` - Bottom sheets
- `false`: Desabilita wrapper (para telas com AppLayout)

### Telas com Footer Fixo

Para telas com footer fixo, usar `useSafeAreaInsets()` para padding dinâmico no footer. O wrapper HOC gerencia top/left/right automaticamente:

```tsx
// arquivo: src/screens/myScreen/index.tsx
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArenaSpacing } from '@/constants';

export const MyScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <FlatList data={items} renderItem={renderItem} />

      <View
        style={[
          styles.footer,
          { paddingBottom: ArenaSpacing.md + (insets.bottom || 0) },
        ]}
      >
        <Button>Salvar</Button>
      </View>
    </View>
  );
};
```

### ❌ O Que NUNCA Fazer

1. **Nunca adicionar SafeAreaView manual** - wrapper HOC gerencia automaticamente
2. **Nunca esquecer `safeAreaEdges: false`** em telas com AppLayout
3. **Nunca hardcoded insets** - usar `useSafeAreaInsets()` para footers
4. **Nunca usar valores fixos** - usar tokens Arena

### Guia Completo

**Consulte**: [`SAFE_AREA_GUIDE.md`](./SAFE_AREA_GUIDE.md) para documentação completa com exemplos detalhados, padrões de uso e troubleshooting.

---

**IMPORTANTE**: Este arquivo deve ser consultado SEMPRE antes de criar ou modificar código. As regras aqui são obrigatórias e não opcionais.
