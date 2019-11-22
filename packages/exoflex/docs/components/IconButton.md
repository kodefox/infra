# IconButton

An icon button is a button which displays only an icon without a label. By default button has 150% size of the icon.

### Preview

![icon_button_preview](../assets/icon_button_preview.png)

### Props

| Name                 |                 Type                 | Default | Description                                                                                                                                       |
| -------------------- | :----------------------------------: | :-----: | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `icon *`             |             `IconSource`             |         | Icon to display. Can only use `MaterialCommunityIcons` icons from the list. [See icon list](https://oblador.github.io/react-native-vector-icons/) |
| `color`              |               `string`               |         | Color of the icon.                                                                                                                                |
| `size`               |               `number`               |   24    | Size of the icon.                                                                                                                                 |
| `disabled`           |              `boolean`               |         | Whether the button is disabled. A disabled button is greyed out and onPress is not called on touch.                                               |
| `animated`           |              `boolean`               |  false  | Whether an icon change is animated.                                                                                                               |
| `accessibilityLabel` |               `string`               |         | Accessibility label for the button. This is read by the screen reader when the user taps the button.                                              |
| `onPress`            | `(e: GestureResponderEvent) => void` |         | Function to execute on press.                                                                                                                     |
| `style`              |        `StyleProp<ViewStyle>`        |         | Style for the icon.                                                                                                                               |

Prop marked with `*` is required.

### Example

```tsx
<Provider>
  <IconButton icon="camera" />
  <IconButton icon="settings" onPress={() => {}} />
</Provider>
```
