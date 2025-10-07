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
      useCheckboxWithCardVariant:
        'Use <Checkbox variant="card" /> instead of <CardCheckbox />. O componente Checkbox já suporta a variante "card", tornando o CardCheckbox desnecessário.',
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
      Switch: '@/components/ui/switch (Switch)',
      TouchableOpacity: '@/components/ui/button (Button)',
      Pressable: '@/components/ui/button (Button)',
      Image: '@/components/ui/optimizedImage (OptimizedImage)',
      Card: '@/components/ui/card (Card)',
      Badge: '@/components/ui/badge (Badge)',
      Chip: '@/components/ui/badge (Badge)',
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
      RefreshControl: '@/components/ui/refreshControl (ArenaRefreshControl)',
    };

    const externalLibraryMapping = {
      '@react-native-community/datetimepicker': {
        components: ['DateTimePicker', 'default'],
        replacement: '@/components/ui/datePicker (DatePicker)',
        message: 'Use @/components/ui/datePicker (DatePicker) instead of @react-native-community/datetimepicker directly',
      },
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
      'Switch',
      'DatePicker',
      'Label',
      'OptimizedImage',
      'Card',
      'Badge',
      'Checkbox',
      'CheckboxGroup',
      'CardCheckbox',
      'Link',
      'Dropdown',
      'Accordion',
      'SportsLoading',
      'ArenaRefreshControl',
      'ProgressBar',
      'Stepper',
      'Fab',
    ]);

    const importedArenaComponents = new Map();

    return {
      ImportDeclaration(node) {
        const importSource = node.source.value;

        // Check for banned external libraries
        if (externalLibraryMapping[importSource]) {
          const libInfo = externalLibraryMapping[importSource];
          context.report({
            node,
            messageId: 'useArenaComponent',
            data: {
              rnComponent: importSource,
              arenaComponent: libInfo.replacement,
            },
          });
        }

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

        // Check for CardCheckbox usage
        if (
          importedArenaComponents.has(componentName) &&
          importedArenaComponents.get(componentName) === 'CardCheckbox'
        ) {
          context.report({
            node: openingElement,
            messageId: 'useCheckboxWithCardVariant',
          });
        }

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
