# exoflex · ![npm](https://img.shields.io/npm/v/exoflex)

This is a UI component library for React Native and Web (using react-native-web).

## Pre-requisites

This library uses `hooks` so you need at least:

- `react` version >= `16.8.0`
- `react-native` version >= `0.59.0`

This library also requires you to use `react-native-svg` >= `9.3.3`. If you use `Expo` you should install it by running `expo install react-native-svg`.

If you are not using `Expo`, you should install it by following [these steps](https://github.com/react-native-community/react-native-svg/#installation).

Exoflex includes automatic font loading using `expo-font`. If you want to opt-out and handle the font loading manually, use [babel-plugin-optional-require](https://github.com/satya164/babel-plugin-optional-require).

## Installation

To install this library, use npm or yarn:

```
yarn add exoflex
```

For bare React Native project, you also need to install `react-native-vector-icons`. For `react-native < 0.60.0`, you need to link the library.

This library is built using TypeScript and ships with `.d.ts` files, so you do not need to install `@types/exoflex`.

## Available Components

To use this library, it's really advised that you wrap your application with the `Provider` component.

You can find all available components as follows:

- [Accordion](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/Accordion.md)
- [ActivityIndicator](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/ActivityIndicator.md)
- [Avatar.Icon](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/Avatar.Icon.md)
- [Avatar.Image](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/Avatar.Image.md)
- [Avatar.Text](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/Avatar.Text.md)
- [Badge](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/Badge.md)
- [Button](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/Button.md)
- [Calendar](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/Calendar.md)
- [Checkbox](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/Checkbox.md)
- [Chip](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/Chip.md)
- [Collapsible](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/Collapsible.md)
- [Drawer](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/DrawerSection.md)
- [Drawer.Item](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/DrawerItem.md)
- [IconButton](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/IconButton.md)
- [Portal](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/Portal.md)
- [Portal.Host](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/PortalHost.md)
- [ProgressBar](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/ProgressBar.md)
- [Provider](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/Provider.md)
- [RadioButton](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/RadioButton.md)
- [RadioButton.Group](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/RadioButtonGroup.md)
- [Slider](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/Slider.md)
- [Switch](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/Switch.md)
- [Text](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/Text.md)
- [TextInput](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/TextInput.md)
- [TimePicker](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/TimePicker.md)
- [Toast](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/Toast.md)
