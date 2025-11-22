# 🔔 Guia de Notificações Push - Arena

## 📊 Status Atual

**Data**: 2025-11-05
**Status**: ✅ **IMPLEMENTADO COM EXPO PUSH SERVICE**
**Backend**: Expo Push Service (expo-server-sdk)
**Frontend**: Expo Notifications (expo-notifications)

---

## 🎯 Arquitetura Simplificada

### Por Que Expo Push Service?

✅ **Zero configuração** - Funciona imediatamente
✅ **Cross-platform** - iOS, Android e Web sem configuração adicional
✅ **Gratuito** - Sem necessidade de contas Firebase ou Apple Developer
✅ **Simples** - Um único provider ao invés de dois (FCM + APNs)

### Como Funciona

```
┌─────────────┐          ┌──────────────┐          ┌─────────────┐
│   Frontend  │          │   Backend    │          │ Expo Push   │
│   (React    │  ─────>  │  (NestJS)    │  ─────>  │   Service   │
│   Native)   │  Token   │              │  API     │             │
└─────────────┘          └──────────────┘          └─────────────┘
                                                            │
                                                            ▼
                                                    ┌───────────────┐
                                                    │ Device (iOS/  │
                                                    │  Android)     │
                                                    └───────────────┘
```

1. **Frontend** obtém Expo Push Token (formato: `ExponentPushToken[xxxxxx]`)
2. **Frontend** registra o token no backend via API
3. **Backend** salva o token no banco de dados
4. **Backend** envia notificações usando `expo-server-sdk`
5. **Expo Push Service** entrega para o dispositivo do usuário

---

## ✅ Checklist de Implementação Frontend

### Correções Críticas Aplicadas (2025-01-21)

- [x] **NotificationsProvider** envolvido no `App.tsx` após `AuthProvider`
- [x] **Android 13+ Fix**: Canal de notificação criado ANTES de solicitar permissões
- [x] **Deep Linking**: Handler de notificação inicial para app em estado "killed"
- [x] **Firebase Credentials**: Adicionado ao `.gitignore` para segurança

### Configuração Verificada

- [x] Plugin `expo-notifications` configurado em `app.json`
- [x] Permissão `POST_NOTIFICATIONS` para Android em `app.json`
- [x] Project ID EAS configurado: `ae9ae6e3-e3f6-4cda-949f-f073d0b44b3b`
- [x] Deep linking configurado para `arena://event/:id`, `arena://group/:id`, etc.
- [x] Notification handler configurado com `shouldShowBanner`, `shouldPlaySound`, `shouldSetBadge`

### Estados de App Suportados

- [x] **Foreground**: Notificação exibida em banner dentro do app
- [x] **Background**: Tap em notificação navega para deep link
- [x] **Killed/Closed**: App abre e navega para deep link com delay de 1s

---

## 🚀 Como Testar Notificações

### Pré-requisitos

- ✅ Backend rodando
- ✅ Frontend rodando em **dispositivo físico** (simuladores não recebem push)
- ✅ Usuário autenticado no app

### Passo 1: Verificar Token Registrado

No app, o token é registrado automaticamente após o login. Verifique nos logs do backend:

```bash
cd /Users/felipemoreiralanna/Documents/GitHub/BackSportPulseMobile
npm run start:dev

# Você deve ver:
# [NotificationsService] Expo Push Token registered: ExponentPushToken[xxxxxx]
```

### Passo 2: Testar via API

#### 2.1. Obter JWT Token

Faça login no app e copie o JWT token do AsyncStorage ou Network.

```bash
export JWT_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### 2.2. Enviar Notificação de Teste

```bash
curl -X POST http://localhost:3000/api/v1/notifications/test \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json"
```

**Resposta esperada**:
```json
{
  "message": "Test notification sent successfully",
  "result": {
    "successCount": 1,
    "failureCount": 0
  }
}
```

**No dispositivo**: Você deve receber uma notificação com título "Test Notification".

### Passo 3: Verificar Logs

**Backend logs**:
```bash
[ExpoNotificationProvider] Expo Push Service initialized successfully
[NotificationsService] Device token registered: ExponentPushToken[xxxxxx]
[ExpoNotificationProvider] ✅ Notification sent successfully to userId (ticket-id)
```

**Frontend logs** (React Native Debugger):
```
[NotificationsContext] Expo Push Token: ExponentPushToken[xxxxxx]
[NotificationsService] Token registered successfully
```

---

## 🧪 Testar Notificações em Diferentes Fluxos

### 1. Convite para Evento

```bash
# Criar evento e convidar amigo
POST /api/v1/events
POST /api/v1/events/:eventId/invite/:friendId

