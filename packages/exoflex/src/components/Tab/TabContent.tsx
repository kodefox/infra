import React, { useRef, useEffect, useCallback } from 'react';
import {
  ScrollView,
  ViewStyle,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  FlatList,
  View,
  StyleSheet,
} from 'react-native';

import { useTab } from './useTab';
import { DefaultTheme } from '../../constants/themes';
import { IS_WEB } from '../../constants/platforms';
import { TabScenes, TabScene } from './types';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

type TabContentProps = {
  lazyLoad: boolean;
  enableSwipe: boolean;
  activeIndex: number;
  scenes: TabScenes;
  onIndexChange: (index: number) => void;
};

export default function TabContent(props: TabContentProps) {
  let { lazyLoad, enableSwipe, activeIndex, scenes, onIndexChange } = props;
  let { changeScrollPercentage } = useTab();

  let scrollView = useRef<ScrollView>(null);
  let flatList = useRef<FlatList<TabScene>>(null);

  let scrollEnabled = IS_WEB ? false : enableSwipe;

  useEffect(() => {
    lazyLoad
      ? flatList.current?.scrollToIndex({
          index: activeIndex,
        })
      : scrollView.current?.scrollTo({
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

  let contentContainerStyle = { width: `${100 * scenes.length}%` } as ViewStyle;

  if (!lazyLoad) {
    return (
      <ScrollView
        ref={scrollView}
        horizontal
        pagingEnabled
        nestedScrollEnabled
        scrollEnabled={scrollEnabled}
        removeClippedSubviews={false}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyboardDismissMode="on-drag"
        scrollEventThrottle={200}
        onScroll={onScroll}
        onMomentumScrollEnd={onMomentumScrollEnd}
        contentContainerStyle={contentContainerStyle}
      >
        {scenes.map(({ scene, title }) => (
          <View key={title} style={[styles.fullWidth, { flex: 1 }]}>
            {React.createElement(scene, {
              jumpTo: onIndexChange,
            })}
          </View>
        ))}
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
              style={[styles.fullWidth, styles.fullHeight, styles.placeholder]}
            />
          );
        }
        return (
          <View style={[styles.fullWidth, styles.fullHeight]}>
            {React.createElement(scene, {
              jumpTo: onIndexChange,
            })}
          </View>
        );
      }}
      scrollEnabled={scrollEnabled}
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
      style={styles.placeholder}
      contentContainerStyle={contentContainerStyle}
    />
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    width: WINDOW_WIDTH,
  },
  fullHeight: {
    height: WINDOW_HEIGHT,
  },
  placeholder: {
    backgroundColor: DefaultTheme.colors.border,
  },
});
