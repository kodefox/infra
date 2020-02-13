import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';

import useTheme from '../../helpers/useTheme';

import { IS_WEB } from '../../constants/platforms';

type TabIndicatorProps = {
  activeIndex: number;
  maxIndex: number;
  width: number;
};

export default function TabIndicator(props: TabIndicatorProps) {
  let { width, activeIndex, maxIndex } = props;
  let { colors } = useTheme();

  let [animatedValue] = useState(new Animated.Value(0));
  let [skipFirstRender, setSkipFirstRender] = useState(true);

  useEffect(() => {
    if (skipFirstRender) {
      setSkipFirstRender(false);
      return;
    }
    let animation = Animated.timing(animatedValue, {
      duration: 150,
      toValue: activeIndex,
      easing: Easing.elastic(1),
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
    backgroundColor: colors.text,
    ...movement,
  } as ViewStyle;
  let rootStyle = [styles.indicator, indicatorStyle] as ViewStyle;

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
