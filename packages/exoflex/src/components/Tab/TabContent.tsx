import React, { useRef, useEffect, useCallback } from 'react';
import {
  ScrollView,
  ViewStyle,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  FlatList,
  View,
} from 'react-native';

import { useTabSwipe } from './useTabSwipe';
import { TabScenes, TabScene } from './types';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

type TabContentProps = {
  lazyLoad: boolean;
  activeIndex: number;
  scenes: TabScenes;
  onIndexChange: (index: number) => void;
};

export default function TabContent(props: TabContentProps) {
  let { lazyLoad, activeIndex, scenes, onIndexChange } = props;
  let { changeScrollPercentage } = useTabSwipe();

  let scrollView = useRef<ScrollView>(null);
  let flatList = useRef<FlatList<TabScene>>(null);

  useEffect(() => {
    if (lazyLoad) {
      flatList.current?.scrollToIndex({
        index: activeIndex,
      });
      return;
    }
    scrollView.current?.scrollTo({
      x: activeIndex * WINDOW_WIDTH,
    });
  }, [activeIndex, lazyLoad]);

  let onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    let { x } = e.nativeEvent.contentOffset;
    changeScrollPercentage(x / WINDOW_WIDTH);
  };

  let onMomentumScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      let { x } = e.nativeEvent.contentOffset;
      let halfScreen = WINDOW_WIDTH / 2;
      let halfScreenRight = WINDOW_WIDTH * activeIndex + halfScreen;
      let halfScreenLeft = WINDOW_WIDTH * activeIndex - halfScreen;
      if (x > halfScreenRight) {
        onIndexChange(activeIndex + 1);
      } else if (x < halfScreenLeft) {
        onIndexChange(activeIndex - 1);
      }
    },
    [activeIndex, onIndexChange],
  );

  let getItemLayout = (_data: Nullable<TabScenes>, index: number) => ({
    length: WINDOW_WIDTH,
    offset: WINDOW_WIDTH * index,
    index,
  });

  if (!lazyLoad) {
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
        onMomentumScrollEnd={onMomentumScrollEnd}
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

  return (
    <FlatList
      ref={flatList}
      horizontal
      pagingEnabled
      nestedScrollEnabled
      keyExtractor={(_item, index) => index.toString()}
      data={scenes}
      extraData={activeIndex}
      renderItem={({ item, index }) => {
        let { scene } = item;
        if (activeIndex !== index) {
          return (
            <View
              removeClippedSubviews={false}
              style={{ width: WINDOW_WIDTH, backgroundColor: 'lightgrey' }}
            />
          );
        }
        return (
          <View style={{ width: WINDOW_WIDTH }}>
            {React.createElement(scene, {
              // NOTE: change to `jumpTo`
              changeTabIndex: onIndexChange,
            })}
          </View>
        );
      }}
      removeClippedSubviews={false}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      keyboardDismissMode="on-drag"
      scrollEventThrottle={200}
      windowSize={1}
      initialNumToRender={1}
      onScroll={onScroll}
      onMomentumScrollEnd={onMomentumScrollEnd}
      getItemLayout={getItemLayout}
      contentContainerStyle={{ width: `${100 * scenes.length}%` } as ViewStyle}
    />
  );
}
