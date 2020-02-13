import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TabItem from './TabBarItem';
import TabIndicator from './TabIndicator';

import { TabRoute } from './types';

type TabBarProps = {
  routes: Array<TabRoute>;
  onTabPress: (index: number) => void;
};

export default function TabBar(props: TabBarProps) {
  let { routes, onTabPress } = props;

  let [width, setWidth] = useState(0);
  let [indicatorPos, setIndicatorPos] = useState(0);

  let indicatorWidth = width / routes.length;

  let changeTab = (index: number) => {
    let newIndicatorPos = index * indicatorWidth;
    setIndicatorPos(newIndicatorPos);
    onTabPress(index);
  };

  return (
    <View
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      style={styles.tabBar}
    >
      <TabIndicator width={indicatorWidth} position={indicatorPos} />
      {routes.map((route, index) => (
        <TabItem
          key={index}
          index={index}
          title={route.title}
          onPress={() => changeTab(index)}
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
