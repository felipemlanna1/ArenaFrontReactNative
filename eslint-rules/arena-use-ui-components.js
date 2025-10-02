// Arena ESLint Plugin - Regra para forçar uso de componentes Arena UI

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce usage of Arena UI components instead of React Native base components and validate proper prop usage',
      category: 'Arena UI Components',
      recommended: true,
    },
    messages: {
      useArenaComponent:
        "Use Arena UI component '{{arenaComponent}}' instead of React Native '{{rnComponent}}'",
      invalidStyleProp:
        "Do not use inline 'style' prop on Arena UI components. Use design system props (variant, size, etc.) instead",
      useDesignSystemProps:
        "Use design system props instead of custom styles on '{{component}}' component",
    },
    schema: [],
  },

  create(context) {
    const filename = context.getFilename();
    const isInComponentsFolder = filename.includes('/src/components/');

    if (isInComponentsFolder) {
      return {};
    }

    const componentMapping = {
      Text: '@/components/ui/text (Text)',
      TextInput: '@/components/ui/input (Input)',
      TouchableOpacity: '@/components/ui/button (Button)',
      Pressable: '@/components/ui/button (Button)',
      Card: '@/components/ui/card (Card)',
      Badge: '@/components/ui/badge (Badge)',
      Checkbox: '@/components/ui/checkbox (Checkbox)',
      CheckboxGroup: '@/components/ui/checkboxGroup (CheckboxGroup)',
      Link: '@/components/ui/link (Link)',
      Picker: '@/components/ui/dropdown (Dropdown)',
      Select: '@/components/ui/dropdown (Dropdown)',
      Menu: '@/components/ui/dropdown (Dropdown)',
      Accordion: '@/components/ui/accordion (Accordion)',
      Collapsible: '@/components/ui/accordion (Accordion)',
      Expandable: '@/components/ui/accordion (Accordion)',
      ActivityIndicator: '@/components/ui/sportsLoading (SportsLoading)',
    };

    const allowedComponents = [
      'View',
      'ScrollView',
      'FlatList',
      'Image',
      'ImageBackground',
      'KeyboardAvoidingView',
      'SafeAreaView',
      'StatusBar',
      'Modal',
      'Alert',
      'Platform',
      'Dimensions',
      'StyleSheet',
      'Animated',
      'Linking',
      'TouchableOpacity',
    ];

    const arenaUIComponents = new Set([
      'Button',
      'Text',
      'Input',
      'Card',
      'Badge',
      'Checkbox',
      'CheckboxGroup',
      'Link',
      'Dropdown',
      'Accordion',
      'SportsLoading',
    ]);

    const importedArenaComponents = new Map();

    return {
      ImportDeclaration(node) {
        const importSource = node.source.value;

        if (importSource === 'react-native') {
          node.specifiers.forEach(specifier => {
            if (specifier.type === 'ImportSpecifier') {
              const importedName = specifier.imported.name;
              const localName = specifier.local.name;

              if (
                componentMapping[importedName] &&
                !allowedComponents.includes(importedName)
              ) {
                if (localName !== importedName) {
                  return;
                }

                context.report({
                  node: specifier,
                  messageId: 'useArenaComponent',
                  data: {
                    rnComponent: importedName,
                    arenaComponent: componentMapping[importedName],
                  },
                });
              }
            }
          });
        }

        if (importSource.startsWith('@/components/ui/')) {
          node.specifiers.forEach(specifier => {
            if (specifier.type === 'ImportSpecifier') {
              const componentName = specifier.imported.name;
              const localName = specifier.local.name;
              if (arenaUIComponents.has(componentName)) {
                importedArenaComponents.set(localName, componentName);
              }
            }
          });
        }
      },

      JSXElement(node) {
        const openingElement = node.openingElement;
        const componentName = openingElement.name.name;

        if (
          importedArenaComponents.has(componentName) &&
          componentName === 'Button'
        ) {
          const attributes = openingElement.attributes;
          const hasStyleProp = attributes.some(
            attr => attr.type === 'JSXAttribute' && attr.name.name === 'style'
          );

          if (hasStyleProp) {
            const styleProp = attributes.find(
              attr => attr.type === 'JSXAttribute' && attr.name.name === 'style'
            );

            context.report({
              node: styleProp,
              messageId: 'invalidStyleProp',
            });
          }
        }
      },
    };
  },
};
