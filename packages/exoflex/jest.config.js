const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  ...tsjPreset,
  preset: 'react-native-web',
  transform: {
    ...tsjPreset.transform,
    '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  modulePathIgnorePatterns: ['<rootDir>/lib/'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-paper|react-native-safe-area-view)/)'
  ],
};
