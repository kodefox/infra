# Theming

## Customizing The Theme

To customize the theme used by exoflex, simply pass a custom theme to the provider:

```tsx
import { Provider } from 'exoflex';

let customTheme = {
  // You don't have to spread the default theme here.
  colors: {
    primary: 'salmon'
  },
}

// The custom theme passed to `theme` prop will be automatically merged with the default theme.
<Provider theme={customTheme}>
  <View>
    <Text>Foo</Text>
  </View>
</Provider>
```
