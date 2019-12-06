# Avatar.Icon

Avatars can be used to represent people in a graphical way.

### Preview

![avatar_icon_preview](../assets/avatar_icon_preview.png)

### Props

| Name     |         Type          | Default | Description                                                                                                                                                                                                                                             |
| -------- | :-------------------: | :-----: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `icon *` |     `IconSource`      |         | Icon to display for the Avatar. Can only use `MaterialIcons` icons from the list. [See icon list](https://oblador.github.io/react-native-vector-icons/). But `IconSource` also includes `ImageSourcePropType`, so you can use image as the icon source. |
| `size`   |       `number`        |  `64`   | Size of the avatar.                                                                                                                                                                                                                                     |
| `color`  |       `string`        |         | Custom color for the icon.                                                                                                                                                                                                                              |
| `style`  | `StyleProp<ViewStye>` |         | Style for the container.                                                                                                                                                                                                                                |

Props marked with \* are required.

### Example

```tsx
<Provider>
  <Avatar.Icon icon="home" />
  <Avatar.Icon icon="home" size={56} />
</Provider>
```
