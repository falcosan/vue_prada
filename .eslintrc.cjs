/* eslint-env node */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-prettier",
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
    "vue/setup-compiler-macros": true,
  },
  globals: {
    module: true,
  },
};
