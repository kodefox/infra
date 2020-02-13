import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TabItem from './TabBarItem';
import TabIndicator from './TabIndicator';

import { TabRoute } from './types';

type TabBarProps = {
  activeIndex: number;
  routes: Array<TabRoute>;
  onTabPress: (index: number) => void;
};

export default function TabBar(props: TabBarProps) {
  let { activeIndex, routes, onTabPress } = props;

  let [width, setWidth] = useState(0);

  let indicatorWidth = width / routes.length;

  return (
    <View
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      style={styles.tabBar}
    >
      <TabIndicator
        width={indicatorWidth}
        activeIndex={activeIndex}
        maxIndex={routes.length}
      />
      {routes.map((route, index) => (
        <TabItem
          key={index}
          index={index}
          title={route.title}
          onPress={() => onTabPress(index)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 50,
    flexDirection: 'row',
  },
});
