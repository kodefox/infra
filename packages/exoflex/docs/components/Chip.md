# Chip

### Preview

![chip_preview](../assets/chip_preview.png)

### Props

| Name                                                                                         |           Type           |  Default   | Description                                                 |
| -------------------------------------------------------------------------------------------- | :----------------------: | :--------: | ----------------------------------------------------------- |
| `children`                                                                                   |         `string`         |            | String to display inside the chip.                          |
| `mode`                                                                                       | `'active' \| 'inactive'` | `'active'` | Determine how the chip is displayed.                        |
| `textStyle`                                                                                  |  `StyleProp<TextStyle>`  |            | Additional style passed to the text inside the chip.        |
| [TouchableOpacityProps](https://facebook.github.io/react-native/docs/touchableopacity#props) |                          |            | Additional touchable props will be spread to the Chip component. |

### Example

```tsx
<Provider>
  <Chip>Subarashi</Chip>

  <Chip mode="inactive">Codo</Chip>
</Provider>
```
