import React from 'react';
import { Animated, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { SegmentedControlMode } from './types';
import useTheme from '../../helpers/useTheme';

type Props = {
  mode: SegmentedControlMode;
  width: number;
  size: number;
  activeIndex: number;
  style?: StyleProp<ViewStyle>;
};

export default function Indicator(props: Props) {
  let { mode, width, size, activeIndex, style } = props;

  let { colors } = useTheme();

  let indicatorStyle;

  switch (mode) {
    case 'default': {
      indicatorStyle = {
        height: 34,
        borderRadius: 17,
        width,
        backgroundColor: colors.primary,
      };
      break;
    }
    case 'border': {
      indicatorStyle = { height: 34, width, backgroundColor: colors.primary };
      break;
    }
    case 'ios-13': {
      indicatorStyle = {
        width: width - size,
        height: 26,
        alignSelf: 'center',
        borderRadius: 4,
        backgroundColor: 'white',
        shadowOffset: {
          width: 1,
          height: 0,
        },
        shadowColor: 'grey',
        shadowRadius: 1,
        shadowOpacity: 0.7,
        overflow: 'visible',
        elevation: 5,
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
              translateX:
                mode === 'ios-13'
                  ? activeIndex * width - (size + 1) * activeIndex
                  : activeIndex * width, // TODO: animate the X
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
    zIndex: 2,
  },
});
