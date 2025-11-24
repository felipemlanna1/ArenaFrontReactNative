# ArenaTypography - Typography System

## Overview

Complete typography system for Arena Mobile with 25 text variants enforced by ESLint.

## Core Principle

**NEVER use fontSize, fontWeight, lineHeight, letterSpacing, fontFamily in StyleSheet.create()**

**ALWAYS use Text component variants**

## Text Variants (25 total)

### Display/Headings
- `displayPrimary` (32px bold) - Large numbers, stats
- `headingPrimary` (26px bold) - Screen titles
- `headingSecondary` (26px regular) - Secondary headings

### Titles
- `titlePrimary` (22px semibold) - Section titles, card titles
- `titleSecondary` (19px semibold) - Subtitles

### Subtitles
- `subtitlePrimary` (17px semibold) - Prominent subtitles
- `subtitleSecondary` (17px regular) - Regular subtitles

### Body Text
- `bodyPrimary` (15px regular) - Main reading text
- `bodySecondary` (15px regular, medium color) - Secondary text

### Captions
- `captionPrimary` (13px medium) - Labels, metadata
- `captionSecondary` (13px regular, medium color) - Timestamps
- `captionMuted` (13px regular, muted) - Discrete hints
- `captionError` (13px regular, error color) - Error messages

### Labels
- `labelPrimary` (15px medium) - Form labels, important labels
- `labelSecondary` (13px regular) - Secondary labels

### Links
- `linkPrimary` (15px medium, primary color, underline) - Primary links
- `linkSecondary` (13px regular, secondary, underline) - Secondary links

### Buttons (internal use)
- `buttonPrimary` (15px semibold) - Primary button text
- `buttonSecondary` (15px medium) - Secondary button text

### Inputs
- `inputPrimary` (15px regular) - Input text
- `inputSecondary` (13px regular) - Secondary input text
- `placeholderPrimary` (15px regular, medium color) - Placeholder text

### States
- `errorPrimary` (13px medium, error color)
- `errorSecondary` (11px regular, error color)
- `successPrimary` (13px medium, success color)
- `warningPrimary` (13px medium, warning color)
- `infoPrimary` (13px medium, info color)
- `disabledPrimary` (15px regular, disabled color)

## Usage

```tsx
import { Text } from '@/components/ui/text';

// ✅ CORRECT - Using variants
<Text variant="headingPrimary">Bem-vindo</Text>
<Text variant="bodyPrimary">Descrição do evento...</Text>
<Text variant="captionSecondary">Há 2 minutos</Text>

// ✅ CORRECT - Layout properties only in styles
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',     // ✅ OK
    marginTop: ArenaSpacing.md, // ✅ OK
  },
});
<Text variant="titlePrimary" style={styles.title}>Título</Text>

// ❌ INCORRECT - Typography in styles
const styles = StyleSheet.create({
  title: {
    fontSize: 22,            // ❌ Use variant instead
    fontWeight: '600',       // ❌ Use variant instead
    color: '#FFFFFF',        // ❌ Use variant instead
  },
});
```

## Typography Tokens

```typescript
import { ArenaTypography } from '@/constants';

// Font Sizes
ArenaTypography.size.xs   // 11px
ArenaTypography.size.sm   // 13px
ArenaTypography.size.md   // 15px (body default)
ArenaTypography.size.lg   // 17px
ArenaTypography.size.xl   // 19px
ArenaTypography.size['2xl'] // 22px
ArenaTypography.size['3xl'] // 26px
ArenaTypography.size['4xl'] // 32px

// Font Weights
ArenaTypography.weight.light      // 300
ArenaTypography.weight.regular    // 400
ArenaTypography.weight.medium     // 500
ArenaTypography.weight.semibold   // 600
ArenaTypography.weight.bold       // 700
ArenaTypography.weight.extrabold  // 800

// Line Heights
ArenaTypography.lineHeight.tight       // 1.2
ArenaTypography.lineHeight.comfortable // 1.4
ArenaTypography.lineHeight.relaxed     // 1.6

// Font Families
ArenaTypography.fontFamily.regular  // Inter-Regular
ArenaTypography.fontFamily.medium   // Inter-Medium
ArenaTypography.fontFamily.semibold // Inter-SemiBold
ArenaTypography.fontFamily.bold     // Inter-Bold
```

## Hierarchy Rules

1. **Screen Titles**: `headingPrimary` (26px bold)
2. **Section Titles**: `titlePrimary` (22px semibold)
3. **Card Titles**: `titlePrimary` or `titleSecondary`
4. **Body Text**: `bodyPrimary` (15px regular)
5. **Labels**: `labelPrimary` (15px medium) or `captionPrimary` (13px medium)
6. **Metadata**: `captionSecondary` (13px regular)
7. **Timestamps**: `captionSecondary` with muted color

## ESLint Enforcement

The codebase uses `arena/arena-text-requires-variant` rule:

```typescript
// ❌ Error: Text component must have "variant" prop
<Text>Hello</Text>

// ✅ Correct
<Text variant="bodyPrimary">Hello</Text>
```

## Line Height Formula

**lineHeight = fontSize × 1.5 (minimum for readability)**

Examples:
- 15px body → 22.5px → rounded to 24px lineHeight
- 13px caption → 19.5px → rounded to 20px lineHeight
- 22px title → 33px lineHeight

## Color Hierarchy

- **Primary text**: `neutral.light` (#FFFFFF) - Main content
- **Secondary text**: `neutral.medium` (#B8B8B8) - Less important
- **Muted text**: `neutral.medium` with opacity - Discrete hints
- **Links**: `brand.primary` (#FF5301) - Interactive
- **States**: Semantic colors (success/error/warning)

## Don Norman's Emotional Design

### Visceral Level
Consistent typography creates visual harmony and reduces cognitive load.

### Behavioral Level
Clear hierarchy guides users through content - size = importance is learnable.

### Reflective Level
Professional typography signals quality and attention to detail.

## Migration Guide

### Before (Inconsistent)
```tsx
const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 28,
  },
});
<Text style={styles.title}>Título</Text>
```

### After (Consistent)
```tsx
const styles = StyleSheet.create({
  title: {
    textAlign: 'center', // Only layout properties
  },
});
<Text variant="titlePrimary" style={styles.title}>Título</Text>
```

## Related

- [Text Component](../../components/ui/text/README.md)
- [ArenaColors](./colors.ts)
- [ArenaSpacing](./spacing.ts)
