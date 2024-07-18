module.exports = {
    root: true,
    extends: ['@react-native', 'some-other-config-you-use', 'prettier'],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': ['error', {endOfLine: 'auto'}],
    },
};
