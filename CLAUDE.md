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
import { ArenaColors, ArenaSpacing, ArenaTypography } from '@/constants';

// ✅ CORRETO
const styles = StyleSheet.create({
  container: {
    padding: ArenaSpacing.lg,
    backgroundColor: ArenaColors.neutral.dark,
  },
  title: {
    fontSize: ArenaTypography.size['2xl'],
    fontWeight: ArenaTypography.weight.semibold,
  },
});

// ❌ ERRADO
const styles = StyleSheet.create({
  container: {
    padding: 16, // Valor hardcoded
    backgroundColor: '#20303D', // Cor hardcoded
  },
});
```

### Cores Arena

- **Primária**: `ArenaColors.brand.primary` (#FF5301)
- **Neutra Escura**: `ArenaColors.neutral.darkest` (#1B1D29)
- **Neutra Média**: `ArenaColors.neutral.medium` (#B8B8B8)
- **Neutra Clara**: `ArenaColors.neutral.light` (#FFFFFF)

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

| Variant | Uso | Size | Weight | Color |
|---------|-----|------|--------|-------|
| **form** | Campos de formulário (Input, DatePicker) | sm (13px) | medium (500) | light |
| **section** | Section headings (Esporte, Duração) | md (15px) | semibold (600) | light |
| **inline** | Labels inline (Switch, Checkbox) | sm (13px) | regular (400) | light |
| **helper** | Helper text/descrição | xs (11px) | regular (400) | medium |

### Props do Label

```typescript
interface LabelProps {
  children: string;           // Texto do label
  variant?: LabelVariant;     // 'form' | 'section' | 'inline' | 'helper'
  size?: LabelSize;           // Override de size (xs, sm, md, lg)
  required?: boolean;         // Exibe asterisco vermelho (*)
  disabled?: boolean;         // Estado disabled
  htmlFor?: string;           // ID para acessibilidade
  style?: TextStyle;          // Estilos customizados
  testID?: string;            // ID para testes
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

### Componente ArenaRefreshControl

**REGRA**: Para pull-to-refresh, usar `ArenaRefreshControl` ao invés do `RefreshControl` padrão.

```tsx
import { ArenaRefreshControl } from '@/components/ui/refreshControl';

// ✅ CORRETO - RefreshControl Arena
<FlatList
  data={items}
  refreshControl={
    <ArenaRefreshControl
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
    />
  }
/>

// ❌ ERRADO - RefreshControl padrão
import { RefreshControl } from 'react-native';
<RefreshControl refreshing={...} />
```

---

## 🧩 Componentes UI Arena - OBRIGATÓRIOS

**REGRA CRÍTICA**: SEMPRE usar componentes do Design System Arena ao invés de primitivos React Native ou libs externas sem wrapper.

### ❌ NUNCA Usar Diretamente

| Primitivo React Native | ✅ Usar Componente Arena | Localização |
|------------------------|--------------------------|-------------|
| `<Switch>` | `<Switch>` | `@/components/ui/switch` |
| `<Text>` | `<Text>` | `@/components/ui/text` |
| `<ActivityIndicator>` | `<SportsLoading>` | `@/components/ui/sportsLoading` |
| `<RefreshControl>` | `<ArenaRefreshControl>` | `@/components/ui/refreshControl` |
| `<Image>` | `<OptimizedImage>` | `@/components/ui/optimizedImage` |
| `<TouchableOpacity>` (botão) | `<Button>` | `@/components/ui/button` |
| `<TouchableOpacity>` (card) | `<Card>` | `@/components/ui/card` |
| `@react-native-community/datetimepicker` | `<DatePicker>` | `@/components/ui/datePicker` |
| Chips customizados | `<Badge>` ou `<CardCheckbox>` | `@/components/ui/badge` ou `cardCheckbox` |

### ✅ Componentes UI Disponíveis

#### **Inputs & Forms**
```tsx
// Input de texto
import { Input } from '@/components/ui/input';
<Input label="Nome" value={name} onChangeText={setName} error={errors.name} />

// Switch/Toggle
import { Switch } from '@/components/ui/switch';
<Switch
  value={isEnabled}
  onValueChange={setIsEnabled}
  label="Notificações"
  variant="brand"
/>

// DatePicker
import { DatePicker } from '@/components/ui/datePicker';
<DatePicker
  label="Data de Nascimento"
  variant="date"
  value={birthDate}
  onChange={setBirthDate}
  error={errors.birthDate}
/>

// Checkbox
import { Checkbox } from '@/components/ui/checkbox';
<Checkbox
  checked={agreed}
  onPress={() => setAgreed(!agreed)}
  label="Aceito os termos"
/>

// CardCheckbox (para seleção em grid)
import { CardCheckbox } from '@/components/ui/cardCheckbox';
<CardCheckbox
  label="Futebol"
  icon="⚽"
  checked={selectedSport === 'football'}
  onPress={() => setSelectedSport('football')}
/>

// CheckboxGroup
import { CheckboxGroup } from '@/components/ui/checkboxGroup';
<CheckboxGroup
  options={sports}
  selectedValues={selectedSports}
  onChange={setSelectedSports}
/>

// Dropdown
import { Dropdown } from '@/components/ui/dropdown';
<Dropdown
  trigger={<Button>Opções</Button>}
  items={menuItems}
/>

// RadioButton
import { RadioButton } from '@/components/ui/radioButton';
<RadioButton
  checked={selected}
  onPress={handleSelect}
  label="Opção 1"
/>
```

#### **Layout & Navigation**
```tsx
// Button
import { Button } from '@/components/ui/button';
<Button variant="primary" onPress={handleSubmit} size="lg">
  <Text>Enviar</Text>
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
<Logo variant="full" size="lg" />

// Symbol
import { Symbol } from '@/components/ui/symbol';
<Symbol size="md" variant="primary" />

// AppIcon
import { AppIcon } from '@/components/ui/appIcon';
<AppIcon size="lg" />

// OptimizedImage
import { OptimizedImage } from '@/components/ui/optimizedImage';
<OptimizedImage
  source={require('@/assets/image.png')}
  style={styles.image}
  contentFit="cover"
  priority="high"
/>
```

### 📐 Guia de Espaçamento Arena

**Hierarquia de Espaçamento**:

```tsx
// 1. Entre Telas/Screens
paddingVertical: ArenaSpacing['2xl']  // 24px

// 2. Entre Sections
gap: ArenaSpacing.lg                  // 16px
marginBottom: ArenaSpacing.lg         // 16px

// 3. Entre Inputs/Components
gap: ArenaSpacing.md                  // 12px

// 4. Entre Cards em Grid
gap: ArenaSpacing.sm                  // 8px

// 5. Entre Label e Input
marginBottom: ArenaSpacing.xs         // 4px

// Padding de Container
paddingHorizontal: ArenaSpacing.lg    // 16px
paddingVertical: ArenaSpacing.md      // 12px
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
fontSize: 16
fontWeight: '600'

// ✅ CORRETO
fontSize: ArenaTypography.size.md
fontWeight: ArenaTypography.weight.semibold
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

**IMPORTANTE**: Este arquivo deve ser consultado SEMPRE antes de criar ou modificar código. As regras aqui são obrigatórias e não opcionais.
