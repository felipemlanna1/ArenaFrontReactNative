# 🎨 Guia de Migração para Sistema de Temas Dinâmicos

## 📋 Visão Geral

Este guia explica como migrar componentes para o novo sistema de temas dinâmicos do Arena que permite trocar entre 3 temas diferentes **SEM necessidade de reload da aplicação**.

## 🎯 Temas Disponíveis

| Tema      | Nome Display | Uso                              | Key        |
| --------- | ------------ | -------------------------------- | ---------- |
| Black     | Tema Preto   | Desenvolvimento (fundo #000000)  | `black`    |
| Blue-Gray | Tema Azul    | Produção (fundo #1B1D29)         | `blueGray` |
| Light     | Tema Claro   | Modo diurno (fundo #FFFFFF)      | `light`    |

## 🔧 Padrão de Implementação

### Antes (Padrão Antigo - Estático)

```typescript
// stylesX.ts
import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.darkest, // ❌ Valor fixo
  },
});

// Component.tsx
import { styles } from './stylesX';

export const Component = () => {
  return <View style={styles.container}>...</View>;
};
```

**Problema**: `StyleSheet.create()` executa UMA VEZ no carregamento do módulo e congela os valores das cores. Mesmo que o tema mude, os estilos não atualizam.

### Depois (Padrão Novo - Dinâmico)

```typescript
// stylesX.ts
import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';
import type { ThemeColors } from '@/types/theme';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.neutral.darkest, // ✅ Dinâmico via ThemeColors
    },
  });

// Component.tsx
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { createStyles } from './stylesX';

export const Component = () => {
  const styles = useThemedStyles(createStyles);

  return <View style={styles.container}>...</View>;
};
```

**Solução**: `useThemedStyles` usa `useMemo` para regenerar os estilos sempre que o tema mudar, fazendo o React re-renderizar automaticamente.

## 📝 Passo a Passo de Migração

### 1. Atualizar Arquivo de Estilos

**De:**
```typescript
export const styles = StyleSheet.create({ ... });
```

**Para:**
```typescript
export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({ ... });
```

**Trocar:**
- `ArenaColors.neutral.darkest` → `colors.neutral.darkest`
- `ArenaColors.brand.primary` → `colors.brand.primary`
- `ArenaColors.semantic.error` → `colors.semantic.error`
- Etc.

### 2. Atualizar Componente

**Adicionar imports:**
```typescript
import { useThemedStyles } from '@/hooks/useThemedStyles';
import type { ThemeColors } from '@/types/theme';
```

**Mudar import do styles:**
```typescript
// De:
import { styles } from './stylesX';

// Para:
import { createStyles } from './stylesX';
```

**Usar hook no componente:**
```typescript
export const Component = () => {
  const styles = useThemedStyles(createStyles); // ← Adicionar

  return <View style={styles.container}>...</View>;
};
```

### 3. Cores Inline (Opcional)

Para cores usadas fora do StyleSheet (ex: ícones):

```typescript
import { useTheme } from '@/contexts/ThemeContext';

export const Component = () => {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <Ionicons
      name="star"
      color={colors.brand.primary} // ✅ Cor dinâmica
    />
  );
};
```

## 🎯 Exemplos Completos

### Exemplo 1: Screen Simples

```typescript
// src/screens/myScreen/stylesMyScreen.ts
import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';
import type { ThemeColors } from '@/types/theme';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.neutral.darkest,
    },
    title: {
      color: colors.text.primary,
    },
    button: {
      backgroundColor: colors.brand.primary,
    },
  });

// src/screens/myScreen/index.tsx
import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { createStyles } from './stylesMyScreen';

export const MyScreen = () => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <Text variant="titlePrimary" style={styles.title}>
        Minha Tela
      </Text>
    </View>
  );
};
```

### Exemplo 2: Componente com Cores Inline

```typescript
// src/components/myCard/stylesMyCard.ts
import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaBorders } from '@/constants';
import type { ThemeColors } from '@/types/theme';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      padding: ArenaSpacing.lg,
      backgroundColor: colors.neutral.dark,
      borderRadius: ArenaBorders.radius.md,
    },
  });

// src/components/myCard/index.tsx
import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useTheme } from '@/contexts/ThemeContext';
import { createStyles } from './stylesMyCard';

export const MyCard = () => {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.card}>
      <Ionicons name="star" size={24} color={colors.brand.primary} />
      <Text variant="bodyPrimary">Meu Card</Text>
    </View>
  );
};
```

## 🚀 Como Usar o Sistema de Temas

### Para Desenvolvedores

```typescript
import { useTheme } from '@/contexts/ThemeContext';

const { theme, colors, setTheme } = useTheme();

await setTheme('light');
```

### Para Usuários

1. Abra o app
2. Vá em **Menu → Configurações**
3. Seção **Aparência**
4. Selecione o tema desejado
5. O app atualiza **instantaneamente** (sem reload!)

## 📚 API Reference

### `useTheme()`

Retorna o contexto do tema.

```typescript
const { theme, colors, setTheme, isLoading } = useTheme();
```

**Retorno:**
- `theme: ThemeName` - Tema atual ('black' | 'blueGray' | 'light')
- `colors: ThemeColors` - Objeto com todas as cores do tema atual
- `setTheme: (theme: ThemeName) => Promise<void>` - Função para mudar tema
- `isLoading: boolean` - Estado de carregamento inicial

### `useThemedStyles(createStylesFn)`

Hook que regenera estilos quando o tema mudar.

```typescript
const styles = useThemedStyles(createStyles);
```

**Parâmetros:**
- `createStylesFn: (colors: ThemeColors) => T` - Função que cria estilos baseada nas cores

**Retorno:**
- `T` - Objeto de estilos regenerado automaticamente quando tema muda

## ✅ Checklist de Migração

- [ ] Criar função `createStyles` que recebe `colors: ThemeColors`
- [ ] Trocar `ArenaColors.x` por `colors.x` nos estilos
- [ ] Importar `useThemedStyles` no componente
- [ ] Mudar `import { styles }` para `import { createStyles }`
- [ ] Adicionar `const styles = useThemedStyles(createStyles)` no componente
- [ ] Para cores inline, usar `const { colors } = useTheme()`
- [ ] Testar mudança de tema na tela de Settings
- [ ] Verificar que componente atualiza SEM reload

## 🎨 Tokens Disponíveis

Todos os tokens em `ThemeColors`:

- `colors.brand.*` - Cores primárias (primary, secondary, hover, pressed)
- `colors.neutral.*` - Cores neutras (darkest, dark, medium, light, etc.)
- `colors.text.*` - Cores de texto (primary, secondary, inverse)
- `colors.interaction.*` - Estados de interação (hover, pressed, focus)
- `colors.disabled.*` - Estados desabilitados
- `colors.semantic.*` - Cores semânticas (error, success, warning)
- `colors.achievement.*` - Conquistas (bronze, silver, gold, platinum)
- `colors.backdrop.*` - Overlays e fundos

## ⚠️ Importante

### O que MUDOU
- ✅ **Não precisa mais de app reload** - React re-renderiza automaticamente
- ✅ **Performance mantida** - `useMemo` otimiza regeneração de estilos
- ✅ **StyleSheet continua sendo usado** - Melhor performance que styled-components (23% mais rápido)

### O que NÃO MUDOU
- ✅ Continua usando `StyleSheet.create()`
- ✅ Continua usando tokens Arena (`ArenaSpacing`, `ArenaBorders`, etc.)
- ✅ Continua seguindo todas as regras do CLAUDE.md
- ✅ Não precisa refatorar TODOS os componentes de uma vez

## 🔄 Migração Gradual

Você pode migrar componentes gradualmente:
1. Componentes migrados → respondem ao tema
2. Componentes não migrados → continuam funcionando (cores fixas)

**Prioridade de migração:**
1. ✅ **AppLayout** (já migrado) - afeta todas as telas
2. ✅ **SettingsScreen** (já migrado) - onde usuário muda tema
3. Telas principais (ExploreScreen, ProfileScreen, etc.)
4. Componentes UI reutilizáveis
5. Telas secundárias

## 📖 Fontes e Referências

Esta implementação segue as melhores práticas da comunidade React Native 2025:

- [Theme Switching in React Native (Medium, Oct 2025)](https://jerrintkg.medium.com/theme-switching-in-react-native-e26eabac113e)
- [Reactive styles in React Native (Supercharge)](https://medium.com/supercharges-mobile-product-guide/reactive-styles-in-react-native-79a41fbdc404)
- [Managing Themes in React Native Using Context API (DEV)](https://dev.to/amitkumar13/managing-themes-in-react-native-using-context-api-3dk2)

**Padrão recomendado:** Context API + `useMemo` + `StyleSheet.create()` para performance otimizada.
