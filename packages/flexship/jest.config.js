module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  setupFiles: ['<rootDir>/__mocks__/modulesMock.js'],
};
