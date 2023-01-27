module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            exoflex: '../src/index',
            'react-native-calendars': 'react-native-calendars',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
