module.exports = {
  preset: 'react-native',
  collectCoverage: true,
  coverageReporters: ["json", "html", "text"],
  collectCoverageFrom: ["./src/**"],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community|@react-native|@react-navigation)',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/src/services/index.ts'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
