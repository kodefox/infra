import React, { ReactNode } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  ScrollView,
  TextStyle,
} from 'react-native';
import Text from './Text';

import useTheme from '../helpers/useTheme';

export type RichRadioButtonProps = {
  data: Array<{ label: string; value: string; testID?: string }>;
  selectedValue: string;
  selectedColor?: string;
  uppercase?: boolean;
  onValueChanged: (value: string) => void;
  renderCustomItemContent?: (label: string) => ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function RichRadioButton(props: RichRadioButtonProps) {
  let {
    data,
    selectedValue,
    selectedColor,
    uppercase = false,
    onValueChanged,
    renderCustomItemContent,
    style,
    contentContainerStyle,
    itemStyle,
    textStyle,
  } = props;
  let { colors, style: themeStyle } = useTheme();

  let rootStyle = [themeStyle?.richRadioButton?.style, style] as ViewStyle;
  let containerStyle = [
    styles.container,
    themeStyle?.richRadioButton?.contentContainerStyle,
    contentContainerStyle,
  ] as ViewStyle;
  let combinedItemStyle = StyleSheet.flatten([
    styles.item,
    { borderColor: colors.border },
    themeStyle?.richRadioButton?.itemStyle,
    itemStyle,
  ]) as ViewStyle;
  let combinedTextStyle = [
    themeStyle?.richRadioButton?.textStyle,
    textStyle,
  ] as TextStyle;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={rootStyle}
      contentContainerStyle={containerStyle}
    >
      {data.map((item, index) => {
        let isSelected = item.value === selectedValue;
        let isFirstItem = index === 0;

        let selectedStyle = {
          borderColor: selectedColor || colors.primary,
        } as ViewStyle;
        let firstItemStyle = { marginLeft: 0 } as ViewStyle;

        return (
          <TouchableOpacity
            key={item.label}
            activeOpacity={0.7}
            onPress={() => onValueChanged(item.value)}
            style={[
              combinedItemStyle,
              isFirstItem && firstItemStyle,
              isSelected && selectedStyle,
            ]}
            testID={item.testID}
          >
            {!!renderCustomItemContent ? (
              renderCustomItemContent(item.label)
            ) : (
              <Text uppercase={uppercase} style={combinedTextStyle}>
                {item.label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 15,
  },
});
