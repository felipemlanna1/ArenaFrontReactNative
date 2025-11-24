# StatefulButton

Enhanced button component with automatic state management for async actions.

## Features

- **Automatic State Transitions**: idle → loading → success/error → idle
- **Visual Feedback**: Color changes, icon swaps, shake/bounce animations
- **Haptic Feedback**: Success/error vibrations on iOS/Android
- **Error Recovery**: Auto-returns to idle state after success/error
- **Type Safety**: Full TypeScript support with strict typings

## Usage

```tsx
import { StatefulButton } from '@/components/ui/statefulButton';
import Ionicons from '@expo/vector-icons/Ionicons';

const handleJoinEvent = async () => {
  await eventAPI.joinEvent(eventId);
};

<StatefulButton
  onPress={handleJoinEvent}
  idleText="Participar"
  loadingText="Confirmando..."
  successText="Confirmado!"
  errorText="Erro ao participar"
  variant="primary"
  size="lg"
  fullWidth
  leftIcon={({ size, color }) => (
    <Ionicons name="add" size={size} color={color} />
  )}
  onSuccess={() => showToast('Você está dentro!', 'success')}
  onError={(error) => showToast(error.message, 'error')}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onPress` | `() => Promise<void>` | **required** | Async function to execute |
| `idleText` | `string` | - | Text for idle state |
| `loadingText` | `string` | `'Confirmando...'` | Text for loading state |
| `successText` | `string` | `'Confirmado!'` | Text for success state |
| `errorText` | `string` | `'Erro'` | Text for error state |
| `successDuration` | `number` | `1500` | Success state duration (ms) |
| `errorDuration` | `number` | `2000` | Error state duration (ms) |
| `onSuccess` | `() => void` | - | Callback after success |
| `onError` | `(error?: Error) => void` | - | Callback after error |
| `variant` | `ButtonVariant` | `'primary'` | Button variant |
| `size` | `ButtonSize` | `'lg'` | Button size |
| `leftIcon` | `ComponentType<IconProps>` | - | Left icon component |
| `fullWidth` | `boolean` | `false` | Full width button |

## States

### 1. Idle
- Initial state, ready for interaction
- Shows `idleText` and `leftIcon`
- Variant: `variant` prop (default: `primary`)

### 2. Loading
- Triggered when `onPress()` is called
- Shows loading spinner + `loadingText`
- Button disabled to prevent double-tap
- No icon displayed

### 3. Success
- Triggered when `onPress()` resolves successfully
- Shows checkmark icon (bounces) + `successText`
- Background changes to green (`success` variant)
- Haptic success feedback
- Auto-returns to idle after `successDuration`

### 4. Error
- Triggered when `onPress()` rejects/throws
- Shows X icon + `errorText`
- Background changes to red (`destructive` variant)
- Shake animation
- Haptic error feedback
- Auto-returns to idle after `errorDuration`

## Animations

- **Bounce (Success)**: Icon scales 1 → 1.2 → 1 over 400ms
- **Shake (Error)**: Button moves ±10px horizontally 3 times over 400ms
- **Color Transition**: Background color morphs between states smoothly

## Accessibility

- Inherits all accessibility props from base `Button` component
- Button disabled state prevents interaction during loading/success/error
- Visual + haptic + text feedback ensures multi-sensory confirmation

## Don Norman UX Design

- **Visceral**: Color + animation changes create immediate visual satisfaction
- **Behavioral**: Haptic feedback + icon changes confirm action completion
- **Reflective**: Success/error states build trust in system reliability

## Task #18 Implementation

This component fulfills Task #18 requirements:
- ✅ Loading state with spinner + text
- ✅ Success state with color change + checkmark + bounce
- ✅ Error state with shake animation + color change
- ✅ Haptic feedback (success/error)
- ✅ Auto-disable during operations
- ✅ Optimistic UI patterns ready
