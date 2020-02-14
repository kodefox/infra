import React, { ComponentType } from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
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

  let { scene } = scenes[activeIndex];
  let titles = scenes.map(({ title }) => title);

  let changeTabIndex = (index: number) => onIndexChange(index);

  return (
    <View style={StyleSheet.flatten([{ flex: 1 }, style])}>
      <TabBar
        activeIndex={activeIndex}
        titles={titles}
        onTabPress={onIndexChange}
      />
      {React.createElement(scene, { changeTabIndex })}
    </View>
  );
}
