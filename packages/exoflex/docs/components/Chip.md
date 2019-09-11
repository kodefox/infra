# Chip

### Preview

<img width="153" alt="chip-preview" src="https://user-images.githubusercontent.com/19742419/64677215-5a38b600-d4a1-11e9-9853-a71f2a8fc113.png">

### Props

| Name                                                                                         |           Type           |   Default   | Description                                                 |
| -------------------------------------------------------------------------------------------- | :----------------------: | :---------: | ----------------------------------------------------------- |
| `children`                                                                                   |         `string`         | `undefined` | String to display inside the chip.                          |
| `mode`                                                                                       | `'active' \| 'inactive'` | `'active'`  | Determine how the chip is displayed.                        |
| `textStyle`                                                                                  |       `TextStyle`        | `undefined` | Additional style passed to the text inside the chip.        |
| [TouchableOpacityProps](https://facebook.github.io/react-native/docs/touchableopacity#props) |                          |             | Additional text props will be spread to the Text component. |

### Example

```tsx
<Provider>
  <Chip>
    Subarashi
  </Chip>

  <Chip mode="inactive">
    Codo
  </Chip>
</Provider>
```

