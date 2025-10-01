# 📋 Implementação do Fluxo de Autenticação e Onboarding - Arena

## 🎯 Objetivo

Implementar o fluxo completo de autenticação inspirado no SportPulseMobile, incluindo:
1. Login/Register com integração API real
2. Tela de Onboarding de Esportes (obrigatória após primeiro cadastro)
3. Contexto de Autenticação global
4. Navegação condicional automática baseada no estado do usuário

---

## ✅ O QUE JÁ FOI IMPLEMENTADO

### 1. **Infraestrutura Base**

#### Tipos TypeScript criados:

**`/src/types/sport.ts`**
```typescript
- SkillLevel enum (BEGINNER, INTERMEDIATE, ADVANCED, EXPERT)
- Sport interface (id, name, icon, color, popularity)
- UserSport interface (sportId, sportName, isPrimary, skillLevel)
- UserSportInput interface (para API)
- UpdateUserSportsRequest interface (para API)
```

**`/src/types/auth.ts`**
```typescript
- UserData interface (dados completos do usuário + hasSports flag)
- AuthTokens interface (accessToken, refreshToken)
- LoginCredentials interface
- RegisterData interface
- AuthResponse interface (formato da API)
```

#### Serviços:

**`/src/services/sports.ts`** ✅ CRIADO
- `getAllSports()` - busca todos esportes disponíveis
- `getUserSports(userId)` - busca esportes do usuário
- `updateUserSports(userId, data)` - atualiza esportes do usuário

**`/src/services/auth.ts`** ✅ ATUALIZADO
- Corrigido para usar `access_token` (não `tokens`)
- `login()`, `register()`, `logout()`, `forgotPassword()`
- Integração com httpService para salvar no AsyncStorage

#### Contexto:

**`/src/contexts/AuthContext.tsx`** ✅ CRIADO
- Provider que gerencia estado global de autenticação
- `user`, `isAuthenticated`, `userHasSports`, `userSports`, `primarySport`
- Funções: `signIn`, `signOut`, `signUp`, `updateUserSports`
- Carrega dados do AsyncStorage ao iniciar app
- Persiste dados automaticamente

#### Hooks:

**`/src/hooks/useUserSports.ts`** ✅ CRIADO
- Hook para carregar lista de esportes disponíveis da API
- Retorna: `availableSports`, `isLoading`, `error`, `refetch`
- Ordena esportes por popularidade

#### Constantes:

**`/src/constants/texts.ts`** ✅ ATUALIZADO
- Adicionado `ONBOARDING_TEXTS` completo
- Textos para níveis (Iniciante, Intermediário, Avançado, Profissional)
- Textos para ações (Próximo, Voltar, Concluir, Sair)
- Mensagens de erro/sucesso

---

## 🚧 O QUE PRECISA SER IMPLEMENTADO

### **FASE 1: Componentes de UI Arena** (PRIORIDADE MÁXIMA)

Estes componentes NÃO EXISTEM ainda e precisam ser criados do zero seguindo padrões Arena.

---

#### 1. **LevelSelector Component** 🆕

**Caminho:** `/src/components/LevelSelector/`

**O que é:** Componente que exibe 4 cards de níveis de habilidade para o usuário selecionar.

**Props:**
```typescript
{
  selectedLevel: 'beginner' | 'intermediate' | 'advanced' | 'professional' | null;
  onSelectLevel: (level) => void;
  disabled?: boolean;
  testID?: string;
}
```

