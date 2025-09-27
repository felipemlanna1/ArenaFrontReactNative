// Arena ESLint Plugin - Regras para estrutura de arquivos e nomenclatura

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce Arena file structure and naming conventions',
      category: 'Arena Code Standards',
      recommended: true,
    },
    messages: {
      invalidFileName: 'File name should follow Arena convention: {{expected}}',
      missingStylesImport: 'Arena components must import styles from styles{{componentName}}.ts',
      missingTypesImport: 'Arena components must import types from types{{componentName}}.ts',
      invalidExport: 'Use named exports instead of default exports in Arena components',
      invalidComponentStructure: 'Arena component must follow the structure: types, styles, hooks, component',
      useArenaPrefix: 'Use Arena prefix for component styles and types files',
      maxFileLength: 'File exceeds Arena maximum of 150 lines. Consider breaking into smaller components.',
    },
    schema: [],
  },

  create(context) {
    const filename = context.getFilename();
    const sourceCode = context.getSourceCode();

    // Verificar se é um arquivo dentro de src/
    if (!filename.includes('/src/')) {
      return {};
    }

    return {
      Program(node) {
        // Verificar tamanho do arquivo (máximo 150 linhas)
        const lines = sourceCode.getAllComments().length + node.body.length;
        if (lines > 150) {
          context.report({
            node,
            messageId: 'maxFileLength',
          });
        }

        // Verificar nomenclatura de arquivos
        checkFileNaming(context, filename);

        // Verificar estrutura de componentes
        if (filename.includes('/components/') || filename.includes('/screens/')) {
          checkComponentStructure(context, node, filename);
        }
      },

      // Verificar exports (devem ser nomeados, não default)
      ExportDefaultDeclaration(node) {
        if (filename.includes('/src/') && !filename.includes('App.tsx')) {
          context.report({
            node,
            messageId: 'invalidExport',
          });
        }
      },
    };

    function checkFileNaming(context, filename) {
      const baseName = filename.split('/').pop();
      const directory = filename.split('/').slice(-2, -1)[0];

      // Verificar nomenclatura de arquivos de estilo
      if (baseName.startsWith('styles') && baseName.endsWith('.ts')) {
        const expectedPattern = /^styles[A-Z][a-zA-Z]+\.ts$/;
        if (!expectedPattern.test(baseName)) {
          context.report({
            node: context.getSourceCode().ast,
            messageId: 'useArenaPrefix',
            data: {
              expected: `styles${directory.charAt(0).toUpperCase() + directory.slice(1)}.ts`,
            },
          });
        }
      }

      // Verificar nomenclatura de arquivos de tipos
      if (baseName.startsWith('types') && baseName.endsWith('.ts')) {
        const expectedPattern = /^types[A-Z][a-zA-Z]+\.ts$/;
        if (!expectedPattern.test(baseName)) {
          context.report({
            node: context.getSourceCode().ast,
            messageId: 'useArenaPrefix',
            data: {
              expected: `types${directory.charAt(0).toUpperCase() + directory.slice(1)}.ts`,
            },
          });
        }
      }

      // Verificar nomenclatura de hooks
      if (baseName.startsWith('use') && baseName.endsWith('.ts')) {
        const expectedPattern = /^use[A-Z][a-zA-Z]+\.ts$/;
        if (!expectedPattern.test(baseName)) {
          context.report({
            node: context.getSourceCode().ast,
            messageId: 'invalidFileName',
            data: {
              expected: `use${directory.charAt(0).toUpperCase() + directory.slice(1)}.ts`,
            },
          });
        }
      }
    }

    function checkComponentStructure(context, node, filename) {
      if (!filename.endsWith('index.tsx')) {
        return;
      }

      const imports = node.body.filter(n => n.type === 'ImportDeclaration');
      const directory = filename.split('/').slice(-2, -1)[0];
      const componentName = directory.charAt(0).toUpperCase() + directory.slice(1);

      // Verificar se importa estilos
      const hasStylesImport = imports.some(imp =>
        imp.source.value.includes(`styles${componentName}`)
      );

      if (!hasStylesImport) {
        context.report({
          node: node.body[0],
          messageId: 'missingStylesImport',
          data: { componentName },
        });
      }

      // Verificar se importa tipos (apenas se o arquivo de tipos existir)
      const hasTypesImport = imports.some(imp =>
        imp.source.value.includes(`types${componentName}`)
      );

      // Não obrigatório, mas recomendado ter tipos
      // context.report apenas se houver indicação de que deveria ter tipos
    }
  },
};