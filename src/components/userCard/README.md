# UserCard Component

Componente de card de usuário com 3 variantes para exibição de amigos, solicitações de amizade e recomendações. Exibe avatar, nome, localização, esportes e ações contextuais.

## Uso Básico

```tsx
import { UserCard } from '@/components/userCard';

// Variante "friend" - Amigo existente
<UserCard
  user={friendData}
  variant="friend"
  onPress={() => navigate('UserProfile', { userId: friend.id })}
  onRemove={() => handleRemoveFriend(friend.id)}
/>

// Variante "request" - Solicitação de amizade
<UserCard
  user={requesterData}
  variant="request"
  onAccept={() => handleAcceptRequest(request.id)}
  onReject={() => handleRejectRequest(request.id)}
  isLoading={isProcessing}
/>

// Variante "recommendation" - Recomendação de amigo
<UserCard
  user={recommendedUser}
  variant="recommendation"
  onPress={() => navigate('UserProfile', { userId: user.id })}
  onAddFriend={() => handleSendRequest(user.id)}
/>
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `user` | `UserData` | **obrigatório** | Dados do usuário (UserData interface) |
| `variant` | `'friend' \| 'request' \| 'recommendation'` | **obrigatório** | Variante do card |
| `onPress` | `() => void` | `undefined` | Callback ao tocar no card (navegar para perfil) |
| `onAccept` | `() => void` | `undefined` | **Request only** - Aceitar solicitação |
| `onReject` | `() => void` | `undefined` | **Request only** - Recusar solicitação |
| `onRemove` | `() => void` | `undefined` | **Friend only** - Remover amigo |
| `onAddFriend` | `() => void` | `undefined` | **Recommendation only** - Adicionar amigo |
| `isLoading` | `boolean` | `false` | Estado de loading nos botões de ação |
| `testID` | `string` | `undefined` | ID para testes |

## Variantes

### 1. `friend` - Amigo Existente

**Ações**:
- Botão primário: "Remover" (destructive)

**Uso**:
```tsx
<UserCard
  user={friend}
  variant="friend"
  onPress={() => navigate('UserProfile', { userId: friend.id })}
  onRemove={handleRemoveFriend}
/>
```

### 2. `request` - Solicitação de Amizade

**Ações**:
- Botão primário: "Aceitar" (primary)
- Botão secundário: "Recusar" (secondary)

**Uso**:
```tsx
<UserCard
  user={requester}
  variant="request"
  onAccept={handleAccept}
  onReject={handleReject}
  isLoading={isProcessing}
/>
```

### 3. `recommendation` - Recomendação

**Ações**:
- Botão primário: "Adicionar" (primary)

**Uso**:
```tsx
<UserCard
  user={recommendation}
  variant="recommendation"
  onPress={() => navigate('UserProfile', { userId: recommendation.id })}
  onAddFriend={handleSendRequest}
/>
```

## UserData Interface

```typescript
interface UserData {
  id: string;
  firstName?: string;
  lastName?: string;
  username: string;
  profilePicture?: string;
  city?: string;
  state?: string;
  sports?: {
    sportId: string;
    sportName: string;
    sportIcon: string;
    sportColor: string;
    isPrimary: boolean;
    skillLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'PROFESSIONAL';
  }[];
}
```

## Layout

```
┌─────────────────────────────────────┐
│  [Avatar]  João Silva               │
│            @joaosilva               │
│            📍 São Paulo, SP         │
│            [Futebol] [Vôlei] [+1]  │
│  ┌────────────┐ ┌────────────┐      │
│  │  [Recusar] │ │  [Aceitar] │      │ <- Variant: request
│  └────────────┘ └────────────┘      │
└─────────────────────────────────────┘
```

## Features

- ✅ **Avatar**: Exibe imagem ou placeholder (person icon)
- ✅ **Nome**: firstName + lastName ou fallback para username
- ✅ **Username**: Exibido com @ prefix
- ✅ **Localização**: Cidade, Estado com ícone de pin
- ✅ **Esportes**: Badges com max 3 esportes + contador
- ✅ **Ações contextuais**: Botões baseados na variante
- ✅ **Loading states**: Desabilita botões e exibe loading
- ✅ **Pressable**: Feedback visual ao tocar
- ✅ **Acessibilidade**: Roles, labels e states
- ✅ **Máximo 142 linhas** (< 150)

## Exemplo Completo

```tsx
import { UserCard } from '@/components/userCard';
import { friendshipsApi } from '@/services/friendships';

function FriendsScreen() {
  const [friends, setFriends] = useState<UserData[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleRemoveFriend = async (userId: string) => {
    setLoadingId(userId);
    try {
      await friendshipsApi.removeFriend(userId);
      setFriends(prev => prev.filter(f => f.id !== userId));
    } catch (error) {
      console.error('Failed to remove friend', error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <FlatList
      data={friends}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <UserCard
          user={item}
          variant="friend"
          onPress={() => navigate('UserProfile', { userId: item.id })}
          onRemove={() => handleRemoveFriend(item.id)}
          isLoading={loadingId === item.id}
        />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
    />
  );
}
```

## Design Tokens Utilizados

- **Cores**: `ArenaColors.neutral.*`, `ArenaColors.brand.primary`
- **Espaçamento**: `ArenaSpacing.xs|sm|md|lg`
- **Bordas**: `ArenaBorders.radius.lg`
- **Tipografia**: Variantes `bodyPrimary`, `captionSecondary`

## Componentes Utilizados

- `Text` - Nomes, username, localização
- `Badge` - Esportes tags
- `Button` - Ações (primary, secondary, destructive)
- `OptimizedImage` - Avatar do usuário
- `Ionicons` - person, location-outline

## Acessibilidade

- Roles: `button` (quando onPress definido)
- Labels: Nome + localização do usuário
- States: disabled durante loading
- testIDs: Propagados para botões de ação (-primary, -secondary)
