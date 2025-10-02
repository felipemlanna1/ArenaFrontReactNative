module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow console statements in production code (allowed only in test files)',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      noConsole:
        'Console statements are not allowed. Remove all console calls from production code',
    },
    schema: [],
  },

  create(context) {
    const filename = context.getFilename();
    const isTestFile =
      filename.includes('.test.') ||
      filename.includes('.spec.') ||
      filename.includes('/__tests__/');

    if (isTestFile) {
      return {};
    }

    return {
      MemberExpression(node) {
        if (
          node.object.name === 'console' &&
          node.property.type === 'Identifier'
        ) {
          const method = node.property.name;
          const disallowedMethods = [
            'log',
            'error',
            'warn',
            'info',
            'debug',
            'trace',
            'dir',
            'table',
          ];

          if (disallowedMethods.includes(method)) {
            context.report({
              node,
              messageId: 'noConsole',
            });
          }
        }
      },
    };
  },
};
