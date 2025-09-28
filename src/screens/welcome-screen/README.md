# WelcomeScreen

Tela de boas-vindas da aplicação Arena.

## Funcionalidade

- Exibe branding da Arena com mensagem de boas-vindas
- Permite navegar para a tela de showcase de componentes
- Botão "COMEÇAR" com estado de loading

## Estrutura

```
welcome-screen/
├── __tests__/           # Testes da screen
├── index.tsx           # Componente principal
├── useWelcomeScreen.ts # Hook com lógica
├── stylesWelcomeScreen.ts # Estilos
├── typesWelcomeScreen.ts  # Tipos
└── README.md           # Documentação
```

## Props

Interface: `WelcomeScreenProps` (sem props no momento)

## Hook Principal

`useWelcomeScreen()` retorna:
- `isLoading`: boolean - estado de carregamento
- `error`: Error | null - estado de erro
- `actions.handleShowComponents()`: navega para ComponentsShowcase
- `actions.handleGetStarted()`: ativa loading
- `actions.handleReset()`: reseta estados

## Navegação

- **De**: Entrada da aplicação
- **Para**: ComponentsShowcase (via "VER COMPONENTES")

## Testes

- `WelcomeScreen.test.tsx`: testes do componente
- `useWelcomeScreen.test.ts`: testes do hook