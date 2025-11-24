import * as fs from 'fs';
import * as path from 'path';

const SCREENSHOTS_DIR = 'e2e/visual-audit/screenshots';
const REPORTS_DIR = 'e2e/visual-audit/reports';

interface ScreenshotInfo {
  category: string;
  screen: string;
  state: string;
  path: string;
}

const getAllScreenshots = (): ScreenshotInfo[] => {
  const screenshots: ScreenshotInfo[] = [];

  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    console.log('⚠️  Diretório de screenshots não encontrado');
    return screenshots;
  }

  const categories = fs
    .readdirSync(SCREENSHOTS_DIR)
    .filter(name =>
      fs.statSync(path.join(SCREENSHOTS_DIR, name)).isDirectory()
    );

  categories.forEach(category => {
    const categoryPath = path.join(SCREENSHOTS_DIR, category);
    const screens = fs
      .readdirSync(categoryPath)
      .filter(name =>
        fs.statSync(path.join(categoryPath, name)).isDirectory()
      );

    screens.forEach(screen => {
      const screenPath = path.join(categoryPath, screen);
      const files = fs
        .readdirSync(screenPath)
        .filter(file => file.endsWith('.png'));

      files.forEach(file => {
        screenshots.push({
          category,
          screen,
          state: file.replace('.png', ''),
          path: path.join(screenPath, file),
        });
      });
    });
  });

  return screenshots;
};

const generateReport = (): void => {
  const screenshots = getAllScreenshots();

  if (screenshots.length === 0) {
    console.log('⚠️  Nenhum screenshot encontrado');
    return;
  }

  // Agrupar por categoria e screen
  const grouped: Record<
    string,
    Record<string, ScreenshotInfo[]>
  > = {};

  screenshots.forEach(shot => {
    if (!grouped[shot.category]) {
      grouped[shot.category] = {};
    }
    if (!grouped[shot.category][shot.screen]) {
      grouped[shot.category][shot.screen] = [];
    }
    grouped[shot.category][shot.screen].push(shot);
  });

  // Gerar markdown
  let markdown = `# Arena Mobile - Visual Audit Report\n\n`;
  markdown += `**Data:** ${new Date().toLocaleDateString('pt-BR')}\n`;
  markdown += `**Total de Screenshots:** ${screenshots.length}\n\n`;

  markdown += `## Resumo por Categoria\n\n`;

  Object.keys(grouped).forEach(category => {
    const categoryName = getCategoryName(category);
    const screensCount = Object.keys(grouped[category]).length;
    const statesCount = Object.values(grouped[category]).reduce(
      (sum, states) => sum + states.length,
      0
    );

    markdown += `### ${categoryName}\n`;
    markdown += `- **Telas:** ${screensCount}\n`;
    markdown += `- **Estados Capturados:** ${statesCount}\n\n`;

    Object.keys(grouped[category]).forEach(screen => {
      const states = grouped[category][screen];
      markdown += `#### ${formatScreenName(screen)}\n`;
      markdown += `Estados capturados: ${states.length}\n\n`;

      states.forEach(state => {
        markdown += `- \`${state.state}\` → [\`${path.relative(process.cwd(), state.path)}\`](../${path.relative('e2e/visual-audit/reports', state.path)})\n`;
      });

      markdown += `\n`;
    });
  });

  markdown += `\n## Checklist de Análise Visual\n\n`;
  markdown += `Para cada screenshot, verificar:\n\n`;
  markdown += `- [ ] **Spacing**: Padding horizontal em listas (16px), espaçamentos entre elementos\n`;
  markdown += `- [ ] **Typography**: Todas as <Text> têm variant, sem props tipográficas em styles\n`;
  markdown += `- [ ] **Colors**: Uso correto de ArenaColors (primária #FF5301, backgrounds, textos)\n`;
  markdown += `- [ ] **Components**: Uso de componentes Arena (não primitivos RN)\n`;
  markdown += `- [ ] **Icons**: Ionicons ao invés de emojis\n`;
  markdown += `- [ ] **Hierarchy**: Clara distinção entre headings, títulos, corpo\n`;
  markdown += `- [ ] **States**: Loading, empty, error states adequados\n`;
  markdown += `- [ ] **Overlapping**: Sem sobreposições indesejadas\n`;
  markdown += `- [ ] **Flow**: Navegação clara e intuitiva\n\n`;

  // Salvar relatório
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
  }

  const reportPath = path.join(REPORTS_DIR, 'audit-report.md');
  fs.writeFileSync(reportPath, markdown, 'utf-8');

  console.log(`\n✅ Relatório gerado: ${reportPath}\n`);
  console.log(`📊 Total de screenshots: ${screenshots.length}`);
  console.log(`📁 Categorias: ${Object.keys(grouped).length}`);
  console.log(`📱 Telas únicas: ${Object.values(grouped).reduce((sum, cat) => sum + Object.keys(cat).length, 0)}\n`);
};

const getCategoryName = (category: string): string => {
  const names: Record<string, string> = {
    '01-authentication': 'Authentication Screens',
    '02-onboarding': 'Onboarding Screens',
    '03-main-tabs': 'Main Tab Screens',
    '04-secondary-screens': 'Secondary Screens',
    '05-edge-cases': 'Edge Cases & Modals',
  };

  return names[category] || category;
};

const formatScreenName = (screen: string): string => {
  return screen
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Executar
generateReport();
