# ComponentsShowcaseScreen

Tela de showcase dos componentes UI do Arena Design System.

## Funcionalidade

- Exibe todas as variantes dos componentes de texto
- Mostra exemplos de código com funcionalidade de cópia
- Navegação de volta para a WelcomeScreen
- Interface organizada por seções de componentes

## Estrutura

```
components-showcase-screen/
├── __tests__/           # Testes da screen
├── index.tsx           # Componente principal
├── useComponentsShowcaseScreen.ts # Hook com lógica
├── stylesComponentsShowcaseScreen.ts # Estilos
├── typesComponentsShowcaseScreen.ts  # Tipos
└── README.md           # Documentação
```

## Componentes Internos

- `ComponentSection`: seção organizacional
- `ShowcaseItem`: item individual de showcase

## Props

Interface: `ComponentsShowcaseScreenProps` (sem props no momento)

## Hook Principal

`useComponentsShowcaseScreen()` retorna:

- `activeSection`: string | null - seção ativa atual
- `actions.handleSectionToggle()`: alterna seção
- `actions.handleBackPress()`: volta para tela anterior
- `actions.handleCopyCode()`: copia código para clipboard

## Seções Implementadas

### Text Components

- Display Variants (displayPrimary, displayAccent)
- Heading Variants (headingPrimary, headingAccent)
- Title Variants (titlePrimary, titleSecondary)
- Body Variants (bodyPrimary, bodySecondary, bodyMuted, bodyError, bodySuccess)
- Caption Variants (captionSecondary, captionMuted, captionError)
- Label Variants (labelPrimary, labelSecondary, labelError)
- Interactive Text (com onPress)
- Truncated Text (com numberOfLines)

### Futuras Seções

- Button Components (planejado)
- Input Components (planejado)

## Navegação

- **De**: WelcomeScreen
- **Para**: WelcomeScreen (via botão voltar)

## Testes

- `ComponentsShowcaseScreen.test.tsx`: testes do componente
- `useComponentsShowcaseScreen.test.ts`: testes do hook
