# Testes E2E - Arena Mobile

## 🎯 Visão Geral

Sistema de testes End-to-End usando **Maestro** + **GitHub Actions** + **AI (Claude Code)**.

**Custo**: R$ 0,00 permanente (100% open source)

---

## 🚀 Quick Start (5 minutos)

### 1. Instalação
```bash
# Instalar Maestro
curl -fsSL https://get.maestro.dev | bash

# Ou usar script do projeto
./scripts/e2e/setup-maestro.sh

# Verificar
maestro --version
```

### 2. Build do App
```bash
# Android
npx expo run:android

# iOS
npx expo run:ios
```

### 3. Rodar Primeiro Teste
```bash
# Teste de login
maestro test .maestro/flows/auth/login.yaml

# Todos os testes
maestro test .maestro/flows/
```

### 4. Gravar Novo Teste (Interface Visual)
```bash
# Abrir Maestro Studio
maestro studio

# Interaja com o app → código YAML gerado automaticamente
# Salvar em .maestro/flows/{categoria}/{nome}.yaml
```

---

## 📁 Estrutura de Testes

```
.maestro/
├── config.yaml              # Configuração global
├── .env.example             # Template de variáveis de ambiente
├── flows/                   # Testes organizados por categoria
│   ├── auth/               # Autenticação
│   │   ├── login.yaml
│   │   ├── register.yaml
│   │   └── social-auth.yaml
│   ├── events/             # Eventos
│   │   ├── create-event.yaml
│   │   ├── filter-events.yaml
│   │   └── event-details.yaml
│   ├── profile/            # Perfil
│   │   ├── edit-profile.yaml
│   │   └── view-profile.yaml
│   └── onboarding/         # Onboarding
│       └── sports-selection.yaml
└── shared/                 # Fluxos reutilizáveis
    └── login-helper.yaml
```

---

## 🤖 Gerando Testes com Claude Code / IA

### Método 1: MaestroGPT Integrado
```bash
# Durante gravação no Maestro Studio
maestro studio

# No terminal do Studio, digite:
/gpt criar teste de login com validação de erro

# MaestroGPT gera comandos automaticamente
```

### Método 2: Claude Code com Prompt Otimizado
Prompt sugerido:
```
Crie um teste Maestro YAML para Arena Mobile:

Fluxo: Login com credenciais inválidas
Steps:
1. Abrir app
2. Preencher email inválido
3. Preencher senha
4. Submeter
5. Validar mensagem de erro "Email ou senha inválidos"

Componentes disponíveis:
- Input (id: email-input, password-input)
- Button (id: submit-button)

Use variáveis de ambiente do config.yaml.
```

### Método 3: Script de Geração Automatizada
```bash
# Usar script (futuro)
./scripts/e2e/generate-test-from-ai.sh \
  "Teste de criação de evento esportivo" \
  ".maestro/flows/events/create-event.yaml"
```

---

## 🎨 Convenções Arena

### testIDs Obrigatórios
Todos os componentes UI críticos **DEVEM** ter testID:

```tsx
// ✅ CORRETO
<Input
  testID="email-input"
  label="Email"
  value={email}
  onChangeText={setEmail}
/>

// ❌ ERRADO
<Input label="Email" value={email} />
```

### Nomenclatura de testIDs
Padrão: `{categoria}-{componente}` ou `{screen}-{component}`

Exemplos:
- `email-input`
- `password-input`
- `submit-button`
- `register-button`
- `create-event-fab`
- `sport-card-football`

### Estrutura de Teste YAML
```yaml
appId: com.arena.app
---
# Título do Teste
# Autor: {name}
# Status: ✅ Stable | ⚠️ Flaky | 🚧 WIP
# Duração estimada: ~{time}

# Comentário de pré-condição
- launchApp

# Comentário da ação
- tapOn:
    id: "component-id"
- inputText: ${VARIABLE}

# Validação
- assertVisible:
    text: "Expected Text"
    timeout: 5000
```

---

## 🧪 Executando Testes

### Local
```bash
# Todos os testes
maestro test .maestro/flows/

# Pasta específica
maestro test .maestro/flows/auth/

# Arquivo específico
maestro test .maestro/flows/auth/login.yaml

# Com variáveis de ambiente customizadas
maestro test .maestro/flows/auth/login.yaml \
  --env TEST_USER_EMAIL=custom@arena.com \
  --env TEST_USER_PASSWORD=customPass123
```

### Com Relatórios
```bash
# Gerar JUnit report (para CI/CD)
maestro test .maestro/flows/ \
  --format junit \
  --output maestro-report.xml

# Screenshots salvos automaticamente em:
# ~/.maestro/tests/
```

### CI/CD (GitHub Actions)
Automático em:
- ✅ **Pull Requests** → Smoke tests (Android apenas)
- ✅ **Push para main** → Full suite (Android)
- ✅ **Schedule (Segunda 3am)** → Full suite (iOS + Android)
- ✅ **Manual** → workflow_dispatch no GitHub

Veja workflows em `.github/workflows/e2e-*.yml`

---

## 📊 Relatórios e Artifacts

### Local
- Screenshots: `~/.maestro/tests/{timestamp}/*.png`
- Vídeos: `~/.maestro/tests/{timestamp}/*.mp4` (se habilitado)
- Logs: `~/.maestro/tests/{timestamp}/maestro.log`

### CI/CD (GitHub Actions)
- Artifacts disponíveis por **30 dias**
- Test Reporter visual no PR
- Screenshots/vídeos de falhas
- Link direto para download

