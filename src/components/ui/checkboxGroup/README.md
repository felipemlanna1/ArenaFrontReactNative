# CheckboxGroup Component

Componente Arena UI para seleção única ou múltipla de opções, com suporte a diferentes variantes incluindo a variante **card**.

## Características

- ✅ **Multi-select ou Single-select**: Controla se múltiplas opções podem ser selecionadas
- ✅ **Variante Card**: Cards clicáveis com mudança visual ao selecionar
- ✅ **Grid Layout**: Suporte a múltiplas colunas (1, 2, 3, 4)
- ✅ **TypeScript**: Totalmente tipado com suporte a genéricos
- ✅ **Acessibilidade**: Labels, estados e roles corretos
- ✅ **Validação**: Suporte a required e mensagens de erro

## Uso Básico

### Multi-select (padrão)

```tsx
import { CheckboxGroup } from '@/components/ui/checkboxGroup';

const [selected, setSelected] = useState<string[]>([]);

<CheckboxGroup
  options={[
    { value: 'futebol', label: 'Futebol' },
    { value: 'basquete', label: 'Basquete' },
    { value: 'volei', label: 'Vôlei' },
  ]}
  value={selected}
  onChange={setSelected}
  label="Selecione seus esportes"
  helperText="Você pode escolher quantos quiser"
/>
```

### Single-select (radio behavior)

```tsx
const [level, setLevel] = useState<string>('');

<CheckboxGroup
  multiSelect={false}
  options={[
    { value: 'beginner', label: 'Iniciante' },
    { value: 'intermediate', label: 'Intermediário' },
    { value: 'advanced', label: 'Avançado' },
  ]}
  value={level}
  onChange={setLevel}
  label="Qual é o seu nível?"
/>
```

### Variante Card (Layout de Cards)

```tsx
const [sports, setSports] = useState<string[]>([]);

<CheckboxGroup
  variant="card"
  columns={2}
  spacing="md"
  options={[
    { value: 'futebol', label: 'Futebol' },
    { value: 'basquete', label: 'Basquete' },
    { value: 'volei', label: 'Vôlei' },
    { value: 'natacao', label: 'Natação' },
  ]}
  value={sports}
  onChange={setSports}
/>
```

### Com Validação

```tsx
const [agreed, setAgreed] = useState<string[]>([]);

<CheckboxGroup
  options={[{ value: 'terms', label: 'Aceito os termos de uso' }]}
  value={agreed}
  onChange={setAgreed}
  required={true}
  errorMessage={agreed.length === 0 ? 'Você deve aceitar os termos' : undefined}
/>
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `options` | `CheckboxOption<T>[]` | - | **Obrigatório.** Array de opções |
| `value` | `T \| T[]` | - | **Obrigatório.** Valor(es) selecionado(s) |
| `onChange` | `(value: T \| T[]) => void` | - | **Obrigatório.** Callback de mudança |
| `multiSelect` | `boolean` | `true` | Permite seleção múltipla |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'card'` | `'default'` | Variante visual |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho dos checkboxes |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | Direção do layout |
| `columns` | `1 \| 2 \| 3 \| 4` | `1` | Número de colunas (card) |
| `spacing` | `keyof ArenaSpacing` | `'md'` | Espaçamento entre itens |
| `disabled` | `boolean` | `false` | Desabilita todas opções |
| `required` | `boolean` | `false` | Marca como obrigatório |
| `label` | `string` | - | Label do grupo |
| `helperText` | `string` | - | Texto de ajuda |
| `errorMessage` | `string` | - | Mensagem de erro |
| `style` | `ViewStyle` | - | Estilo customizado |
| `testID` | `string` | - | ID para testes |

## CheckboxOption Interface

```typescript
interface CheckboxOption<T = string> {
  value: T;           // Valor único da opção
  label: string;      // Texto exibido
  disabled?: boolean; // Desabilita esta opção
  icon?: ReactNode;   // Ícone opcional (futuro)
}
```

## Variantes

### `default` - Checkbox tradicional
- Quadrado branco com check preto
- Layout compacto

### `primary` - Checkbox laranja
- Fundo laranja quando selecionado
- Check branco

### `secondary` - Checkbox com borda laranja
- Fundo branco, borda laranja
- Check laranja

