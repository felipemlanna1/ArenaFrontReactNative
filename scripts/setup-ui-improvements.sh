#!/bin/bash

# Setup Inicial para UI Improvements - Arena Mobile
# Este script configura o ambiente para implementação das 30 melhorias visuais

set -e

echo "🎨 Arena UI Improvements - Setup Inicial"
echo "========================================="
echo ""

# 1. Verificar se estamos na main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "⚠️  Você deve estar na branch main para rodar este setup"
  echo "Branch atual: $CURRENT_BRANCH"
  read -p "Deseja continuar mesmo assim? (y/n): " CONTINUE
  if [ "$CONTINUE" != "y" ]; then
    echo "❌ Setup cancelado"
    exit 1
  fi
fi

# 2. Criar branch base (se não existir)
echo "📍 Criando branch feature/new-ui-design..."
git checkout main
git pull origin main
if git show-ref --verify --quiet refs/heads/feature/new-ui-design; then
  echo "✅ Branch feature/new-ui-design já existe"
  git checkout feature/new-ui-design
else
  git checkout -b feature/new-ui-design
  git push origin feature/new-ui-design
  echo "✅ Branch feature/new-ui-design criada e publicada"
fi

# 3. Criar estrutura de pastas
echo ""
echo "📁 Criando estrutura de pastas..."
mkdir -p docs/ux-analysis/tasks
mkdir -p docs/ux-analysis/comparisons
mkdir -p scripts/screenshots
mkdir -p scripts/templates
echo "✅ Pastas criadas"

# 4. Verificar dependências
echo ""
echo "📦 Verificando dependências..."
if ! npm list sharp --depth=0 > /dev/null 2>&1; then
  echo "⚠️  Instalando sharp..."
  npm install --save-dev sharp
fi
if ! npm list playwright --depth=0 > /dev/null 2>&1; then
  echo "⚠️  Instalando playwright..."
  npm install --save-dev playwright @playwright/test
fi
echo "✅ Dependências verificadas"

# 5. Instalar browsers do Playwright (se necessário)
echo ""
echo "🌐 Instalando browsers do Playwright..."
npx playwright install chromium --with-deps
echo "✅ Browsers instalados"

# 6. Criar arquivos de template (se não existirem)
echo ""
echo "📝 Criando templates..."

if [ ! -f "scripts/templates/task-study-template.md" ]; then
  cat > scripts/templates/task-study-template.md << 'EOF'
# Task {TASK_NUMBER} - {TASK_NAME}

**Data**: {DATE}
**Branch**: task/{TASK_NUMBER}-{TASK_SLUG}
**Issue**: #{ISSUE_NUMBER}

## 📚 Re-Estudo de Princípios UX/UI

### Princípios Aplicáveis:
- [ ] **Jakob's Law**: [Descrição de como aplicar]
- [ ] **Fitts's Law**: [Descrição de como aplicar]
- [ ] **Hick's Law**: [Descrição de como aplicar]
- [ ] **Gestalt - Proximity**: [Descrição de como aplicar]
- [ ] **Gestalt - Similarity**: [Descrição de como aplicar]

### Visual Hierarchy:
- [ ] Contraste adequado
- [ ] Espaçamento consistente (ArenaSpacing)
- [ ] Tipografia clara (Text variants)

### Feedback & Affordance:
- [ ] Estados visuais (default, hover, active, disabled)
- [ ] Micro-interações
- [ ] Loading states

## 🎯 Análise Pré-Implementação

### Screenshots Analisados:
- `docs/ux-analysis/screenshots/{SCREEN_NAME}.png`

### Problemas Identificados:
1. [Problema 1]
2. [Problema 2]
3. [Problema 3]

### Soluções Propostas:
1. [Solução 1]
2. [Solução 2]
3. [Solução 3]

## 📊 Scoring Visual PRÉ-IMPLEMENTAÇÃO

| Critério | Nota (0-10) | Justificativa |
|----------|-------------|---------------|
| **Hierarquia Visual** | {SCORE} | {JUSTIFICATIVA} |
| **Espaçamento** | {SCORE} | {JUSTIFICATIVA} |
| **Feedback Visual** | {SCORE} | {JUSTIFICATIVA} |
| **Consistência** | {SCORE} | {JUSTIFICATIVA} |
| **Affordance** | {SCORE} | {JUSTIFICATIVA} |
| **MÉDIA** | {AVG} | - |

## 🛠️ Plano de Implementação

