# NotificationBadge Component

Componente de badge de notificação usado para indicar visualmente a presença de itens pendentes (convites, notificações, etc).

## Uso

```tsx
import { NotificationBadge } from '@/components/ui/notificationBadge';

// Badge pequeno (apenas bolinha laranja)
<View>
  <Ionicons name="menu" size={24} color={color} />
  <NotificationBadge count={5} size="sm" />
</View>

// Badge médio com contador
<View>
  <Ionicons name="people" size={24} color={color} />
  <NotificationBadge count={12} size="md" showCount />
</View>
```

## Props

| Prop        | Tipo                | Default | Descrição                                      |
| ----------- | ------------------- | ------- | ---------------------------------------------- |
| `count`     | `number`            | `0`     | Número de itens pendentes                      |
| `showCount` | `boolean`           | `false` | Exibir o número dentro do badge                |
| `size`      | `'sm' \| 'md'`      | `'sm'`  | Tamanho do badge                               |
| `testID`    | `string`            | -       | ID para testes                                 |

## Sizes

### Small (`sm`)
- **Uso**: Ícones de navegação (bottom tab bar)
- **Tamanho**: 8x8px (ArenaSpacing.sm)
- **Comportamento**: Apenas bolinha laranja, sem texto
- **Posição**: top: -2px, right: -2px

### Medium (`md`)
- **Uso**: Itens de menu, botões maiores
- **Tamanho**: Mínimo 16x16px (ArenaSpacing.lg)
- **Comportamento**: Exibe contador se `showCount={true}`
- **Posição**: top: -4px, right: -4px
- **Padding**: 4px horizontal (ArenaSpacing.xs)

## Comportamento

### Visibilidade
- Badge **não é renderizado** se `count === 0`
- Badge é sempre visível quando `count > 0`

### Contador
- Exibe número exato até 99
- Exibe "99+" para valores acima de 99
- Usa variant `labelPrimary` do componente Text

## Design Tokens

```tsx
// Cores
backgroundColor: ArenaColors.brand.primary (#FF5301)
borderColor: ArenaColors.neutral.darkest

// Border
borderRadius: ArenaBorders.radius.circle
borderWidth: ArenaBorders.width.medium

// Spacing (size: sm)
width: ArenaSpacing.sm (8px)
height: ArenaSpacing.sm (8px)
top: -ArenaSpacing.micro (-2px)
right: -ArenaSpacing.micro (-2px)

// Spacing (size: md)
minWidth: ArenaSpacing.lg (16px)
height: ArenaSpacing.lg (16px)
paddingHorizontal: ArenaSpacing.xs (4px)
top: -ArenaSpacing.xs (-4px)
right: -ArenaSpacing.xs (-4px)
```

## Uso com InvitesContext

```tsx
import { useInvites } from '@/contexts/InvitesContext';
import { NotificationBadge } from '@/components/ui/notificationBadge';

const MyComponent = () => {
  const { counts } = useInvites();

  return (
    <View>
      <Text>Convites de amizade</Text>
      <NotificationBadge count={counts.friendRequests} size="md" showCount />
    </View>
  );
};
```

## Exemplos

### Bottom Tab Navigator (Badge pequeno sem contador)
```tsx
tabBarIcon: ({ color, focused }) => (
  <View>
    <Ionicons name="menu" size={24} color={color} />
    <NotificationBadge count={counts.total} size="sm" />
  </View>
)
```

### Menu Item (Badge médio com contador)
```tsx
<View style={styles.menuItem}>
  <Text>Atletas</Text>
  <NotificationBadge count={counts.friendRequests} size="md" showCount />
</View>
```

## Acessibilidade

- Use `testID` para identificar badges em testes
- Badge é puramente visual (não interativo)
- Contador fornece informação quantitativa clara

## Integração

O componente é usado em conjunto com:
- `InvitesContext` - Fornece contagens de convites pendentes
- `UnreadNotificationsContext` - Fornece contagem de notificações não lidas
- Bottom Tab Navigator - Exibe badge no ícone do menu
- MenuScreen - Exibe badges nas opções de Amigos e Grupos
