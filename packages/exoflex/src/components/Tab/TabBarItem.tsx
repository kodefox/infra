import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import color from 'color';
import Text from '../Text';

import useTheme from '../../helpers/useTheme';

type TabBarItemProps = {
  index: number;
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function TabBarItem(props: TabBarItemProps) {
  let { onPress, index, title, style, textStyle } = props;
  let { colors } = useTheme();

  let customStyle = StyleSheet.flatten(style);
  let backgroundColor = customStyle?.backgroundColor || colors.primary;

  let activeOpacity = color(backgroundColor).isLight() ? 0.5 : 0.8;

  let textColorStyle = {
    color: color(backgroundColor).isLight() ? colors.text : colors.surface,
  } as TextStyle;

  return (
    <TouchableOpacity
      key={index}
      activeOpacity={activeOpacity}
      onPress={onPress}
      style={[styles.item, { backgroundColor }, style]}
    >
      <Text style={[textColorStyle, textStyle]}>{title}</Text>
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
