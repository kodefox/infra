import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TabItem from './TabBarItem';
import TabIndicator from './TabIndicator';

type TabBarProps = {
  activeIndex: number;
  titles: Array<string>;
  onTabPress: (index: number) => void;
};

export default function TabBar(props: TabBarProps) {
  let { activeIndex, titles, onTabPress } = props;

  let [width, setWidth] = useState(0);

  let indicatorWidth = width / titles.length;

  return (
    <View
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      style={styles.tabBar}
    >
      <TabIndicator
        width={indicatorWidth}
        activeIndex={activeIndex}
        maxIndex={titles.length}
      />
      {titles.map((title, index) => (
        <TabItem
          key={index}
          index={index}
          title={title}
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