# Toast

Toast is an alert like component that shows from the bottom of the screen.

### Preview

![toast_preview](../assets/toast_preview.png)

### Props

| Name        |                     Type                      |                                          Default                                           | Description                                     |
| ----------- | :-------------------------------------------: | :----------------------------------------------------------------------------------------: | ----------------------------------------------- |
| `children`  |                   `string`                    |                                                                                            | Text to display in the toast.                   |
| `mode`      | `'info' \| 'warning' \| 'error' \| 'success'` |                                          `'info'`                                          | Determine the color and icon to display.        |
| `colors`    |            `Record<mode, string>`             | `{ info: Themes.colors.accent, warning: '#ffce00', error: '#dc544b', success: '#27a163' }` | Configure the color to use for each mode.       |
| `visible *` |                   `boolean`                   |                                                                                            | Will only display the toast when set to `true`. |
| `style`     |            `StyleProp<ViewStyle>`             |                                                                                            | Additional props passed to the toast container. |
| `textStyle` |            `StyleProp<TextStyle>`             |                                                                                            | Additional props passed to the text.            |

### Example

```tsx
<Provider>
  <Toast visible={true} mode="info">
    Yuhu
  </Toast>
</Provider>
```
