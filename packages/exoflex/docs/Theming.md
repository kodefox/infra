# Theming

## Customizing The Theme

To customize the theme used by exoflex, simply pass a custom theme to the provider:

```tsx
import { Provider } from 'exoflex';

let customTheme = {
  // You don't have to spread the default theme here.
  colors: {
    primary: 'salmon'
  },
}

// The custom theme passed to `theme` prop will be automatically merged with the default theme.
<Provider theme={customTheme}>
  <View>
    <Text>Foo</Text>
  </View>
</Provider>
```

## Using Custom Fonts

By default, exoflex will use the system fonts, but exoflex is designed with Rubik font family in mind, so exoflex also ship with Rubik fonts.

Before using the custom fonts in the theme, make sure to load the fonts first.

### Loading the fonts

How you load the fonts will vary depending on the platform and stack you're using.

#### Using Expo

When using Expo, you can let exoflex handle the font loading for you.

```tsx
import { Provider } from 'exoflex';
import OpenSansRegular from './OpenSans-Regular.ttf';

// Create an object to list all the custom fonts to be loaded.
// The key in the object will be the fontFamily to use when styling the text.
// Internally, this object will be passed to `Font.loadAsync`
// @see https://docs.expo.io/versions/latest/sdk/font/#arguments
let customFonts = {
  // Here, the key is 'OpenSans-Regular', when we style the text,
  // we will use fontFamily: 'OpenSans-Regular'.
  'OpenSans-Regular': OpenSansRegular
}

// Define the font family to use in the custom theme.
let customTheme = {
  fonts: {
    default: {
      // Here, we only override the 'normal' font weight from the 'default' preset.
      normal: {
        name: 'OpenSans-Regular',
        weight: '400'
      }
    }
  }
}

// When loading the fonts, Provider will render a placeholder.
// To override it, pass a component to render to `Provider.LoadingPlaceholder`.
<Provider useSystemFonts={false} fonts={customFonts} theme={customTheme}>
  <View>
    {/* This text will be using the OpenSans font family. */}
    <Text>Foo</Text>

    {/* But this one still use the Rubik font family because we only override the normal one in the custom theme. */}
    <Text weight="medium">Bar</Text>
  </View>
</Provider>
```

You can skip the automatic font loading if you want to, but make sure to load the custom fonts first before rendering.

```tsx
<Provider useSystemFonts={false} skipFontLoading={true}>
  <View>
    <Text>Foo</Text>
  </View>
</Provider>
```

#### Using Bare React Native (Without Expo)

Depending on the version of your React Native, your configuration might be different.

For `react-native@>=0.60.0`, add your fonts directory path to the `assets` property to `react-native.config.js` in the app root dir.

E.g.:

Your fonts is stored inside `<ROOT>/assets/fonts/`.
1. Open up `react-native.config.js`.
2. Add your fonts dir path to `assets`.

```js
// react-native.config.js

module.exports = {
  // ...
  assets: [
    ',/assets/fonts/'
  ],
};
```

3. Link the assets by running `react-native link`.

### Using the custom fonts

Under dicussion.

