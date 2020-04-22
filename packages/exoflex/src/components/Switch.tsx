import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  Animated,
  StyleProp,
  ViewStyle,
  AccessibilityProps,
} from 'react-native';

import useTheme from '../helpers/useTheme';
import { IS_MOBILE } from '../constants/platforms';

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
    accessibilityHint,
    accessibilityLabel,
    accessibilityRole,
    ...otherProps
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

  // NOTE: Use `button` for web as RNW doesn't support it yet
  // https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/modules/AccessibilityUtil/propsToAriaRole.js
  let defaultAccessibilityRole = (IS_MOBILE ? 'switch' : 'button') as
    | 'switch'
    | 'button';

  useEffect(() => {
    Animated.timing(xValue, {
      toValue: value ? 1 : 0,
      duration: 300,
    }).start();
  }, [value, xValue]);

  return (
    <TouchableOpacity
      {...otherProps}
      accessibilityLabel={accessibilityLabel || 'Switch'}
      accessibilityRole={accessibilityRole || defaultAccessibilityRole}
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
