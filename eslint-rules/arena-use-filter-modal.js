module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce usage of FilterModal or SelectionModal instead of React Native Modal',
      category: 'Arena UI Components',
      recommended: true,
    },
    messages: {
      useFilterModal:
        "Use FilterModal from '@/components/ui/filterModal' for filter modals with Apply/Cancel buttons, or SelectionModal from '@/components/ui/selectionModal' for direct selection modals. Modal component should only be used inside UI components.",
    },
    schema: [],
  },

  create(context) {
    const filename = context.getFilename();
    const isInUIComponentsFolder = filename.includes('/src/components/ui/');
    const isShowcaseFile = filename.includes('componentsShowcaseScreen/components/');

    if (isInUIComponentsFolder || isShowcaseFile) {
      return {};
    }

    let hasModalImport = false;
    let hasFilterModalImport = false;
    let hasSelectionModalImport = false;

    return {
      ImportDeclaration(node) {
        const importSource = node.source.value;

        if (importSource === 'react-native') {
          node.specifiers.forEach(specifier => {
            if (
              specifier.type === 'ImportSpecifier' &&
              specifier.imported.name === 'Modal'
            ) {
              hasModalImport = true;
            }
          });
        }

        if (importSource === '@/components/ui/filterModal') {
          hasFilterModalImport = true;
        }

        if (importSource === '@/components/ui/selectionModal') {
          hasSelectionModalImport = true;
        }
      },

      JSXElement(node) {
        const openingElement = node.openingElement;
        const componentName = openingElement.name.name;

        if (
          componentName === 'Modal' &&
          hasModalImport &&
          !hasFilterModalImport &&
          !hasSelectionModalImport
        ) {
          context.report({
            node: openingElement,
            messageId: 'useFilterModal',
          });
        }
      },
    };
  },
};
