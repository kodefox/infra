import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  Platform,
} from 'react-native';

import useTheme from '../../helpers/useTheme';

import { SegmentedControlMode } from './types';
import Divider from './Divider';
import { Mode } from './constants';

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
  dividerWidth: number;
};

export default function Segments(props: Props) {
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
    dividerWidth,
  } = props;
  let { colors } = useTheme();

  return (
    <>
      {values.map((item, index) => {
        let isSelected = activeIndex === index;

        let divider;
        let firstIndex = index === 0;
        if (!firstIndex) {
          if (mode === Mode.border) {
            divider = (
              <Divider color={dividerColor} style={{ width: dividerWidth }} />
            );
          } else if (mode === Mode['ios-13']) {
            if (index !== activeIndex && index !== activeIndex + 1) {
              divider = (
                <Divider color={dividerColor} style={{ width: dividerWidth }} />
              );
            } else {
              divider = (
                <Divider color="transparent" style={{ width: dividerWidth }} />
              );
            }
          }
        }

        return (
          <View key={index} style={styles.tabContainer}>
            {divider}
            <TouchableOpacity
              style={[
                styles.tab,
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
                  isSelected && [{ color: colors.text }, activeTextStyle],
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
    flex: 1,
    flexDirection: 'row',
    zIndex: 5,
    justifyContent: 'center',
    ...Platform.select({
      android: {
        elevation: 6, // giving a bigger elevation than the indicator so the indicator won't cover the text
      },
    }),
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
