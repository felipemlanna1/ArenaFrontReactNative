# useEventCardActions

Hook que determina os botões de ação a serem exibidos no EventCard baseado no tipo de privacidade do evento e status do usuário.

## Uso

```tsx
import { useEventCardActions } from './hooks/useEventCardActions';

const { viewButton, actionButton, secondaryActionButton } = useEventCardActions({
  userEventStatus: event.userEventStatus,
  privacy: event.privacy,
  currentParticipants: event.currentParticipants,
  maxParticipants: event.maxParticipants,
  isLoading: isActionLoading,
  currentActionEventId: currentActionEventId,
  eventId: event.id,
  isGroupMember: event.isGroupMember, // opcional
});
```

## Matriz de Ações por Privacy × UserEventStatus

| Privacy | UserEventStatus | Botão Primário | Botão Secundário | Ação |
|---------|-----------------|----------------|------------------|------|
| **Todos** | ORGANIZER/ADMIN | GERENCIAR | - | manage |
| **Todos** | PARTICIPANT | CANCELAR | - | cancel |
| **Todos** | INVITED | ACEITAR | RECUSAR | accept/reject |
| **Todos** | PENDING_REQUEST | DESFAZER | - | undo |
| **PUBLIC** | NONE | PARTICIPAR | - | join |
| **GROUP_ONLY** | NONE (não membro) | [oculto] | - | - |
| **GROUP_ONLY** | NONE (membro) | PARTICIPAR | - | join |
| **APPROVAL_REQUIRED** | NONE | SOLICITAR | - | request |
| **INVITE_ONLY** | NONE | [oculto] | - | - |

## Props

| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `userEventStatus` | `UserEventStatus` | Não | Status do usuário em relação ao evento |
| `privacy` | `EventPrivacy` | Sim | Tipo de privacidade do evento |
| `currentParticipants` | `number` | Sim | Número de participantes atuais |
| `maxParticipants` | `number` | Sim | Número máximo de participantes |
| `isLoading` | `boolean` | Não | Se alguma ação está em andamento |
| `currentActionEventId` | `string \| null` | Não | ID do evento com ação em andamento |
| `eventId` | `string` | Sim | ID do evento atual |
| `isGroupMember` | `boolean` | Não | Se o usuário é membro do grupo (GROUP_ONLY) |

## Retorno

```typescript
{
  viewButton: ActionButton;           // Sempre presente - botão "VER"
  actionButton: ActionButton | null;  // Botão de ação principal (varia)
  secondaryActionButton: ActionButton | null; // Botão secundário (ex: RECUSAR)
}
```

## Regras de Negócio

### 1. Evento Lotado
Se `currentParticipants >= maxParticipants`, não mostra botão de ação para usuários sem status (NONE).

### 2. Loading State
Quando `isLoading && currentActionEventId === eventId`, o botão de ação fica com loading e disabled.

### 3. Prioridade de Status
A ordem de verificação é:
1. ORGANIZER/ADMIN → GERENCIAR
2. PARTICIPANT → CANCELAR
3. INVITED → ACEITAR + RECUSAR
4. PENDING_REQUEST → DESFAZER
5. NONE → Depende do privacy

### 4. Privacy Types

#### PUBLIC
- Qualquer usuário pode participar diretamente
- Botão: "PARTICIPAR" (join)

#### GROUP_ONLY
- Apenas membros do grupo podem ver e participar
- Futuramente: verificar `isGroupMember` prop
- Por ora: oculta botão para NONE (backend já filtra visibilidade)

#### APPROVAL_REQUIRED
- Usuário solicita participação → organizador aprova/rejeita
- Botão: "SOLICITAR" (request)
- Após solicitar: status muda para PENDING_REQUEST → botão "DESFAZER"

#### INVITE_ONLY
- Apenas usuários convidados podem ver e aceitar
- NONE: sem botão (não deveria ver o evento)
- INVITED: botões "ACEITAR" + "RECUSAR"

## Exemplos

### Evento Público
```tsx
// Usuário sem status
userEventStatus: 'NONE'
privacy: 'PUBLIC'
→ actionButton: "PARTICIPAR" (primary)

// Usuário participante
userEventStatus: 'PARTICIPANT'
privacy: 'PUBLIC'
→ actionButton: "CANCELAR" (danger)
```

### Evento com Aprovação
```tsx
// Usuário sem status
userEventStatus: 'NONE'
privacy: 'APPROVAL_REQUIRED'
→ actionButton: "SOLICITAR" (secondary)

// Usuário com solicitação pendente
userEventStatus: 'PENDING_REQUEST'
privacy: 'APPROVAL_REQUIRED'
→ actionButton: "DESFAZER" (outline)
```

### Evento Apenas Convidados
```tsx
// Usuário convidado
userEventStatus: 'INVITED'
privacy: 'INVITE_ONLY'
→ actionButton: "ACEITAR" (secondary)
→ secondaryActionButton: "RECUSAR" (outline)

// Usuário não convidado
userEventStatus: 'NONE'
privacy: 'INVITE_ONLY'
→ actionButton: null (não mostra botão)
```

## Notas de Implementação

- Botão "VER" sempre aparece para navegar aos detalhes
- Botão "GERENCIAR" só para organizadores/admins
- Estados de loading são isolados por eventId
- Backend controla visibilidade (frontend só controla ações)
