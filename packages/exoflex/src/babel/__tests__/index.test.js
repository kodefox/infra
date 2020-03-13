const path = require('path');
const { spawnSync } = require('child_process');
const { create } = require('babel-test');
const { toMatchFile } = require('jest-file-snapshot');

expect.extend({ toMatchFile });

spawnSync('node', [
  path.resolve(__dirname, '../../../scripts/generate-mappings.js'),
]);

const { fixtures } = create({
  plugins: [
    [
      require.resolve('../index'),
      { mappings: require.resolve('../../../lib/mappings.json') },
    ],
  ],
});

// Right now this test will ran once for each platform.
// In the future, we should make it possible to run platform agnostic test files only once.
fixtures('generate mappings', path.join(__dirname, '..', '__fixtures__'));
