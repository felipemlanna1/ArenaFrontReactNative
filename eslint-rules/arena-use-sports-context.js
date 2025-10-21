module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce using SportsContext instead of calling sports API directly',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      useSportsContext:
        'Use useSports() from @/contexts/SportsContext instead of calling {{ method }} directly. This ensures sports are cached and shared across the app.',
    },
    schema: [],
  },

  create(context) {
    const allowedFiles = [
      'SportsContext.tsx',
      'sports.ts',
      'sportsService.ts',
    ];

    const filename = context.getFilename();
    const isAllowedFile = allowedFiles.some(allowed =>
      filename.endsWith(allowed)
    );

    if (isAllowedFile) {
      return {};
    }

    return {
      CallExpression(node) {
        if (
          node.callee.type === 'Identifier' &&
          node.callee.name === 'getSports'
        ) {
          context.report({
            node,
            messageId: 'useSportsContext',
            data: {
              method: 'getSports()',
            },
          });
        }

        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.object.name === 'sportsService' &&
          node.callee.property.name === 'getAllSports'
        ) {
          context.report({
            node,
            messageId: 'useSportsContext',
            data: {
              method: 'sportsService.getAllSports()',
            },
          });
        }
      },
    };
  },
};
