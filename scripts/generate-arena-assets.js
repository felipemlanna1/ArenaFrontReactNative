#!/usr/bin/env node
/* eslint-disable */

/**
 * Script para gerar assets do Arena (ícones e splash screens)
 * Usa o símbolo e logo existentes do projeto
 */

const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// Cores da marca Arena
const ARENA_COLORS = {
  primary: '#FF5301',
  dark: '#1B1D29',
  white: '#FFFFFF',
};

// Configurações dos assets
const ASSETS_CONFIG = [
  {
    name: 'icon.png',
    width: 1024,
    height: 1024,
    background: ARENA_COLORS.white,
    svgPath: 'src/assets/images/symbols/SIMBOLO1.svg',
    padding: 0.25, // 25% padding
  },
  {
    name: 'adaptive-icon.png',
    width: 1024,
    height: 1024,
    background: ARENA_COLORS.white,
    svgPath: 'src/assets/images/symbols/SIMBOLO1.svg',
    padding: 0.3, // 30% padding para Android adaptive
  },
  {
    name: 'favicon.png',
    width: 192,
    height: 192,
    background: ARENA_COLORS.white,
    svgPath: 'src/assets/images/symbols/SIMBOLO1.svg',
    padding: 0.2,
  },
  {
    name: 'splash-icon.png',
    width: 1284,
    height: 2778,
    background: ARENA_COLORS.dark,
    svgPath: 'src/assets/images/logos/L1.svg',
    padding: 0.3,
    logoColor: ARENA_COLORS.white, // Logo branco no fundo escuro
  },
];

/**
 * Converte SVG para PNG
 */
async function generateAsset(config) {
  const { name, width, height, background, svgPath, padding } = config;

  console.log(`Gerando ${name}...`);

  // Criar canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Preencher fundo
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  // Ler SVG
  const svgContent = fs.readFileSync(path.join(__dirname, '..', svgPath), 'utf8');

  // Para splash screen com logo branco
  let modifiedSvg = svgContent;
  if (config.logoColor) {
    // Substituir cor do fill para branco
    modifiedSvg = svgContent.replace(/fill="#[a-fA-F0-9]{6}"/g, `fill="${config.logoColor}"`);
  }

  // Adicionar width e height ao SVG se não existirem
  // Extrair viewBox
  const viewBoxMatch = modifiedSvg.match(/viewBox="([^"]+)"/);
  if (viewBoxMatch) {
    const viewBoxValues = viewBoxMatch[1].split(' ');
    const svgWidth = viewBoxValues[2];
    const svgHeight = viewBoxValues[3];

    // Se o SVG não tem width/height, adicionar baseado no viewBox
    if (!modifiedSvg.includes('width=') || !modifiedSvg.includes('height=')) {
      modifiedSvg = modifiedSvg.replace(
        '<svg',
        `<svg width="${svgWidth}" height="${svgHeight}"`
      );
    }
  }

  // Criar buffer do SVG
  const svgBuffer = Buffer.from(modifiedSvg);

  try {
    // Carregar imagem do SVG
    const img = await loadImage(svgBuffer);

    // Calcular dimensões com padding
    const paddingPixels = Math.min(width, height) * padding;
    const drawWidth = width - (paddingPixels * 2);
    const drawHeight = height - (paddingPixels * 2);

    // Manter aspect ratio
    const imgAspectRatio = img.width / img.height;
    const canvasAspectRatio = drawWidth / drawHeight;

    let finalWidth, finalHeight, x, y;

    if (imgAspectRatio > canvasAspectRatio) {
      // Imagem é mais larga
      finalWidth = drawWidth;
      finalHeight = drawWidth / imgAspectRatio;
      x = paddingPixels;
      y = (height - finalHeight) / 2;
    } else {
      // Imagem é mais alta
      finalHeight = drawHeight;
      finalWidth = drawHeight * imgAspectRatio;
      x = (width - finalWidth) / 2;
      y = paddingPixels;
    }

    // Desenhar imagem
    ctx.drawImage(img, x, y, finalWidth, finalHeight);

    // Salvar arquivo
    const outputPath = path.join(__dirname, '..', 'assets', name);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);

    console.log(`✅ ${name} gerado com sucesso!`);
  } catch (error) {
    console.error(`❌ Erro ao gerar ${name}:`, error.message);
  }
}

/**
 * Função principal
 */
async function main() {
  console.log('🏟️  Arena Assets Generator');
  console.log('========================\n');

  // Verificar se a pasta assets existe
  const assetsDir = path.join(__dirname, '..', 'assets');
  if (!fs.existsSync(assetsDir)) {
    console.error('❌ Pasta assets não encontrada!');
    process.exit(1);
  }

  // Verificar se os SVGs existem
  for (const config of ASSETS_CONFIG) {
    const svgPath = path.join(__dirname, '..', config.svgPath);
    if (!fs.existsSync(svgPath)) {
      console.error(`❌ SVG não encontrado: ${config.svgPath}`);
      process.exit(1);
    }
  }

  // Gerar cada asset
  for (const config of ASSETS_CONFIG) {
    await generateAsset(config);
  }

  console.log('\n✨ Todos os assets foram gerados com sucesso!');
  console.log('\n📱 Próximos passos:');
  console.log('1. Execute: npx expo prebuild');
  console.log('2. Para iOS: cd ios && pod install');
  console.log('3. Execute: npx expo run:android ou npx expo run:ios');
}

// Executar se chamado diretamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { generateAsset, ASSETS_CONFIG };