### `card` - Card clicável (NOVO!)
- **Não selecionado:**
  - Fundo escuro (`#20303D`)
  - Borda cinza sutil
  - Texto branco normal (16px)

- **Selecionado:**
  - Borda laranja (`#FF5301`) espessa
  - Texto laranja maior (18px) e bold

- **Ideal para:** Seleção de opções com destaque visual

## Exemplos Avançados

### Integrando com Backend (Esportes do Arena)

```tsx
import { useState, useEffect } from 'react';
import { CheckboxGroup } from '@/components/ui/checkboxGroup';
import { sportsService } from '@/services/sports';
import { Sport, SkillLevel } from '@/types/sport';

const SportsSelectionScreen = () => {
  const [availableSports, setAvailableSports] = useState<Sport[]>([]);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [skillLevel, setSkillLevel] = useState<string>('');

  // Carregar esportes do backend
  useEffect(() => {
    const loadSports = async () => {
      try {
        const sports = await sportsService.getAllSports();
        setAvailableSports(sports);
      } catch (error) {
        console.error('Erro ao carregar esportes:', error);
      }
    };
    loadSports();
  }, []);

  const skillLevelOptions = [
    { value: SkillLevel.BEGINNER, label: 'Iniciante' },
    { value: SkillLevel.INTERMEDIATE, label: 'Intermediário' },
    { value: SkillLevel.ADVANCED, label: 'Avançado' },
    { value: SkillLevel.EXPERT, label: 'Expert' },
  ];

  return (
    <View>
      {/* Multi-select com dados do backend */}
      <CheckboxGroup
        options={availableSports.map(sport => ({
          value: sport.id,
          label: sport.name,
        }))}
        value={selectedSports}
        onChange={(value) => setSelectedSports(value as string[])}
        label="Quais esportes você pratica?"
        helperText="Selecione todos que se aplicam"
      />

      {/* Single-select com enum SkillLevel */}
      <CheckboxGroup
        multiSelect={false}
        options={skillLevelOptions}
        value={skillLevel}
        onChange={(value) => setSkillLevel(value as string)}
        label="Qual é o seu nível?"
        required
      />
    </View>
  );
};
```

### Grid 2x2 com Cards

```tsx
<CheckboxGroup
  variant="card"
  columns={2}
  multiSelect={false}
  options={[
    { value: '1', label: 'Opção 1' },
    { value: '2', label: 'Opção 2' },
    { value: '3', label: 'Opção 3' },
    { value: '4', label: 'Opção 4' },
  ]}
  value={selected}
  onChange={setSelected}
/>
```

### Com opções desabilitadas

```tsx
<CheckboxGroup
  options={[
    { value: 'a', label: 'Disponível' },
    { value: 'b', label: 'Indisponível', disabled: true },
    { value: 'c', label: 'Disponível' },
  ]}
  value={selected}
  onChange={setSelected}
/>
```

### Horizontal Layout

```tsx
<CheckboxGroup
  direction="horizontal"
  options={options}
  value={selected}
  onChange={setSelected}
/>
```

## Comportamento

### Multi-select (`multiSelect={true}`)
- Clicar em opção não selecionada → adiciona ao array
- Clicar em opção selecionada → remove do array
- Múltiplas opções podem estar selecionadas
- `value` deve ser array: `string[]` ou `number[]`

### Single-select (`multiSelect={false}`)
- Clicar em opção → seleciona apenas ela
- Opção anterior é automaticamente desmarcada
- Apenas 1 opção selecionada por vez
- `value` deve ser primitivo: `string` ou `number`

## Acessibilidade

- ✅ `accessibilityRole="checkbox"` em cada opção
- ✅ `accessibilityState` indica selecionado/desabilitado
- ✅ `accessibilityLabel` usa o label da opção
- ✅ TestIDs hierárquicos para testes automatizados

## Padrões Arena

✅ Máximo 150 linhas por arquivo
✅ TypeScript strict (sem `any`)
✅ Usa tokens Arena (ArenaColors, ArenaSpacing, etc)
✅ Exports nomeados
✅ Componente funcional com React.FC
✅ Estilos separados em arquivo próprio

## Changelog

### v1.0.0
- ✅ Implementação inicial
- ✅ Suporte a multi-select e single-select
- ✅ Variante card
- ✅ Grid layout (columns)
- ✅ Validação e mensagens de erro
