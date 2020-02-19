import React, { ComponentProps } from 'react';
import { View, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { Avatar as PaperAvatar } from 'react-native-paper';
import Text from '../Text';

import useTheme from '../../helpers/useTheme';

const DEFAULT_SIZE = 64;

type PaperAvatarTextProps = ComponentProps<typeof PaperAvatar.Text>;
export type AvatarTextProps = Readonly<
  Omit<PaperAvatarTextProps, 'theme' | 'color'> & {
    labelStyle?: StyleProp<TextStyle>;
    textPreset?: string;
  }
>;

export default function AvatarText(props: AvatarTextProps) {
  let { label, size = DEFAULT_SIZE, style, labelStyle, textPreset } = props;

  let { colors, style: themeStyle } = useTheme();

  const { backgroundColor = colors.primary, ...restStyle } =
    StyleSheet.flatten(style) || {};

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
        styles.container,
        themeStyle?.avatarText?.style,
        restStyle,
      ]}
    >
      <Text
        preset={textPreset}
        style={[
          styles.text,
          {
            fontSize: size / 2,
            lineHeight: size,
          },
          themeStyle?.avatarText?.labelStyle,
          labelStyle,
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