**Visual esperado:**
```
┌─────────────────────────────────────────────────┐
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │ 🌱       │  │ 🎯       │  │ 🏆       │     │
│  │ Iniciante│  │Intermedi │  │ Avançado │  ...│
│  └──────────┘  └──────────┘  └──────────┘     │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Comportamento:**
- Grid horizontal com 4 cards
- Card selecionado tem borda laranja (`ArenaColors.brand.primary`)
- Card não selecionado: fundo escuro com opacidade
- Cada card: ícone + título + descrição opcional
- OnPress chama `onSelectLevel` com o nível

**Arquivos necessários:**
```
LevelSelector/
├── index.tsx               (componente)
├── typesLevelSelector.ts   ✅ JÁ CRIADO
├── stylesLevelSelector.ts  (estilos Arena)
├── useLevelSelector.ts     (lógica se necessário)
└── README.md               (documentação)
```

**Estilos Arena esperados:**
- Usar `ArenaColors.neutral.darkest` para fundo
- Usar `ArenaColors.brand.primary` para selecionado
- Usar `ArenaSpacing.md` entre cards
- Usar `ArenaBorders.radius.md` para bordas

---

#### 2. **SportCard Component** 🆕

**Caminho:** `/src/components/SportCard/`

**O que é:** Card individual de um esporte com ícone, nome e cor.

**Props:**
```typescript
{
  sport: {
    id: string;
    name: string;
    icon: string;
    color: string;
  };
  isSelected: boolean;
  onPress: (sportId: string) => void;
  onRemove?: (sportId: string) => void;  // Mostra X se esporte já selecionado
  disabled?: boolean;
  testID?: string;
}
```

**Visual esperado:**
```
┌────────────┐
│     ⚽      │  ← Ícone colorido
│   Futebol  │  ← Nome
│     [X]    │  ← Botão remover (opcional)
└────────────┘
```

**Comportamento:**
- Card com fundo `ArenaColors.neutral.dark`
- Borda laranja se `isSelected = true`
- Ícone dinâmico usando biblioteca de ícones
- Cor do ícone vem de `sport.color`
- Se `onRemove` existe, mostra botão X no canto

**Arquivos necessários:**
```
SportCard/
├── index.tsx
├── typesSportCard.ts
├── stylesSportCard.ts
├── README.md
```

---

#### 3. **SportsList Component** 🆕

**Caminho:** `/src/components/SportsList/`

**O que é:** Lista/Grid de SportCards com título, subtítulo e loading state.

**Props:**
```typescript
{
  sports: Sport[];
  selectedSports: {sportId: string}[];
  onSelectSport: (sportId: string) => void;
  onRemoveSport?: (sportId: string) => void;
  title?: string;
  subtitle?: string;
  progressText?: string;
  isLoading?: boolean;
  loadingText?: string;
  testID?: string;
}
```

**Visual esperado:**
```
┌─────────────────────────────────────────────────┐
│ Seus Esportes                                   │ ← Title
│ Selecione os esportes que você pratica         │ ← Subtitle
│ 2 de 15 esportes                               │ ← Progress
│                                                 │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐           │
│ │  ⚽  │ │  🏀  │ │  🏐  │ │  🎾  │           │
│ └──────┘ └──────┘ └──────┘ └──────┘           │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐           │
│ │  🏊  │ │  🚴  │ │  🏃  │ │  ⛳  │           │
│ └──────┘ └──────┘ └──────┘ └──────┘           │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Comportamento:**
- ScrollView com Grid de 3-4 colunas
- Usa `SportCard` internamente
- Mostra loading spinner se `isLoading = true`
- Destaca cards de esportes já selecionados

**Arquivos necessários:**
```
SportsList/
├── index.tsx
├── typesSportsList.ts
├── stylesSportsList.ts
├── useSportsList.ts  (opcional)
└── README.md
```

---

#### 4. **OnboardingHeader Component** 🆕

**Caminho:** `/src/components/OnboardingHeader/`

**O que é:** Header da tela de onboarding com logo Arena, título e botão Exit.

**Props:**
```typescript
{
  onExit: () => void;
  isLoading?: boolean;
  testID?: string;
}
```

**Visual esperado:**
```
┌─────────────────────────────────────────────────┐
│ [Arena Logo]                             [X]    │
└─────────────────────────────────────────────────┘
```

**Comportamento:**
- Logo Arena à esquerda usando componente `Symbol`
- Botão "X" à direita que chama `onExit`
- Desabilita botão X se `isLoading = true`
- SafeArea top aplicada

**Arquivos necessários:**
```
OnboardingHeader/
├── index.tsx
├── typesOnboardingHeader.ts
├── stylesOnboardingHeader.ts
├── useOnboardingHeader.ts
└── README.md
```

---

#### 5. **OnboardingFooter Component** 🆕

**Caminho:** `/src/components/OnboardingFooter/`

**O que é:** Footer com botões de navegação (Voltar, Próximo, Concluir).

**Props:**
```typescript
{
  canGoPrevious: boolean;
  canGoNext: boolean;
  canFinish: boolean;
  isLoading: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
  testID?: string;
}
```

