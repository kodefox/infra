import React, { useState, ReactElement } from 'react';
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
  divider?: ReactElement;
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
    divider,
  } = props;
  let [tabWidth, setTabWidth] = useState(0);
  let { colors } = useTheme();

  let onLayout = (e: LayoutChangeEvent) => {
    let flattenedStyle =
      StyleSheet.flatten([{ ...styles.container }, style]) || {};

    let outerBorder = 0;
    if (flattenedStyle.borderWidth) {
      outerBorder = flattenedStyle.borderWidth * 2;
    } else if (flattenedStyle.borderLeftWidth) {
      outerBorder = flattenedStyle.borderLeftWidth;
    } else if (flattenedStyle.borderRightWidth) {
      outerBorder = flattenedStyle.borderRightWidth;
    }

    let segmentWidth =
      mode === MODE.BORDER
        ? (e.nativeEvent.layout.width - values.length - outerBorder) /
            values.length +
          1
        : mode === MODE.IOS13
        ? (e.nativeEvent.layout.width - 4) / values.length + 1 // NOTE: - 4 since the borderWidth is 2 * 2, + 1 to cover the border
        : e.nativeEvent.layout.width / values.length;

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
        divider={divider}
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
  tabContainer: {
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'row',
    zIndex: 3,
  },
  tab: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  divider: { borderRightWidth: 1 },
});
