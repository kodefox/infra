import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  ViewStyle,
  LayoutChangeEvent,
  Platform,
} from 'react-native';
import { ProgressBarProps } from 'react-native-paper';
import useTheme from '../helpers/useTheme';

type Props = Omit<ProgressBarProps, 'animating' | 'theme'> & {
  visible?: boolean;
};

const INDETERMINATE_MAX_WIDTH = 0.6;

export default function ProgressBar(props: Props) {
  let { progress, color, visible, style, indeterminate } = props;
  let [animatedValue] = useState(new Animated.Value(0));
  let [width, setWidth] = useState(0);
  let { colors, roundness } = useTheme();

  useEffect(() => {
    // start animation
    if (indeterminate) {
      animatedValue.setValue(0);

      let indeterminateAnimation = Animated.timing(animatedValue, {
        duration: 1000,
        toValue: 1,
        useNativeDriver: Platform.OS !== 'web',
        isInteraction: false,
      });
      Animated.loop(indeterminateAnimation).start();
    } else {
      Animated.timing(animatedValue, {
        duration: 500,
        toValue: progress ? progress : 0,
        useNativeDriver: true,
        isInteraction: false,
      }).start();
    }
  }, [progress, animatedValue, indeterminate]);

  let flattenedStyle = StyleSheet.flatten<ViewStyle>(style) || {};
  let height = flattenedStyle.height || 8;
  let borderRadius = flattenedStyle.borderRadius || roundness;

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
      onLayout={(e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)}
    >
      <Animated.View
        style={[
          styles.bar,
          {
            borderRadius,
            backgroundColor: color || colors.primary,
            width,
            transform: [
              {
                translateX: animatedValue.interpolate(
                  indeterminate
                    ? {
                        inputRange: [0, 0.5, 1],
                        outputRange: [
                          -0.5 * width,
                          -0.5 * INDETERMINATE_MAX_WIDTH * width,
                          0.7 * width,
                        ],
                      }
                    : {
                        inputRange: [0, 1],
                        outputRange: [-0.5 * width, 0],
                      },
                ),
              },
              {
                /**
                 * From RNP code: Workaround for https://github.com/facebook/react-native/issues/6278
                 *
                 * I tried putting 0 instead 0.0001, it works on ios, android, and web. But perhaps this workaround will help on other case, I leave it as it is.
                 */
                scaleX: animatedValue.interpolate(
                  indeterminate
                    ? {
                        inputRange: [0, 0.5, 1],
                        outputRange: [0.0001, INDETERMINATE_MAX_WIDTH, 0.0001],
                      }
                    : {
                        inputRange: [0, 1],
                        outputRange: [0.0001, 1],
                      },
                ),
              },
            ],
          },
        ]}
      />
    </View>
  );
}

ProgressBar.defaultProps = {
  visible: true,
  progress: 0,
  indeterminate: false,
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
