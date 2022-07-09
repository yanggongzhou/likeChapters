module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'object-property-newline': 'off',
    'object-curly-newline': 'off',
    'prefer-const': 'warn',
    'eqeqeq': ['warn', 'always'],
    'quotes': ['off', 'single', { "allowTemplateLiterals": true }],
    'semi': [0, 'always'],
    'no-use-before-define': 'off',
    'no-void': 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'space-before-function-paren': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off', // ts每个函数都要显式声明返回值
    'indent': [
      'error', 2, { 'SwitchCase': 1 }
    ],
    'array-bracket-spacing': 'off',
    'no-trailing-spaces': 'off',
    'padded-blocks': 'off',
    'eol-last': 'off',
    '@typescript-eslint/indent': [
      'error', 2
    ],
    "@typescript-eslint/no-explicit-any": ["off"],
    // typescript报错：Don‘t use `{}` as a type. `{}` actually means “any non-nullish value“.
    "@typescript-eslint/ban-types": [
      "error",
      {
        "extendDefaults": true,
        "types": {
          "{}": false
        }
      }
    ]
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
