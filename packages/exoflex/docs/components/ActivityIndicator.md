# ActivityIndicator

Activity indicator is used to present progress of some activity in the app.

### Preview

![activity_indicator_preview](../assets/activity_indicator_preview.gif)

### Props

| Name               |              Type              |  Default  | Description                                                          |
| ------------------ | :----------------------------: | :-------: | -------------------------------------------------------------------- |
| `animating`        |           `boolean`            |  `true`   | Whether to show the indicator or hide it.                            |
| `color`            |            `string`            |           | The color of the spinner. Will use the primary color from the theme. |
| `size`             | `'small' \| 'large' \| number` | `'small'` | Size of the indicator.                                               |
| `hidesWhenStopped` |           `boolean`            |  `true`   | Whether the indicator should hide when not animating.                |
| `style`            |     `StyleProp<ViewStyle>`     |           | Additional style for the container.                                  |

### Example

```tsx
<Provider>
  <ActivityIndicator />

  <ActivityIndicator size="large" color="salmon" />
</Provider>
```
