// Arena ESLint Plugin - Regra para uso obrigatório de tokens de design

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce usage of Arena design tokens instead of hardcoded values',
      category: 'Arena Design System',
      recommended: true,
    },
    messages: {
      useArenaTokens:
        'Use Arena design tokens instead of hardcoded values. Use {{token}} from @/constants',
      useArenaSpacing:
        'Use ArenaSpacing tokens instead of hardcoded spacing values',
      useArenaColors:
        'Use ArenaColors tokens instead of hardcoded color values',
      useArenaTypography:
        'Use ArenaTypography tokens instead of hardcoded font values',
      useArenaBorders:
        'Use ArenaBorders tokens instead of hardcoded border values',
    },
    schema: [],
  },

  create(context) {
    const filename = context.getFilename();
    const isSkeletonComponent = filename.toLowerCase().includes('skeleton');

    // Valores que devem usar tokens Arena
    const hardcodedPatterns = {
      // Cores hardcoded (hex, rgb, rgba)
      colors: /^(#[0-9a-fA-F]{3,8}|rgb\(|rgba\(|hsl\(|hsla\()/,

      // Spacings hardcoded (números para padding, margin, etc)
      spacing: /^[0-9]+$/,

      // Fontes hardcoded
      fonts: /^[0-9]+$/,

      // Border radius hardcoded
      borderRadius: /^[0-9]+$/,
    };

    // Properties que devem usar tokens
    const tokenProperties = {
      // Cores
      backgroundColor: 'ArenaColors',
      color: 'ArenaColors',
      borderColor: 'ArenaColors',
      shadowColor: 'ArenaColors',
      tintColor: 'ArenaColors',

      // Spacing
      padding: 'ArenaSpacing',
      paddingTop: 'ArenaSpacing',
      paddingBottom: 'ArenaSpacing',
      paddingLeft: 'ArenaSpacing',
      paddingRight: 'ArenaSpacing',
      paddingHorizontal: 'ArenaSpacing',
      paddingVertical: 'ArenaSpacing',
      margin: 'ArenaSpacing',
      marginTop: 'ArenaSpacing',
      marginBottom: 'ArenaSpacing',
      marginLeft: 'ArenaSpacing',
      marginRight: 'ArenaSpacing',
      marginHorizontal: 'ArenaSpacing',
      marginVertical: 'ArenaSpacing',
      gap: 'ArenaSpacing',
      rowGap: 'ArenaSpacing',
      columnGap: 'ArenaSpacing',

      // Typography
      fontSize: 'ArenaTypography.size',
      fontWeight: 'ArenaTypography.weight',
      lineHeight: 'ArenaTypography.lineHeight',
      letterSpacing: 'ArenaTypography.letterSpacing',
      fontFamily: 'ArenaTypography.family',

      // Borders
      borderRadius: 'ArenaBorders.radius',
      borderTopLeftRadius: 'ArenaBorders.radius',
      borderTopRightRadius: 'ArenaBorders.radius',
      borderBottomLeftRadius: 'ArenaBorders.radius',
      borderBottomRightRadius: 'ArenaBorders.radius',
      borderWidth: 'ArenaBorders.width',
      borderTopWidth: 'ArenaBorders.width',
      borderBottomWidth: 'ArenaBorders.width',
      borderLeftWidth: 'ArenaBorders.width',
      borderRightWidth: 'ArenaBorders.width',

      // Shadows
      boxShadow: 'ArenaShadows',
    };

    function checkPropertyValue(node, property, value) {
      const expectedToken = tokenProperties[property.key.name];

      if (!expectedToken) return;

      // Verificar se é um valor hardcoded
      let isHardcoded = false;
      let messageId = 'useArenaTokens';

      if (value.type === 'Literal') {
        const valueStr = String(value.value);

        // Cores
        if (
          expectedToken === 'ArenaColors' &&
          hardcodedPatterns.colors.test(valueStr)
        ) {
          isHardcoded = true;
          messageId = 'useArenaColors';
        }

        // Spacing
        else if (
          expectedToken === 'ArenaSpacing' &&
          hardcodedPatterns.spacing.test(valueStr)
        ) {
          isHardcoded = true;
          messageId = 'useArenaSpacing';
        }

        // Typography
        else if (
          expectedToken.includes('ArenaTypography') &&
          hardcodedPatterns.fonts.test(valueStr)
        ) {
          isHardcoded = true;
          messageId = 'useArenaTypography';
        }

        // Borders
        else if (
          expectedToken === 'ArenaBorders.radius' &&
          hardcodedPatterns.borderRadius.test(valueStr)
        ) {
          isHardcoded = true;
          messageId = 'useArenaBorders';
        }
      }

      if (isHardcoded) {
        context.report({
          node: value,
          messageId,
          data: {
            token: expectedToken,
          },
        });
      }
    }

    // Propriedades que podem conter tamanhos (size, iconSize, etc)
    const sizeProperties = new Set([
      'size',
      'iconSize',
      'width',
      'height',
      'minWidth',
      'minHeight',
      'maxWidth',
      'maxHeight',
    ]);

    // Nomes de variáveis que indicam mapeamento de tamanhos
    const sizeMapNames = new Set(['iconSizeMap', 'sizeMap', 'sizes']);

    function checkObjectForHardcodedValues(node, parentVarName = null) {
      if (node.type !== 'ObjectExpression') return;

      node.properties.forEach(property => {
        if (property.type !== 'Property') return;

        const propName = property.key.name || property.key.value;
        const value = property.value;

        // Verificar se é uma propriedade que deve usar tokens
        if (tokenProperties[propName]) {
          checkPropertyValue(node, property, value);
        }

        // Verificar propriedades de tamanho (size, iconSize, etc) com valores numéricos
        if (sizeProperties.has(propName) && value.type === 'Literal') {
          if (typeof value.value === 'number' && value.value > 0) {
            // Allow width/height in skeleton components (placeholder dimensions)
            if (
              isSkeletonComponent &&
              (propName === 'width' || propName === 'height')
            ) {
              return;
            }
            context.report({
              node: value,
              messageId: 'useArenaTypography',
              data: {
                token: 'ArenaTypography.size or ArenaSpacing',
              },
            });
          }
        }

        // Verificar se o objeto pai é um mapa de tamanhos (iconSizeMap, etc)
        if (parentVarName && sizeMapNames.has(parentVarName)) {
          if (value.type === 'Literal' && typeof value.value === 'number') {
            context.report({
              node: value,
              messageId: 'useArenaTypography',
              data: {
                token: 'ArenaTypography.size or ArenaSpacing',
              },
            });
          }
        }

        // Verificar objetos aninhados recursivamente
        if (value.type === 'ObjectExpression') {
          checkObjectForHardcodedValues(value, propName);
        }
      });
    }

    return {
      // Verificar objetos de estilo em StyleSheet.create()
      CallExpression(node) {
        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.object.name === 'StyleSheet' &&
          node.callee.property.name === 'create' &&
          node.arguments[0] &&
          node.arguments[0].type === 'ObjectExpression'
        ) {
          // Iterar pelos estilos
          node.arguments[0].properties.forEach(styleRule => {
            if (
              styleRule.type === 'Property' &&
              styleRule.value.type === 'ObjectExpression'
            ) {
              // Iterar pelas propriedades de cada estilo
              styleRule.value.properties.forEach(property => {
                if (property.type === 'Property') {
                  checkPropertyValue(node, property, property.value);
                }
              });
            }
          });
        }
      },

      // Verificar objetos literais em geral (como iconSizeMap)
      ObjectExpression(node) {
        // Ignorar se for argumento de StyleSheet.create (já tratado acima)
        if (
          node.parent.type === 'CallExpression' &&
          node.parent.callee.type === 'MemberExpression' &&
          node.parent.callee.object.name === 'StyleSheet'
        ) {
          return;
        }

        // Tentar obter o nome da variável pai
        let varName = null;
        if (node.parent.type === 'VariableDeclarator') {
          varName = node.parent.id.name;
        }

        checkObjectForHardcodedValues(node, varName);
      },
    };
  },
};
