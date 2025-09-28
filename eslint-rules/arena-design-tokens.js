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
    };
  },
};
