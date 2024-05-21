export default [
  {
    plugins: {
      lodash: import("eslint-plugin-lodash"),
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    extends: ["react-app", "plugin:storybook/recommended"],
    rules: {
      "lodash/import-scope": ["error", "member"],
    },
    files: ["src/**/*.js", "src/**/*.jsx", "src/**/*.ts", "src/**/*.tsx"],
  },
];
