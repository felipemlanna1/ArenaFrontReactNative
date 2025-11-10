// Arena ESLint Plugin - Regra corrigida para FlatList/ScrollView
// CORREÇÃO: O problema não é falta de padding, mas RefreshControl + contentContainerStyle juntos
// que causa bug de renderização no Android/Web

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce correct FlatList/ScrollView usage: MUST have paddingHorizontal, MUST NOT use RefreshControl with contentContainerStyle (causes Android/Web rendering bugs).',
      category: 'Arena Best Practices',
      recommended: true,
      url: 'https://github.com/arena/docs/eslint-rules/arena-list-padding',
    },
    messages: {
      refreshControlWithContentContainer:
        '❌ CRITICAL BUG: Do NOT use RefreshControl with contentContainerStyle on FlatList/ScrollView!\n\n' +
        '🐛 PROBLEM: This combination prevents components from rendering on Android/Web.\n\n' +
        '✅ SOLUTION: Remove RefreshControl\n' +
        '  <ScrollView\n' +
        '    contentContainerStyle={styles.scrollContent}\n' +
        '    // ✅ NO refreshControl prop!\n' +
        '  >\n\n' +
        '💡 Alternative: Implement manual pull-to-refresh or use a different approach.',

      missingFlatListPadding:
        'FlatList MUST have contentContainerStyle with paddingHorizontal.\n\n' +
        '✅ CORRECT:\n' +
        '  <FlatList\n' +
        '    contentContainerStyle={styles.listContainer}\n' +
        '  />\n\n' +
        '  styles.ts:\n' +
        '  listContainer: {\n' +
        '    paddingHorizontal: ArenaSpacing.lg,\n' +
        '  }',

      missingScrollViewPadding:
        'ScrollView MUST have contentContainerStyle with paddingHorizontal.\n\n' +
        '✅ CORRECT:\n' +
        '  <ScrollView\n' +
        '    contentContainerStyle={styles.scrollContent}\n' +
        '  >\n\n' +
        '  styles.ts:\n' +
        '  scrollContent: {\n' +
        '    paddingHorizontal: ArenaSpacing.lg,\n' +
        '  }',

      preferContentContainerStyle:
        '{{component}}: Prefer contentContainerStyle over style for padding.\n\n' +
        '✅ RECOMMENDED:\n' +
        '  <{{component}}\n' +
        '    contentContainerStyle={styles.scrollContent}\n' +
        '  />\n\n' +
        '  styles.ts:\n' +
        '  scrollContent: {\n' +
        '    paddingHorizontal: ArenaSpacing.lg,\n' +
        '  }',
    },
    schema: [],
    fixable: null,
  },

  create(context) {
    const filename = context.getFilename();

    // Ignorar componentes internos de UI
    const isInComponentsFolder = filename.includes('/src/components/ui/');
    const isShowcaseFile = filename.includes('componentsShowcaseScreen/');
    const isModal = filename.includes('Modal') || filename.includes('Dropdown');

    if (isInComponentsFolder || isShowcaseFile || isModal) {
      return {};
    }

    const importedListComponents = new Set();
    const stylesWithPadding = new Set();

    function hasHorizontalPadding(styleObj) {
      if (!styleObj || !styleObj.properties) return false;

      return styleObj.properties.some(prop => {
        if (prop.key && prop.key.name) {
          const propName = prop.key.name;
          return (
            propName === 'paddingHorizontal' ||
            propName === 'padding' ||
            propName === 'marginHorizontal'
          );
        }
        return false;
      });
    }

    function getStyleReference(node) {
      if (node.type === 'MemberExpression') {
        if (node.object.name === 'styles' && node.property) {
          return node.property.name;
        }
      }
      return null;
    }

    function checkStyleAttribute(attr) {
      if (!attr || !attr.value) return false;

      if (attr.value.type === 'JSXExpressionContainer') {
        const expression = attr.value.expression;

        if (expression.type === 'ObjectExpression') {
          return hasHorizontalPadding(expression);
        }

        const styleName = getStyleReference(expression);
        if (styleName && stylesWithPadding.has(styleName)) {
          return true;
        }
      }

      return false;
    }

    return {
      ImportDeclaration(node) {
        const importSource = node.source.value;

        if (importSource === 'react-native') {
          node.specifiers.forEach(specifier => {
            if (specifier.type === 'ImportSpecifier') {
              const componentName = specifier.imported.name;
              if (
                componentName === 'FlatList' ||
                componentName === 'ScrollView'
              ) {
                importedListComponents.add(specifier.local.name);
              }
            }
          });
        }
      },

      CallExpression(node) {
        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.object.name === 'StyleSheet' &&
          node.callee.property.name === 'create' &&
          node.arguments.length > 0
        ) {
          const stylesObject = node.arguments[0];

          if (stylesObject.type === 'ObjectExpression') {
            stylesObject.properties.forEach(property => {
              if (property.key && property.value) {
                const styleName = property.key.name;
                const styleValue = property.value;

                if (hasHorizontalPadding(styleValue)) {
                  stylesWithPadding.add(styleName);
                }
              }
            });
          }
        }
      },

      JSXElement(node) {
        const openingElement = node.openingElement;
        const componentName = openingElement.name.name;

        if (!importedListComponents.has(componentName)) {
          return;
        }

        const attributes = openingElement.attributes;

        // NOVA VERIFICAÇÃO: Detecta RefreshControl + contentContainerStyle
        const refreshControlAttr = attributes.find(
          attr =>
            attr.type === 'JSXAttribute' && attr.name.name === 'refreshControl'
        );

        const contentContainerStyleAttr = attributes.find(
          attr =>
            attr.type === 'JSXAttribute' &&
            attr.name.name === 'contentContainerStyle'
        );

        // ❌ ERRO CRÍTICO: RefreshControl + contentContainerStyle juntos
        if (refreshControlAttr && contentContainerStyleAttr) {
          context.report({
            node: refreshControlAttr,
            messageId: 'refreshControlWithContentContainer',
          });
          return; // Para aqui, não precisa checar padding
        }

        // Ignora ScrollView horizontal
        const horizontalAttr = attributes.find(
          attr =>
            attr.type === 'JSXAttribute' && attr.name.name === 'horizontal'
        );

        const isHorizontalScrollView =
          componentName === 'ScrollView' &&
          horizontalAttr &&
          (horizontalAttr.value === null ||
            (horizontalAttr.value?.type === 'JSXExpressionContainer' &&
              horizontalAttr.value.expression.value === true));

        if (isHorizontalScrollView) {
          return;
        }

        // Verifica style prop
        const styleAttr = attributes.find(
          attr => attr.type === 'JSXAttribute' && attr.name.name === 'style'
        );

        const hasContentPadding = contentContainerStyleAttr
          ? checkStyleAttribute(contentContainerStyleAttr)
          : false;

        const hasStylePadding = styleAttr
          ? checkStyleAttribute(styleAttr)
          : false;

        // FlatList: Deve ter padding em contentContainerStyle
        if (componentName === 'FlatList') {
          if (!hasContentPadding && !hasStylePadding) {
            context.report({
              node: openingElement,
              messageId: 'missingFlatListPadding',
            });
          } else if (hasStylePadding && !hasContentPadding) {
            context.report({
              node: styleAttr,
              messageId: 'preferContentContainerStyle',
              data: {
                component: 'FlatList',
              },
            });
          }
        }

        // ScrollView: Deve ter padding em contentContainerStyle ou style
        if (componentName === 'ScrollView') {
          if (!hasContentPadding && !hasStylePadding) {
            context.report({
              node: openingElement,
              messageId: 'missingScrollViewPadding',
            });
          } else if (hasStylePadding && !hasContentPadding) {
            context.report({
              node: styleAttr,
              messageId: 'preferContentContainerStyle',
              data: {
                component: 'ScrollView',
              },
            });
          }
        }
      },
    };
  },
};
