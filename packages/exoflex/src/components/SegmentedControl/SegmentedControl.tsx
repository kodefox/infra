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
import Segments from './Segments';
import { SegmentedControlMode } from './types';
import { Mode } from './constants';

// TODO: support icon
export type SegmentedControlProps = {
  mode: SegmentedControlMode;
  values: Array<string>;
  activeIndex: number;
  onIndexChange?: (selectedIndex: number) => void;
  activeTextStyle?: StyleProp<TextStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  segmentStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  dividerColor?: string;
  disabled: boolean;
  dividerWidth?: number;
};

export default function SegmentedControl(props: SegmentedControlProps) {
  let {
    mode,
    values,
    onIndexChange,
    activeIndex,
    activeTextStyle,
    indicatorStyle,
    segmentStyle,
    textStyle,
    style,
    dividerColor,
    disabled,
    dividerWidth: dividerWidthProp,
  } = props;
  let [segmentWidth, setSegmentWidth] = useState(0);
  let { colors, style: themeStyle } = useTheme();

  let dividerWidth = mode === Mode.default ? 0 : dividerWidthProp || 1;

  let onLayout = (e: LayoutChangeEvent) => {
    let flattenedStyle: StyleProp<ViewStyle> = StyleSheet.flatten([
      styles.container,
      containerStyle,
      style,
    ]);

    let outerBorder = 0;
    if (flattenedStyle.borderWidth) {
      outerBorder = flattenedStyle.borderWidth * 2;
    } else {
      outerBorder =
        (flattenedStyle.borderLeftWidth ?? 0) +
        (flattenedStyle.borderRightWidth ?? 0);
    }

    let totalDividerWidth = (values.length - 1) * dividerWidth;
    let width =
      (e.nativeEvent.layout.width - outerBorder - totalDividerWidth) /
      values.length;

    setSegmentWidth(width);
  };

  let containerStyle = {};
  switch (mode) {
    case Mode['ios-13']: {
      containerStyle = {
        height: 30,
        borderRadius: 4,
        borderWidth: 2,
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
        themeStyle?.segmentedControl?.style,
        style,
      ]}
    >
      <Indicator
        mode={mode}
        width={segmentWidth}
        activeIndex={activeIndex}
        style={[themeStyle?.segmentedControl?.indicatorStyle, indicatorStyle]}
        dividerWidth={dividerWidth}
      />
      <Segments
        mode={mode}
        values={values}
        activeIndex={activeIndex}
        disabled={disabled}
        onIndexChange={onIndexChange}
        style={[themeStyle?.segmentedControl?.segmentStyle, segmentStyle]}
        textStyle={[themeStyle?.segmentedControl?.textStyle, textStyle]}
        activeTextStyle={[
          themeStyle?.segmentedControl?.activeTextStyle,
          activeTextStyle,
        ]}
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
