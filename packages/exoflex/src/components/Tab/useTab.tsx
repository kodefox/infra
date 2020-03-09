import { useState, useEffect, useCallback, useMemo } from 'react';
import Animated, { Easing } from 'react-native-reanimated';
import {
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler';

const { eq, neq, lessThan, greaterThan, cond, timing } = Animated;

type useTabParams = {
  x: Animated.Value<number>;
  width: number;
  activeIndex: number;
  totalScene: number;
  onIndexChange: (index: number) => void;
};

export function useTab(params: useTabParams) {
  let { x, width, activeIndex, totalScene, onIndexChange } = params;

  let [translationX] = useState(new Animated.Value<number>(0));
  let [velocityX] = useState(new Animated.Value<number>(0));

  let translateX = useMemo(() => {
    return cond(
      neq(x, 0),
      cond(
        eq(x, width * (totalScene - 1) * -1),
        // disable translation to left when on the last scene and `translationX` < 0 (swiped left)
        cond(lessThan(translationX, 0), 0, translationX),
        translationX,
      ),
      // disable translation to right when `left` is 0 and `translationX` > 0 (swiped right)
      cond(greaterThan(translationX, 0), 0, translationX),
    );
  }, [activeIndex, totalScene, width]); // eslint-disable-line react-hooks/exhaustive-deps

  let transformStyle = useMemo(
    () => ({
      width: width * totalScene,
      left: x,
      transform: [{ translateX }],
    }),
    [width, activeIndex, totalScene, translateX], // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    timing(translationX, {
      duration: 150,
      toValue: 0,
      easing: Easing.linear,
    }).start();
    timing(x, {
      duration: 150,
      toValue: width * activeIndex * -1,
      easing: Easing.linear,
    }).start();
  }, [activeIndex, width]); // eslint-disable-line react-hooks/exhaustive-deps

  let onPanGestureEvent = useCallback(
    Animated.event([{ nativeEvent: { translationX, velocityX } }], {
      useNativeDriver: true,
    }),
    [],
  );

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

  return {
    translationX,
    velocityX,
    transformStyle,
    onPanGestureEvent,
    onHandlerStateChange,
  };
}
