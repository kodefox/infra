# Button

Button with three presets. Use within the `Provider` component to be able to change the button color as it depends on the theme.

| Prop         | Description                                                                                                                                                                                                                                                                                                                 |                                Type                                 | Default Value | Required |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----------------------------------------------------------------: | :-----------: | :------: |
| children     | Label text of the button.                                                                                                                                                                                                                                                                                                   |                             `ReactNode`                             |  _undefined_  | **Yes**  |
| preset       | Mode of the button. You can change the mode to adjust the styling to give it desired emphasis.<br>- `primary` - button with a background color and elevation shadow (high emphasis)<br>- `secondary` - button with an outline (medium emphasis)<br>- `invisible` - flat button without background or outline (low emphasis) |                              `string`                               |  `'primary'`  |    No    |
| onPress      | Function that will be invoked when the `Button` pressed.                                                                                                                                                                                                                                                                    |                            `() => void`                             |  _undefined_  |    No    |
| disabled     | Whether to disable the press functionality.                                                                                                                                                                                                                                                                                 |                              `boolean`                              |  _undefined_  |    No    |
| loading      | Whether to show a loading indicator.                                                                                                                                                                                                                                                                                        |                              `boolean`                              |  _undefined_  |    No    |
| icon         | Icon to display for the `Button`.                                                                                                                                                                                                                                                                                           | `string` \| `number` \| `ImageURISource` \| `Array<ImageURISource>` |  _undefined_  |    No    |
| uppercase    | Make the label text uppercased. Note that this won't work if you pass React elements as children.                                                                                                                                                                                                                           |                              `boolean`                              |  _undefined_  |    No    |
| contentStyle | Style of button's inner content.                                                                                                                                                                                                                                                                                            |                       `StyleProp<ViewStyle>`                        |  _undefined_  |    No    |
| style        | Style of button's outer content.                                                                                                                                                                                                                                                                                            |                       `StyleProp<ViewStyle>`                        |  _undefined_  |    No    |
| labelStyle   | Style for the button text.                                                                                                                                                                                                                                                                                                  |                       `StyleProp<TextStyle>`                        |  _undefined_  |    No    |

### Preview

![button_preview](../assets/button_preview.png)

### Example

```tsx
<Provider>
  <Button onPress={() => {}}>Primary button</Button>

  <Button preset="secondary" onPress={() => {}}>
    Secondary button
  </Button>

  <Button preset="invisible" onPress={() => {}}>
    Invisible button
  </Button>

  <Button disabled preset="primary" onPress={() => {}}>
    Disabled Primary button
  </Button>

  <Button disabled preset="secondary" onPress={() => {}}>
    Disabled Secondary button
  </Button>

  <Button disabled preset="invisible" onPress={() => {}}>
    Disabled Invisible button
  </Button>

  <Button icon="home" onPress={() => {}}>
    With Icon
  </Button>
</Provider>
```
