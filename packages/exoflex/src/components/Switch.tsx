import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Animated, StyleProp, ViewStyle } from 'react-native';

import useTheme from '../helpers/useTheme';

type Props = {
  value: boolean;
  onValueChange: (value?: boolean) => void;
  disabled: boolean;
  width: number;
  trackStyle?: StyleProp<ViewStyle>;
  thumbStyle?: StyleProp<ViewStyle>;
};

const MARGIN = 2;

export default function Switch(props: Props) {
  let { value, width, onValueChange, disabled, trackStyle, thumbStyle } = props;
  let { colors } = useTheme();
  let [xValue] = useState(new Animated.Value(value ? 1 : 0));

  let thumbSize = width / 2 - 2 * MARGIN;

  let styles = {
    track: {
      justifyContent: 'center',
      width: width,
      height: width / 2,
      borderRadius: width / 4,
      backgroundColor: disabled
        ? colors.disabled
        : value
        ? colors.primary
        : colors.border,
    },
    thumb: {
      margin: MARGIN,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      backgroundColor: colors.background,
      width: thumbSize,
      height: thumbSize,
      borderRadius: thumbSize / 2,
    },
  };

  let translateXValue = xValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width / 2],
  });

  useEffect(() => {
    Animated.timing(xValue, {
      toValue: value ? 1 : 0,
      duration: 300,
    }).start();
  }, [value, xValue]);

  return (
    <TouchableOpacity
      style={[styles.track, trackStyle] as StyleProp<ViewStyle>}
      activeOpacity={0.9}
      onPress={() => onValueChange(!value)}
      disabled={disabled}
    >
      <Animated.View
        style={[
          styles.thumb,
          {
            transform: [
              {
                translateX: translateXValue,
              },
            ],
          },
          thumbStyle,
        ]}
      />
    </TouchableOpacity>
  );
}

Switch.defaultProps = {
  onValueChange: () => {},
  value: true,
  width: 48,
  disabled: false,
};
