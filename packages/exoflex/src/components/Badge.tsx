import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Badge as PaperBadge } from 'react-native-paper';
import { useAnimation } from 'react-native-animation-hooks';
import Text from './Text';
import color from 'color';
import useTheme from '../helpers/useTheme';

type BadgeProps = Omit<OmitPaperTheme<typeof PaperBadge>, 'visible'> & {
  visible?: boolean;
};

export default function Badge(props: BadgeProps) {
  let { visible = true, children, size = 20, style } = props;
  let { colors } = useTheme();
  let { backgroundColor = colors.notification, ...restStyle } =
    StyleSheet.flatten(style) || {};
  let textColor = color(backgroundColor).isLight()
    ? colors.text
    : colors.surface;
  let borderRadius = size / 2;

  let animatedValue = useAnimation({
    type: 'timing',
    initialValue: visible ? 0 : 1,
    toValue: visible ? 1 : 0,
    duration: 150,
  });

  return (
    // using Animated.View here so the Text component still inherit exoflex's Text style
    <Animated.View style={[{ opacity: animatedValue }]}>
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
