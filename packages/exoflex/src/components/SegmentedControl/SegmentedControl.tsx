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

type Props = {
  mode: 'default' | 'border' | 'ios-13';
  values: Array<string>;
  activeIndex: number;
  onIndexChange?: (selectedIndex: number) => void;
  activeTextStyle?: StyleProp<TextStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  borderColor?: string;
  disabled: boolean;
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
    borderColor,
    disabled,
  } = props;
  let [tabWidth, setTabWidth] = useState(0);
  let { colors } = useTheme();

  let onLayout = (e: LayoutChangeEvent) => {
    let segmentWidth =
      mode === 'border'
        ? (e.nativeEvent.layout.width - values.length - 1) / values.length + 1 // NOTE: -1 because of the borderWidth, should we add prop borderWidth?
        : mode === 'ios-13'
        ? (e.nativeEvent.layout.width - 4) / values.length + values.length + 1
        : e.nativeEvent.layout.width / values.length;

    setTabWidth(segmentWidth);
  };

  let containerStyle = {};
  switch (mode) {
    case 'ios-13': {
      containerStyle = {
        height: 30,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#ECEBEB',
        overflow: 'visible',
        alignItems: 'center',
        backgroundColor: '#ECEBEB',
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
        size={values.length}
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
        borderColor={borderColor}
      />
    </View>
  );
}

SegmentedControl.defaultProps = {
  hasBorder: false,
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
