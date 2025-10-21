# PrivacyBadge

Badge component to display event privacy types with appropriate colors and icons.

## Usage

```tsx
import { PrivacyBadge } from '@/components/ui/privacyBadge';

// Basic usage
<PrivacyBadge privacy="PUBLIC" />

// With custom size
<PrivacyBadge privacy="GROUP_ONLY" size="lg" />

// With group name (for GROUP_ONLY)
<PrivacyBadge privacy="GROUP_ONLY" groupName="Arena Futebol SP" />

// Icon only (no label)
<PrivacyBadge privacy="INVITE_ONLY" showLabel={false} />

// Label only (no icon)
<PrivacyBadge privacy="APPROVAL_REQUIRED" showIcon={false} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `privacy` | `EventPrivacy` | required | Privacy type: PUBLIC, GROUP_ONLY, APPROVAL_REQUIRED, INVITE_ONLY |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |
| `showIcon` | `boolean` | `true` | Show icon |
| `showLabel` | `boolean` | `true` | Show label text |
| `groupName` | `string` | - | Group name to display (for GROUP_ONLY) |
| `style` | `ViewStyle` | - | Custom container styles |
| `textStyle` | `TextStyle` | - | Custom text styles |
| `testID` | `string` | - | Test ID for testing |

## Privacy Types & Styles

### PUBLIC (Público)
- **Color**: Green (success)
- **Icon**: globe-outline
- **Label**: "Público"
- **Meaning**: Open to anyone

### GROUP_ONLY (Apenas Grupo)
- **Color**: Blue (info)
- **Icon**: people-outline
- **Label**: "Grupo" or "Grupo: {groupName}"
- **Meaning**: Only group members

### APPROVAL_REQUIRED (Requer Aprovação)
- **Color**: Yellow (warning)
- **Icon**: checkmark-done-outline
- **Label**: "Aprovação"
- **Meaning**: Requires organizer approval

### INVITE_ONLY (Apenas Convidados)
- **Color**: Red/Pink (error)
- **Icon**: mail-outline
- **Label**: "Privado"
- **Meaning**: Invite-only event

## Examples

```tsx
// Event list card
<PrivacyBadge privacy={event.privacy} size="sm" />

// Event details header
<PrivacyBadge
  privacy={event.privacy}
  size="lg"
  groupName={event.group?.name}
/>

// Filter chip
<PrivacyBadge
  privacy="PUBLIC"
  showIcon={false}
  size="md"
/>
```

## Design Tokens

- Uses Arena semantic colors (success, info, warning, error)
- Uses ArenaSpacing for padding
- Uses ArenaBorders for border radius (pill)
- Uses Text component with `captionPrimary` variant
- Uses Ionicons (not emojis)

## Accessibility

- Semantic colors with sufficient contrast
- Icon + text provides redundant information
- Can be used with icon-only or text-only modes
- Supports testID for automated testing
