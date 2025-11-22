# 🔥 Guia Completo: Configuração Firebase FCM v1 para Arena

**Objetivo**: Melhorar confiabilidade de notificações no Android com Firebase Cloud Messaging v1

**Tempo Estimado**: 30 minutos

**Pré-requisitos**:
- ✅ Conta Google
- ✅ Projeto Firebase criado (você já tem)
- ✅ Acesso ao Firebase Console

---

## 📋 Passo a Passo na Interface do Firebase

### ETAPA 1: Acessar o Projeto Firebase

1. Acesse https://console.firebase.google.com/
2. Faça login com sua conta Google
3. Selecione seu projeto existente (ou crie um novo se necessário)
4. Anote o **Nome do Projeto** (ex: "Arena", "SportPulse", etc)

**📸 Informação para Enviar**:
```
Nome do Projeto Firebase: __________________
```

---

### ETAPA 2: Adicionar App Android ao Projeto

1. No painel principal do Firebase, clique em "Adicionar app" ou no ícone do Android
2. Preencha o formulário:

   **Nome do pacote Android** (CRITICAL):
   ```
   com.arena.app
   ```

   ⚠️ **IMPORTANTE**: Este nome DEVE ser exatamente `com.arena.app` conforme configurado no `app.json` do projeto.

   **Apelido do app** (opcional):
   ```
   Arena Mobile App
   ```

   **Certificado de assinatura SHA-1** (opcional para notificações):
   ```
   (deixe em branco por enquanto - não é necessário para push notifications)
   ```

3. Clique em "Registrar app"

**📸 Screenshot para Enviar**:
- Tire um print da tela mostrando o app Android registrado

---

### ETAPA 3: Baixar arquivo `google-services.json`

1. Após registrar o app, você verá a opção "Fazer download do google-services.json"
2. Clique para baixar o arquivo
3. **NÃO renomeie o arquivo** - deve permanecer como `google-services.json`

**📁 Arquivo para Enviar**:
```
google-services.json
```

⚠️ **ATENÇÃO**: Este arquivo contém credenciais sensíveis. Envie de forma segura!

**Onde Irei Colocar**: `/Users/felipemoreiralanna/Documents/GitHub/ArenaFrontReactNative/google-services.json`

**O que acontece depois**:
- Arquivo será adicionado ao `.gitignore` (já configurado)
- EAS Build lerá automaticamente durante o build Android
- Expo usará as credenciais FCM para Android

3. Clique em "Próximo" e depois "Continuar no console"

---

### ETAPA 4: Habilitar Cloud Messaging API (V1) - CRÍTICO

⚠️ **ATENÇÃO**: Esta é a etapa MAIS IMPORTANTE! Se pular, notificações não funcionarão.

1. No menu lateral esquerdo, clique no ícone de ⚙️ **Configurações** (Settings)
2. Clique em **Configurações do projeto** (Project settings)
3. Vá para a aba **Cloud Messaging**
4. Role para baixo até a seção **Cloud Messaging API (V1)**
5. Você verá um dos dois cenários:

   **Cenário A**: "Cloud Messaging API (V1) is disabled"
   - Clique no botão **Enable** ou **Ativar**
   - Aguarde alguns segundos até aparecer "Enabled"

   **Cenário B**: Já está habilitado
   - Você verá "Cloud Messaging API (V1) - Enabled" ✅

**📸 Screenshot para Enviar**:
- Tire um print mostrando **Cloud Messaging API (V1) - Enabled**

---

### ETAPA 5: Gerar Service Account JSON (Chave Privada)

Esta chave será usada pelo backend para autenticar no Firebase e enviar notificações.

1. Ainda em **Configurações do projeto** → **Contas de serviço** (Service accounts)
2. Você verá a seção "Firebase Admin SDK"
3. Verifique que o idioma selecionado é **Node.js** (JavaScript)
4. Clique no botão **Gerar nova chave privada** (Generate new private key)
5. Aparecerá um popup de confirmação:
   ```
   "Tem certeza de que deseja gerar uma nova chave privada?"
   ```
