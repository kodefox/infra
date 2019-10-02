/* eslint-disable @typescript-eslint/no-var-requires */
const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  /**
   * This alias fix the "Invariant Violation: Invalid hook call" error.
   *
   * From React hook docs:
   * This problem can also come up when you use npm link or an equivalent.
   * In that case, your bundler might “see” two Reacts — one in application folder
   * and one in your library folder. Assuming myapp and mylib are sibling folders,
   * one possible fix is to run npm link ../myapp/node_modules/react from mylib.
   * This should make the library use the application’s React copy.
   * @see https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react
   *
   * Instead of linking the node_modules, we can use webpack alias to make
   * sure there's only one React instance.
   *
   * @see https://stackoverflow.com/questions/57455200/cant-use-hooks-with-my-react-component-library-invariant-violation-invalid-hoo
   */
  config.resolve.alias['react'] = path.resolve('./node_modules/react');
  config.resolve.alias['@ptomasroos/react-native-multi-slider'] = path.resolve(
    './node_modules/react-native-multi-slider',
  );
  config.resolve.alias['@unimodules/core'] = path.resolve(
    './node_modules/@unimodules/core',
  );
  config.resolve.alias['expo-asset'] = path.resolve(
    './node_modules/expo-asset',
  );
  config.resolve.alias['expo-constants'] = path.resolve(
    './node_modules/expo-constants',
  );
  config.resolve.alias['expo-font'] = path.resolve('./node_modules/expo-font');
  config.resolve.alias['react-native-web/dist/exports'] = path.resolve(
    './node_modules/react-native-web/dist/exports',
  );
  config.resolve.alias['react-native-svg'] = path.resolve(
    './node_modules/react-native-svg',
  );
  config.resolve.alias['@expo/vector-icons'] = path.resolve(
    './node_modules/@expo/vector-icons',
  );

  // Add rule to transform exoflex files before loading it.
  config.module.rules = [
    {
      test: /\.tsx?$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['@babel/typescript'],
            plugins: [
              '@babel/proposal-class-properties',
              '@babel/proposal-object-rest-spread',
            ],
          },
        },
      ],
      include: [path.join(__dirname, '../src')],
    },
    ...config.module.rules,
  ];

  // This is hacky, we remove the module scope plugin
  // to allow import from the outside of the project.
  let [plugin] = config.resolve.plugins;
  config.resolve.plugins = [plugin];

  return config;
};
