import { Platform, Animated } from 'react-native';
import { useState, useEffect } from 'react';

function useFadingAnimation(
  targetVisibility: boolean,
  { toValue, delay, duration, easing }: Partial<Animated.TimingAnimationConfig>,
) {
  let [mounted, setMounted] = useState(false);
  let [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (targetVisibility === mounted) {
      return;
    }

    let canceled = false;
    let animation = Animated.timing(animatedValue, {
      toValue: toValue ?? targetVisibility ? 1 : 0,
      delay,
      duration,
      easing,
      // Native driver is not available on web.
      useNativeDriver: Platform.OS !== 'web',
    });

    animation.start(() => {
      if (canceled) {
        return;
      }
      setMounted((m) => !m);
    });

    return () => {
      canceled = true;
      animation.stop();
    };
  }, [
    mounted,
    targetVisibility,
    animatedValue,
    toValue,
    delay,
    duration,
    easing,
  ]);

  return [targetVisibility || mounted, animatedValue] as const;
}

export default useFadingAnimation;
