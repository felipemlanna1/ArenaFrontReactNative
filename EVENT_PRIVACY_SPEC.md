# Especificação: Sistema de Privacidade de Eventos Arena

> **Versão**: 1.0
> **Data**: 2025-10-21
> **Autor**: Análise do Backend BackSportPulseMobile

---

## 📋 Sumário Executivo

O sistema Arena suporta **4 tipos de privacidade** para eventos, cada um com regras específicas de visibilidade, ingresso e gestão. Este documento mapeia todas as regras do backend e seus impactos no frontend.

---

## 🔐 Tipos de Privacidade (EventPrivacy)

### 1. PUBLIC - Evento Aberto

**Descrição**: Evento visível e acessível para qualquer usuário.

#### Regras de Visibilidade
- ✅ **Usuários não autenticados** (guests): SIM
- ✅ **Usuários autenticados**: SIM
- 📍 Aparece em buscas públicas e feed principal

#### Regras de Ingresso
- **Método**: `joinEvent()` - Join direto
- **Validações**:
  - Evento deve estar com status `PUBLISHED`
  - Data de início não passou (`startDate > now`)
  - Evento não está cheio (`currentParticipants < maxParticipants`)
  - Usuário ainda não é participante
- **Resultado**: Participante criado com status `CONFIRMED`

#### Regras de Gestão
- Organizador pode remover participantes
- Não há sistema de aprovação

---

### 2. GROUP_ONLY - Apenas Grupo

**Descrição**: Evento visível e acessível apenas para membros ativos de um grupo específico.

#### Regras de Visibilidade
- ❌ **Usuários não autenticados** (guests): NÃO
- ✅ **Membros ativos do grupo** (`groupId` + `isActive = true`): SIM
- ❌ **Usuários não membros**: NÃO
- ✅ **Organizador**: SIM (sempre)

#### Regras de Ingresso
- **Método**: `joinEvent()` - Join direto (se membro)
- **Pré-requisito**: Ser membro ativo do grupo
- **Validações**: Mesmas do PUBLIC + verificação de membership
- **Verificação de Grupo**:
  ```sql
  SELECT COUNT(*) FROM group_members
  WHERE groupId = event.groupId
    AND userId = :userId
    AND isActive = true
  ```
- **Resultado**: Participante criado com status `CONFIRMED`

#### Regras de Gestão
- Evento DEVE ter `groupId` definido
- Apenas membros do grupo podem ver e participar

#### Campo Obrigatório
```typescript
interface Event {
  privacy: 'GROUP_ONLY';
  groupId: string; // ⚠️ OBRIGATÓRIO
}
```

---

### 3. APPROVAL_REQUIRED - Requer Aprovação

**Descrição**: Evento onde o organizador deve aprovar cada participante individualmente.

#### Regras de Visibilidade
- ❌ **Usuários não autenticados** (guests): NÃO
- ✅ **Organizador**: SIM
- ✅ **Participantes** (qualquer status: CONFIRMED, PENDING, INVITED): SIM
- ✅ **Membros do grupo** (se evento tiver `groupId`): SIM
- ❌ **Outros usuários**: NÃO

#### Regras de Ingresso
- **Método**: `requestJoinEvent()` - Solicitação
- **Validações**: Mesmas do PUBLIC
- **Resultado**: Participante criado com status `PENDING`
- ⏳ **Estado Intermediário**: Aguarda aprovação do organizador

#### Fluxo de Aprovação

**1. Usuário solicita participação**:
```typescript
POST /api/v1/events/:id/request-join
→ Cria EventParticipant { status: 'PENDING' }
→ NÃO incrementa currentParticipants
```

**2. Organizador aprova**:
```typescript
POST /api/v1/events/:id/participants/:userId/approve
→ Atualiza EventParticipant { status: 'CONFIRMED' }
→ Incrementa currentParticipants
```

**3. Organizador rejeita**:
```typescript
POST /api/v1/events/:id/participants/:userId/reject
→ Remove EventParticipant
→ NÃO afeta currentParticipants
```

**4. Usuário cancela solicitação**:
```typescript
POST /api/v1/events/:id/request-join/cancel
→ Remove EventParticipant
→ NÃO afeta currentParticipants
```