**Visual esperado:**
```
┌─────────────────────────────────────────────────┐
│                                                 │
│  [Voltar]                         [Próximo]    │
│                                                 │
│              ou                                 │
│                                                 │
│                [Concluir]                       │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Comportamento:**
- Exibe "Voltar" se `canGoPrevious = true`
- Exibe "Próximo" se `canGoNext = true`
- Exibe "Concluir" se `canFinish = true` (substitui "Próximo")
- Botões desabilitados ficam com opacidade reduzida
- Loading spinner dentro dos botões quando `isLoading = true`

**Arquivos necessários:**
```
OnboardingFooter/
├── index.tsx
├── typesOnboardingFooter.ts
├── stylesOnboardingFooter.ts
├── useOnboardingFooter.ts
└── README.md
```

---

#### 6. **SportSelectionStep Component** 🆕

**Caminho:** `/src/components/SportSelectionStep/`

**O que é:** Componente que combina SportsList + Progress Bar para o passo 1 do onboarding.

**Props:**
```typescript
{
  sports: Sport[];
  selectedSports: {sportId: string, level: string}[];
  currentSport: Sport | null;
  onSelectSport: (sportId: string) => void;
  onRemoveSport?: (sportId: string) => void;
  isLoading?: boolean;
  testID?: string;
}
```

**Visual esperado:**
```
┌─────────────────────────────────────────────────┐
│ ▓▓▓▓░░░░░░░░░░░░  (13%)                        │ ← Progress
│                                                 │
│ Seus Esportes                                   │
│ Selecione os esportes que você pratica         │
│                                                 │
│ [Grid de SportCards]                           │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Arquivos necessários:**
```
SportSelectionStep/
├── index.tsx
├── typesSportSelectionStep.ts
├── stylesSportSelectionStep.ts
└── README.md
```

---

#### 7. **LevelSelectionStep Component** 🆕

**Caminho:** `/src/components/LevelSelectionStep/`

**O que é:** Tela que mostra o esporte selecionado + LevelSelector para escolher nível.

**Props:**
```typescript
{
  sport: Sport;
  selectedLevel: Level | null;
  onSelectLevel: (level: Level) => void;
  onBack?: () => void;
  testID?: string;
}
```

**Visual esperado:**
```
┌─────────────────────────────────────────────────┐
│ [←]                                             │ ← Voltar
│                                                 │
│         ⚽  Futebol                             │ ← Ícone + Nome
│                                                 │
│ Qual é o seu nível?                            │
│                                                 │
│ [LevelSelector Component]                      │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Arquivos necessários:**
```
LevelSelectionStep/
├── index.tsx
├── typesLevelSelectionStep.ts
├── stylesLevelSelectionStep.ts
└── README.md
```

---

### **FASE 2: Tela de Onboarding** (Após componentes prontos)

#### 8. **OnboardingSportsScreen** 🆕

**Caminho:** `/src/screens/onboardingSportsScreen/`

**O que é:** Tela principal que orquestra o fluxo de seleção de esportes.

**Estrutura:**
```typescript
// Estado gerenciado pelo hook
{
  selectedSports: [{sportId: '123', level: 'beginner'}],
  currentSport: Sport | null,  // Sport sendo configurado
  currentLevel: Level | null,  // Nível sendo selecionado
  isLoading: boolean,
  errors: {general?: string}
}
```

**Fluxo:**
1. Mostra `SportSelectionStep` com lista de esportes
2. Usuário clica em esporte → define `currentSport`
3. Mostra `LevelSelectionStep` para esse esporte
4. Usuário seleciona nível → define `currentLevel`
5. Usuário clica "Próximo" → adiciona {sportId, level} em `selectedSports`
6. Volta para `SportSelectionStep`
7. Repete até usuário clicar "Concluir"
8. Chama API `updateUserSports` com todos esportes
9. Atualiza AuthContext com `hasSports = true`
10. Navegação automática para MainApp

**Arquivos necessários:**
```
onboardingSportsScreen/
├── index.tsx
├── useOnboardingSports.ts         (HOOK COM TODA LÓGICA)
├── typesOnboardingSportsScreen.ts
├── stylesOnboardingSportsScreen.ts
└── README.md
```

**Hook `useOnboardingSports` deve retornar:**
```typescript
{
  formData: {selectedSports, currentSportIndex},
  errors: {general?},
  isLoading: boolean,
  availableSports: Sport[],
  currentSport: Sport | null,
  currentLevel: Level | null,
  canGoNext: boolean,
  canGoPrevious: boolean,
  handleSelectSport: (sportId) => void,
  handleSelectLevel: (level) => void,
  handleNext: () => void,
  handlePrevious: () => void,
  handleSubmit: () => Promise<void>,
  handleExit: () => Promise<void>,
  handleRemoveSport: (sportId) => void,
}
```

---

### **FASE 3: Integração com Navegação**

#### 9. **Modificar App.tsx** ✏️

**Caminho:** `/src/App.tsx`

**O que fazer:**
```typescript
import { AuthProvider } from '@/contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>  {/* ADICIONAR ISTO */}
      {/* Resto do app */}
    </AuthProvider>
  );
}
```

---

#### 10. **Modificar AppNavigator.tsx** ✏️

**Caminho:** `/src/navigation/AppNavigator.tsx`

**O que fazer:**
Implementar navegação condicional baseada em `useAuth()`:

```typescript
import { useAuth } from '@/contexts/AuthContext';

