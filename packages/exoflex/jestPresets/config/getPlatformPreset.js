const rnPreset = require('react-native/jest-preset');
const { withWatchPlugins } = require('./withWatchPlugins');
const { preset, ...jestConfig } = require('../../jest.config');

function getModuleFileExtensions(...platforms) {
  let fileExtensions = [];

  // Support both TypeScript and JavaScript
  for (const extension of ['ts', 'tsx', 'js', 'jsx']) {
    // Ensure order is correct: [platformA.js, platformB.js, js]
    for (const platform of [...platforms, '']) {
      fileExtensions.push([platform, extension].filter(Boolean).join('.'));
    }
  }
  // Always add this last
  fileExtensions.push('json');
  return fileExtensions;
}

function getPlatformPreset(displayOptions, extensions) {
  const moduleFileExtensions = getModuleFileExtensions(...extensions);
  const testMatch = ['', ...extensions].reduce((arr, cur) => {
    const platformExtension = cur ? `.${cur}` : '';
    const sourceExtension = `.[jt]s?(x)`;
    return [
      ...arr,
      `**/__tests__/**/*spec${platformExtension}${sourceExtension}`,
      `**/__tests__/**/*test${platformExtension}${sourceExtension}`,
      `**/?(*.)+(spec|test)${platformExtension}${sourceExtension}`,
    ];
  }, []);

  return withWatchPlugins({
    ...jestConfig,
    displayName: displayOptions,
    testMatch,
    moduleFileExtensions,
    // TODO: create snapshotResolver in case we want to use snapshot
    // snapshotResolver: require.resolve(
    //   `../src/snapshot/resolver.${extensions[0]}.js`,
    // ),
    haste: {
      ...rnPreset.haste,
      defaultPlatform: extensions[0],
      platforms: extensions,
    },
    testEnvironment: 'node',
    setupFiles: [...rnPreset.setupFiles, ...jestConfig.setupFiles],
  });
}

// Combine React Native for web with React Native
// Use RNWeb for the testEnvironment
function getBaseWebPreset() {
  // Adjusting rnw jest-preset, since file `jest-preset.js` got removed from react-native-web version 0.18.xx
  // Reference: https://github.com/necolas/react-native-web/issues/2312
  return {
    ...rnPreset,
    moduleNameMapper: {
      '^react-native$': 'react-native-web',
    },
  };
}

module.exports = {
  getWebPreset() {
    const baseWebPreset = getBaseWebPreset();
    const platformPreset = getPlatformPreset(
      { name: 'Web', color: 'magenta' },
      ['web'],
    );
    const [rnSetupFile, ...platformSetupFiles] = platformPreset.setupFiles;
    let webPreset = {
      ...baseWebPreset,
      ...platformPreset,
      setupFiles: [...platformSetupFiles],
      moduleNameMapper: {
        ...baseWebPreset.moduleNameMapper,
        ...platformPreset.moduleNameMapper,
      },
      testEnvironment: 'jsdom',
    };
    return webPreset;
  },
  getIOSPreset() {
    return {
      ...rnPreset,
      ...getPlatformPreset({ name: 'iOS', color: 'white' }, ['ios', 'native']),
    };
  },
  getAndroidPreset() {
    return {
      ...rnPreset,
      ...getPlatformPreset({ name: 'Android', color: 'blueBright' }, [
        'android',
        'native',
      ]),
    };
  },
};
