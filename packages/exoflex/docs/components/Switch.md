# Switch

A selection control component which values are either on/off (true/false).

| Prop            | Type     | Default Value | Description                                                   |
| --------------- | -------- | ------------- | ------------------------------------------------------------- |
| `value`         | Optional | `true`        | Indicator whether the switch is on (`true`) or off (`false`). |
| `onValueChange` | Optional | `() => {}`    | Callback that is called when the switch is pressed.           |
| `disabled`      | Optional | `false`       | If false, switch cannot be pressed.                           |
| `width`         | Optional | `48`          | Width of the switch.                                          |
| `thumbStyle`    | Optional |               | Additional view style for the switch thumb.                   |
| `trackStyle`    | Optional |               | Additional view style for the switch track.                   |

### Preview

![switch_preview](../assets/switch_preview.png)

### Example

```tsx
let [switchValue, setSwitchValue] = useState(false);
<Switch
    value={switchValue}
    onValueChange={(newValue) => {setSwitchValue(newValue)}}
/>
<Switch
    value={switchValue}
    onValueChange={(newValue) => {setSwitchValue(newValue)}}
    width={40}
    disabled={true}
/>
```
