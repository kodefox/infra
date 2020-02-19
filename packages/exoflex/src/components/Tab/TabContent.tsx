import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import {
  PanGestureHandler,
  State,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

import { TabScenes } from './types';

const { eq, neq, lessThan, greaterThan, cond, timing } = Animated;

type TabContentProps = {
  lazyLoad: boolean;
  enableSwipe: boolean;
  activeIndex: number;
  scenes: TabScenes;
  onIndexChange: (index: number) => void;
};

export default function TabContent(props: TabContentProps) {
  let {
    scenes,
    // lazyLoad = false,
    // enableSwipe = true,
    activeIndex,
    onIndexChange,
  } = props;

  let [translationX] = useState(new Animated.Value<number>(0));
  let [velocityX] = useState(new Animated.Value<number>(0));
  let [width, setWidth] = useState(0);
  let [left] = useState(new Animated.Value<number>(0));

  let totalScene = scenes.length;
  let onPanGestureEvent = Animated.event(
    [{ nativeEvent: { translationX, velocityX } }],
    { useNativeDriver: true },
  );

  useEffect(() => {
    timing(translationX, {
      duration: 150,
      toValue: 0,
      easing: Easing.linear,
    }).start();
    timing(left, {
      duration: 150,
      toValue: width * activeIndex * -1,
      easing: Easing.linear,
    }).start();
  }, [activeIndex, width]); // eslint-disable-line react-hooks/exhaustive-deps

  let slideBack = () => {
    timing(translationX, {
      duration: 150,
      toValue: 0,
      easing: Easing.linear,
    }).start();
  };

  let onHandlerStateChange = (e: PanGestureHandlerGestureEvent) => {
    let { state, translationX, velocityX } = e.nativeEvent;
    if (state === State.END) {
      let halfWidth = width / 2;
      if (Math.abs(velocityX) > 500 || Math.abs(translationX) >= halfWidth) {
        let direction = translationX < 0 ? 'SWIPE_RIGHT' : 'SWIPE_LEFT';
        let newIndex =
          direction === 'SWIPE_RIGHT' ? activeIndex + 1 : activeIndex - 1;
        newIndex >= 0 && newIndex < totalScene && onIndexChange(newIndex);
        return;
      }
      slideBack();
      return;
    }
  };

  return (
    <View
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      style={styles.root}
    >
      <PanGestureHandler
        minDist={50}
        onGestureEvent={onPanGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View
          style={
            [
              styles.container,
              {
                width: width * totalScene,
                left,
                transform: [
                  {
                    translateX: cond(
                      neq(left, 0),
                      cond(
                        eq(left, width * (totalScene - 1) * -1),
                        // disable translation to left when on the last scene and `translationX` < 0 (swiped left)
                        cond(lessThan(translationX, 0), 0, translationX),
                        translationX,
                      ),
                      // disable translation to right when `left` is 0 and `translationX` > 0 (swiped right)
                      cond(greaterThan(translationX, 0), 0, translationX),
                    ),
                  },
                ],
              },
            ] as ViewStyle
          }
        >
          {scenes.map(({ scene, title }) => (
            <View style={{ flex: 1 }} key={title}>
              {React.createElement(scene, { jumpTo: onIndexChange })}
            </View>
          ))}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'hidden',
  },
  container: {
    flexDirection: 'row',
    height: '100%',
  },
});