export default function AppNavigator() {
  const { isAuthenticated, isLoading, userHasSports } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          // NÃO autenticado → telas de login/register
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : !userHasSports ? (
          // Autenticado MAS sem esportes → onboarding
          <Stack.Screen name="OnboardingSports" component={OnboardingSportsScreen} />
        ) : (
          // Autenticado E com esportes → app principal
          <Stack.Screen name="Main" component={MainNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

---

#### 11. **Modificar LoginScreen** ✏️

**Caminho:** `/src/screens/loginScreen/useLoginScreen.ts`

**O que fazer:**
```typescript
import { useAuth } from '@/contexts/AuthContext';

export const useLoginScreen = () => {
  const { signIn } = useAuth();  // USAR CONTEXT

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await signIn({ email, password });
      // NÃO NAVEGAR MANUALMENTE - será automático via AppNavigator
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };
};
```

---

#### 12. **Modificar RegisterScreen** ✏️

**Caminho:** `/src/screens/registerScreen/useRegisterScreen.ts`

**O que fazer:**
```typescript
import { useAuth } from '@/contexts/AuthContext';

export const useRegisterScreen = () => {
  const { signUp } = useAuth();  // USAR CONTEXT

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      await signUp({
        firstName,
        lastName,
        username,
        email,
        password,
        confirmPassword: password,
      });
      // NÃO NAVEGAR MANUALMENTE - será automático via AppNavigator
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };
};
```

---

## 🎨 Guia de Estilos Arena para Componentes

### Cores a usar:

```typescript
import { ArenaColors } from '@/constants';

// Backgrounds
ArenaColors.neutral.darkest  // #1B1D29 - fundo principal
ArenaColors.neutral.dark     // #20303D - cards, containers

// Primária
ArenaColors.brand.primary    // #FF5301 - laranja Arena (seleção, botões)

// Texto
ArenaColors.neutral.light    // #FFFFFF - texto principal
ArenaColors.neutral.medium   // #B8B8B8 - texto secundário

// Estados
ArenaColors.semantic.success // Verde para sucesso
ArenaColors.semantic.error   // Vermelho para erros
```

### Espaçamentos:

```typescript
import { ArenaSpacing } from '@/constants';

ArenaSpacing.xs   // 4px
ArenaSpacing.sm   // 8px
ArenaSpacing.md   // 12px
ArenaSpacing.lg   // 16px
ArenaSpacing.xl   // 24px
ArenaSpacing['2xl'] // 32px
ArenaSpacing['3xl'] // 48px
ArenaSpacing['4xl'] // 64px
```

### Bordas:

```typescript
import { ArenaBorders } from '@/constants';

ArenaBorders.radius.sm  // 4px
ArenaBorders.radius.md  // 8px
ArenaBorders.radius.lg  // 12px
ArenaBorders.radius.xl  // 16px

ArenaBorders.width.thin   // 1px
ArenaBorders.width.medium // 2px
ArenaBorders.width.thick  // 3px
```

### Tipografia:

```typescript
import { ArenaTypography } from '@/constants';

ArenaTypography.size.xs    // 12px
ArenaTypography.size.sm    // 14px
ArenaTypography.size.base  // 16px
ArenaTypography.size.lg    // 18px
ArenaTypography.size.xl    // 20px
ArenaTypography.size['2xl'] // 24px

ArenaTypography.weight.regular   // 400
ArenaTypography.weight.medium    // 500
ArenaTypography.weight.semibold  // 600
ArenaTypography.weight.bold      // 700
```

---

## 📊 Fluxo Completo Esperado

### Registro de Novo Usuário:
```
1. Usuário preenche RegisterScreen
2. Clica "Criar conta"
3. API cria usuário com hasSports = false
4. AuthContext.signUp() salva user no estado
5. AppNavigator detecta: isAuthenticated = true, userHasSports = false
6. ⚡ Navega AUTOMATICAMENTE para OnboardingSportsScreen
7. Usuário seleciona esportes e clica "Concluir"
8. API atualiza esportes do usuário
9. AuthContext.updateUserSports() atualiza hasSports = true
10. AppNavigator detecta: userHasSports = true
11. ⚡ Navega AUTOMATICAMENTE para MainApp
```

### Login de Usuário Existente SEM esportes:
```
1. Usuário faz login
2. API retorna user com hasSports = false
3. AuthContext.signIn() salva user
4. AppNavigator detecta: isAuthenticated = true, userHasSports = false
5. ⚡ Navega AUTOMATICAMENTE para OnboardingSportsScreen
6. (resto igual ao fluxo de registro)
```

### Login de Usuário Existente COM esportes:
```
1. Usuário faz login
2. API retorna user com hasSports = true e sports[]
3. AuthContext.signIn() salva user
4. AppNavigator detecta: isAuthenticated = true, userHasSports = true
5. ⚡ Navega AUTOMATICAMENTE para MainApp
```

### Reload do App:
```
1. App inicia
2. AuthContext carrega dados do AsyncStorage
3. Se token válido E user existe:
   - Restaura user (com hasSports)
   - AppNavigator usa flags para decidir tela inicial
4. Se token inválido:
   - Limpa storage
   - Mostra AuthNavigator (Welcome/Login)
```

---

## 🧪 Como Testar

### Teste 1: Novo cadastro
1. Abrir tela de Register
2. Preencher dados e cadastrar
3. **ESPERADO:** Ir direto para OnboardingSportsScreen
4. Selecionar 2-3 esportes com níveis
5. Clicar "Concluir"
6. **ESPERADO:** Ir direto para MainApp

### Teste 2: Login sem esportes
1. Criar usuário via API sem esportes
2. Fazer login no app
3. **ESPERADO:** Ir direto para OnboardingSportsScreen

### Teste 3: Login com esportes
1. Criar usuário via API com esportes
2. Fazer login no app
3. **ESPERADO:** Ir direto para MainApp (pular onboarding)

### Teste 4: Persistência
1. Fazer login completo
2. Fechar e reabrir app
3. **ESPERADO:** Manter sessão, ir direto para MainApp

### Teste 5: Botão Exit no Onboarding
1. Fazer cadastro novo
2. Na tela de onboarding, clicar "X"
3. **ESPERADO:** Fazer logout e voltar para Welcome

---

## 📦 Resumo dos Arquivos

### ✅ JÁ CRIADOS (7 arquivos):
1. `/src/types/sport.ts`
2. `/src/types/auth.ts`
3. `/src/contexts/AuthContext.tsx`
4. `/src/services/sports.ts`
5. `/src/hooks/useUserSports.ts`
6. `/src/constants/texts.ts` (atualizado)
7. `/src/components/LevelSelector/typesLevelSelector.ts`

### 🚧 PRECISAM SER CRIADOS (35+ arquivos):

**Componentes UI (7 componentes = ~28 arquivos):**
1. LevelSelector/ (4 arquivos)
2. SportCard/ (4 arquivos)
3. SportsList/ (5 arquivos)
4. OnboardingHeader/ (5 arquivos)
5. OnboardingFooter/ (5 arquivos)
6. SportSelectionStep/ (4 arquivos)
7. LevelSelectionStep/ (4 arquivos)

**Tela Onboarding (4 arquivos):**
8. onboardingSportsScreen/ (4 arquivos)

**Integrações (3 arquivos a modificar):**
9. App.tsx
10. navigation/AppNavigator.tsx
11. screens/loginScreen/useLoginScreen.ts
12. screens/registerScreen/useRegisterScreen.ts

---

## ⚠️ REGRAS CRÍTICAS

1. **Máximo 150 linhas** por arquivo (componente/hook)
2. **Separar sempre:** `index.tsx`, `stylesX.ts`, `typesX.ts`, `useX.ts`
3. **Usar APENAS tokens Arena** (ArenaColors, ArenaSpacing, etc)
4. **TypeScript strict** - sem `any`
5. **Exports nomeados** - não default
6. **README.md** em cada componente explicando uso
7. **TestIDs** em todos elementos interativos
8. **Acessibilidade** (accessibilityLabel, accessibilityRole)

---

## 🎯 Próximos Passos Recomendados

**Ordem de implementação:**

1. ✅ LevelSelector (componente base, sem dependências)
2. ✅ SportCard (componente base)
3. ✅ SportsList (usa SportCard)
4. ✅ OnboardingHeader (componente base)
5. ✅ OnboardingFooter (componente base)
6. ✅ SportSelectionStep (usa SportsList)
7. ✅ LevelSelectionStep (usa LevelSelector)
8. ✅ OnboardingSportsScreen (usa todos anteriores)
9. ✅ Integrar AuthProvider no App.tsx
10. ✅ Modificar AppNavigator
11. ✅ Integrar LoginScreen com AuthContext
12. ✅ Integrar RegisterScreen com AuthContext
13. ✅ Testar fluxo completo

---

**ESTE DOCUMENTO DEVE SER CONSULTADO ANTES DE CRIAR CADA COMPONENTE!**
