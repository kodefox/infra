# Text

Text with preconfigured font family when used inside the Provider.

For using custom font families, please refer to [theming docs](../Theming.md).

### Props

| Name                                                                      |                                      Type                                       |   Default   | Description                                                 |
| ------------------------------------------------------------------------- | :-----------------------------------------------------------------------------: | :---------: | ----------------------------------------------------------- |
| `children`                                                                |                                    `string`                                     |             | String to display.                                          |
| `preset`                                                                  |                                    `string`                                     | `'default'` | A preset of font to use when determining the font style.    |
| `weight`                                                                  | `'300' \| '400' \| '500' \| '700' \| 'light' \| 'normal' \| 'medium' \| 'bold'` |   `'400'`   | Set the font weight of the text.                            |
| `fontStyle`                                                               |                             `'normal' \| 'italic'`                              | `'normal'`  | Set the font style of the text.                             |
| [TextProps](https://facebook.github.io/react-native/docs/text.html#props) |                                                                                 |             | Additional text props will be spread to the Text component. |

Notes:

- To override the font family used for `fontStyle.italic`, specify a font preset called `italic` in `Provider.theme.fonts`.

### Example

```tsx
<Provider>
  <Text>Hello, I'm Rubik</Text>

  // Equivalent to:
  // <Text style={{ fontWeight: '500' }}>
  //   My weight is 500.
  // </Text>
  <Text weight="500">
    My weight is 500.
  </Text>

  <Text weight="700" fontStyle="italic">
    I'm bold and italic.
  </Text>

  <Text preset="code" weight="300">
    Look ma, monospaced font!
  </Text>
</Provider>
```