### Componentes Afetados:
- [ ] {COMPONENT_1}
- [ ] {COMPONENT_2}

### Design Tokens Usados:
- **Cores**: {ARENA_COLORS}
- **Espaçamento**: {ARENA_SPACING}
- **Tipografia**: {TEXT_VARIANTS}

### Estimativa: {HOURS}h

---

## ✅ Pós-Implementação

### Scoring Visual PÓS-IMPLEMENTAÇÃO

| Critério | Nota (0-10) | Melhoria |
|----------|-------------|----------|
| **Hierarquia Visual** | {SCORE} | +{DIFF} |
| **Espaçamento** | {SCORE} | +{DIFF} |
| **Feedback Visual** | {SCORE} | +{DIFF} |
| **Consistência** | {SCORE} | +{DIFF} |
| **Affordance** | {SCORE} | +{DIFF} |
| **MÉDIA** | {AVG} | +{DIFF} |

### Screenshots Comparativos:
- Before: `docs/ux-analysis/comparisons/task-{NUMBER}-before-{SCREEN}.png`
- After: `docs/ux-analysis/comparisons/task-{NUMBER}-after-{SCREEN}.png`
- Comparison: `docs/ux-analysis/comparisons/task-{NUMBER}-comparison-{SCREEN}.png`

### Checklist Final:
- [ ] Testes Playwright passando
- [ ] Screenshots capturados
- [ ] Comparação gerada
- [ ] Scoring completo
- [ ] PR criado
- [ ] Revisão aprovada
- [ ] Merged em feature/new-ui-design
EOF
  echo "✅ task-study-template.md criado"
fi

if [ ! -f "scripts/templates/playwright-screenshot-template.spec.ts" ]; then
  cat > scripts/templates/playwright-screenshot-template.spec.ts << 'EOF'
import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:8081';
const TEST_USER = {
  username: 'uxtest2325',
  email: 'uxtest2325@arena.test',
  password: 'TestArena@2325'
};

test.describe('{TASK_NAME} - Screenshots', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar para a aplicação
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Fazer login
    await page.getByPlaceholder('Email ou nome de usuário').fill(TEST_USER.username);
    await page.getByPlaceholder('Senha').fill(TEST_USER.password);
    await page.getByRole('button', { name: 'Entrar' }).click();

    // Aguardar navegação pós-login
    await page.waitForURL(/.*home/, { timeout: 10000 });
    await page.waitForLoadState('networkidle');
  });

  test('Capturar {SCREEN_NAME}', async ({ page }) => {
    // Navegar para a tela específica (ajustar conforme necessário)
    // await page.goto(`${BASE_URL}/{ROUTE}`);
    // await page.waitForLoadState('networkidle');

    // Aguardar elementos críticos carregarem
    // await page.waitForSelector('[data-testid="critical-element"]');

    // Capturar screenshot
    await page.screenshot({
      path: `docs/ux-analysis/comparisons/task-{TASK_NUMBER}-after-{SCREEN_SLUG}.png`,
      fullPage: true
    });
  });
});
EOF
  echo "✅ playwright-screenshot-template.spec.ts criado"
fi

# 7. Criar .gitignore para comparisons temporários (se necessário)
if ! grep -q "comparisons/task-.*-before-" .gitignore 2>/dev/null; then
  echo "" >> .gitignore
  echo "# UI Improvements - Temporary comparison files" >> .gitignore
  echo "# (Keep only final comparisons, not intermediate)" >> .gitignore
  echo "docs/ux-analysis/comparisons/*-temp-*.png" >> .gitignore
  echo "✅ .gitignore atualizado"
fi

# 8. Resumo
echo ""
echo "========================================="
echo "✅ Setup Completo!"
echo ""
echo "📁 Estrutura criada:"
echo "   - docs/ux-analysis/tasks/"
echo "   - docs/ux-analysis/comparisons/"
echo "   - scripts/screenshots/"
echo "   - scripts/templates/"
echo ""
echo "📦 Dependências instaladas:"
echo "   - sharp (screenshot comparison)"
echo "   - playwright + @playwright/test"
echo ""
echo "🚀 Próximos passos:"
echo "   1. Use './scripts/start-task.sh {TASK_NUMBER}' para iniciar uma task"
echo "   2. Implemente as mudanças"
echo "   3. Use './scripts/finish-task.sh {TASK_NUMBER}' para finalizar"
echo ""
echo "📝 Branch: feature/new-ui-design"
echo "========================================="
