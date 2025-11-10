/**
 * @fileoverview Enforce KeyboardAwareScrollView usage in screens/components with Input fields
 * @author Arena Team
 */

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce KeyboardAwareScrollView with correct props when Input components are present',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missingKeyboardAwareScrollView:
        'Este arquivo contém componentes <Input> mas não usa <KeyboardAwareScrollView>. ' +
        'Importe KeyboardAwareScrollView de "react-native-keyboard-controller" e envolva o conteúdo com ele.',
      missingKeyboardShouldPersistTaps:
        'KeyboardAwareScrollView deve ter a prop keyboardShouldPersistTaps="handled"',
      missingDisableScrollOnKeyboardHide:
        'KeyboardAwareScrollView deve ter a prop disableScrollOnKeyboardHide={false} para compatibilidade com iOS',
      missingBottomOffset:
        'KeyboardAwareScrollView deve ter a prop bottomOffset com valor entre 60-120 (60 para telas normais, 100-120 para telas com footer fixo)',
      invalidBottomOffset:
        'KeyboardAwareScrollView deve ter bottomOffset entre 60-120 pixels (atual: {{value}}). Use 60 para telas normais ou 100-120 para telas com footer fixo.',
    },
  },

  create(context) {
    let hasInputComponent = false;
    let hasKeyboardAwareScrollView = false;
    let keyboardAwareScrollViewNode = null;

    return {
      // Detecta se há componente Input no arquivo
      JSXOpeningElement(node) {
        if (node.name && node.name.name === 'Input') {
          hasInputComponent = true;
        }

        if (node.name && node.name.name === 'KeyboardAwareScrollView') {
          hasKeyboardAwareScrollView = true;
          keyboardAwareScrollViewNode = node;
        }
      },

      // Ao final do arquivo, valida as regras
      'Program:exit'() {
        // Se não tem Input, não precisa validar
        if (!hasInputComponent) {
          return;
        }

        // Se tem Input mas não tem KeyboardAwareScrollView
        if (!hasKeyboardAwareScrollView) {
          context.report({
            loc: { line: 1, column: 0 },
            messageId: 'missingKeyboardAwareScrollView',
          });
          return;
        }

        // Valida as props do KeyboardAwareScrollView
        if (keyboardAwareScrollViewNode) {
          const attributes = keyboardAwareScrollViewNode.attributes;

          // Verifica keyboardShouldPersistTaps
          const hasKeyboardShouldPersistTaps = attributes.some(
            attr =>
              attr.type === 'JSXAttribute' &&
              attr.name.name === 'keyboardShouldPersistTaps' &&
              attr.value &&
              attr.value.value === 'handled'
          );

          if (!hasKeyboardShouldPersistTaps) {
            context.report({
              node: keyboardAwareScrollViewNode,
              messageId: 'missingKeyboardShouldPersistTaps',
            });
          }

          // Verifica disableScrollOnKeyboardHide
          const hasDisableScrollOnKeyboardHide = attributes.some(
            attr =>
              attr.type === 'JSXAttribute' &&
              attr.name.name === 'disableScrollOnKeyboardHide' &&
              attr.value &&
              attr.value.type === 'JSXExpressionContainer' &&
              attr.value.expression.value === false
          );

          if (!hasDisableScrollOnKeyboardHide) {
            context.report({
              node: keyboardAwareScrollViewNode,
              messageId: 'missingDisableScrollOnKeyboardHide',
            });
          }

          // Verifica bottomOffset
          const bottomOffsetAttr = attributes.find(
            attr =>
              attr.type === 'JSXAttribute' && attr.name.name === 'bottomOffset'
          );

          if (!bottomOffsetAttr) {
            context.report({
              node: keyboardAwareScrollViewNode,
              messageId: 'missingBottomOffset',
            });
          } else if (
            bottomOffsetAttr.value &&
            bottomOffsetAttr.value.type === 'JSXExpressionContainer'
          ) {
            const value = bottomOffsetAttr.value.expression.value;
            if (typeof value === 'number' && (value < 60 || value > 120)) {
              context.report({
                node: bottomOffsetAttr,
                messageId: 'invalidBottomOffset',
                data: {
                  value: String(value),
                },
              });
            }
          }
        }
      },
    };
  },
};
