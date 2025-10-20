module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Proíbe propriedades tipográficas customizadas em estilos. Use variantes do componente <Text> ao invés.',
      category: 'Arena Best Practices',
      recommended: true,
    },
    messages: {
      noCustomTextStyles:
        "Propriedade '{{property}}' não deve ser usada em estilos. Use a prop 'variant' do componente <Text>.\n\nVariantes disponíveis:\n- Títulos: displayPrimary, headingPrimary, titlePrimary, subtitlePrimary\n- Corpo: bodyPrimary, bodySecondary\n- Captions: captionPrimary, captionSecondary\n- Labels: labelPrimary, labelSecondary\n- Links: linkPrimary, linkSecondary\n- Buttons: buttonPrimary, buttonSecondary\n- Inputs: inputPrimary, inputSecondary\n- Placeholders: placeholderPrimary\n- Errors: errorPrimary, errorSecondary\n- Success: successPrimary\n- Warnings: warningPrimary\n- Info: infoPrimary\n- Disabled: disabledPrimary\n\nExemplo:\n❌ ERRADO:\nconst styles = StyleSheet.create({\n  title: {\n    fontSize: 16,\n    fontWeight: '600',\n  }\n});\n<Text style={styles.title}>Título</Text>\n\n✅ CORRETO:\nconst styles = StyleSheet.create({\n  title: {\n    textAlign: 'center', // Apenas propriedades de layout\n  }\n});\n<Text variant=\"titlePrimary\" style={styles.title}>Título</Text>",
    },
    fixable: null,
    schema: [],
  },

  create(context) {
    const FORBIDDEN_PROPERTIES = [
      'fontSize',
      'fontWeight',
      'fontFamily',
      'lineHeight',
      'letterSpacing',
    ];

    return {
      CallExpression(node) {
        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.object.name === 'StyleSheet' &&
          node.callee.property.name === 'create'
        ) {
          if (
            node.arguments.length > 0 &&
            node.arguments[0].type === 'ObjectExpression'
          ) {
            const styleObject = node.arguments[0];

            styleObject.properties.forEach(styleProp => {
              if (
                styleProp.type === 'Property' &&
                styleProp.value.type === 'ObjectExpression'
              ) {
                styleProp.value.properties.forEach(cssProp => {
                  if (cssProp.type === 'Property') {
                    const propertyName =
                      cssProp.key.type === 'Identifier'
                        ? cssProp.key.name
                        : cssProp.key.value;

                    if (FORBIDDEN_PROPERTIES.includes(propertyName)) {
                      context.report({
                        node: cssProp,
                        messageId: 'noCustomTextStyles',
                        data: {
                          property: propertyName,
                        },
                      });
                    }
                  }
                });
              }
            });
          }
        }
      },
    };
  },
};
