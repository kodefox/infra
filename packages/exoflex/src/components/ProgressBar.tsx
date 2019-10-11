import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { ProgressBarProps } from 'react-native-paper';
import { useAnimation } from 'react-native-animation-hooks';
import useTheme from '../helpers/useTheme';

// TODO: allow `indeterminate` prop after upgrading to RNP 3
type Props = Omit<ProgressBarProps, 'indeterminate' | 'animating' | 'theme'> & {
  visible?: boolean;
};

export default function ProgressBar(props: Props) {
  let { progress, color, visible, style } = props;
  let { colors, roundness } = useTheme();

  let animatedValue = useAnimation({
    type: 'timing',
    initialValue: 0,
    toValue: 1,
    duration: 500,
  });

  return visible ? (
    <View
      style={[
        styles.container,
        {
          borderColor: colors.border,
          backgroundColor: colors.surface,
          borderRadius: roundness,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.bar,
          {
            height: (style && style.height) || 8,
            borderRadius: roundness,
            backgroundColor: color || colors.primary,
            width: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', progress * 100 + '%'],
            }),
          },
        ]}
      />
    </View>
  ) : null;
}

ProgressBar.defaultProps = {
  visible: true,
};

const styles = StyleSheet.create({
  bar: {
    justifyContent: 'center',
    position: 'absolute',
  },
  container: {
    height: 8,
    justifyContent: 'center',
    width: '100%',
    borderWidth: 1,
  },
});
