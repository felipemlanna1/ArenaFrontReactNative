# DatePicker Component

Wrapper Arena do `@react-native-community/datetimepicker` com estilo consistente.

## Uso Básico

```tsx
import { DatePicker } from '@/components/ui/datePicker';

// Data e hora
<DatePicker
  label="Data do Evento"
  variant="datetime"
  value={startDate}
  onChange={setStartDate}
  minimumDate={new Date()}
/>

// Apenas data
<DatePicker
  label="Data de Nascimento"
  variant="date"
  value={birthDate}
  onChange={setBirthDate}
  error={errors.birthDate}
/>

// Apenas hora
<DatePicker
  label="Horário"
  variant="time"
  value={time}
  onChange={setTime}
/>
```

## Variantes

- `datetime` - Data e hora
- `date` - Apenas data
- `time` - Apenas hora

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | `'datetime' \| 'date' \| 'time'` | `'datetime'` | Modo do picker |
| `label` | `string` | - | Label do campo |
| `value` | `Date \| null` | - | Valor selecionado |
| `onChange` | `(date: Date \| null) => void` | - | Callback de mudança |
| `error` | `string` | - | Mensagem de erro |
| `helperText` | `string` | - | Texto de ajuda |
| `minimumDate` | `Date` | - | Data mínima permitida |
| `maximumDate` | `Date` | - | Data máxima permitida |
| `disabled` | `boolean` | `false` | Desabilita interação |
| `placeholder` | `string` | `'Selecione...'` | Texto quando vazio |
| `testID` | `string` | - | ID para testes |
