module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "prettier/prettier": "error",
  },
  overrides: [
    {
      files: ["*.js"],
      extends: ["prettier"],
    },
  ],
};
