// Arena ESLint Plugin - Regra para forçar uso de componentes Arena UI

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce usage of Arena UI components instead of React Native base components',
      category: 'Arena UI Components',
      recommended: true,
    },
    messages: {
      useArenaComponent:
        "Use Arena UI component '{{arenaComponent}}' instead of React Native '{{rnComponent}}'",
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
      Text: '@/components/text (Text)',
      TextInput: '@/components/ui/input (Input)',
      TouchableOpacity: '@/components/ui/button (Button)',
      Pressable: '@/components/ui/button (Button)',
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
      'ActivityIndicator',
      'Modal',
      'Alert',
      'Platform',
      'Dimensions',
      'StyleSheet',
      'Animated',
      'Linking',
    ];

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
      },
    };
  },
};
