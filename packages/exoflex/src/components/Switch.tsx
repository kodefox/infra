import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  Animated,
  StyleProp,
  ViewStyle,
  AccessibilityProps,
} from 'react-native';

import useTheme from '../helpers/useTheme';

export type SwitchProps = AccessibilityProps & {
  value: boolean;
  onValueChange: (value?: boolean) => void;
  disabled: boolean;
  width: number;
  trackStyle?: StyleProp<ViewStyle>;
  thumbStyle?: StyleProp<ViewStyle>;
  testID?: string;
};

const MARGIN = 2;

export default function Switch(props: SwitchProps) {
  let {
    value,
    width,
    onValueChange,
    disabled,
    trackStyle,
    thumbStyle,
    testID,
    accessibilityRole,
    accessibilityState,
    ...otherAccessibilityProps
  } = props;
  let { colors, style: themeStyle } = useTheme();
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
      {...otherAccessibilityProps}
      accessibilityRole={accessibilityRole || 'switch'}
      accessibilityState={{ disabled, checked: !!value, ...accessibilityState }}
      style={
        [styles.track, themeStyle?.switch?.trackStyle, trackStyle] as StyleProp<
          ViewStyle
        >
      }
      activeOpacity={0.9}
      onPress={() => onValueChange(!value)}
      disabled={disabled}
      testID={testID}
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
          themeStyle?.switch?.thumbStyle,
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
