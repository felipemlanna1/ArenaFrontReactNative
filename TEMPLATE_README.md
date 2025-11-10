# 🏟️ Arena Mobile - React Native Codebase Template

> Template completo de aplicativo React Native com autenticação, sistema de design e componentes UI prontos para uso.

## 📋 Sobre

Este é um template de codebase React Native/Expo pronto para produção, desenvolvido seguindo os mais altos padrões de qualidade de código. Inclui autenticação completa, sistema de design Arena, componentes UI customizados e regras ESLint personalizadas.

## ✨ Features Principais

### 🔐 Autenticação Completa

- Login e Registro com validação
- Context API para gerenciamento de estado global
- Persistência de token com AsyncStorage
- Interceptor Axios para injeção automática de headers
- Logout funcional

### 🎨 Sistema de Design Arena

- **Tokens de Design**: Cores, espaçamentos, tipografia, bordas e sombras
- **Shadow System**: CSS boxShadow com fonte de luz consistente
- **Componentes UI**: Badge, Button, Card, Checkbox, CheckboxGroup, Input, Link, Text
- **Código auto-documentado**: Zero comentários, nomes semânticos

### 🧩 Componentes UI Prontos

- **Button**: 6 variantes (primary, secondary, subtle, destructive, success, ghost)
- **Input**: Estados focus/error, máscaras, validação
- **Card**: 3 variantes (default, outlined, elevated)
- **Checkbox**: Múltiplas variantes incluindo card selection
- **CheckboxGroup**: Seleção múltipla com validação
- **Badge**: Status indicators com cores semânticas
- **Text**: Sistema de tipografia consistente
- **Link**: Navegação externa com feedback visual

### 🛠️ Ferramentas e Qualidade

#### ESLint Customizado

- `arena/arena-design-tokens`: Força uso de tokens Arena
- `arena/arena-use-ui-components`: Força uso de componentes UI Arena
- `arena/arena-no-comments`: Proíbe comentários (código auto-documentado)
- `arena/arena-best-practices`: Boas práticas React Native
- `arena/arena-no-console`: Proíbe console.log em produção

#### TypeScript Strict

- 100% tipado com modo strict
- Interfaces completas para todas props e estados
- Zero uso de `any`

#### Prettier

- Configuração padronizada
- Formatação automática

## 📦 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/                    # Componentes UI reutilizáveis
│   │   ├── badge/
│   │   ├── button/
│   │   ├── card/
│   │   ├── checkbox/
│   │   ├── checkboxGroup/
│   │   ├── input/
│   │   ├── link/
│   │   └── text/
│   └── error-boundary/        # Error boundary global
├── constants/                  # Tokens de design Arena
│   ├── arenaTokens.ts
│   ├── colors.ts
│   ├── spacing.ts
│   ├── typography.ts
│   ├── borders.ts
│   └── shadows.ts
├── contexts/                   # React Contexts
│   └── AuthContext.tsx
├── hooks/                      # Custom hooks
├── navigation/                 # React Navigation
├── screens/                    # Telas do app
├── services/                   # APIs e serviços
│   ├── auth.ts
│   ├── http.ts
│   └── sports.ts
├── types/                      # TypeScript types
└── utils/                      # Utilitários
```

## 🚀 Como Usar Este Template

### 1. Clone o Repositório

```bash
git clone https://github.com/felipemlanna1/codeBaseReactNative.git my-new-project
cd my-new-project
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure o Ambiente

Copie `.env.development` e ajuste as variáveis:

```bash
cp .env.development .env
```

Edite `.env` com suas configurações:

```
API_URL=http://seu-backend.com/api/v1
EXPO_PUBLIC_API_URL=http://seu-backend.com
```

### 4. Execute o Projeto

```bash
npm start
```

### 5. Personalize

1. **Cores**: Edite `src/constants/colors.ts`
2. **Tipografia**: Ajuste `src/constants/typography.ts`
3. **Componentes**: Customize `src/components/ui/`
4. **Regras ESLint**: Modifique `eslint-rules/`

## 📐 Padrões de Código

### Nomenclatura

```typescript
// camelCase: variáveis, funções, hooks
const userName = 'John';
const handleSubmit = () => {};
const useAuth = () => {};

// PascalCase: componentes, interfaces, types
interface UserData {}
type ButtonVariant = 'primary' | 'secondary';
const UserProfile: React.FC = () => {};

// kebab-case: diretórios
src/components/user-profile/
src/screens/login-screen/
```

### Estrutura de Componente

```typescript
// ComponentName/index.tsx
import React from 'react';
import { View } from 'react-native';
import { styles } from './stylesComponentName';
import { ComponentNameProps } from './typesComponentName';
import { useComponentName } from './useComponentName';

export const ComponentName: React.FC<ComponentNameProps> = ({
  prop1,
  prop2
}) => {
  const { state, handler } = useComponentName();

  return (
    <View style={styles.container}>
      {/* JSX */}
    </View>
  );
};
```

### Design Tokens

```typescript
// ✅ CORRETO - Usa tokens Arena
const styles = StyleSheet.create({
  container: {
    padding: ArenaSpacing.lg,
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.md,
    boxShadow: ArenaShadows.card,
  },
});

// ❌ ERRADO - Valores hardcoded
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#20303D',
    borderRadius: 8,
  },
});
```

## 🎯 Regras Obrigatórias

### NUNCA FAZER

- ❌ Usar `any` no TypeScript
- ❌ Componentes com mais de 150 linhas
- ❌ Estilos inline
- ❌ Valores hardcoded (cores, espaçamentos, etc)
- ❌ Comentários no código
- ❌ `console.log` em produção
- ❌ Componentes React Native nativos (usar UI Arena)

### SEMPRE FAZER

- ✅ Tipar todas props, estados e retornos
- ✅ Separar lógica em hooks
- ✅ Usar tokens Arena
- ✅ Código auto-documentado
- ✅ Componentes funcionais (sem classes)
- ✅ React.memo para otimização
- ✅ useCallback para funções

## 📊 Validação de Qualidade

### TypeScript

```bash
npx tsc --noEmit
```

Deve retornar: **0 erros**

### ESLint

```bash
npx eslint . --ext .ts,.tsx
```

Deve retornar: **0 erros, 0 warnings**

### Prettier

```bash
npx prettier --write "src/**/*.{ts,tsx}"
```

## 🔧 Tecnologias

- **React Native** 0.76.5
- **Expo SDK** 54
- **TypeScript** 5.7.3 (strict mode)
- **React Navigation** 7
- **Axios** para HTTP
- **AsyncStorage** para persistência
- **ESLint** + Prettier

## 📚 Documentação

### Componentes UI

Cada componente possui README detalhado:

- [Button](src/components/ui/button/README.md)
- [CheckboxGroup](src/components/ui/checkboxGroup/README.md)

### Design System

- [Shadow Guide](SHADOW_GUIDE.md)

## 🤝 Como Contribuir para Novos Projetos

1. Clone este template
2. Ajuste cores e tokens para seu projeto
3. Adicione novos componentes seguindo os padrões
4. Mantenha 0 erros TypeScript/ESLint
5. Documente componentes complexos

## 📄 Licença

Privado - Uso interno apenas

---

**Desenvolvido com** ❤️ **seguindo os mais altos padrões de qualidade**

🤖 Template mantido por Claude Code
