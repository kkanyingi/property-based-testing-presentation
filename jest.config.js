module.exports = {
    verbose: true,
    moduleDirectories: [
      'node_modules',
      __dirname, // the root directory
    ],
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    }
};