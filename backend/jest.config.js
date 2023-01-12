const { resolve } = require('path'); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = {
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    testEnvironment: 'node',
    moduleNameMapper: {
        '^src/(.*)$': resolve(__dirname, './src/$1')
    },
    testMatch: ['**/tests/**/*.test.ts'],
    setupFilesAfterEnv: ['jest-extended'],
    verbose: true
};
