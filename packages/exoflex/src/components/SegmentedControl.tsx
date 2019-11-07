import React, { useState } from 'react';
import {
  View,
  LayoutChangeEvent,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  StyleSheet,
  ViewStyle,
  Animated,
} from 'react-native';
import Text from './Text';
import useTheme from '../helpers/useTheme';

type Props = {
  values: Array<string>;
  activeIndex: number;
  onIndexChange?: (selectedIndex: number) => void;
  activeTextStyle?: StyleProp<TextStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  hasBorder: boolean;
  borderColor?: string;
  disabled: boolean;
};

export default function SegmentedControl(props: Props) {
  let {
    values,
    onIndexChange,
    activeIndex,
    activeTextStyle,
    indicatorStyle,
    tabStyle,
    textStyle,
    style,
    hasBorder,
    borderColor,
    disabled,
  } = props;
  let [tabWidth, setTabWidth] = useState(0);
  let { colors } = useTheme();

  let onLayout = (e: LayoutChangeEvent) => {
    let segmentWidth = hasBorder
      ? (e.nativeEvent.layout.width - values.length - 1) / values.length + 1 // NOTE: -1 because of the borderWidth, should we add prop borderWidth?
      : e.nativeEvent.layout.width / values.length;

    setTabWidth(segmentWidth);
  };

  let tabs = values.map((item, index) => {
    let isSelected = activeIndex === index;
    // TODO: replace with Exoflex's divider
    let divider = (
      <View
        style={[
          styles.divider,
          {
            borderColor: borderColor || colors.primary,
            // which one should be the default color? colors.border / colors.primary? For now, I choose the primary color since the basic IOS segmented control uses the primary color
          },
        ]}
      />
    );

    return (
      <View key={index} style={styles.tabContainer}>
        {hasBorder && index !== 0 && divider}
        <TouchableOpacity
          style={[
            styles.tab,
            tabStyle,
            // TODO: change disabled color
          ]}
          disabled={disabled}
          onPress={() => {
            onIndexChange && onIndexChange(index);
          }}
          accessibilityLabel={item}
          accessibilityRole="button"
        >
          <Text
            style={[
              textStyle,
              isSelected && [{ color: colors.surface }, activeTextStyle],
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      </View>
    );
  });

  let indicator = (
    <Animated.View
      style={[
        styles.indicatorContainer,
        {
          backgroundColor: colors.primary,
          width: tabWidth,
          transform: [
            {
              translateX: activeIndex * tabWidth, // TODO: animate the X
            },
          ],
        },
        indicatorStyle,
      ]}
    />
  );

  return (
    <View
      onLayout={onLayout}
      style={[styles.container, { borderColor: colors.border }, style]}
    >
      {indicator}
      {tabs}
    </View>
  );
}

SegmentedControl.defaultProps = {
  hasBorder: false,
  borderWidth: 1,
  disabled: false,
};

let styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 18,
    borderWidth: 1,
    height: 36,
    overflow: 'hidden',
  },
  indicatorContainer: {
    position: 'absolute',
    height: 34,
    zIndex: 2,
    borderRadius: 17,
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
