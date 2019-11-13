import React from 'react';
import {
  Animated,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Platform,
} from 'react-native';
import { SegmentedControlMode } from './types';
import useTheme from '../../helpers/useTheme';
import { MODE } from './constants';

type Props = {
  mode: SegmentedControlMode;
  width: number;
  activeIndex: number;
  style?: StyleProp<ViewStyle>;
  dividerWidth: number;
};
export default function Indicator(props: Props) {
  let { mode, width, dividerWidth, activeIndex, style } = props;

  let { colors } = useTheme();
  let indicatorStyle;
  switch (mode) {
    case MODE.DEFAULT: {
      indicatorStyle = {
        height: 34,
        borderRadius: 17,
        width,
        backgroundColor: colors.primary,
      };
      break;
    }
    case MODE.BORDER: {
      indicatorStyle = {
        height: 34,
        width: width + dividerWidth,
        backgroundColor: colors.primary,
      };
      break;
    }
    case MODE.IOS13: {
      indicatorStyle = {
        width,
        height: 26,
        borderRadius: 4,
        backgroundColor: colors.surface,
        overflow: 'visible',
        ...Platform.select({
          android: { elevation: 4 },
          default: {
            shadowOffset: {
              width: 1,
              height: 0,
            },
            shadowColor: '#BDC3C7',
            shadowRadius: 1,
            shadowOpacity: 0.8,
          },
        }),
      };
      break;
    }
    default: {
      indicatorStyle = {};
      break;
    }
  }

  return (
    <Animated.View
      style={[
        styles.indicator,
        indicatorStyle,
        {
          transform: [
            {
              translateX: activeIndex * (width + dividerWidth), // TODO: animate the X
            },
          ],
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    zIndex: 3,
    alignSelf: 'center',
  },
});
