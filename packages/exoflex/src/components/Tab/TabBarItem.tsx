import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import color from 'color';
import Text from '../Text';

import useTheme from '../../helpers/useTheme';

type TabBarItemProps = {
  index: number;
  title: string;
  onPress: () => void;
};

export default function TabBarItem(props: TabBarItemProps) {
  let { onPress, index, title } = props;
  let { colors } = useTheme();

  // NOTE: Handle custom background color later
  let activeOpacity = color(colors.surface).isLight() ? 0.5 : 0.8;

  let textStyle = {
    // NOTE: Handle custom background color later
    color: color(colors.surface).isLight() ? colors.text : colors.surface,
  } as StyleProp<TextStyle>;

  return (
    <TouchableOpacity
      key={index}
      activeOpacity={activeOpacity}
      onPress={onPress}
      style={styles.item}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
