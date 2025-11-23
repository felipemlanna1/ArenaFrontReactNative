#!/usr/bin/env node

/**
 * Generate Comparison - Cria imagens de comparação lado a lado (Before/After)
 * Uso: node scripts/generate-comparison.js <before.png> <after.png> <output.png> [taskNumber]
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Cores Arena
const ARENA_COLORS = {
  primary: '#FF5301',
  darkest: '#1B1D29',
  medium: '#B8B8B8',
  light: '#FFFFFF',
  border: '#2A3A4D',
};

async function generateComparison(beforePath, afterPath, outputPath, taskNumber = '') {
  try {
    console.log('🖼️  Gerando comparação...');
    console.log(`   BEFORE: ${beforePath}`);
    console.log(`   AFTER:  ${afterPath}`);
    console.log(`   OUTPUT: ${outputPath}`);

    // Verificar se os arquivos existem
    if (!fs.existsSync(beforePath)) {
      throw new Error(`Arquivo 'before' não encontrado: ${beforePath}`);
    }
    if (!fs.existsSync(afterPath)) {
      throw new Error(`Arquivo 'after' não encontrado: ${afterPath}`);
    }

    // Carregar imagens
    const beforeImage = sharp(beforePath);
    const afterImage = sharp(afterPath);

    const beforeMetadata = await beforeImage.metadata();
    const afterMetadata = await afterImage.metadata();

    console.log(`   Before: ${beforeMetadata.width}x${beforeMetadata.height}`);
    console.log(`   After:  ${afterMetadata.width}x${afterMetadata.height}`);

    // Determinar dimensões finais (usar a maior altura)
    const maxHeight = Math.max(beforeMetadata.height, afterMetadata.height);
    const maxWidth = Math.max(beforeMetadata.width, afterMetadata.width);

    // Redimensionar imagens para mesma altura (se necessário)
    const beforeResized = await beforeImage
      .resize({ height: maxHeight, fit: 'contain', background: ARENA_COLORS.darkest })
      .toBuffer();

    const afterResized = await afterImage
      .resize({ height: maxHeight, fit: 'contain', background: ARENA_COLORS.darkest })
      .toBuffer();

    const beforeResizedMeta = await sharp(beforeResized).metadata();
    const afterResizedMeta = await sharp(afterResized).metadata();

    // Criar labels "BEFORE" e "AFTER"
    const labelHeight = 60;
    const labelWidth = Math.max(beforeResizedMeta.width, afterResizedMeta.width);

    const beforeLabel = Buffer.from(`
      <svg width="${labelWidth}" height="${labelHeight}">
        <rect width="${labelWidth}" height="${labelHeight}" fill="${ARENA_COLORS.darkest}"/>
        <text
          x="50%"
          y="50%"
          font-family="Arial, sans-serif"
          font-size="24"
          font-weight="600"
          fill="${ARENA_COLORS.medium}"
          text-anchor="middle"
          dominant-baseline="middle"
        >BEFORE${taskNumber ? ` (Original)` : ''}</text>
      </svg>
    `);

    const afterLabel = Buffer.from(`
      <svg width="${labelWidth}" height="${labelHeight}">
        <rect width="${labelWidth}" height="${labelHeight}" fill="${ARENA_COLORS.darkest}"/>
        <text
          x="50%"
          y="50%"
          font-family="Arial, sans-serif"
          font-size="24"
          font-weight="600"
          fill="${ARENA_COLORS.primary}"
          text-anchor="middle"
          dominant-baseline="middle"
        >AFTER${taskNumber ? ` (Task ${taskNumber})` : ''}</text>
      </svg>
    `);

    // Adicionar labels às imagens
    const beforeWithLabel = await sharp(beforeResized)
      .extend({
        top: labelHeight,
        background: ARENA_COLORS.darkest,
      })
      .composite([
        {
          input: beforeLabel,
          top: 0,
          left: 0,
        },
      ])
      .toBuffer();

    const afterWithLabel = await sharp(afterResized)
      .extend({
        top: labelHeight,
        background: ARENA_COLORS.darkest,
      })
      .composite([
        {
          input: afterLabel,
          top: 0,
          left: 0,
        },
      ])
      .toBuffer();

    // Obter metadados das imagens com labels
    const beforeLabeledMeta = await sharp(beforeWithLabel).metadata();
    const afterLabeledMeta = await sharp(afterWithLabel).metadata();

    // Criar divisor vertical
    const dividerWidth = 4;
    const dividerHeight = Math.max(beforeLabeledMeta.height, afterLabeledMeta.height);

    const divider = Buffer.from(`
      <svg width="${dividerWidth}" height="${dividerHeight}">
        <rect width="${dividerWidth}" height="${dividerHeight}" fill="${ARENA_COLORS.border}"/>
      </svg>
    `);

    // Compor imagem final lado a lado
    const finalWidth = beforeLabeledMeta.width + dividerWidth + afterLabeledMeta.width;
    const finalHeight = Math.max(beforeLabeledMeta.height, afterLabeledMeta.height);

    const comparison = await sharp({
      create: {
        width: finalWidth,
        height: finalHeight,
        channels: 3,
        background: ARENA_COLORS.darkest,
      },
    })
      .composite([
        {
          input: beforeWithLabel,
          top: 0,
          left: 0,
        },
        {
          input: divider,
          top: 0,
          left: beforeLabeledMeta.width,
        },
        {
          input: afterWithLabel,
          top: 0,
          left: beforeLabeledMeta.width + dividerWidth,
        },
      ])
      .png()
      .toFile(outputPath);

    console.log(`   ✅ Comparação gerada: ${outputPath}`);
    console.log(`   📐 Dimensões: ${comparison.width}x${comparison.height}`);

    return outputPath;
  } catch (error) {
    console.error('❌ Erro ao gerar comparação:', error.message);
    throw error;
  }
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    console.error('❌ Uso: node generate-comparison.js <before.png> <after.png> <output.png> [taskNumber]');
    process.exit(1);
  }

  const [beforePath, afterPath, outputPath, taskNumber] = args;

  generateComparison(beforePath, afterPath, outputPath, taskNumber)
    .then(() => {
      console.log('✅ Concluído!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Falha:', error.message);
      process.exit(1);
    });
}

module.exports = { generateComparison };