#### Regras de Gestão
- **Quem pode aprovar/rejeitar**:
  - Organizador (`organizerId`)
  - Owners (`ownerIds` - máximo 5)
- Solicitações PENDING não contam para `currentParticipants`
- Evento pode ter `groupId` (membros veem evento mas ainda precisam solicitar)

---

### 4. INVITE_ONLY - Apenas Convidados

**Descrição**: Evento privado onde apenas pessoas convidadas podem ver e participar.

#### Regras de Visibilidade
- ❌ **Usuários não autenticados** (guests): NÃO
- ✅ **Organizador**: SIM
- ✅ **Usuários convidados** (invitation.status = PENDING): SIM
- ✅ **Participantes** (status CONFIRMED ou INVITED): SIM
- ❌ **Outros usuários**: NÃO

#### Regras de Ingresso
- **NÃO pode usar** `joinEvent()` ou `requestJoinEvent()`
- **DEVE ter convite** válido
- ⚠️ Tentativa de join direto → `BadRequestException`

#### Fluxo de Convites

**1. Organizador envia convites**:
```typescript
POST /api/v1/events/:id/invitations
Body: {
  userIds: string[],
  message?: string // Mensagem personalizada
}
→ Cria EventInvitation { status: 'PENDING' } para cada userId
→ Cria EventParticipant { status: 'INVITED' }
→ Envia notificação para cada usuário
```

**2. Usuário aceita convite**:
```typescript
POST /api/v1/events/:id/invitations/accept
→ Atualiza EventInvitation { status: 'ACCEPTED', respondedAt: now }
→ Atualiza EventParticipant { status: 'CONFIRMED' }
→ Incrementa currentParticipants
```

**3. Usuário rejeita convite**:
```typescript
POST /api/v1/events/:id/invitations/:invitationId/reject
→ Atualiza EventInvitation { status: 'REJECTED', respondedAt: now }
→ Remove EventParticipant
→ NÃO afeta currentParticipants
```

#### Regras de Gestão
- **Quem pode enviar convites**:
  - Organizador (`organizerId`)
  - Owners (`ownerIds`)
- Convites PENDING mostram evento para o convidado
- Organizador pode reenviar convites rejeitados

---

## 📊 Enums e Status

### EventPrivacy
```typescript
enum EventPrivacy {
  PUBLIC = 'PUBLIC',
  GROUP_ONLY = 'GROUP_ONLY',
  APPROVAL_REQUIRED = 'APPROVAL_REQUIRED',
  INVITE_ONLY = 'INVITE_ONLY',
}
```

### ParticipantStatus
```typescript
enum ParticipantStatus {
  CONFIRMED = 'CONFIRMED',   // Participante confirmado (conta em currentParticipants)
  PENDING = 'PENDING',       // Aguardando aprovação (APPROVAL_REQUIRED)
  INVITED = 'INVITED',       // Foi convidado mas ainda não aceitou (INVITE_ONLY)
  CANCELLED = 'CANCELLED',   // Cancelou participação
  REJECTED = 'REJECTED',     // Foi rejeitado pelo organizador
}
```

### InvitationStatus
```typescript
enum InvitationStatus {
  PENDING = 'PENDING',       // Convite enviado, aguardando resposta
  ACCEPTED = 'ACCEPTED',     // Convite aceito
  REJECTED = 'REJECTED',     // Convite recusado
}
```

### UserEventStatus (Frontend)
```typescript
enum UserEventStatus {
  NONE = 'NONE',                      // Sem relação com o evento
  PARTICIPANT = 'PARTICIPANT',        // Participante confirmado
  PENDING_REQUEST = 'PENDING_REQUEST', // Tem solicitação pendente (APPROVAL_REQUIRED)
  INVITED = 'INVITED',                // Foi convidado (INVITE_ONLY)
  ORGANIZER = 'ORGANIZER',            // É o organizador
  ADMIN = 'ADMIN',                    // É owner (ownerIds)
}
```

---

## 🎯 Matriz de Ações por Privacidade x UserEventStatus

