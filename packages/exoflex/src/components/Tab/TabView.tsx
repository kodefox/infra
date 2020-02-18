import React, { useCallback } from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import TabBar from './TabBar';
import TabContent from './TabContent';

import { TabProvider } from './useTabSwipe';
import { TabScenes } from './types';
import { IS_ANDROID } from '../../constants/platforms';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TabViewProps<T = any> = {
  lazyLoad?: boolean;
  enableSwipe?: boolean;
  activeIndex: number;
  scenes: TabScenes<T>;
  onIndexChange: (index: number) => void;
  style?: StyleProp<ViewStyle>;
};

const DEFAULT_SWIPE = IS_ANDROID;

export default function TabView(props: TabViewProps) {
  let {
    onIndexChange,
    activeIndex,
    scenes,
    lazyLoad = true,
    enableSwipe = DEFAULT_SWIPE,
    style,
  } = props;

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
          lazyLoad={lazyLoad}
          enableSwipe={enableSwipe}
          activeIndex={activeIndex}
          scenes={scenes}
          onIndexChange={changeTabIndex}
        />
      </View>
    </TabProvider>
  );
}
