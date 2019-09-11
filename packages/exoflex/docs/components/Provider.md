# Provider

Provider wraps the root component to provides theming capability to exoflex's components.

Provider also render `<ToastContainer />` to display a `<Toast />` using `Toast.showToast`. See Toast [docs](Toast.md) for usage details.


| Prop         |    Type     |                    Default                    | Description                                 |
| ------------ | :---------: | :-------------------------------------------: | ------------------------------------------- |
| `children *` | `ReactNode` |                  `undefined`                  | The root component                          |
| `theme`      |   `Theme`   | [DefaultTheme](../../src/constants/themes.ts) | A theme used to style exoflex's components. |


### Example

```tsx
<Provider theme={{
    ...DefaultTheme,
    roundness: 7,
    colors: {
      ...DefaultTheme.colors,
      primary: '#fd8224'
    },
  }}
>
  <App />
</Provider>
```
