module.exports = [
  { 
    ignores: ['dist'] 
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        browser: true,
        es2021: true,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react: require('eslint-plugin-react'),
      'react-hooks': require('eslint-plugin-react-hooks'),
      'react-refresh': require('eslint-plugin-react-refresh'),
    },
    rules: {
      'semi': ['error', 'always'],
      'quotes': ['error', 'double'],
      'no-unused-vars': 'warn',
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      ...require('@eslint/js').configs.recommended.rules,
      ...require('eslint-plugin-react').configs.recommended.rules,
      ...require('eslint-plugin-react').configs['jsx-runtime'].rules,
      ...require('eslint-plugin-react-hooks').configs.recommended.rules,
    },
  },
];
