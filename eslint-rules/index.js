// Arena ESLint Plugin - Plugin principal que agrega todas as regras Arena

const arenaDesignTokens = require('./arena-design-tokens');
const arenaFileStructure = require('./arena-file-structure');
const arenaBestPractices = require('./arena-best-practices');

module.exports = {
  rules: {
    'arena-design-tokens': arenaDesignTokens,
    'arena-file-structure': arenaFileStructure,
    'arena-best-practices': arenaBestPractices,
  },
  configs: {
    recommended: {
      plugins: ['arena'],
      rules: {
        'arena/arena-design-tokens': 'error',
        'arena/arena-file-structure': 'warn',
        'arena/arena-best-practices': 'warn',
      },
    },
    strict: {
      plugins: ['arena'],
      rules: {
        'arena/arena-design-tokens': 'error',
        'arena/arena-file-structure': 'error',
        'arena/arena-best-practices': 'error',
      },
    },
    development: {
      plugins: ['arena'],
      rules: {
        'arena/arena-design-tokens': 'warn',
        'arena/arena-file-structure': 'warn',
        'arena/arena-best-practices': 'off', // Mais flexível em dev
      },
    },
  },
};
