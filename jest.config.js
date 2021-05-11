module.exports = {
    clearMocks: true,

    // An array of directory names to be searched recursively up from the requiring module's location
    moduleDirectories: ['node_modules'],

    // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
    moduleNameMapper: {
        '\\.css$': '<rootDir>/__mocks__/styleMocks.js',
    },

    // The test environment that will be used for testing
    testEnvironment: 'node',

    // This option allows the use of a custom results processor
    testResultsProcessor: './jestReporter.js',
};
