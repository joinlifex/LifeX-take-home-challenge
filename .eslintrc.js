module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript/base',
    'plugin:prettier/recommended',  // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  env: {
    node: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module' // Allows for the use of imports
  },
  rules: {
    'max-len': ['error', {code: 140, ignoreTemplateLiterals: true}],
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/explicit-function-return-type': ["error", {
      "allowExpressions": true,
      "allowTypedFunctionExpressions": true
    }],
    '@typescript-eslint/no-explicit-any': [0, false],
    'import/no-unresolved': 'error',
    'import/no-cycle': "off",
    '@typescript-eslint/no-use-before-define': ['error', {functions: false}],
    'no-use-before-define': ['error', {functions: false}],
    'comma-dangle': ['error', 'only-multiline'],
    "no-unused-vars": "off",
    "no-plusplus": "off",
    "no-await-in-loop": "off",
    "class-methods-use-this": "off",
    "no-underscore-dangle": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "[type|returns|of]" , args: "after-used"}],
    //"func-style": ["error", "declaration"], removing it for now as it is quite annoying to have warnings or errors everywhere
    "newline-before-return": "error"
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      // use <root>/tsconfig.json
      typescript: './tsconfig.json'
    }
  }
};
