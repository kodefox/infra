import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import TabItem from './TabBarItem';
import TabIndicator from './TabIndicator';

type TabBarProps = {
  activeIndex: number;
  titles: Array<string>;
  onTabPress: (index: number) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
};

export default function TabBar(props: TabBarProps) {
  let {
    activeIndex,
    titles,
    onTabPress,
    style,
    textStyle,
    indicatorStyle,
  } = props;

  let [width, setWidth] = useState(0);

  let indicatorWidth = width / titles.length;

  return (
    <View
      accessibilityRole="tablist"
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      style={styles.tabBar}
    >
      <TabIndicator
        width={indicatorWidth}
        activeIndex={activeIndex}
        maxIndex={titles.length}
        style={indicatorStyle}
      />
      {titles.map((title, index) => (
        <TabItem
          key={index}
          title={title}
          onPress={() => onTabPress(index)}
          style={style}
          textStyle={textStyle}
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
