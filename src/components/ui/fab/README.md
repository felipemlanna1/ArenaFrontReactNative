# Fab Component (Floating Action Button)

## Overview
Arena-branded floating action button for primary actions in the interface.

## Usage

```tsx
import { Fab } from '@/components/ui/fab';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ArenaColors } from '@/constants';

<Fab
  onPress={handleCreateEvent}
  icon={<Ionicons name="add" size={24} color={ArenaColors.neutral.light} />}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onPress` | `() => void` | - | Callback when FAB is pressed |
| `icon` | `ReactNode` | - | Icon element to display |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the FAB |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Visual variant |
| `position` | `'bottom-right' \| 'bottom-left' \| 'bottom-center'` | `'bottom-right'` | Screen position preset |
| `bottom` | `number` | `ArenaSpacing['4xl']` | Custom bottom distance (overrides position preset) |
| `right` | `number` | `ArenaSpacing.lg` | Custom right distance (for bottom-right position) |
| `left` | `number` | `ArenaSpacing.lg` | Custom left distance (for bottom-left position) |
| `disabled` | `boolean` | `false` | Whether the FAB is disabled |
| `testID` | `string` | - | Test identifier |

## Sizes

- **sm**: 48x48 pixels (icon size 20)
- **md**: 56x56 pixels (icon size 24) - Default
- **lg**: 64x64 pixels (icon size 28)

## Variants

- **primary**: Orange brand color (#FF5301)
- **secondary**: Neutral dark color

## Positions

- **bottom-right**: Bottom right corner (default)
- **bottom-left**: Bottom left corner
- **bottom-center**: Bottom center

## Design Tokens

- Primary Background: `ArenaColors.brand.primary`
- Secondary Background: `ArenaColors.neutral.dark`
- Icon Color: `ArenaColors.neutral.light`
- Shadow: `ArenaColors.neutral.darkest`
- Spacing: `ArenaSpacing['2xl']` (bottom), `ArenaSpacing.lg` (sides)

## Examples

### Basic FAB
```tsx
<Fab
  onPress={handleCreate}
  icon={<Ionicons name="add" size={24} color={ArenaColors.neutral.light} />}
/>
```

### Small FAB
```tsx
<Fab
  size="sm"
  onPress={handleCreate}
  icon={<Ionicons name="add" size={20} color={ArenaColors.neutral.light} />}
/>
```

### Secondary Variant
```tsx
<Fab
  variant="secondary"
  onPress={handleEdit}
  icon={<Ionicons name="create" size={24} color={ArenaColors.neutral.light} />}
/>
```

### Bottom Left Position
```tsx
<Fab
  position="bottom-left"
  onPress={handleCreate}
  icon={<Ionicons name="add" size={24} color={ArenaColors.neutral.light} />}
/>
```

### Disabled State
```tsx
<Fab
  disabled
  onPress={handleCreate}
  icon={<Ionicons name="add" size={24} color={ArenaColors.neutral.light} />}
/>
```

### Custom Position - Higher FAB
```tsx
<Fab
  bottom={100}
  onPress={handleCreate}
  icon={<Ionicons name="add" size={24} color={ArenaColors.neutral.light} />}
/>
```

### Custom Position - More to the Left
```tsx
<Fab
  right={32}
  onPress={handleCreate}
  icon={<Ionicons name="add" size={24} color={ArenaColors.neutral.light} />}
/>
```

### Fully Custom Position
```tsx
<Fab
  bottom={80}
  right={24}
  onPress={handleCreate}
  icon={<Ionicons name="add" size={24} color={ArenaColors.neutral.light} />}
/>
```

## Accessibility

The FAB automatically includes:
- `accessibilityRole="button"`
- `accessibilityState={{ disabled }}` when disabled
