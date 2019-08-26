module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            exoflex: '../src/index',
            'react-native-multi-slider':
              '@ptomasroos/react-native-multi-slider',
          },
        },
      ],
    ],
  };
};
