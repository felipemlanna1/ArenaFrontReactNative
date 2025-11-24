# ArenaIconSizes - Icon Size System

## Overview

Standardized icon size scale for consistent visual hierarchy across the Arena mobile app.

## Size Scale

| Size | Value | Context | Examples |
|------|-------|---------|----------|
| `xs` | 16px | Inline icons, badges | • Badge counters • Inline text icons • Checkmarks in small chips |
| `sm` | 20px | Input icons, inactive tabs | • Calendar icon in DatePicker • Location pin in inputs • Tab bar inactive icons |
| `md` | 24px | **DEFAULT** for most cases | • Button icons • Active tab icons • Header icons • Card icons |
| `lg` | 32px | Highlighted icons, categories | • Category chips • Sport icons in selection • Feature highlights |
| `xl` | 48px | Empty states, large cards | • Sport selection grid • Mini empty states • Large feature cards |
| `xxl` | 64px | Hero empty states | • Main empty state illustrations • Onboarding icons • Hero sections |

## Usage

### Import

```typescript
import { ArenaIconSizes } from '@/constants';
import Ionicons from '@expo/vector-icons/Ionicons';
```

### Examples

```tsx
// ✅ CORRECT - Using ArenaIconSizes
<Ionicons
  name="calendar-outline"
  size={ArenaIconSizes.sm}
  color={ArenaColors.neutral.medium}
/>

// ✅ CORRECT - Default size (md)
<Ionicons
  name="add"
  size={ArenaIconSizes.md}
  color={ArenaColors.brand.primary}
/>

// ❌ INCORRECT - Hardcoded size
<Ionicons name="calendar-outline" size={20} color="#B8B8B8" />
```

## Color Guidelines

Always use `ArenaColors` tokens for icon colors:

```typescript
// ✅ CORRECT
color={ArenaColors.brand.primary}     // Interactive/active icons
color={ArenaColors.neutral.light}      // Primary icons on dark bg
color={ArenaColors.neutral.medium}     // Secondary/inactive icons
color={ArenaColors.semantic.success}   // Success feedback
color={ArenaColors.semantic.error}     // Error feedback

// ❌ INCORRECT
color="#FF5301"  // Hardcoded color
```

## Size Selection Guide

### Button Icons

Button icons should be **4px smaller** than button height:

```typescript
// Button lg (56px height) → icon md (24px)
<Button variant="primary" size="lg" iconLeft="add">
  <Ionicons name="add" size={ArenaIconSizes.md} />
</Button>

// Button sm (40px height) → icon sm (20px)
<Button variant="secondary" size="sm" iconLeft="calendar">
  <Ionicons name="calendar" size={ArenaIconSizes.sm} />
</Button>
```

### Input Icons

Use `sm` (20px) for input field icons:

```tsx
<Input
  label="Data"
  icon={<Ionicons name="calendar-outline" size={ArenaIconSizes.sm} />}
/>
```

### Tab Bar Icons

- **Active tabs**: `md` (24px)
- **Inactive tabs**: `sm` (20px)

### Empty States

- **Hero empty states** (full screen): `xxl` (64px)
- **Section empty states** (within content): `xl` (48px)
- **Mini empty states** (small cards): `lg` (32px)

## Accessibility

For standalone icons without text, always add accessibility labels:

```tsx
<Ionicons
  name="close"
  size={ArenaIconSizes.md}
  color={ArenaColors.neutral.light}
  accessibilityLabel="Fechar"
  accessibilityRole="button"
/>
```

## Migration Guide

### Before (Inconsistent)

```tsx
// Various hardcoded sizes across codebase
<Ionicons name="calendar" size={20} />
<Ionicons name="add" size={28} />
<Ionicons name="star" size={22} />
```

### After (Consistent)

```tsx
// Using standardized scale
<Ionicons name="calendar" size={ArenaIconSizes.sm} />
<Ionicons name="add" size={ArenaIconSizes.lg} />
<Ionicons name="star" size={ArenaIconSizes.md} />
```

## Don Norman's Emotional Design Impact

### Visceral Level
Consistent icon sizes create visual rhythm and harmony, reducing cognitive load.

### Behavioral Level
Predictable icon sizes aid in scanability - users learn size = importance.

### Reflective Level
Professional consistency signals quality and attention to detail.

## Related

- [ArenaColors](./colors.ts) - Color system
- [ArenaSpacing](./spacing.ts) - Spacing system
- [ArenaTypography](./typography.ts) - Typography system
