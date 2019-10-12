const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  ...tsjPreset,
  setupFiles: ['<rootDir>/test/modules-mock'],
  preset: './jestPresets/jest-preset',
  transform: {
    ...tsjPreset.transform,
    '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  modulePathIgnorePatterns: ['<rootDir>/lib/', '<rootDir>/example/'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-paper|react-native-safe-area-view|react-native-animation-hooks|react-native-svg|react-native-calendars|react-native-multi-slider|react-native-collapsible|react-native-modal-datetime-picker|react-native-vector-icons)/)',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|css|styl)$':
      '<rootDir>/test/stubs/asset-stub',
  },
};
