# StateDropdown Component

Componente de seleção de estados brasileiros (UF) que segue o design system Arena. Exibe uma lista completa dos 27 estados do Brasil em um modal estilizado.

## Uso Básico

```tsx
import { StateDropdown } from '@/components/ui/stateDropdown';

function MyScreen() {
  const [state, setState] = useState('');

  return (
    <StateDropdown
      value={state}
      onChange={setState}
      label="Estado"
      placeholder="Selecione seu estado"
    />
  );
}
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `value` | `string` | `undefined` | UF selecionada (ex: "SP", "RJ") |
| `onChange` | `(uf: string) => void` | **obrigatório** | Callback quando estado é selecionado |
| `label` | `string` | `undefined` | Label do campo |
| `error` | `string \| boolean` | `undefined` | Mensagem de erro ou estado de erro |
| `required` | `boolean` | `false` | Se o campo é obrigatório (exibe asterisco) |
| `disabled` | `boolean` | `false` | Desabilita interação |
| `placeholder` | `string` | `"Selecione o estado"` | Texto quando nenhum estado selecionado |
| `testID` | `string` | `undefined` | ID para testes |
| `containerStyle` | `ViewStyle` | `undefined` | Estilo customizado do container |

## Estados Disponíveis

Todos os 27 estados brasileiros:
- AC, AL, AP, AM, BA, CE, DF, ES, GO, MA
- MT, MS, MG, PA, PB, PR, PE, PI, RJ, RN
- RS, RO, RR, SC, SP, SE, TO

## Features

- ✅ Modal centralizado com lista scrollável
- ✅ Exibe nome completo e UF
- ✅ Indicador visual de seleção (checkmark)
- ✅ Estados de error, disabled e required
- ✅ Label usando componente Label Arena
- ✅ Ícone chevron-down indicando dropdown
- ✅ Pressable states (hover/pressed)
- ✅ Acessibilidade completa
- ✅ Máximo 134 linhas (< 150)

## Exemplo com Validação

```tsx
import { StateDropdown } from '@/components/ui/stateDropdown';

function ProfileForm() {
  const [state, setState] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!state) {
      setError('Estado é obrigatório');
      return;
    }
    // Submit form...
  };

  return (
    <StateDropdown
      value={state}
      onChange={(uf) => {
        setState(uf);
        setError('');
      }}
      label="Estado"
      error={error}
      required
    />
  );
}
```

## Design Tokens Utilizados

- **Cores**: `ArenaColors.neutral.*`, `ArenaColors.brand.primary`, `ArenaColors.semantic.error`
- **Espaçamento**: `ArenaSpacing.xs|sm|md|lg`
- **Bordas**: `ArenaBorders.radius.md|lg`
- **Tipografia**: Variantes `bodyPrimary`, `placeholderPrimary`, `titlePrimary`, `errorSecondary`, `captionSecondary`

## Acessibilidade

- Roles: `button` (trigger), `radio` (items)
- Labels e hints descritivos
- Estados de disabled e selected
- Navegação por teclado suportada
