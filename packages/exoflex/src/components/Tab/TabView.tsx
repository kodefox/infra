import React, { ComponentType, useCallback, useRef } from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import TabBar from './TabBar';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TabScene<T = any> = { title: string; scene: ComponentType<T> };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TabScenes<T = any> = Array<TabScene<T>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TabViewProps<T = any> = {
  activeIndex: number;
  scenes: TabScenes<T>;
  onIndexChange: (index: number) => void;
  style?: StyleProp<ViewStyle>;
};

export default function TabView(props: TabViewProps) {
  let { onIndexChange, activeIndex, scenes, style } = props;

  let titles = scenes.map(({ title }) => title);

  let scrollView = useRef<ScrollView>(null);

  let changeTabIndex = useCallback(
    (index: number) => {
      let { width: windowWidth } = Dimensions.get('window');
      onIndexChange(index);
      scrollView.current?.scrollTo({
        x: index * windowWidth,
        animated: false,
      });
    },
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <View style={StyleSheet.flatten([{ flex: 1 }, style])}>
      <TabBar
        activeIndex={activeIndex}
        titles={titles}
        onTabPress={changeTabIndex}
      />

      <ScrollView
        ref={scrollView}
        horizontal
        pagingEnabled
        nestedScrollEnabled
        removeClippedSubviews={false}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyboardDismissMode="on-drag"
        contentContainerStyle={
          {
            width: `${100 * scenes.length}%`,
          } as ViewStyle
        }
      >
        {scenes.map(({ scene, title }) =>
          React.createElement(scene, {
            changeTabIndex,
            key: title,
          }),
        )}
      </ScrollView>
    </View>
  );
}
