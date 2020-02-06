# RadioButton

A radio button with text. Radio buttons allow the selection a single option from a set.

### Preview

![radiobutton_preview](../assets/radiobutton_preview.png)

| Prop        | Type                                             | Default               | Description                                                                                     |
| ----------- | ------------------------------------------------ | --------------------- | ----------------------------------------------------------------------------------------------- |
| `checked`   | `boolean`                                        | `false`               | Boolean whether the radio button is checked or not.                                             |
| `label`     | `string`                                         | `''`                  | The text/string for the radio button.                                                           |
| `value`     | `string`                                         | `''`                  | The value of the radio button.                                                                  |
| `onPress`   | `(isChecked: boolean, newValue: string) => void` | `() => {}`            | Callback function to be called when radio button is pressed.                                    |
| `color`     | `string`                                         | `Theme primary color` | The color of the radio button icon. Default to theme primary color.                             |
| `disabled`  | `boolean`                                        | `false`               | Boolean whether the checkbox is disabled or not. If disabled, no press event will be triggered. |
| `size`      | `number`                                         | `24`                  | The size of the radio button icon.                                                              |
| `style`     | `StyleProp<ViewStyle>`                           |                       | Additional style for the radio button container.                                                |
| `textStyle` | `StyleProp<TextStyle>`                           |                       | Additional style for the text.                                                                  |

### Example

```tsx
let [radioButtonValue, setRadioButtonValue] = useState(false);
let [radioButtonValue2, setRadioButtonValue2] = useState('');

<Provider>
  <RadioButton
    checked={radioButtonValue}
    label="Hello"
    value="hello"
    onPress={(isChecked) => {
      setRadioButtonValue(isChecked);
    }}
  />
  <RadioButton
    checked={radioButtonValue2 === 'howdy'}
    label="Howdy"
    value="howdy"
    onPress={(isChecked, newValue) => {
      setRadioButtonValue(newValue);
    }}
  />
</Provider>;
```
