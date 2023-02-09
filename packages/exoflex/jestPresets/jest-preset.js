const { withWatchPlugins } = require('./config/withWatchPlugins');
const {
  getWebPreset,
  getIOSPreset,
  getAndroidPreset,
} = require('./config/getPlatformPreset');

module.exports = withWatchPlugins({
  projects: [
    // Create a new project for each platform.
    // getWebPreset(),
    getIOSPreset(),
    getAndroidPreset(),
  ],
});
