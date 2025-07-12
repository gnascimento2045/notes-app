module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        '@typescript-eslint/recommended',
        'prettier',
    ],
    plugins: ['@typescript-eslint'],
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        'prefer-const': 'error',
        'no-var': 'error',
    },
};