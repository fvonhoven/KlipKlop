module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:import/errors", "plugin:import/warnings", "plugin:import/typescript"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
    "/node_modules/**/*", // Ignore node_modules.
    "/dist/**/*", // Ignore dist files.
    "/coverage/**/*", // Ignore coverage files.
    "/.vscode/**/*", // Ignore vscode files.
    "/.vscode-test/**/*", // Ignore vscode-test files.
    "/App.js",
  ],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    quotes: ["error", "double"],
    "import/no-unresolved": 0,
    semi: ["error", "never"],
  },
}
