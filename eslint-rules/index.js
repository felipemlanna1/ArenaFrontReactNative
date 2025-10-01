// Arena ESLint Plugin - Plugin principal que agrega todas as regras Arena

const arenaDesignTokens = require('./arena-design-tokens');
const arenaFileStructure = require('./arena-file-structure');
const arenaBestPractices = require('./arena-best-practices');
const arenaNoComments = require('./arena-no-comments');
const arenaUseUiComponents = require('./arena-use-ui-components');

module.exports = {
  rules: {
    'arena-design-tokens': arenaDesignTokens,
    'arena-file-structure': arenaFileStructure,
    'arena-best-practices': arenaBestPractices,
    'arena-no-comments': arenaNoComments,
    'arena-use-ui-components': arenaUseUiComponents,
  },
  configs: {
    recommended: {
      plugins: ['arena'],
      rules: {
        'arena/arena-design-tokens': 'error',
        'arena/arena-file-structure': 'warn',
        'arena/arena-best-practices': 'warn',
        'arena/arena-no-comments': 'error',
        'arena/arena-use-ui-components': 'error',
      },
    },
    strict: {
      plugins: ['arena'],
      rules: {
        'arena/arena-design-tokens': 'error',
        'arena/arena-file-structure': 'error',
        'arena/arena-best-practices': 'error',
        'arena/arena-no-comments': 'error',
        'arena/arena-use-ui-components': 'error',
      },
    },
    development: {
      plugins: ['arena'],
      rules: {
        'arena/arena-design-tokens': 'warn',
        'arena/arena-file-structure': 'warn',
        'arena/arena-best-practices': 'off',
        'arena/arena-use-ui-components': 'warn',
      },
    },
  },
};
