/**
 * ESLint Rule: arena-text-requires-variant
 *
 * Enforces that all <Text> components from '@/components/ui/text' MUST have a 'variant' prop.
 * This ensures consistent typography and prevents runtime errors from undefined variants.
 *
 * ❌ BAD:
 * <Text>Hello World</Text>
 * <Text style={styles.title}>Title</Text>
 *
 * ✅ GOOD:
 * <Text variant="bodyPrimary">Hello World</Text>
 * <Text variant="titlePrimary" style={styles.title}>Title</Text>
 *
 * Available variants:
 * - Display/Headings: displayPrimary, displayAccent, headingPrimary, headingAccent
 * - Titles: titlePrimary, titleSecondary, titleAccent, titleAccentBold
 * - Body: bodyPrimary, bodySecondary, bodyBold, bodyBoldAccent, bodyMuted, bodyError, bodySuccess, bodyAccent
 * - Captions: captionSecondary, captionMuted, captionError
 * - Labels: labelPrimary, labelSecondary, labelError
 */

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce that Text component always has a variant prop',
      category: 'Arena Design System',
      recommended: true,
    },
    messages: {
      missingVariant:
        'Text component from "@/components/ui/text" must have a "variant" prop. Available variants: displayPrimary, displayAccent, headingPrimary, headingAccent, titlePrimary, titleSecondary, titleAccent, titleAccentBold, bodyPrimary, bodySecondary, bodyBold, bodyBoldAccent, bodyMuted, bodyError, bodySuccess, bodyAccent, captionSecondary, captionMuted, captionError, labelPrimary, labelSecondary, labelError.',
    },
    fixable: null,
    schema: [],
  },

  create(context) {
    let textImportName = null;
    let isTextImported = false;

    return {
      // Track imports from '@/components/ui/text'
      ImportDeclaration(node) {
        const source = node.source.value;

        if (source === '@/components/ui/text') {
          isTextImported = true;

          // Find the Text import specifier
          const textSpecifier = node.specifiers.find(
            spec =>
              spec.type === 'ImportSpecifier' && spec.imported.name === 'Text'
          );

          if (textSpecifier) {
            textImportName = textSpecifier.local.name;
          }
        }
      },

      // Check JSX elements
      JSXOpeningElement(node) {
        if (!isTextImported || !textImportName) {
          return;
        }

        const elementName = node.name.name;

        // Only check if the element is our imported Text component
        if (elementName !== textImportName) {
          return;
        }

        // Check if variant prop exists
        const hasVariantProp = node.attributes.some(
          attr => attr.type === 'JSXAttribute' && attr.name.name === 'variant'
        );

        if (!hasVariantProp) {
          context.report({
            node,
            messageId: 'missingVariant',
          });
        }
      },
    };
  },
};
