/**
 * Custom ESLint rules for Arena project
 */

module.exports = {
  rules: {
    'arena-best-practices': require('./arena-best-practices'),
    'arena-design-tokens': require('./arena-design-tokens'),
    'arena-file-structure': require('./arena-file-structure'),
    'arena-list-padding': require('./arena-list-padding'),
    'arena-no-comments': require('./arena-no-comments'),
    'arena-no-console': require('./arena-no-console'),
    'arena-no-custom-text-styles': require('./arena-no-custom-text-styles'),
    'arena-no-emoji-icons': require('./arena-no-emoji-icons'),
    'arena-text-requires-variant': require('./arena-text-requires-variant'),
    'arena-use-alert-context': require('./arena-use-alert-context'),
    'arena-use-sports-context': require('./arena-use-sports-context'),
    'arena-use-ui-components': require('./arena-use-ui-components'),
    'keyboard-aware-with-inputs': require('./keyboard-aware-with-inputs'),
  },
};
