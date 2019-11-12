import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import useTheme from '../../helpers/useTheme';
import { SegmentedControlMode } from './types';
import { MODE } from './constants';

type Props = {
  mode: SegmentedControlMode;
  values: Array<string>;
  activeIndex: number;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  activeTextStyle?: StyleProp<TextStyle>;
  onIndexChange?: (newIndex: number) => void;
  dividerColor?: string;
  width: number;
  dividerWidth: number;
};

export default function Tabs(props: Props) {
  let {
    mode,
    values,
    activeIndex,
    disabled,
    activeTextStyle,
    style,
    textStyle,
    onIndexChange,
    dividerColor,
    width,
    dividerWidth,
  } = props;
  let { colors } = useTheme();

  return (
    <>
      {values.map((item, index) => {
        let isSelected = activeIndex === index;
        // TODO: replace with Exoflex's divider
        let defaultDivider = (width: number) => (
          <View
            style={[
              styles.divider,
              {
                width,
                backgroundColor: dividerColor || colors.primary,
              },
            ]}
          />
        );

        let transparentDivider = (width: number) => (
          <View
            style={[
              styles.divider,
              {
                width,
                backgroundColor: 'transparent',
              },
            ]}
          />
        );

        let divider;

        if (mode === MODE.BORDER || mode === MODE.DEFAULT) {
          if (index !== 0) {
            divider = defaultDivider(dividerWidth);
          }
        } else if (mode === MODE.IOS13) {
          if (
            index !== 0 &&
            index !== activeIndex &&
            index !== activeIndex + 1
          ) {
            divider = defaultDivider(dividerWidth);
          } else if (
            (index === activeIndex || index === activeIndex + 1) &&
            index !== 0
          ) {
            divider = transparentDivider(dividerWidth);
          }
        }

        return (
          <View key={index} style={styles.tabContainer}>
            {divider}
            <TouchableOpacity
              style={[
                styles.tab,
                { width },
                style,
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
                  mode === MODE.IOS13
                    ? isSelected && [{ color: colors.text }, activeTextStyle]
                    : isSelected && [
                        { color: colors.surface },
                        activeTextStyle,
                      ],
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </>
  );
}

let styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    zIndex: 5,
    justifyContent: 'center',
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    alignSelf: 'stretch',
  },
});
