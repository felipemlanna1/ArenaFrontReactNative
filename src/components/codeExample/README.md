# CodeExample

Componente para exibir exemplos de código com funcionalidade de cópia.

## Funcionalidade

- Exibe código formatado em bloco de texto
- Botão "Copiar" com callback customizável
- Estilo consistente com design system Arena
- Suporte a código multi-linha

## Uso

```tsx
import { CodeExample } from '@/components/code-example';

<CodeExample
  code={`<Text variant="bodyPrimary">Exemplo</Text>`}
  onCopy={code => Clipboard.setString(code)}
/>;
```

## Props

Interface: `CodeExampleProps`

| Prop     | Tipo                     | Obrigatório | Descrição                 |
| -------- | ------------------------ | ----------- | ------------------------- |
| `code`   | `string`                 | ✅          | Código a ser exibido      |
| `onCopy` | `(code: string) => void` | ✅          | Callback ao copiar código |

## Estrutura

```
CodeExample/
├── index.tsx           # Componente principal
├── stylesCodeExample.ts # Estilos
├── typesCodeExample.ts  # Tipos
├── useCodeExample.ts    # Hook com lógica
└── README.md           # Documentação
```

## Estilos

- Container com fundo escuro (`neutral.darkest`)
- Texto monoespaçado para código
- Botão de cópia estilizado
- Padding e spacing consistentes

## Acessibilidade

- `accessibilityLabel` descritivo
- `accessibilityRole="button"` no botão de cópia
- Suporte a leitores de tela

## Hook

`useCodeExample()` gerencia:

- Estado de feedback visual (se implementado)
- Lógica de cópia
- Validações

## Casos de Uso

- Documentação de componentes
- Tutoriais de código
- Exemplos em telas de showcase
- Snippets reutilizáveis
