import React, { ReactElement } from 'react';
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
  divider?: ReactElement;
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
    divider: dividerComponent,
  } = props;
  let { colors } = useTheme();

  return (
    <>
      {values.map((item, index) => {
        let isSelected = activeIndex === index;
        // TODO: replace with Exoflex's divider
        let defaultDivider = (
          <View
            style={[
              styles.divider,
              {
                borderColor: dividerColor || colors.primary,
                // which one should be the default color? colors.border / colors.primary? For now, I choose the primary color since the basic IOS segmented control uses the primary color
              },
            ]}
          />
        );

        let transparentDivider = (
          <View
            style={[
              styles.divider,
              {
                borderColor: 'transparent',
              },
            ]}
          />
        );

        let divider;

        if (mode === MODE.BORDER) {
          if (index !== 0) {
            divider = dividerComponent || defaultDivider;
          }
        } else if (mode === MODE.IOS13) {
          if (
            index !== 0 &&
            index !== activeIndex &&
            index !== activeIndex + 1
          ) {
            divider = dividerComponent || defaultDivider;
          } else if (
            (index === activeIndex || index === activeIndex + 1) &&
            index !== 0
          ) {
            divider = transparentDivider;
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
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'row',
    zIndex: 5,
  },
  tab: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  divider: { borderRightWidth: 1 },
});
