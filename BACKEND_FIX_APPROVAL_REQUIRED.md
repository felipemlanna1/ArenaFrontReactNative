# 🔧 Correção Necessária no Backend - APPROVAL_REQUIRED

## 🐛 Problema Identificado

Eventos com `privacy: APPROVAL_REQUIRED` estão **visíveis apenas para participantes e membros de grupo**, quando deveriam ser **visíveis para TODOS os usuários autenticados**.

### Comportamento Atual (ERRADO)

- ❌ Usuários autenticados não participantes → **NÃO veem o evento**
- ✅ Apenas participantes e membros de grupo → veem o evento

### Comportamento Esperado (CORRETO)

- ✅ **TODOS os usuários autenticados** → veem o evento
- ℹ️ Diferença do PUBLIC: usa `requestJoinEvent()` ao invés de `joinEvent()`

---

## 📋 Arquivos a Corrigir

**Arquivo**: `/src/modules/events/events.repository.ts`

---

## 🔧 Correção 1: `buildApprovalRequiredCondition()`

**Localização**: Linha ~944

### Código Atual (ERRADO)

```typescript
private buildApprovalRequiredCondition(): string {
  return `(
    event.privacy = :approvalRequiredPrivacy
    AND (
      securityParticipant.id IS NOT NULL
      OR (
        event.groupId IS NOT NULL
        AND securityGroupMember.id IS NOT NULL
      )
    )
  )`;
}
```

**Problema**: Filtra apenas participantes e membros de grupo.

### Código Corrigido

```typescript
private buildApprovalRequiredCondition(): string {
  // APPROVAL_REQUIRED é visível para todos (como PUBLIC)
  // Apenas o método de ingresso é diferente (requestJoinEvent vs joinEvent)
  return 'event.privacy = :approvalRequiredPrivacy';
}
```

---

## 🔧 Correção 2: `checkApprovalRequiredAccess()`

**Localização**: Linha ~1027

### Código Atual (ERRADO)

```typescript
private async checkApprovalRequiredAccess(
  event: Event,
  eventId: string,
  userId: string,
): Promise<boolean> {
  const isParticipant = await this.isUserInvitedOrParticipant(
    eventId,
    userId,
  );
  if (isParticipant) {
    return true;
  }

  if (event.groupId) {
    return this.isUserGroupMember(event.groupId, userId);
  }

  return false; // ❌ ERRADO - bloqueia usuários não participantes
}
```

**Problema**: Retorna `false` para usuários que não são participantes nem membros de grupo.

### Código Corrigido

```typescript
private async checkApprovalRequiredAccess(
  event: Event,
  eventId: string,
  userId: string,
): Promise<boolean> {
  // APPROVAL_REQUIRED é visível para qualquer usuário autenticado
  // A diferença está no método de ingresso, não na visibilidade
  return true;
}
```

---

## 📊 Comparação de Privacidade

| Privacy Type          | Visibilidade                | Método de Ingresso   | Validação                   |
| --------------------- | --------------------------- | -------------------- | --------------------------- |
| **PUBLIC**            | Todos usuários autenticados | `joinEvent()`        | Imediato (CONFIRMED)        |
| **APPROVAL_REQUIRED** | Todos usuários autenticados | `requestJoinEvent()` | Aguarda aprovação (PENDING) |
| **GROUP_ONLY**        | Apenas membros do grupo     | `joinEvent()`        | Imediato (CONFIRMED)        |
| **INVITE_ONLY**       | Apenas convidados           | `acceptInvite()`     | Aceitar convite             |

---

## ✅ Resultado Esperado Após Correção

### Antes (ERRADO)

```
GET /api/v1/events (user A)
→ Retorna apenas: PUBLIC + GROUP_ONLY (se membro) + eventos que A participa

GET /api/v1/events/:id (user A, evento APPROVAL_REQUIRED criado por B)
→ Retorna 403/404 se A não for participante
```

### Depois (CORRETO)

```
GET /api/v1/events (user A)
→ Retorna: PUBLIC + APPROVAL_REQUIRED + GROUP_ONLY (se membro) + eventos que A participa

GET /api/v1/events/:id (user A, evento APPROVAL_REQUIRED criado por B)
→ Retorna evento normalmente
→ Botão mostra "Solicitar Participação" (ao invés de "Participar")
```

---

## 🧪 Como Testar

1. Criar evento com `privacy: APPROVAL_REQUIRED` (user A)
2. Fazer login com user B (não participante)
3. Listar eventos: `GET /api/v1/events`
   - ✅ DEVE aparecer na lista
4. Ver detalhes: `GET /api/v1/events/:id`
   - ✅ DEVE retornar evento
5. Solicitar participação: `POST /api/v1/events/:id/request-join`
   - ✅ DEVE criar EventParticipant com status PENDING
6. User A aprova: `POST /api/v1/events/:id/participants/:userBId/approve`
   - ✅ DEVE atualizar para CONFIRMED

---

## 💡 Conceito

**APPROVAL_REQUIRED** é essencialmente um evento **PUBLIC com aprovação manual**:

- **Visibilidade**: Igual a PUBLIC (todos veem)
- **Ingresso**: Diferente de PUBLIC (requer aprovação)
- **UX**: Botão "Solicitar Participação" ao invés de "Participar"

**NÃO É** um evento privado restrito - é um evento público com controle de entrada.

---

## 📝 Checklist de Implementação

- [ ] Atualizar `buildApprovalRequiredCondition()` (linha ~944)
- [ ] Atualizar `checkApprovalRequiredAccess()` (linha ~1027)
- [ ] Executar testes unitários do repository
- [ ] Executar testes de integração de listagem de eventos
- [ ] Testar fluxo completo: criar → listar → solicitar → aprovar
- [ ] Verificar que eventos APPROVAL_REQUIRED aparecem na lista
- [ ] Verificar que `GET /events/:id` funciona para não participantes

---

## 🚀 Impacto no Frontend

Após correção no backend, o frontend **JÁ ESTÁ PREPARADO** para lidar corretamente:

- ✅ PrivacyBadge mostrará ícone amarelo "Requer Aprovação"
- ✅ Botão de ação mostrará "Solicitar Participação"
- ✅ useEventCardActions já implementa lógica correta
- ✅ Evento aparecerá na lista para todos

**Nenhuma mudança necessária no frontend** - apenas aguardando correção do backend.

---

**Prioridade**: 🔴 **ALTA** - Bug crítico que impede funcionalidade principal

**Estimativa**: ~15 minutos (2 linhas de código)

**Risco**: ⬇️ **BAIXO** - Simplifica lógica existente, sem adicionar complexidade
