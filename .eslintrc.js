module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    _: 'writable',
    znTool: 'writable',
    configData: 'writable',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 'off',
    quotes: 'off',
    'no-unused-vars': 0,
    'function-paren-newline': 'off',
    'vue/multi-word-component-names': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-reserved-component-names': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-mutating-props': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
}
