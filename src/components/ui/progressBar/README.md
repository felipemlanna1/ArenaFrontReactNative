# ProgressBar Component

## Overview
Arena-branded progress bar component for displaying completion percentage or loading progress.

## Usage

```tsx
import { ProgressBar } from '@/components/ui/progressBar';

<ProgressBar progress={75} />
<ProgressBar progress={50} height={8} showPercentage />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `progress` | `number` | - | Progress value (0-100) |
| `height` | `number` | `4` | Height of the progress bar in pixels |
| `animated` | `boolean` | `true` | Whether to animate progress changes |
| `showPercentage` | `boolean` | `false` | Show percentage text below bar |
| `backgroundColor` | `string` | `ArenaColors.neutral.dark` | Background track color |
| `progressColor` | `string` | `ArenaColors.brand.primary` | Fill color |
| `testID` | `string` | - | Test identifier |

## Design Tokens

- Background: `ArenaColors.neutral.dark`
- Fill: `ArenaColors.brand.primary`
- Border Radius: `ArenaBorders.radius.pill`
- Percentage Text: `ArenaColors.neutral.medium`

## Examples

### Basic
```tsx
<ProgressBar progress={50} />
```

### With Percentage
```tsx
<ProgressBar progress={75} showPercentage />
```

### Custom Height
```tsx
<ProgressBar progress={60} height={8} />
```

### Custom Colors
```tsx
<ProgressBar
  progress={90}
  progressColor={ArenaColors.semantic.success}
  backgroundColor={ArenaColors.neutral.medium}
/>
```
