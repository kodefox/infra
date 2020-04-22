import React from 'react';
import {
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  StyleSheet,
  AccessibilityProps,
} from 'react-native';

import Text from '../Text';

import useTheme from '../../helpers/useTheme';
import { IS_MOBILE } from '../../constants/platforms';

export type RichRadioItemProps = AccessibilityProps & {
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
    accessibilityLabel,
    accessibilityRole,
    ...otherProps
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

  // NOTE: Use `button` for web as RNW doesn't support it yet
  // https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/modules/AccessibilityUtil/propsToAriaRole.js
  let defaultAccessibilityRole = (IS_MOBILE ? 'radio' : 'button') as
    | 'radio'
    | 'button';

  return (
    <TouchableOpacity
      {...otherProps}
      accessibilityLabel={accessibilityLabel || `Radio Item: ${label}`}
      accessibilityRole={accessibilityRole || defaultAccessibilityRole}
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
