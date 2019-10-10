# Provider

Provider wraps the root component to provides theming capability to exoflex's components.

Exoflex will use "Rubik" font family when `useSystemFonts` is set to false.
You can override this by providing the font family name to use in the `theme.fonts` prop.

Provider also render `<ToastContainer />` to display a `<Toast />` using `Toast.showToast`. See Toast [docs](Toast.md) for usage details.


### Props

| Name                 |               Type                |                              Default                              | Description                                                                                                                   |
| -------------------- | :-------------------------------: | :---------------------------------------------------------------: | ----------------------------------------------------------------------------------------------------------------------------- |
| `children *`         |            `ReactNode`            |                            `undefined`                            | The root component                                                                                                            |
| `theme`              |         `Partial<Theme>`          |                                                                   | Theme used to style exoflex's components. Will be merged recursively with the [default theme](../../src/constants/themes.ts). |
| `fonts`              |   `Record<string, FontSource>`    |                                                                   | A record of custom fonts to load. Will be loaded together with the built in exoflex fonts.                                    |
| `useSystemFonts`     |             `boolean`             |                              `true`                               | To use only fonts available in the current platform, set to true. Implies `skipFontsLoading` is true.                         |
| `skipFontsLoading`   |             `boolean`             |                              `false`                              | To disable the automatic fonts loading, set to true.                                                                          |
| `LoadingPlaceholder` | `ComponentType<{ theme: Theme }>` | [LoadingPlaceholder](../../src/components/LoadingPlaceholder.tsx) | Component rendered during loading the custom fonts.                                                                           |

Prop marked with `*` is required.

### Example

```tsx
<Provider theme={{
    roundness: 7,
    colors: {
      primary: '#fd8224'
    },
  }}
>
  <App />
</Provider>
```
