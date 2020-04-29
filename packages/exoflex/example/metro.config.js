/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');
const pak = require('../package.json');
const escape = require('escape-string-regexp');

const dependencies = Object.keys(pak.dependencies);

let extraNodeModules = {};
[
  'react-native',
  'react',
  'react-native-svg',
  'react-native-reanimated',
  'react-native-gesture-handler',
  'expo-font',
  '@babel/runtime',
  ...dependencies,
].forEach((dep) => {
  extraNodeModules[dep] = path.resolve(__dirname, 'node_modules', dep);
});

module.exports = {
  projectRoot: __dirname,
  watchFolders: [path.resolve(__dirname, '..')],

  resolver: {
    blacklistRE: blacklist([
      new RegExp(
        `^${escape(path.resolve(__dirname, '..', 'node_modules'))}\\/.*$`,
      ),
    ]),

    extraNodeModules,
  },
};
