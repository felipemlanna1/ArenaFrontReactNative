module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Prohibit comments in Arena codebase to enforce self-documenting code',
      category: 'Arena Best Practices',
      recommended: true,
    },
    fixable: 'code',
    messages: {
      noComments:
        'Comments are not allowed in Arena codebase. Use self-documenting code instead',
      noTodos:
        'TODO comments should be converted to tickets. Remove before committing',
      noBlockComments:
        'Block comments are not allowed. Use self-documenting code instead',
      noJSDoc:
        'JSDoc comments should only be used for exported interfaces. Use self-documenting code instead',
    },
    schema: [],
  },

  create(context) {
    const sourceCode = context.getSourceCode();
    const filename = context.getFilename();

    const isConfigFile =
      filename.includes('.config.') ||
      filename.includes('eslint') ||
      filename.endsWith('.d.ts');

    if (isConfigFile) {
      return {};
    }

    return {
      Program() {
        const comments = sourceCode.getAllComments();

        comments.forEach(comment => {
          const commentText = comment.value.trim();
          const isFirstTenLines = comment.loc.start.line <= 10;

          if (
            isFirstTenLines &&
            (commentText.includes('Copyright') ||
              commentText.includes('License') ||
              commentText.includes('@license') ||
              commentText.includes('SPDX'))
          ) {
            return;
          }

          if (comment.type === 'Line') {
            if (
              commentText.toLowerCase().includes('todo') ||
              commentText.toLowerCase().includes('fixme')
            ) {
              context.report({
                node: comment,
                messageId: 'noTodos',
                fix(fixer) {
                  return fixer.removeRange([
                    comment.range[0],
                    comment.range[1] + 1,
                  ]);
                },
              });
            } else if (
              commentText.startsWith('eslint-disable') ||
              commentText.startsWith('@ts-')
            ) {
              return;
            } else {
              context.report({
                node: comment,
                messageId: 'noComments',
                fix(fixer) {
                  return fixer.removeRange([
                    comment.range[0],
                    comment.range[1] + 1,
                  ]);
                },
              });
            }
          }

          if (comment.type === 'Block') {
            const isJSDoc = comment.value.startsWith('*');

            if (isJSDoc) {
              const nextNode = sourceCode.getNodeByRangeIndex(
                comment.range[1] + 1
              );
              const isExportedInterface =
                nextNode &&
                nextNode.type === 'ExportNamedDeclaration' &&
                (nextNode.declaration?.type === 'TSInterfaceDeclaration' ||
                  nextNode.declaration?.type === 'TSTypeAliasDeclaration');

              if (!isExportedInterface) {
                context.report({
                  node: comment,
                  messageId: 'noJSDoc',
                  fix(fixer) {
                    return fixer.removeRange([
                      comment.range[0],
                      comment.range[1] + 1,
                    ]);
                  },
                });
              }
            } else {
              context.report({
                node: comment,
                messageId: 'noBlockComments',
                fix(fixer) {
                  return fixer.removeRange([
                    comment.range[0],
                    comment.range[1] + 1,
                  ]);
                },
              });
            }
          }
        });
      },
    };
  },
};
