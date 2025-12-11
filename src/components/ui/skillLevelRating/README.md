# SkillLevelRating

Componente de seleção de nível de habilidade com 4 níveis padronizados (Iniciante, Intermediário, Avançado, Expert).

## Uso

```tsx
import { SkillLevelRating } from '@/components/ui/skillLevelRating';

const [technicalRating, setTechnicalRating] = useState<SkillLevel | null>(null);

<SkillLevelRating
  value={technicalRating}
  onChange={setTechnicalRating}
  disabled={false}
  testID="technical-skill-rating"
/>
```

## Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `value` | `SkillLevel \| null` | - | Nível selecionado (1-4) |
| `onChange` | `(level: SkillLevel) => void` | - | Callback ao selecionar nível |
| `disabled` | `boolean` | `false` | Desabilita interação |
| `testID` | `string` | - | ID para testes |

## Níveis Disponíveis

| Valor | Label | Short | Cor |
|-------|-------|-------|-----|
| 1 | Iniciante | I | Info (Azul) |
| 2 | Intermediário | M | Success (Verde) |
| 3 | Avançado | A | Warning (Amarelo) |
| 4 | Expert | E | Primary (Laranja) |

## Características

- Haptic feedback ao selecionar
- Acessibilidade completa (radiogroup)
- Tokens Arena (cores, espaçamentos, bordas)
- Layout responsivo (flexWrap)
- Estados visual (selecionado, desabilitado)

## Consistência

Este componente substitui `StarRating` para avaliação de habilidade técnica, garantindo consistência com a seleção de nível no perfil do usuário (`SkillLevelModal`).