6. Clique em **Gerar chave** (Generate key)
7. Um arquivo JSON será baixado automaticamente com nome similar a:
   ```
   arena-firebase-adminsdk-xxxxx-xxxxxxxxxx.json
   ```

**📁 Arquivo para Enviar**:
```
<projeto>-firebase-adminsdk-xxxxx.json
```

⚠️ **ATENÇÃO MÁXIMA**:
- Este arquivo contém credenciais SUPER SENSÍVEIS
- **NUNCA faça commit** deste arquivo no Git
- Envie apenas para mim de forma segura (DM, arquivo privado, etc)
- Após implementação, delete o arquivo enviado

**Onde Irei Colocar**: `/Users/felipemoreiralanna/Documents/GitHub/BackSportPulseMobile/firebase-adminsdk.json`

**O que acontece depois**:
- Será adicionado ao `.gitignore` do backend
- Backend usará para autenticar no Firebase
- Credenciais serão extraídas e configuradas no `.env`

---

### ETAPA 6: Copiar Informações do Service Account

Ainda na mesma página (**Contas de serviço**), você verá informações sobre o Service Account:

Procure e copie as seguintes informações:

1. **Nome da conta de serviço** (Service account email):
   ```
   firebase-adminsdk-xxxxx@<projeto>.iam.gserviceaccount.com
   ```

2. **ID do projeto** (Project ID):
   ```
   arena-xxxxx ou nome-do-projeto
   ```

**📸 Informações para Enviar**:
```
Service Account Email: ___________________________
Project ID: ___________________________
```

---

### ETAPA 7: (Opcional) Verificar Sender ID

1. Volte para **Configurações do projeto** → aba **Cloud Messaging**
2. No topo, você verá:
   - **Sender ID**: (número de 12 dígitos)
   - **Server key** (legado - não vamos usar)

**📸 Informação para Enviar** (opcional):
```
Sender ID: ___________________________
```

⚠️ Não confunda com "Server key" - **NÃO** use a Server key (API legada)!

---

## 📦 RESUMO: O Que Você Precisa Me Enviar

Copie este template e preencha com suas informações:

```markdown
## 🔥 Informações Firebase para Implementação

### 1. Informações do Projeto
- **Nome do Projeto Firebase**: ___________________________
- **Project ID**: ___________________________
- **Service Account Email**: ___________________________@___________.iam.gserviceaccount.com

### 2. Arquivos
- [ ] `google-services.json` (anexado)
- [ ] `<projeto>-firebase-adminsdk-xxxxx.json` (anexado)

### 3. Confirmações
- [ ] Cloud Messaging API (V1) está **Enabled** (screenshot anexado)
- [ ] App Android registrado com package `com.arena.app` (screenshot anexado)
- [ ] Arquivos baixados e não renomeados

### 4. Observações
- Confirmo que os arquivos JSON contêm credenciais sensíveis e serão enviados de forma segura
- Entendo que esses arquivos NÃO devem ser commitados no Git
```

---

## 🛠️ O Que Farei com Essas Informações

### No Frontend (ArenaFrontReactNative)

1. **Adicionar `google-services.json`**:
   ```
   /ArenaFrontReactNative/google-services.json
   ```
   - Já está no `.gitignore` ✅
   - EAS Build usará automaticamente durante build Android

2. **Verificar `app.json`**:
   - Confirmar `android.package` = `com.arena.app`
   - Já configurado ✅

3. **Nada mais necessário!**
   - O plugin `expo-notifications` já está configurado
   - Build Android pegará `google-services.json` automaticamente

### No Backend (BackSportPulseMobile)

1. **Adicionar arquivo Service Account**:
   ```
   /BackSportPulseMobile/firebase-adminsdk.json
   ```
   - Será adicionado ao `.gitignore`

2. **Atualizar `.env`** com as credenciais:
   ```env
   # Firebase Cloud Messaging (FCM) v1
   FIREBASE_PROJECT_ID=seu-project-id
   FIREBASE_PRIVATE_KEY=chave-extraida-do-json
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@projeto.iam.gserviceaccount.com
   ```

