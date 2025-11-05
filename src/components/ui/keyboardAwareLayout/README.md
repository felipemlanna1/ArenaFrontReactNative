# KeyboardAwareLayout Component

A reusable component that handles keyboard avoidance behavior across different platforms in the Arena app.

## Usage

```tsx
import { KeyboardAwareLayout } from '@/components/ui/keyboardAwareLayout';

// Basic usage with ScrollView (default)
<KeyboardAwareLayout>
  <Input label="Email" />
  <Input label="Password" />
  <Button>Submit</Button>
</KeyboardAwareLayout>

// Without ScrollView (for custom scroll implementations)
<KeyboardAwareLayout withScrollView={false}>
  <YourCustomContent />
</KeyboardAwareLayout>

// With custom vertical offset
<KeyboardAwareLayout verticalOffset={100}>
  <YourFormContent />
</KeyboardAwareLayout>

// With custom ScrollView props
<KeyboardAwareLayout
  scrollViewProps={{
    refreshControl: <RefreshControl />,
    onScroll: handleScroll,
  }}
>
  <YourContent />
</KeyboardAwareLayout>
```

## Props

| Prop                        | Type            | Default                 | Description                                |
| --------------------------- | --------------- | ----------------------- | ------------------------------------------ |
| `children`                  | ReactNode       | -                       | Content to render                          |
| `enableKeyboardAvoid`       | boolean         | true                    | Enable/disable keyboard avoiding behavior  |
| `verticalOffset`            | number          | Platform-specific       | Offset from keyboard (iOS: 0, Android: 80) |
| `scrollEnabled`             | boolean         | true                    | Enable/disable scrolling                   |
| `contentContainerStyle`     | ViewStyle       | -                       | Style for ScrollView content container     |
| `scrollViewProps`           | ScrollViewProps | -                       | Additional ScrollView props                |
| `testID`                    | string          | 'keyboard-aware-layout' | Test identifier                            |
| `withScrollView`            | boolean         | true                    | Wrap content in ScrollView                 |
| `keyboardShouldPersistTaps` | string          | 'handled'               | When to dismiss keyboard on tap            |

## Platform Behavior

- **iOS**: Uses padding behavior with 0px default offset
- **Android**: Uses padding behavior with 80px default offset (accounts for status bar and header)
- Automatically adjusts based on `adjustResize` in AndroidManifest.xml

## Best Practices

1. Always use for screens with form inputs
2. Keep default `keyboardShouldPersistTaps="handled"` for better UX
3. Adjust `verticalOffset` based on your header/navigation height
4. Use `withScrollView={false}` only when implementing custom scroll behavior
5. Add extra padding to submit buttons using `contentContainerStyle`

## Common Patterns

### Login/Register Forms

```tsx
<KeyboardAwareLayout
  contentContainerStyle={{ paddingHorizontal: ArenaSpacing.lg }}
>
  <Input label="Email" />
  <Input label="Password" />
  <Button>Login</Button>
</KeyboardAwareLayout>
```

### Multi-step Forms

```tsx
<KeyboardAwareLayout verticalOffset={100}>
  <StepIndicator />
  <FormContent />
  <NavigationButtons />
</KeyboardAwareLayout>
```

### Long Forms

```tsx
<KeyboardAwareLayout
  contentContainerStyle={{
    paddingBottom: ArenaSpacing['4xl'], // Extra space for keyboard
  }}
>
  <LongFormContent />
</KeyboardAwareLayout>
```