---

## 🔧 Troubleshooting

### Problema: Elemento não encontrado
```yaml
# Solução 1: Usar scroll até encontrar
- scrollUntilVisible:
    element:
      id: "target-element"
    timeout: 10000

# Solução 2: Aumentar timeout
- tapOn:
    id: "button"
    timeout: 15000

# Solução 3: Usar texto ao invés de ID
- tapOn:
    text: "Entrar"
```

### Problema: Teste flaky (instável)
```yaml
# Adicione espera por loading desaparecer
- assertNotVisible:
    id: "loading-indicator"
    timeout: 10000

# Ou aguarde elemento aparecer antes de clicar
- assertVisible:
    id: "button"
    timeout: 5000
- tapOn:
    id: "button"
```

### Problema: App não abre
```bash
# Verificar que app está buildado
npx expo run:android  # ou run:ios

# Verificar appId correto
maestro test --app-id com.arena.app

# Rebuild do app
cd android && ./gradlew clean
cd .. && npx expo run:android
```

---

## 🎓 Recursos e Documentação

- 📖 [Docs Oficiais Maestro](https://docs.maestro.dev)
- 🤖 [MaestroGPT](https://docs.maestro.dev/ai)
- 🧪 [Comandos Maestro](https://docs.maestro.dev/api-reference/commands)
- 🎬 [Exemplos de Testes](https://github.com/mobile-dev-inc/maestro/tree/main/examples)
- 💬 [Discord Maestro](https://discord.gg/maestro-dev)

---

## ⚙️ Configurações Avançadas

### Variáveis de Ambiente
```bash
# Criar arquivo .maestro/maestro.env (gitignored)
cp .maestro/.env.example .maestro/maestro.env

# Editar valores
TEST_USER_EMAIL=real@arena.com
TEST_USER_PASSWORD=RealPass123
BASE_URL=https://api.arena.com
```

### Helpers Reutilizáveis
```yaml
# Usar helper de login em outro teste
- runFlow: ../shared/login-helper.yaml

# Continuar teste após login
- tapOn:
    text: "Criar Evento"
```

### Conditional Assertions
```yaml
# Validar elemento opcional (não falha se ausente)
- assertVisible:
    id: "optional-element"
    optional: true

# Executar ação se elemento existir
- runScript:
    when:
      visible: "Update Available"
    commands:
      - tapOn: "Update"
```

---

## 💰 Custos Estimados

### Configuração Recomendada (Grátis Permanente)
| Item | Custo Mensal | Detalhes |
|------|--------------|----------|
| **Maestro CLI** | R$ 0 | FOSS, local forever |
| **GitHub Actions** | R$ 0 | 2000 min/mês (repo privado) ou ilimitado (público) |
| **Git LFS** | R$ 0 | 1GB grátis (screenshots) |
| **EAS Build** | R$ 0 | 30 builds/mês grátis |
| **TOTAL** | **R$ 0/mês** | **Custo zero permanente** |

### Otimizações de Custo (GitHub Actions)
1. **Android First**: Executar sempre em Android (Linux runner grátis/ilimitado)
2. **iOS Semanal**: Executar iOS apenas 1x/semana (macOS = 10x custo)
3. **Repo Público**: Considerar tornar público para Actions ilimitado
4. **Self-Hosted Runners**: Usar máquinas próprias para CI/CD (custo zero)

---

## 👥 Contribuindo

### Checklist para Novo Teste
1. [ ] Teste criado em pasta apropriada (`flows/{categoria}/`)
2. [ ] testIDs adicionados em componentes (se necessário)
3. [ ] Comentários explicativos no YAML
4. [ ] Variáveis de ambiente usadas (não hardcode)
5. [ ] Validado 10x localmente (estabilidade >90%)
6. [ ] PR aberto com teste incluído
7. [ ] CI validou automaticamente

### Processo de Review
1. Criar teste localmente
2. Validar 10x (verificar estabilidade)
3. Abrir PR com teste incluído
4. CI valida automaticamente (Android)
5. Review manual (iOS se necessário)
6. Merge após aprovação

---

## 📈 Métricas e KPIs

### Metas
| Métrica | Meta | Como Medir |
|---------|------|------------|
| Cobertura de Fluxos Críticos | 100% | Checklist manual |
| Estabilidade (% sucesso) | >95% | CI/CD reports |
| Tempo Médio de Execução | <10min | GitHub Actions logs |
| Testes Gerados com IA | >50% | Tag YAML "AI-generated" |
| Custo Mensal | R$ 0 | GitHub billing |

### Dashboards (Futuro)
- [ ] Test Report agregado (por categoria)
- [ ] Gráfico de estabilidade ao longo do tempo
- [ ] Alertas de testes flaky
- [ ] Notificações Slack em falhas

---

## ✅ Checklist de Setup Inicial

- [ ] Maestro CLI instalado (`maestro --version`)
- [ ] Estrutura `.maestro/` criada
- [ ] `config.yaml` configurado
- [ ] `.env.example` → `maestro.env` (valores reais)
- [ ] Primeiro teste (login) rodando com sucesso
- [ ] GitHub Actions workflow validado
- [ ] Time treinado em gravação de testes
- [ ] Documentação lida e entendida

---

## 🎉 Pronto para Começar!

Execute agora:
```bash
./scripts/e2e/setup-maestro.sh
maestro studio
# Grave seu primeiro teste! 🎉
```

**Dúvidas?** Abra uma issue no GitHub ou pergunte no Slack #e2e-testing.
