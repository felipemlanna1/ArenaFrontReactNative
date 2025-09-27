// Arena ESLint Plugin - Regras para melhores práticas Arena

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce Arena best practices and coding standards',
      category: 'Arena Best Practices',
      recommended: true,
    },
    messages: {
      noInlineStyles: 'Avoid inline styles. Use Arena design tokens from styles{{componentName}}.ts',
      noHardcodedText: 'Use text constants from @/constants/texts instead of hardcoded strings',
      useArenaComponents: 'Consider using Arena UI components instead of basic React Native components',
      noAnyType: 'Avoid using "any" type. Arena requires strict typing',
      usePathAlias: 'Use path aliases (@/...) instead of relative imports for better maintainability',
      noClassComponents: 'Arena uses functional components only. Convert to React.FC',
      useCallback: 'Use useCallback for event handlers in Arena components for better performance',
      noConsoleLog: 'Remove console.log statements before committing Arena code',
    },
    schema: [],
  },

  create(context) {
    return {
      // Verificar estilos inline
      JSXAttribute(node) {
        if (node.name.name === 'style' && node.value.type === 'JSXExpressionContainer') {
          const expression = node.value.expression;

          // Verificar se é um objeto literal (estilo inline)
          if (expression.type === 'ObjectExpression') {
            context.report({
              node,
              messageId: 'noInlineStyles',
              data: {
                componentName: getComponentName(context),
              },
            });
          }
        }
      },

      // Verificar imports relativos vs path aliases
      ImportDeclaration(node) {
        const importPath = node.source.value;

        // Verificar se usa import relativo quando deveria usar alias
        if (importPath.startsWith('../') || importPath.startsWith('./')) {
          const depth = (importPath.match(/\.\.\//g) || []).length;
          if (depth >= 2) { // 2 ou mais níveis up
            context.report({
              node,
              messageId: 'usePathAlias',
            });
          }
        }
      },

      // Verificar uso de console.log
      CallExpression(node) {
        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.object.name === 'console' &&
          ['log', 'warn', 'error', 'info'].includes(node.callee.property.name)
        ) {
          context.report({
            node,
            messageId: 'noConsoleLog',
          });
        }
      },

      // Verificar uso de any
      TSAnyKeyword(node) {
        context.report({
          node,
          messageId: 'noAnyType',
        });
      },

      // Verificar class components
      ClassDeclaration(node) {
        const hasReactComponent = node.superClass && (
          (node.superClass.type === 'MemberExpression' &&
           node.superClass.object.name === 'React' &&
           node.superClass.property.name === 'Component') ||
          node.superClass.name === 'Component'
        );

        if (hasReactComponent) {
          context.report({
            node,
            messageId: 'noClassComponents',
          });
        }
      },

      // Verificar textos hardcoded em JSX
      Literal(node) {
        if (typeof node.value === 'string' && node.value.trim().length > 0) {
          const parent = node.parent;

          // Verificar se é texto em JSX
          if (parent.type === 'JSXText' ||
              (parent.type === 'JSXExpressionContainer' &&
               parent.parent.type === 'JSXElement')) {

            // Ignorar textos técnicos (códigos, IDs, etc)
            const technicalPatterns = [
              /^[A-Z0-9_]+$/, // CONSTANTS
              /^\d+$/, // Números puros
              /^[a-z-]+$/, // IDs técnicos
              /^#[0-9a-fA-F]+$/, // Cores hex
              /^(http|https|ftp)/, // URLs
            ];

            const isTextContent = !technicalPatterns.some(pattern =>
              pattern.test(node.value.trim())
            );

            if (isTextContent && node.value.trim().length > 2) {
              context.report({
                node,
                messageId: 'noHardcodedText',
              });
            }
          }
        }
      },

      // Verificar funções que deveriam usar useCallback
      ArrowFunctionExpression(node) {
        const parent = node.parent;

        // Verificar se é um handler de evento em props
        if (parent.type === 'Property' &&
            parent.key.name &&
            parent.key.name.startsWith('on')) {

          // Verificar se está dentro de um componente React
          const isInComponent = isInsideReactComponent(node);

          if (isInComponent) {
            context.report({
              node,
              messageId: 'useCallback',
            });
          }
        }
      },
    };

    function getComponentName(context) {
      const filename = context.getFilename();
      const directory = filename.split('/').slice(-2, -1)[0];
      return directory.charAt(0).toUpperCase() + directory.slice(1);
    }

    function isInsideReactComponent(node) {
      let current = node.parent;

      while (current) {
        if (current.type === 'FunctionDeclaration' ||
            current.type === 'ArrowFunctionExpression') {
          // Verificar se é um componente React (começa com maiúscula)
          if (current.id && current.id.name &&
              /^[A-Z]/.test(current.id.name)) {
            return true;
          }
        }
        current = current.parent;
      }

      return false;
    }
  },
};