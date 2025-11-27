module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow hardcoded constants in style files. Use Arena design tokens instead.',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      noHardcodedConstant:
        'Hardcoded constants are not allowed in style files. Use Arena design tokens (ArenaTypography, ArenaSpacing, ArenaBorders, ArenaColors) or inline values with eslint-disable-next-line if truly necessary.',
    },
    schema: [],
  },

  create(context) {
    const filename = context.getFilename();
    const isStyleFile =
      filename.includes('/styles') ||
      filename.match(/styles[A-Z][a-zA-Z]+\.ts$/);

    if (!isStyleFile) {
      return {};
    }

    return {
      VariableDeclaration(node) {
        if (node.kind !== 'const') {
          return;
        }

        for (const declaration of node.declarations) {
          if (!declaration.init) {
            continue;
          }

          const varName = declaration.id.name;
          const init = declaration.init;

          if (!varName) {
            continue;
          }

          const isNumericConstant =
            init.type === 'Literal' && typeof init.value === 'number';
          const isStringNumeric =
            init.type === 'Literal' &&
            typeof init.value === 'string' &&
            !isNaN(init.value);
          const isArithmeticExpression = init.type === 'BinaryExpression';

          const looksLikeToken =
            varName.match(/_SIZE$/) ||
            varName.match(/_WIDTH$/) ||
            varName.match(/_HEIGHT$/) ||
            varName.match(/_SPACING$/) ||
            varName.match(/_RADIUS$/) ||
            varName.match(/_FONT_/) ||
            varName.match(/^[A-Z_]+$/);

          if (
            (isNumericConstant || isStringNumeric || isArithmeticExpression) &&
            looksLikeToken
          ) {
            context.report({
              node: declaration,
              messageId: 'noHardcodedConstant',
            });
          }
        }
      },
    };
  },
};
