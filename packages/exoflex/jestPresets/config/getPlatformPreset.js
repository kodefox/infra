// eslint-disable-next-line @typescript-eslint/no-var-requires
const rnPreset = require('react-native/jest-preset');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withWatchPlugins } = require('./withWatchPlugins');
// eslint-disable-next-line
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
  let rnwPreset;
  try {
    rnwPreset = require('react-native-web/jest-preset');
  } catch (error) {
    console.error(error);
    throw error;
  }
  return {
    ...rnPreset,
    ...rnwPreset,
    setupFiles: rnwPreset.setupFiles,
    moduleNameMapper: {
      ...rnPreset.moduleNameMapper,
      // Add react-native-web alias
      // This makes the tests take ~2x longer
      ...rnwPreset.moduleNameMapper,
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [rnSetupFile, ...platformSetupFiles] = platformPreset.setupFiles;
    let webPreset = {
      ...baseWebPreset,
      ...platformPreset,
      setupFiles: [...baseWebPreset.setupFiles, ...platformSetupFiles],
      moduleNameMapper: {
        ...baseWebPreset.moduleNameMapper,
        ...platformPreset.moduleNameMapper,
      },
      testEnvironment: baseWebPreset.testEnvironment,
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
