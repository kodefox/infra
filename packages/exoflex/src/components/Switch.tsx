import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  Animated,
  StyleProp,
  ViewStyle,
  AccessibilityProps,
  StyleSheet,
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

export function getTrueWidth(
  type: 'track' | 'thumb',
  defaultWidth: number,
  style?: StyleProp<ViewStyle>,
): number {
  let flattenedStyle = StyleSheet.flatten(style);
  let width = flattenedStyle?.width;
  let minWidth = flattenedStyle?.minWidth;
  let maxWidth = flattenedStyle?.maxWidth;
  let trueWidth = !!width
    ? +width
    : type === 'track'
    ? defaultWidth
    : defaultWidth / 2;
  if (!!minWidth) {
    trueWidth = +minWidth > trueWidth ? +minWidth : trueWidth;
  }
  if (!!maxWidth) {
    trueWidth = +maxWidth < trueWidth ? +maxWidth : trueWidth;
  }
  return trueWidth;
}

export default function Switch(props: SwitchProps) {
  let {
    value,
    width: widthProps,
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

  let width = getTrueWidth('track', widthProps, [
    themeStyle?.switch?.trackStyle,
    trackStyle,
  ]);

  let thumbSize =
    getTrueWidth('thumb', width, [themeStyle?.switch?.thumbStyle, thumbStyle]) -
    2 * MARGIN;

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
    thumb: [
      {
        margin: MARGIN,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
        borderRadius: thumbSize / 2,
      },
      themeStyle?.switch?.thumbStyle,
      thumbStyle,
      {
        width: thumbSize,
        height: thumbSize,
      },
    ],
  };

  let translateXValue = xValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width - (thumbSize + 2 * MARGIN)],
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
