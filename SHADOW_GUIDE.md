# Arena Shadow System - Guia de Aplicação

## 📐 Padrão de Fonte de Luz

**Fonte de Luz**: Topo-esquerda (ângulo ~20-25°)
**Sombras Projetadas**: Baixo-direita
**Sintaxe**: CSS `boxShadow` (suportado por react-native-reanimated)

## 🎨 Tokens de Sombra Disponíveis

### Sombras Básicas

```typescript
ArenaShadows.none; // 'none' - Sem sombra
ArenaShadows.subtle; // '1px 2px 4px 0px rgba(0, 0, 0, 0.15)' - Sutil
ArenaShadows.soft; // '2px 4px 8px 0px rgba(0, 0, 0, 0.22)' - Suave
ArenaShadows.medium; // '3px 6px 12px 0px rgba(0, 0, 0, 0.26)' - Média
ArenaShadows.strong; // '4px 9px 16px 0px rgba(0, 0, 0, 0.28)' - Forte
ArenaShadows.elevated; // '4px 9px 16px 0px rgba(0, 0, 0, 0.25)' - Elevado
```

### Sombras para Componentes Específicos

```typescript
ArenaShadows.button; // '2px 4px 8px 0px rgba(0, 0, 0, 0.25)' - Botões
ArenaShadows.input; // '1px 2px 6px 0px rgba(0, 0, 0, 0.15)' - Inputs
ArenaShadows.card; // '3px 6px 12px 0px rgba(0, 0, 0, 0.24)' - Cards
```

### Glows (Brilhos sem Offset)

```typescript
ArenaShadows.inputFocused; // '0px 0px 10px 0px rgba(255, 83, 1, 0.3)' - Input focado
ArenaShadows.brandGlow; // '0px 0px 12px 0px rgba(255, 83, 1, 0.4)' - Brilho laranja
ArenaShadows.errorGlow; // '0px 0px 12px 0px rgba(239, 68, 68, 0.35)' - Brilho erro
```

## 📦 Componentes UI e Suas Sombras

### ✅ Componentes COM Sombras

| Componente          | Token Usado                                      | Justificativa                           |
| ------------------- | ------------------------------------------------ | --------------------------------------- |
| **Button**          | `button`, `soft`, `none`                         | Elementos interativos precisam destaque |
| **Input**           | `input`, `inputFocused`, `errorGlow`             | Feedback visual de foco e erro          |
| **Card**            | `card`, `soft`, `elevated`                       | Diferentes níveis de elevação           |
| **Badge**           | `subtle`                                         | Pequeno destaque sem sobrecarregar      |
| **Checkbox (card)** | `soft` (não selecionado), `medium` (selecionado) | Diferenciação de estados                |

### ❌ Componentes SEM Sombras

| Componente        | Motivo                     |
| ----------------- | -------------------------- |
| **Link**          | Elemento inline de texto   |
| **Text**          | Componente de texto puro   |
| **Logo**          | Elemento de branding (SVG) |
| **AppIcon**       | Ícone de aplicativo        |
| **Symbol**        | Ícones simples             |
| **SportsLoading** | Animação de loading        |
| **CheckboxGroup** | Apenas wrapper/container   |

## 💡 Como Aplicar Sombras

### Uso Básico

```typescript
import { ArenaShadows } from '@/constants';

const styles = StyleSheet.create({
  container: {
    // ... outros estilos
    boxShadow: ArenaShadows.card,
  },
});
```

### Sombras Condicionais

```typescript
const styles = StyleSheet.create({
  button: {
    boxShadow: pressed ? ArenaShadows.none : ArenaShadows.button,
  },
  checkbox: {
    boxShadow: checked ? ArenaShadows.medium : ArenaShadows.soft,
  },
});
```

### Múltiplas Variantes

```typescript
const styles = StyleSheet.create({
  primaryButton: {
    overflow: 'hidden',
    boxShadow: ArenaShadows.button,
  },
  secondaryButton: {
    overflow: 'hidden',
    borderWidth: 2,
    boxShadow: ArenaShadows.soft,
  },
  ghostButton: {
    overflow: 'hidden',
    boxShadow: ArenaShadows.none,
  },
});
```

## 🎯 Princípios de Aplicação

### 1. Hierarquia Visual

- **Elementos principais**: `medium`, `strong`, `elevated`
- **Elementos secundários**: `soft`, `button`
- **Elementos terciários**: `subtle`
- **Elementos flat**: `none`

### 2. Estados Interativos

- **Default**: Sombra padrão do componente
- **Hover/Pressed**: Reduzir ou remover sombra (`.none`)
- **Focused**: Usar glow (`inputFocused`, `brandGlow`)
- **Disabled**: Reduzir opacidade geral, manter sombra

### 3. Consistência

- Componentes similares devem usar sombras similares
- Manter a fonte de luz consistente (topo-esquerda)
- Todos os offsets seguem proporção `offsetX ≈ offsetY / 2`

## 🚨 Regras Importantes

### ✅ FAZER

- Usar tokens `ArenaShadows` ao invés de valores hardcoded
- Aplicar `overflow: 'hidden'` quando necessário
- Usar `boxShadow` (sintaxe CSS string)
- Manter consistência com fonte de luz

### ❌ NÃO FAZER

- Criar sombras inline ou hardcoded
- Usar `Platform.select` para sombras
- Misturar diferentes ângulos de luz
- Aplicar sombras em componentes de texto puro

## 📝 Exemplo Completo

```typescript
// Badge Component
import { StyleSheet } from 'react-native';
import { ArenaShadows } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    boxShadow: ArenaShadows.subtle, // ✅ Sombra sutil para badge
  },
});
```

```typescript
// Card Component
import { StyleSheet } from 'react-native';
import { ArenaShadows } from '@/constants';

export const styles = StyleSheet.create({
  default: {
    overflow: 'hidden', // Necessário para clipar conteúdo interno
    boxShadow: ArenaShadows.card, // ✅ Sombra média para cards
  },
  elevated: {
    overflow: 'hidden',
    boxShadow: ArenaShadows.elevated, // ✅ Sombra forte para destaque
  },
});
```

## 🔄 Atualizações Futuras

Quando adicionar novos componentes UI:

1. Analise se o componente precisa de sombra
2. Escolha o token apropriado baseado na hierarquia
3. Mantenha consistência com componentes similares
4. Atualize este guia com a decisão

---

**Última atualização**: 2025-10-02
**Versão**: 1.0.0
