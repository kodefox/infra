import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle, LayoutChangeEvent } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

import { useTab } from './useTab';

import { TabScenes } from './types';

type TabContentProps = {
  lazyLoad: boolean;
  enableSwipe: boolean;
  activeIndex: number;
  scenes: TabScenes;
  onIndexChange: (index: number) => void;
};

export default function TabContent(props: TabContentProps) {
  let {
    scenes,
    // lazyLoad = false,
    // enableSwipe = true,
    activeIndex,
    onIndexChange,
  } = props;

  let [width, setWidth] = useState(0);

  let totalScene = scenes.length;

  let { transformStyle, onPanGestureEvent, onHandlerStateChange } = useTab({
    width,
    activeIndex,
    onIndexChange,
    totalScene,
  });

  let onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);

  return (
    <View onLayout={onLayout} style={styles.root}>
      <PanGestureHandler
        minDist={50}
        onGestureEvent={onPanGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View style={[styles.container, transformStyle] as ViewStyle}>
          {scenes.map(({ scene, title }) => (
            <View style={{ flex: 1 }} key={title}>
              {React.createElement(scene, { jumpTo: onIndexChange })}
            </View>
          ))}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'hidden',
  },
  container: {
    flexDirection: 'row',
    height: '100%',
  },
});
