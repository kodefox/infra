# Avatar.Text

Avatars can be used to represent people in a graphical way.

### Preview

![avatar_text_preview](../assets/avatar_text_preview.png)

### Props

| Name         |          Type          | Default | Description                                                                    |
| ------------ | :--------------------: | :-----: | ------------------------------------------------------------------------------ |
| `label *`    |        `string`        |         | Initials to show as the text in the Avatar.                                    |
| `size`       |        `number`        |  `64`   | Size of the avatar.                                                            |
| `textPreset` |        `string`        |         | Name of font preset that will be used on `Text` component inside the `Avatar`. |
| `style`      | `StyleProp<ViewStye>`  |         | Style for the container.                                                       |
| `labelStyle` | `StyleProp<TextStyle>` |         | Style for the text in the Avatar.                                              |

Props marked with \* are required.

### Example

```tsx
<Provider>
  <Avatar.Text source={avatarImage} />
  <Avatar.Text source={avatarImage} size={56} />
</Provider>
```
