# Arena ESLint Rules - Regras Personalizadas

Este projeto possui regras ESLint customizadas para garantir que todos os padrões Arena sejam seguidos automaticamente.

## 🎯 Regras Implementadas

### 1. arena/arena-design-tokens ⚠️ ERROR

**Função**: Obriga o uso de tokens Arena ao invés de valores hardcoded.

**Exemplos de violações:**
```tsx
// ❌ ERRO - Valores hardcoded
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1B1D29', // ❌ Use ArenaColors.neutral.darkest
    padding: 16,                // ❌ Use ArenaSpacing.lg
    fontSize: 24,               // ❌ Use ArenaTypography.size['2xl']
    borderRadius: 8,            // ❌ Use ArenaBorders.radius.lg
  }
});
```

```tsx
// ✅ CORRETO - Usando tokens Arena
import { ArenaColors, ArenaSpacing, ArenaTypography, ArenaBorders } from '@/constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.darkest, // ✅
    padding: ArenaSpacing.lg,                     // ✅
    fontSize: ArenaTypography.size['2xl'],        // ✅
    borderRadius: ArenaBorders.radius.lg,         // ✅
  }
});
```

### 2. arena/arena-file-structure ⚠️ WARN

**Função**: Verifica estrutura de arquivos e nomenclatura Arena.

**Verificações:**
- Nomenclatura de arquivos: `styles[ComponentName].ts`, `types[ComponentName].ts`
- Imports obrigatórios de estilos
- Máximo 150 linhas por arquivo
- Exports nomeados (não default)

```tsx
// ❌ VIOLAÇÕES
export default function Component() {} // ❌ Use export nomeado

// arquivo: styles.ts (❌ Use stylesComponentName.ts)
// arquivo com 200+ linhas (❌ Máximo 150 linhas)
```

```tsx
// ✅ CORRETO
export const ComponentName: React.FC = () => {} // ✅

// arquivo: stylesComponentName.ts ✅
// arquivo: typesComponentName.ts ✅
// arquivo com menos de 150 linhas ✅
```

### 3. arena/arena-best-practices ⚠️ WARN

**Função**: Aplica melhores práticas de desenvolvimento Arena.

**Verificações:**
- Sem estilos inline
- Sem console.log
- Sem uso de `any`
- Uso de useCallback para handlers
- Path aliases ao invés de imports relativos
- Textos em constantes ao invés de hardcoded

```tsx
// ❌ VIOLAÇÕES
console.log('debug'); // ❌ Remove antes do commit

<Text style={{color: 'red'}}>Texto</Text> // ❌ Sem estilos inline

import Component from '../../../components/Component'; // ❌ Use @/components

const handler = () => {}; // ❌ Use useCallback em componentes

<Text>Texto hardcoded</Text> // ❌ Use constantes de texto
```

```tsx
// ✅ CORRETO
import { Component } from '@/components'; // ✅ Path alias

const handler = useCallback(() => {}, []); // ✅ useCallback

<Text style={styles.text}>{TEXTS.WELCOME.TITLE}</Text> // ✅ Estilos e textos em constantes
```

## 📋 Configurações Disponíveis

### Configuração Recomendada (Padrão)
```javascript
'arena/arena-design-tokens': 'error',    // Tokens obrigatórios
'arena/arena-file-structure': 'warn',    // Estrutura recomendada
'arena/arena-best-practices': 'warn',    // Práticas recomendadas
```

### Configuração Strict (Produção)
```javascript
'arena/arena-design-tokens': 'error',    // Tokens obrigatórios
'arena/arena-file-structure': 'error',   // Estrutura obrigatória
'arena/arena-best-practices': 'error',   // Práticas obrigatórias
```

### Configuração Development (Desenvolvimento)
```javascript
'arena/arena-design-tokens': 'warn',     // Tokens como warning
'arena/arena-file-structure': 'warn',    // Estrutura como warning
'arena/arena-best-practices': 'off',     // Práticas desabilitadas
```

## 🚀 Como Usar

### Verificar arquivo específico:
```bash
npx eslint -c eslint.config.simple.js nome-do-arquivo.tsx
```

### Verificar projeto completo:
```bash
npm run lint
```

### Correção automática (quando possível):
```bash
npm run lint:fix
```

## 📝 Mensagens de Erro Comuns

| Erro | Solução |
|------|---------|
| `Use ArenaColors tokens instead of hardcoded color values` | Substitua cores hex por `ArenaColors.brand.primary` |
| `Use ArenaSpacing tokens instead of hardcoded spacing values` | Substitua números por `ArenaSpacing.lg` |
| `Use ArenaTypography tokens instead of hardcoded font values` | Substitua font-size por `ArenaTypography.size.xl` |
| `Avoid inline styles` | Mova estilos para arquivo `styles[Component].ts` |
| `Remove console.log statements` | Remova ou comente console.log antes do commit |
| `Use named exports instead of default exports` | Use `export const Component = () => {}` |

## 🎨 Tokens Arena Disponíveis

### Cores
```typescript
ArenaColors.brand.primary       // #FF5301
ArenaColors.neutral.darkest     // #1B1D29
ArenaColors.neutral.light       // #FFFFFF
```

### Espaçamento
```typescript
ArenaSpacing.xs    // 4px
ArenaSpacing.sm    // 8px
ArenaSpacing.md    // 12px
ArenaSpacing.lg    // 16px
ArenaSpacing.xl    // 20px
```

### Tipografia
```typescript
ArenaTypography.size.md         // 15px
ArenaTypography.size['2xl']     // 22px
ArenaTypography.weight.bold     // '700'
```

### Bordas
```typescript
ArenaBorders.radius.sm          // 4px
ArenaBorders.radius.lg          // 8px
ArenaBorders.width.thin         // 1px
```

## ⚠️ Ignorar Regras (Use com Moderação)

```typescript
// eslint-disable-next-line arena/arena-design-tokens
const specialCase = { backgroundColor: '#FF0000' };

/* eslint-disable arena/arena-best-practices */
console.log('Debug necessário');
/* eslint-enable arena/arena-best-practices */
```

---

**📌 Lembre-se**: Essas regras existem para manter a consistência e qualidade do código Arena. Elas garantem que todos os desenvolvedores sigam os mesmos padrões!