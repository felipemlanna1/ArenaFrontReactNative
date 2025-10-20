module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Proíbe uso direto de Alert.alert do React Native. Use o hook useAlert() do AlertContext.',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      noDirectAlert:
        "Uso direto de Alert.alert é proibido. Use o hook useAlert() do AlertContext.\nExemplo: const { showError } = useAlert(); showError('Mensagem');",
      noAlertImport:
        "Import de Alert do 'react-native' é proibido. Use useAlert() do AlertContext.",
      noBrowserAlert:
        "Uso de alert() do browser é proibido. Use o hook useAlert() do AlertContext.",
    },
    fixable: null,
    schema: [],
  },

  create(context) {
    let hasAlertImport = false;
    let alertImportNode = null;

    return {
      ImportDeclaration(node) {
        if (node.source.value !== 'react-native') return;

        node.specifiers.forEach(specifier => {
          if (
            specifier.type === 'ImportSpecifier' &&
            specifier.imported.name === 'Alert'
          ) {
            hasAlertImport = true;
            alertImportNode = specifier;

            context.report({
              node: specifier,
              messageId: 'noAlertImport',
            });
          }
        });
      },

      MemberExpression(node) {
        if (
          node.object.type === 'Identifier' &&
          node.object.name === 'Alert' &&
          node.property.type === 'Identifier' &&
          node.property.name === 'alert'
        ) {
          if (hasAlertImport) {
            context.report({
              node,
              messageId: 'noDirectAlert',
            });
          }
        }
      },

      CallExpression(node) {
        if (
          node.callee.type === 'Identifier' &&
          node.callee.name === 'alert'
        ) {
          context.report({
            node,
            messageId: 'noBrowserAlert',
          });
        }

        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.object.type === 'Identifier' &&
          node.callee.object.name === 'Alert' &&
          node.callee.property.type === 'Identifier' &&
          node.callee.property.name === 'alert'
        ) {
          context.report({
            node,
            messageId: 'noDirectAlert',
          });
        }
      },
    };
  },
};
