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

- [Accordion](./docs/components/Accordion.md)
- [ActivityIndicator](./docs/components/ActivityIndicator.md)
- [Avatar.Icon](./docs/components/Avatar.Icon.md)
- [Avatar.Image](./docs/components/Avatar.Image.md)
- [Avatar.Text](./docs/components/Avatar.Text.md)
- [Badge](./docs/components/Badge.md)
- [Button](./docs/components/Button.md)
- [Calendar](./docs/components/Calendar.md)
- [Checkbox](./docs/components/Checkbox.md)
- [Chip](./docs/components/Chip.md)
- [Collapsible](./docs/components/Collapsible.md)
- [Drawer](./docs/components/DrawerSection.md)
- [Drawer.Item](./docs/components/DrawerItem.md)
- [IconButton](./docs/components/IconButton.md)
- [Portal](./docs/components/Portal.md)
- [Portal.Host](./docs/components/PortalHost.md)
- [ProgressBar](./docs/components/ProgressBar.md)
- [Provider](./docs/components/Provider.md)
- [RadioButton](./docs/components/RadioButton.md)
- [RadioButton.Group](./docs/components/RadioButtonGroup.md)
- [Slider](./docs/components/Slider.md)
- [Switch](./docs/components/Switch.md)
- [Text](./docs/components/Text.md)
- [TextInput](./docs/components/TextInput.md)
- [TimePicker](./docs/components/TimePicker.md)
- [Toast](./docs/components/Toast.md)
