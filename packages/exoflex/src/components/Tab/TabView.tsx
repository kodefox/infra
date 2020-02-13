import React, { ComponentType } from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import TabBar from './TabBar';

import { TabRoute, NavigationState } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TabViewProps<T = any> = {
  navigationState: NavigationState;
  onIndexChange: (index: number) => void;
  renderScene: (
    route: TabRoute,
    jumpTo?: (key: string) => void,
  ) => ComponentType<T>;
  style?: StyleProp<ViewStyle>;
};

export default function TabView(props: TabViewProps) {
  let { navigationState, onIndexChange, renderScene, style } = props;
  let { index, routes } = navigationState;

  let scene = renderScene(routes[index]);

  return (
    <View style={StyleSheet.flatten([{ flex: 1 }, style])}>
      <TabBar activeIndex={index} routes={routes} onTabPress={onIndexChange} />
      {React.createElement(scene)}
    </View>
  );
}