| Privacy | UserEventStatus | Ação Primária | Ação Secundária |
|---------|-----------------|---------------|-----------------|
| **PUBLIC** | NONE | "Participar" (joinEvent) | - |
| | PARTICIPANT | "Sair" (leaveEvent) | "Compartilhar" |
| | ORGANIZER/ADMIN | "Gerenciar" | "Editar", "Cancelar" |
| **GROUP_ONLY** | NONE (não membro) | [Desabilitado] "Apenas membros" | "Ver Grupo" |
| | NONE (membro) | "Participar" (joinEvent) | - |
| | PARTICIPANT | "Sair" (leaveEvent) | "Compartilhar" |
| | ORGANIZER/ADMIN | "Gerenciar" | "Editar", "Cancelar" |
| **APPROVAL_REQUIRED** | NONE | "Solicitar" (requestJoin) | - |
| | PENDING_REQUEST | "Cancelar Solicitação" | Badge "Aguardando" |
| | PARTICIPANT | "Sair" (leaveEvent) | "Compartilhar" |
| | ORGANIZER/ADMIN | "Gerenciar" | Badge "X pendentes" |
| **INVITE_ONLY** | NONE | [Oculto] - | - |
| | INVITED | "Aceitar Convite" | "Recusar" |
| | PARTICIPANT | "Sair" (leaveEvent) | - |
| | ORGANIZER/ADMIN | "Gerenciar" | "Convidar Pessoas" |

---

## 🖥️ Impactos nas Telas (Detalhado)

### 1️⃣ HomeScreen / EventListScreen

#### Componente: EventCard

**Novos elementos**:
- Badge de privacidade (topo direito do card)
- Botão de ação dinâmico (baseado em privacy + userEventStatus)
- Indicador de grupo (se GROUP_ONLY)
- Badge de status do usuário (se PENDING ou INVITED)

**Filtros**:
```typescript
interface EventFilters {
  privacy?: EventPrivacy[]; // Novo filtro
  userEventStatus?: UserEventStatus[]; // Já existe
  // ... outros filtros
}
```

**Lógica de exibição**:
```typescript
const getEventActionButton = (event: Event, userStatus: UserEventStatus) => {
  switch (event.privacy) {
    case 'PUBLIC':
      return userStatus === 'NONE' ? 'Participar' : 'Sair';

    case 'GROUP_ONLY':
      if (userStatus === 'NONE') {
        return isUserGroupMember ? 'Participar' : null; // Desabilitar
      }
      return 'Sair';

    case 'APPROVAL_REQUIRED':
      if (userStatus === 'NONE') return 'Solicitar Participação';
      if (userStatus === 'PENDING_REQUEST') return 'Cancelar Solicitação';
      return 'Sair';

    case 'INVITE_ONLY':
      if (userStatus === 'INVITED') return 'Aceitar Convite';
      if (userStatus === 'PARTICIPANT') return 'Sair';
      return null; // Ocultar para NONE
  }
};
```

---

### 2️⃣ CreateEventScreen

#### Novo Step: Privacidade (após BasicInfoStep)

**Componente**: `PrivacyStep`

**Campos**:
```typescript
interface PrivacyStepData {
  privacy: EventPrivacy;
  groupId?: string; // Obrigatório se privacy = GROUP_ONLY
}
```

**UI**:
- RadioGroup com 4 opções (ícone + título + descrição)
- Se GROUP_ONLY selecionado → Dropdown de grupos do usuário
- Tooltips explicativos para cada tipo

**Validação**:
```typescript
const validatePrivacyStep = (data: PrivacyStepData) => {
  if (data.privacy === 'GROUP_ONLY' && !data.groupId) {
    return 'Selecione um grupo para eventos de grupo';
  }
  return null;
};
```

**Ordem dos Steps**:
1. BasicInfoStep (título, descrição, esporte)
2. **PrivacyStep** ← NOVO
3. DateTimeStep
4. LocationStep
5. ParticipantsStep
6. ReviewStep

---

### 3️⃣ EventDetailsScreen

#### Header
- Badge de privacidade ao lado do título
- Link para grupo (se GROUP_ONLY)
- Indicador "Privado" (se INVITE_ONLY)

#### Botão de Ação Principal
Usar mesma lógica de `getEventActionButton` da lista

