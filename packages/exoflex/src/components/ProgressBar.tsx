import React from 'react';
import { StyleSheet, View, Animated, ViewStyle } from 'react-native';
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

  let height = (style && style.height) || 8;
  let borderRadius = (style && style.borderRadius) || roundness;

  if (!visible) {
    return <View style={{ height }} />;
  }

  return (
    <View
      style={[
        styles.container,
        {
          height,
          borderRadius,
          borderColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.bar,
          {
            borderRadius,
            backgroundColor: color || colors.primary,
            width: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', `${progress * 100}%`],
            }),
          },
        ]}
      />
    </View>
  );
}

ProgressBar.defaultProps = {
  visible: true,
};

const styles = StyleSheet.create({
  bar: {
    flex: 1,
  },
  container: {
    overflow: 'hidden',
    width: '100%',
    height: 8,
    borderWidth: 1,
  },
});
