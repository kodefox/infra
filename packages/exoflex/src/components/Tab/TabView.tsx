import React, { useCallback } from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import TabBar from './TabBar';
import TabContent from './TabContent';

import { TabProvider } from './useTabSwipe';
import { TabScenes } from './types';

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

  let changeTabIndex = useCallback((index: number) => {
    onIndexChange(index);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TabProvider>
      <View style={StyleSheet.flatten([{ flex: 1 }, style])}>
        <TabBar
          activeIndex={activeIndex}
          titles={titles}
          onTabPress={changeTabIndex}
        />
        <TabContent
          activeIndex={activeIndex}
          scenes={scenes}
          onIndexChange={changeTabIndex}
        />
      </View>
    </TabProvider>
  );
}