#### Seção de Participantes
**Tabs**:
- **Confirmados** (CONFIRMED) - visível para todos
- **Aguardando** (PENDING) - apenas organizador/owners
- **Convidados** (INVITED) - apenas organizador/owners

**Visual**:
```typescript
interface ParticipantListItem {
  user: User;
  status: ParticipantStatus;
  joinedAt: Date;
  // Ícone baseado em status:
  // CONFIRMED → check verde
  // PENDING → clock amarelo
  // INVITED → envelope azul
}
```

#### Botão Compartilhar
- PUBLIC/APPROVAL_REQUIRED → Link direto
- GROUP_ONLY → "Compartilhar com membros do grupo"
- INVITE_ONLY → Desabilitado (organizer usa "Convidar Pessoas")

---

### 4️⃣ MyEventsScreen

#### Badges nos Cards
- Mostrar badge de privacidade em cada card
- Cores:
  - Verde: PUBLIC
  - Azul: GROUP_ONLY
  - Amarelo: APPROVAL_REQUIRED
  - Vermelho/Rosa: INVITE_ONLY

#### Nova Seção: "Aguardando Aprovação"
- Filtro: `userEventStatus: ['PENDING_REQUEST']`
- Card com badge "Aguardando"
- Botão "Cancelar Solicitação"

#### Contador para Organizadores
Se user é organizador de eventos APPROVAL_REQUIRED:
```typescript
const pendingRequestsCount = events
  .filter(e => e.userEventStatus === 'ORGANIZER' && e.privacy === 'APPROVAL_REQUIRED')
  .reduce((acc, e) => acc + e.pendingParticipantsCount, 0);
```
- Badge numérico no tab "Organizando"
- Link rápido "Gerenciar Solicitações"

---

### 5️⃣ EventManagementScreen (NOVA TELA)

**Rota**: `/events/:id/manage`
**Acesso**: `userEventStatus IN ['ORGANIZER', 'ADMIN']`

#### Tab 1: Participantes Confirmados
```typescript
<FlatList
  data={confirmedParticipants}
  renderItem={({ item }) => (
    <ParticipantItem
      user={item.user}
      joinedAt={item.joinedAt}
      actions={[
        { label: 'Remover', onPress: () => removeParticipant(item.userId) }
      ]}
    />
  )}
/>
```

#### Tab 2: Solicitações Pendentes (APPROVAL_REQUIRED)
```typescript
<FlatList
  data={pendingParticipants}
  renderItem={({ item }) => (
    <PendingRequestItem
      user={item.user}
      requestedAt={item.joinedAt}
      actions={[
        { label: 'Aprovar', variant: 'primary', onPress: () => approveRequest(item.userId) },
        { label: 'Rejeitar', variant: 'secondary', onPress: () => rejectRequest(item.userId) }
      ]}
    />
  )}
/>
```

#### Tab 3: Convidados (INVITE_ONLY)
```typescript
interface InvitationListItem {
  invitation: EventInvitation;
  user: User;
  status: InvitationStatus;
  invitedAt: Date;
  respondedAt?: Date;
}

<FlatList
  data={invitations}
  ListHeaderComponent={
    <Button onPress={() => openInviteModal()}>
      Convidar Mais Pessoas
    </Button>
  }
  renderItem={({ item }) => (
    <InvitationItem
      invitation={item}
      statusBadge={getInvitationStatusBadge(item.status)}
    />
  )}
/>
```

#### Modal: Enviar Convites
```typescript
<InviteUsersModal
  eventId={eventId}
  onClose={closeModal}
  onSuccess={refreshInvitations}
>
  <SearchInput
    placeholder="Buscar por nome ou @username"
    onChangeText={debouncedSearch}
  />
  <FilterTabs>
    <Tab label="Amigos" />
    <Tab label="Membros do Grupo" /> {/* Se GROUP_ONLY */}
    <Tab label="Todos" />
  </FilterTabs>
  <UserSelectionList
    users={filteredUsers}
    selectedUserIds={selectedUserIds}
    onToggle={toggleUserSelection}
  />
  <Input
    label="Mensagem Personalizada (opcional)"
    multiline
    value={customMessage}
    onChangeText={setCustomMessage}
  />
  <Button onPress={sendInvitations}>
    Enviar {selectedUserIds.length} Convite(s)
  </Button>
</InviteUsersModal>
```

