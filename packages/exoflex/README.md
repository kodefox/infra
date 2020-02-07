# exoflex · ![npm](https://img.shields.io/npm/v/exoflex)

This is a UI component library for React Native and Web (using react-native-web).

## Pre-requisites

This library uses `hooks` so you need to use at least:

- `react` version >= `16.8.0`
- `react-native` version >= `0.59.0`

This library also required you to use `react-native-svg` >= `9.3.3`. But if you use `Expo` you could install it by running `expo install react-native-svg`.

If you are not using `Expo`, you should install it by following [this step](https://github.com/react-native-community/react-native-svg/#installation).

Exoflex includes automatic fonts loading using `expo-font`. If you want to opt-out and handle the font loading manually, use [babel-plugin-optional-require](https://github.com/satya164/babel-plugin-optional-require).

## Installation

To install this library, you could use npm or yarn:

```
yarn add exoflex
```

For bare React Native project, you also need to install `react-native-vector-icons`. For `react-native<0.60.0`, you need to link the library first.

If you are using TypeScript, naviflex is built using TypeScript and we shipped it along with the `.d.ts` file, so you do not have to install `@types/exoflex`.

Exoflex includes a babel plugin to rewrite the import statements to save bundle size.
To use, add `exoflex/babel` to `plugins` in your babel config.

```json
{
  "plugins": [
    ...,
    "exoflex/babel"
  ]
}
```

## Available Components

To use this library, it's really advised that you use the `Provider` component to wrap your App.

You can find all available components from links below:

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
- [DateTimePicker](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/DateTimePicker.md)
- [Divider](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/Divider.md)
- [Drawer](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/DrawerSection.md)
- [Drawer.Item](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/DrawerItem.md)
- [IconButton](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/IconButton.md)
- [Menu](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/Menu.md)
- [Menu.Item](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/Menu.Item.md)
- [Portal](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/Portal.md)
- [Portal.Host](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/PortalHost.md)
- [ProgressBar](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/ProgressBar.md)
- [Provider](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/Provider.md)
- [RadioButton](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/RadioButton.md)
- [RadioButton.Group](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/RadioButtonGroup.md)
- [SegmentedControl](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/SegmentedControl.md)
- [Slider](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/Slider.md)
- [Switch](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/Switch.md)
- [Text](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/Text.md)
- [TextInput](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/TextInput.md)
- [TimePicker](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/TimePicker.md)
- [Toast](https://github.com/kodefox/infra/blob/master/packages/exoflex/docs/components/Toast.md)
