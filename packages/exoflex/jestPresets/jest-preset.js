// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withWatchPlugins } = require('./config/withWatchPlugins');
const {
  getWebPreset,
  getIOSPreset,
  getAndroidPreset,
} = require('./config/getPlatformPreset'); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = withWatchPlugins({
  projects: [
    // Create a new project for each platform.
    getWebPreset(),
    getIOSPreset(),
    getAndroidPreset(),
  ],
});
