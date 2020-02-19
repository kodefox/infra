import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import color from 'color';

import useTheme from '../../helpers/useTheme';

import { IS_WEB } from '../../constants/platforms';

type TabIndicatorProps = {
  activeIndex: number;
  maxIndex: number;
  width: number;
  style?: StyleProp<ViewStyle>;
};

export default function TabIndicator(props: TabIndicatorProps) {
  let { width, activeIndex, maxIndex, style } = props;
  let { colors } = useTheme();

  let [animatedValue] = useState(new Animated.Value(0));
  let [skipFirstRender, setSkipFirstRender] = useState(true);

  useEffect(() => {
    if (skipFirstRender) {
      setSkipFirstRender(false);
      return;
    }
    let animation = Animated.timing(animatedValue, {
      duration: 200,
      toValue: activeIndex,
      easing: Easing.linear,
    });
    animation.start();
  }, [activeIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  let { inputRange, outputRange } = useMemo(() => {
    let inputRange = [];
    let outputRange = [];
    for (let i = 0; i < maxIndex; i++) {
      inputRange.push(i);
      outputRange.push(i * width);
    }
    return { inputRange, outputRange };
  }, [maxIndex, width]);

  let movement = IS_WEB
    ? ({ left: width * activeIndex } as ViewStyle)
    : {
        transform: [
          {
            translateX: animatedValue.interpolate({
              inputRange,
              outputRange,
            }),
          },
        ],
      };
  let indicatorStyle = {
    width,
    backgroundColor: color(colors.primary).isLight()
      ? colors.text
      : colors.surface,
    ...movement,
  } as ViewStyle;
  let rootStyle = [styles.indicator, indicatorStyle, style] as ViewStyle;

  return <Animated.View style={rootStyle} />;
}

const styles = StyleSheet.create({
  indicator: {
    height: 2,
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
});
