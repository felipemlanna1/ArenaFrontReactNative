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

**IMPORTANTE**: Este arquivo deve ser consultado SEMPRE antes de criar ou modificar código. As regras aqui são obrigatórias e não opcionais.
