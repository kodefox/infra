import React, { useRef, useEffect } from 'react';
import {
  ScrollView,
  ViewStyle,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

import { useTabSwipe } from './useTabSwipe';
import { TabScenes } from './types';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

type TabContentProps = {
  activeIndex: number;
  scenes: TabScenes;
  onIndexChange: (index: number) => void;
};

export default function TabContent(props: TabContentProps) {
  let { activeIndex, scenes, onIndexChange } = props;
  let { changeScrollPercentage } = useTabSwipe();

  let scrollView = useRef<ScrollView>(null);

  useEffect(() => {
    scrollView.current?.scrollTo({
      x: activeIndex * WINDOW_WIDTH,
      animated: false,
    });
  }, [activeIndex]);

  let onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    let { x } = e.nativeEvent.contentOffset;
    changeScrollPercentage(x / WINDOW_WIDTH);
  };

  return (
    <ScrollView
      ref={scrollView}
      horizontal
      pagingEnabled
      nestedScrollEnabled
      removeClippedSubviews={false}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      keyboardDismissMode="on-drag"
      scrollEventThrottle={200}
      onScroll={onScroll}
      contentContainerStyle={
        {
          width: `${100 * scenes.length}%`,
        } as ViewStyle
      }
    >
      {scenes.map(({ scene, title }) =>
        React.createElement(scene, {
          changeTabIndex: onIndexChange,
          key: title,
        }),
      )}
    </ScrollView>
  );
}
