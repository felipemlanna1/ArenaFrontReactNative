# Stepper Component

## Overview
Arena-branded stepper component for multi-step flows and wizards.

## Usage

```tsx
import { Stepper } from '@/components/ui/stepper';

<Stepper currentStep={1} totalSteps={3} variant="dots" />
<Stepper currentStep={0} steps={steps} variant="numbers" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentStep` | `number` | - | Current active step (0-indexed) |
| `totalSteps` | `number` | `3` | Total number of steps (if not using `steps`) |
| `steps` | `Step[]` | - | Array of step objects with labels and completion status |
| `variant` | `'dots' \| 'numbers' \| 'labels'` | `'dots'` | Visual style of stepper |
| `onStepPress` | `(step: number) => void` | - | Callback when step is pressed |
| `allowSkip` | `boolean` | `false` | Allow navigation to future steps |
| `testID` | `string` | - | Test identifier |

### Step Object

```typescript
interface Step {
  label?: string;
  completed?: boolean;
}
```

## Variants

### Dots (default)
Minimal indicator dots for simple flows.
```tsx
<Stepper currentStep={1} totalSteps={3} variant="dots" />
```

### Numbers
Numbered circles with connectors.
```tsx
<Stepper currentStep={0} totalSteps={4} variant="numbers" />
```

### Labels
Numbered circles with text labels below.
```tsx
<Stepper
  currentStep={1}
  steps={[
    { label: 'Basic Info' },
    { label: 'Location' },
    { label: 'Review' },
  ]}
  variant="labels"
/>
```

## Design Tokens

- Active Step: `ArenaColors.brand.primary`
- Inactive Step: `ArenaColors.neutral.medium`
- Container: `ArenaColors.neutral.dark`
- Spacing: `ArenaSpacing.xs`
- Number Size: `ArenaTypography.size.sm`

## Examples

### Simple Dots Stepper
```tsx
<Stepper currentStep={2} totalSteps={5} variant="dots" />
```

### Interactive Numbers Stepper
```tsx
<Stepper
  currentStep={1}
  totalSteps={3}
  variant="numbers"
  onStepPress={(step) => goToStep(step)}
  allowSkip
/>
```

### Labeled Stepper with Custom Steps
```tsx
const steps = [
  { label: 'Info', completed: true },
  { label: 'Details', completed: false },
  { label: 'Review', completed: false },
];

<Stepper
  currentStep={1}
  steps={steps}
  variant="labels"
  onStepPress={handleStepChange}
/>
```
