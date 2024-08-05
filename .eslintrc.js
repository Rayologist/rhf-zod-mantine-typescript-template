module.exports = {
  extends: ['mantine', 'plugin:@next/next/recommended'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["off"],
  },
};
