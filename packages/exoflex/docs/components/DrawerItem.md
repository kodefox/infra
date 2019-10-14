# Drawer.Item

A component used to show an action item with an icon and a label in a navigation drawer.

### Props

| Name         |          Type          | Default | Description                                                          |
| ------------ | :--------------------: | :-----: | -------------------------------------------------------------------- |
| `label*`     |        `string`        |         | The label text of the item.                                          |
| `onPress*`   |      `() => void`      |         | Function to execute on press.                                        |
| `active`     |       `boolean`        | `false` | Whether to highlight the drawer item as active.                      |
| `icon`       |        `string`        |         | Icon to display for the DrawerItem. Only MaterialIcons is available. |
| `style`      | `StyleProp<ViewStyle>` |         | Style of the container.                                              |
| `labelStyle` | `StyleProp<TextStyle>` |         | Style of the label text.                                             |

### Example

```tsx
<Drawer.Section
  headerMode="full"
  headerSource={{ uri: 'https://picsum.photos/300' }}
>
  <Drawer.Item
    label="First Item"
    icon="home"
    active={true}
    onPress={() => {}}
  />
  <Drawer.Item
    label="Second Item"
    icon="settings"
    active={false}
    onPress={() => {}}
  />
</Drawer.Section>
```
