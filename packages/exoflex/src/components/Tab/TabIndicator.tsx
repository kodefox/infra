import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

import useTheme from '../../helpers/useTheme';

type TabIndicatorProps = {
  width: number;
  position: number;
};

export default function TabIndicator(props: TabIndicatorProps) {
  let { width, position } = props;

  let { colors } = useTheme();

  let indicatorStyle = {
    width,
    left: position,
    backgroundColor: colors.text,
  } as ViewStyle;
  let rootStyle = StyleSheet.flatten([
    styles.indicator,
    indicatorStyle,
  ]) as ViewStyle;

  return <View style={rootStyle} />;
}

const styles = StyleSheet.create({
  indicator: {
    height: 2,
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
});
