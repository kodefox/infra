# RadioButton

A radio button with text. Radio buttons allow the selection a single option from a set.

### Preview

![radiobutton_preview](../assets/radiobutton_preview.png)

| Prop        | Type                          | Default               | Description                                                                                     |
| ----------- | ----------------------------- | --------------------- | ----------------------------------------------------------------------------------------------- |
| `checked`   | `boolean`                     | `false`               | Boolean whether the radio button is checked or not.                                             |
| `label`     | `string`                      | `''`                  | The text/string for the radio button.                                                           |
| `onPress`   | `(newValue: boolean) => void` | `() => {}`            | Callback function to be called when radio button is pressed.                                    |
| `color`     | `string`                      | `Theme primary color` | The color of the radio button icon. Default to theme primary color.                             |
| `disabled`  | `boolean`                     | `false`               | Boolean whether the checkbox is disabled or not. If disabled, no press event will be triggered. |
| `size`      | `number`                      | `24`                  | The size of the radio button icon.                                                              |
| `style`     | `StyleProp<ViewStyle>`        |                       | Additional style for the radio button container.                                                |
| `textStyle` | `StyleProp<TextStyle>`        |                       | Additional style for the text.                                                                  |

### Example

```tsx
let [radioButtonValue, setRadioButtonValue] = useState(false);

<Provider>
  <RadioButton
    checked={radioButtonValue}
    label="Hello"
    onPress={(newValue) => {
      setRadioButtonValue(newValue);
    }}
  />
</Provider>;
```
