import React from 'react';
import {
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Text from '../Text';

import useTheme from '../../helpers/useTheme';

export type RichRadioItemProps = {
  label: string;
  selectedColor?: string;
  selected?: boolean;
  uppercase?: boolean;
  firstItem?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  firstItemCustomStyle?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function RichRadioItem(props: RichRadioItemProps) {
  let {
    label,
    selected,
    uppercase,
    firstItem,
    selectedColor,
    onPress,
    style,
    textStyle,
    firstItemCustomStyle,
    testID,
  } = props;
  let { colors, style: themeStyle } = useTheme();

  let selectedStyle = {
    borderColor: selectedColor || colors.primary,
  } as ViewStyle;
  let combinedItemStyle = StyleSheet.flatten([
    styles.item,
    { borderColor: colors.border },
    selected && selectedStyle,
    themeStyle?.richRadioItem?.style,
    style,
    firstItem && (firstItemCustomStyle || styles.firstItem),
  ]) as ViewStyle;
  let combinedTextStyle = [
    themeStyle?.richRadioItem?.textStyle,
    textStyle,
  ] as TextStyle;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={combinedItemStyle}
      testID={testID}
    >
      <Text uppercase={uppercase} style={combinedTextStyle}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  firstItem: {
    marginLeft: 0,
  },
  item: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 15,
  },
});