---

## 🔌 API Endpoints (Backend)

### Eventos Públicos/Listagem
```
GET  /api/v1/events
GET  /api/v1/events/:id
```

### Participação - PUBLIC/GROUP_ONLY
```
POST /api/v1/events/:id/join
POST /api/v1/events/:id/leave
```

### Participação - APPROVAL_REQUIRED
```
POST   /api/v1/events/:id/request-join
POST   /api/v1/events/:id/request-join/cancel
POST   /api/v1/events/:id/participants/:userId/approve
POST   /api/v1/events/:id/participants/:userId/reject
```

### Participação - INVITE_ONLY
```
POST /api/v1/events/:id/invitations
     Body: { userIds: string[], message?: string }
POST /api/v1/events/:id/invitations/accept
POST /api/v1/events/:id/invitations/:invitationId/reject
```

### Gestão
```
GET    /api/v1/events/:id/participants
POST   /api/v1/events/:id/participants/:userId/remove
GET    /api/v1/events/:id/owners
POST   /api/v1/events/:id/owners
DELETE /api/v1/events/:id/owners/:userId
```

---

## ✅ Checklist de Implementação

### Fase 1: Fundação
- [ ] Criar tipos TypeScript (`EventPrivacy`, `ParticipantStatus`, etc.)
- [ ] Atualizar `typesEvents.ts` com enums
- [ ] Criar `PrivacyBadge` component
- [ ] Atualizar services com novos endpoints

### Fase 2: Listagem e Criação
- [ ] Atualizar `EventCard` com badge e ações dinâmicas
- [ ] Implementar `PrivacyStep` no CreateEventScreen
- [ ] Adicionar dropdown de grupos
- [ ] Testar criação de cada tipo de privacidade

### Fase 3: Detalhes e Ações
- [ ] Atualizar `EventDetailsScreen` com badges
- [ ] Implementar botões dinâmicos por privacy
- [ ] Criar métodos `joinEvent`, `requestJoinEvent`, `acceptInvite`
- [ ] Implementar fluxo de cancelamento

### Fase 4: Gestão
- [ ] Criar `EventManagementScreen` com tabs
- [ ] Implementar aprovação/rejeição de solicitações
- [ ] Criar `InviteUsersModal` com busca
- [ ] Implementar envio de convites

### Fase 5: MyEvents
- [ ] Adicionar badges de privacidade nos cards
- [ ] Criar seção "Aguardando Aprovação"
- [ ] Implementar contador de solicitações pendentes
- [ ] Testar todos os filtros

---

## 🧪 Cenários de Teste

### Cenário 1: Evento Público
1. Criar evento PUBLIC
2. Listar eventos (guest) → deve aparecer
3. Join direto → deve confirmar imediatamente
4. Leave → deve remover

### Cenário 2: Evento de Grupo
1. Criar evento GROUP_ONLY com groupId
2. Usuário não membro → não vê evento
3. Usuário membro → vê e pode participar
4. Join → confirma imediatamente

### Cenário 3: Aprovação Necessária
1. Criar evento APPROVAL_REQUIRED
2. Usuário solicita participação → status PENDING
3. Organizador vê solicitação pendente
4. Organizador aprova → status CONFIRMED
5. Organizador rejeita → remove participante

### Cenário 4: Apenas Convidados
1. Criar evento INVITE_ONLY
2. Usuário não convidado → não vê evento
3. Organizador envia convites
4. Convidado recebe notificação
5. Convidado aceita → status CONFIRMED
6. Convidado rejeita → invitation REJECTED

---

## 📚 Referências

- Backend: `/BackSportPulseMobile/src/modules/events/`
- Enums: `/BackSportPulseMobile/src/shared/enums/event.enums.ts`
- Repository: `/BackSportPulseMobile/src/modules/events/events.repository.ts`
- Service: `/BackSportPulseMobile/src/modules/events/events.service.ts`
- Controller: `/BackSportPulseMobile/src/modules/events/events.controller.ts`
