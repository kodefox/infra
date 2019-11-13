import React, { useState } from 'react';
import {
  View,
  LayoutChangeEvent,
  StyleProp,
  TextStyle,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import useTheme from '../../helpers/useTheme';
import Indicator from './Indicator';
import Tabs from './Tabs';
import { SegmentedControlMode } from './types';
import { MODE } from './constants';

type Props = {
  mode: SegmentedControlMode;
  values: Array<string>;
  activeIndex: number;
  onIndexChange?: (selectedIndex: number) => void;
  activeTextStyle?: StyleProp<TextStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  dividerColor?: string;
  disabled: boolean;
  dividerWidth?: number;
};

export default function SegmentedControl(props: Props) {
  let {
    mode,
    values,
    onIndexChange,
    activeIndex,
    activeTextStyle,
    indicatorStyle,
    tabStyle,
    textStyle,
    style,
    dividerColor,
    disabled,
    dividerWidth: dividerWidthProp,
  } = props;
  let [tabWidth, setTabWidth] = useState(0);
  let { colors } = useTheme();

  let dividerWidth = dividerWidthProp
    ? dividerWidthProp
    : mode === MODE.DEFAULT
    ? 0
    : 1;

  let onLayout = (e: LayoutChangeEvent) => {
    let flattenedStyle =
      StyleSheet.flatten([{ ...styles.container }, containerStyle, style]) ||
      {};

    let outerBorder = 0;
    if (flattenedStyle.borderWidth) {
      outerBorder = flattenedStyle.borderWidth * 2;
    } else if (
      flattenedStyle.borderLeftWidth ||
      flattenedStyle.borderRightWidth
    ) {
      if (flattenedStyle.borderLeftWidth && flattenedStyle.borderRightWidth) {
        outerBorder =
          flattenedStyle.borderLeftWidth + flattenedStyle.borderRightWidth;
      } else {
        outerBorder =
          flattenedStyle.borderLeftWidth ||
          flattenedStyle.borderRightWidth ||
          0;
      }
    }

    let segmentWidth =
      mode === MODE.IOS13
        ? (e.nativeEvent.layout.width -
            outerBorder -
            (values.length - 1) * dividerWidth) /
          values.length
        : (e.nativeEvent.layout.width -
            outerBorder -
            (values.length - 1) * dividerWidth) /
          values.length;

    setTabWidth(segmentWidth);
  };

  let containerStyle = {};
  switch (mode) {
    case MODE.IOS13: {
      containerStyle = {
        height: 30,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: colors.border,
        overflow: 'visible',
        alignItems: 'center', // to make the divider not scretch from top to bottom
        backgroundColor: colors.border,
      };
      break;
    }
  }

  return (
    <View
      onLayout={onLayout}
      style={[
        styles.container,
        containerStyle,
        { borderColor: colors.border },
        style,
      ]}
    >
      <Indicator
        mode={mode}
        width={tabWidth}
        activeIndex={activeIndex}
        style={indicatorStyle}
        dividerWidth={dividerWidth}
      />
      <Tabs
        mode={mode}
        values={values}
        activeIndex={activeIndex}
        disabled={disabled}
        onIndexChange={onIndexChange}
        style={tabStyle}
        textStyle={textStyle}
        activeTextStyle={activeTextStyle}
        dividerColor={dividerColor}
        dividerWidth={dividerWidth}
      />
    </View>
  );
}

SegmentedControl.defaultProps = {
  borderWidth: 1,
  disabled: false,
  mode: 'default',
};

let styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 18,
    borderWidth: 1,
    height: 36,
    overflow: 'hidden',
  },
});
