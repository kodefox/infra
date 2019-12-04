import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Badge as PaperBadge } from 'react-native-paper';
import color from 'color';
import Text from './Text';
import useTheme from '../helpers/useTheme';
import useFadingAnimation from '../helpers/useFadingAnimation';

type BadgeProps = Omit<OmitPaperTheme<typeof PaperBadge>, 'visible'> & {
  visible?: boolean;
  textPreset?: string;
};

export default function Badge(props: BadgeProps) {
  let { visible = true, children, size = 20, textPreset, style } = props;
  let [animatedVisibility, animatedValue] = useFadingAnimation(visible, {
    duration: 150,
  });
  let { colors } = useTheme();
  let { backgroundColor = colors.notification, ...restStyle } =
    StyleSheet.flatten(style) || {};
  let textColor = color(backgroundColor).isLight()
    ? colors.text
    : colors.surface;
  let borderRadius = size / 2;

  if (!animatedVisibility) {
    return null;
  }

  return (
    // using Animated.View here so the Text component still inherit exoflex's Text style
    <Animated.View style={{ opacity: animatedValue }}>
      <Text
        numberOfLines={1}
        style={[
          styles.container,
          {
            borderRadius,
            backgroundColor,
            color: textColor,
            fontSize: size * 0.5,
            lineHeight: size,
            height: size,
            minWidth: size,
            ...restStyle,
          },
        ]}
        preset={textPreset}
      >
        {children}
      </Text>
    </Animated.View>
  );
}

let styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: 4,
    overflow: 'hidden',
  },
});
