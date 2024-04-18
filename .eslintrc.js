module.exports = {
    extends: [
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
      "prettier",
      "plugin:prettier/recommended",
    ],
    plugins: ["@typescript-eslint", "import", "prettier"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
      "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
  
    parser: "@typescript-eslint/parser",
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: "./tsconfig.json",
    },
};