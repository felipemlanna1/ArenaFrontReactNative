module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow emoji strings as icons - use @expo/vector-icons instead',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      noEmojiIcon:
        'Do not use emoji strings ({{emoji}}) as icons. Use Ionicons or other @expo/vector-icons instead.',
      noStringIcon:
        'Icon prop should use Ionicons component, not string values. Import from @expo/vector-icons/Ionicons.',
    },
    schema: [],
  },

  create(context) {
    const emojiRegex =
      /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F910}-\u{1F96B}\u{1F980}-\u{1F9E0}]/u;

    function checkForEmoji(node, value) {
      if (typeof value === 'string' && emojiRegex.test(value)) {
        context.report({
          node,
          messageId: 'noEmojiIcon',
          data: {
            emoji: value,
          },
        });
      }
    }

    function isIconRelatedProperty(propertyName) {
      const iconProperties = ['icon', 'iconName', 'leftIcon', 'rightIcon'];
      return iconProperties.includes(propertyName);
    }

    return {
      Property(node) {
        if (
          node.key &&
          node.key.type === 'Identifier' &&
          isIconRelatedProperty(node.key.name)
        ) {
          if (node.value.type === 'Literal') {
            checkForEmoji(node.value, node.value.value);
          }
        }
      },

      JSXAttribute(node) {
        if (
          node.name &&
          node.name.type === 'JSXIdentifier' &&
          isIconRelatedProperty(node.name.name)
        ) {
          if (
            node.value &&
            node.value.type === 'Literal' &&
            typeof node.value.value === 'string'
          ) {
            checkForEmoji(node.value, node.value.value);
          }

          if (
            node.value &&
            node.value.type === 'JSXExpressionContainer' &&
            node.value.expression.type === 'Literal'
          ) {
            checkForEmoji(node.value.expression, node.value.expression.value);
          }
        }
      },

      JSXText(node) {
        const parent = node.parent;
        if (
          parent &&
          parent.type === 'JSXElement' &&
          parent.openingElement.name.type === 'JSXIdentifier' &&
          parent.openingElement.name.name === 'Text'
        ) {
          const textContent = node.value.trim();
          if (textContent && emojiRegex.test(textContent)) {
            const hasIconContext = parent.openingElement.attributes.some(
              attr =>
                attr.name &&
                attr.name.name &&
                (attr.name.name.includes('icon') ||
                  attr.name.name.includes('Icon'))
            );

            if (hasIconContext) {
              checkForEmoji(node, textContent);
            }
          }
        }
      },
    };
  },
};