# O amigo receberá notificação: "João convidou você para Futebol no Parque"
```

### 2. Aprovação de Participação

```bash
# Solicitar participação
POST /api/v1/events/:eventId/request

# Organizador aprova
POST /api/v1/events/:eventId/approve/:userId

# Usuário receberá: "Sua solicitação para Futebol no Parque foi aprovada!"
```

### 3. Lembrete de Evento (1 hora antes)

Notificações agendadas são enviadas automaticamente 1 hora antes do evento.

---

## 🔧 Configuração

### Backend (.env)

```env
# Push Notifications - Expo Push Service
# Opcional: Access Token para rate limits maiores
# Para obter: https://expo.dev/accounts/felipemlanna1/settings/access-tokens
EXPO_ACCESS_TOKEN=
```

**Nota**: `EXPO_ACCESS_TOKEN` é **opcional**. Funciona perfeitamente sem ele. Use apenas se precisar de rate limits maiores em produção.

### Frontend (app.json)

```json
{
  "expo": {
    "plugins": [
      [
        "expo-notifications",
        {
          "icon": "./assets/icon.png",
          "color": "#FF5301",
          "sounds": []
        }
      ]
    ],
    "android": {
      "permissions": ["POST_NOTIFICATIONS"]
    }
  }
}
```

---

## 📝 Tipos de Notificações Implementadas

| Categoria | Tipos | Exemplo |
|-----------|-------|---------|
| **Eventos** | Convite, Aprovação, Lembrete, Update, Cancelamento | "João convidou você para Futebol" |
| **Grupos** | Convite, Novo Membro, Novo Evento | "Novo evento no grupo Pelada da Galera" |
| **Amigos** | Solicitação, Aceite, Atividades | "Maria aceitou seu pedido de amizade" |
| **Recomendações** | Eventos, Grupos, Amigos | "Evento de Vôlei perto de você" |
| **Sistema** | Mensagens, Geral | "Você tem uma nova mensagem" |

**Total**: 60+ tipos de notificações documentados em [NOTIFICATIONS.md](../../BackSportPulseMobile/src/modules/notifications/NOTIFICATIONS.md)

---

## 🛠️ Troubleshooting

### Problema: Não recebo notificações

#### 1. Verificar se o token foi registrado

```bash
# Logs do backend
grep "Token registered" logs.txt

# Ou via API
curl -X GET http://localhost:3000/api/v1/notifications/preferences \
  -H "Authorization: Bearer $JWT_TOKEN"
```

#### 2. Verificar se o token é válido

Token válido tem o formato: `ExponentPushToken[xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx]`

```bash
# No backend, você deve ver:
[ExpoNotificationProvider] Expo Push Service initialized successfully

# Se ver erro de token inválido:
[ExpoNotificationProvider] ❌ Invalid Expo Push Token
```

#### 3. Verificar permissões

No app, vá para **Configurações > Notificações** e verifique se as permissões estão ativadas.

#### 4. Testar em dispositivo físico

**Simuladores NÃO recebem notificações push**. Sempre teste em:
- iPhone/iPad físico
- Android físico

#### 5. Verificar Expo Push Token

```bash
# Testar token manualmente com Expo
npx expo send-notification \
  --token ExponentPushToken[xxxxxx] \
  --title "Teste" \
  --body "Teste manual"
```

---

## 📚 Documentação Adicional

- [Expo Push Notifications Docs](https://docs.expo.dev/push-notifications/overview/)
- [expo-server-sdk (Backend)](https://github.com/expo/expo-server-sdk-node)
- [expo-notifications (Frontend)](https://docs.expo.dev/versions/latest/sdk/notifications/)
- [Backend NOTIFICATIONS.md](/Users/felipemoreiralanna/Documents/GitHub/BackSportPulseMobile/src/modules/notifications/NOTIFICATIONS.md)

---

## 🎉 Resumo

✅ **Firebase removido** - Zero dependências externas
✅ **APNs removido** - Sem necessidade de certificados Apple
✅ **Expo Push Service** - Funciona imediatamente, sem configuração
✅ **Cross-platform** - iOS, Android e Web
✅ **Gratuito** - Sem custos adicionais
✅ **Simples** - Um único provider

**Configuração**: 0 minutos (vs 1-2 horas com Firebase/APNs)
**Complexidade**: Baixa (vs Alta)
**Manutenção**: Mínima (vs Moderada)

🚀 **As notificações estão prontas para uso em produção!**
