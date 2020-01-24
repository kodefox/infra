# Menu.Item

A component to show a single list item inside a Menu.

### Props

| Name         |          Type          | Default | Description                                                                                                               |
| ------------ | :--------------------: | :-----: | ------------------------------------------------------------------------------------------------------------------------- |
| `title *`    |      `ReactNode`       |         | Title text for the MenuItem.                                                                                              |
| `icon`       |      `IconSource`      |         | Icon to display for the MenuItem.                                                                                         |
| `disabled`   |       `boolean`        |         | Whether the 'item' is disabled. A disabled 'item' is greyed out and onPress is not called on touch.                       |
| `textPreset` |        `string`        |         | Name of font preset that will be used on `Text` component inside the `Menu.Item`. This prop won't work with custom title. |
| `onPress`    |      `() => void`      |         | Function to execute on press.                                                                                             |
| `style`      | `StyleProp<ViewStyle>` |         | Style of the component.                                                                                                   |

### Example

```tsx
const MyComponent = () => {
  return <Menu.Item onPress={() => {}} title="Item 1" />;
};
```