3. **Implementar FCM Provider** (se necessário):
   - Criar `FcmNotificationProvider` para envios diretos via Firebase
   - Configurar fallback: Expo Push Service → FCM (se Expo falhar)
   - Atualizar `NotificationsModule` para usar ambos

4. **Testar envio**:
   - Testar com token Android
   - Verificar logs do Firebase Console
   - Confirmar recebimento no dispositivo

---

## 🧪 Como Testar Depois da Implementação

### Teste 1: Build Android com Firebase

```bash
cd /Users/felipemoreiralanna/Documents/GitHub/ArenaFrontReactNative

# Build de preview para testar
eas build --profile preview --platform android
```

Durante o build, EAS lerá `google-services.json` e configurará FCM automaticamente.

### Teste 2: Enviar Notificação via Backend

```bash
# Backend deve logar:
[FcmNotificationProvider] FCM initialized successfully
[FcmNotificationProvider] ✅ Notification sent via FCM

# Dispositivo Android deve receber notificação
```

### Teste 3: Verificar Logs no Firebase Console

1. Firebase Console → **Cloud Messaging**
2. Você verá estatísticas de notificações enviadas
3. Gráficos de entregas, erros, etc.

---

## ⚠️ Troubleshooting

### Erro: "google-services.json not found"

**Causa**: Arquivo não está na raiz do projeto frontend
**Solução**: Mover para `/ArenaFrontReactNative/google-services.json`

### Erro: "Invalid service account credentials"

**Causa**: JSON do Service Account corrompido ou incompleto
**Solução**: Gerar nova chave privada no Firebase Console

### Erro: "Package name mismatch"

**Causa**: `app.json` tem package diferente de `com.arena.app`
**Solução**: Atualizar `android.package` em `app.json`

### Erro: "Cloud Messaging API is disabled"

**Causa**: API (V1) não foi habilitada no Firebase
**Solução**: Ir em Configurações → Cloud Messaging → Enable API

---

## 🔒 Segurança dos Arquivos

### Arquivos que NUNCA devem ir para o Git:

```gitignore
# Firebase credentials
google-services.json
*-firebase-adminsdk-*.json
firebase-adminsdk*.json
GoogleService-Info.plist  # iOS (quando adicionar)
```

✅ **Já adicionados ao `.gitignore`** em ambos os projetos!

### Como Compartilhar Comigo

**Opções Seguras**:
1. **DM Privada** no Slack/Discord
2. **Arquivo criptografado** (7zip com senha)
3. **Link temporário** (Google Drive com acesso restrito, auto-delete em 24h)
4. **Mensagem privada** aqui mesmo (se suportado)

**⛔ NÃO FAÇA**:
- Não poste em canal público
- Não faça commit no Git
- Não envie por email não criptografado
- Não cole o conteúdo JSON em chat público

---

## ✅ Checklist Final

Antes de me enviar as informações, verifique:

- [ ] Projeto Firebase criado e selecionado
- [ ] App Android adicionado com package `com.arena.app`
- [ ] `google-services.json` baixado (não renomeado)
- [ ] Cloud Messaging API (V1) **Enabled**
- [ ] Service Account JSON baixado
- [ ] Service Account Email copiado
- [ ] Project ID copiado
- [ ] Screenshots tirados (API enabled + app registrado)
- [ ] Template de informações preenchido
- [ ] Pronto para enviar de forma segura

---

## 🚀 Próximos Passos

### Depois que Eu Implementar

1. **Build Android** com Firebase integrado
2. **Teste de notificação** end-to-end
3. **Monitoramento** via Firebase Console
4. **Otimizações** se necessário (batching, retry logic, etc)

### Benefícios Esperados

✅ **Maior confiabilidade** de entrega no Android
✅ **Analytics** de notificações no Firebase Console
✅ **Fallback** se Expo Push Service falhar
✅ **Recursos avançados** do FCM (topics, segmentation, etc)

---

**Estou pronto para receber suas informações e implementar! 🔥**

Quando tiver tudo, me envie usando o template acima.
