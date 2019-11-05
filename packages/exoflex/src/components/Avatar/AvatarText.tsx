import React, { ComponentProps } from 'react';
import { View, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { Avatar as PaperAvatar } from 'react-native-paper';
import Text from '../Text';

import useTheme from '../../helpers/useTheme';

const DEFAULT_SIZE = 64;

type PaperAvatarTextProps = ComponentProps<typeof PaperAvatar.Text>;
type AvatarTextProps = Omit<PaperAvatarTextProps, 'theme'> & {
  labelStyle?: StyleProp<TextStyle>;
};

/**
 * Avatars can be used to represent people in a graphical way.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/avatar-text.png" />
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Avatar } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Avatar.Text size={24} label="XD" />
 * );
 * ```
 */
export default function AvatarText(props: AvatarTextProps) {
  let { label, size = DEFAULT_SIZE, style, labelStyle } = props;

  let { colors } = useTheme();

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
        restStyle,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize: size / 2,
            lineHeight: size,
          },
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
