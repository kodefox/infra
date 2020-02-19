import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Platform,
} from 'react-native';
import MultiSlider, {
  MultiSliderProps,
  MarkerProps,
} from 'react-native-multi-slider';

import useTheme from '../helpers/useTheme';

export type SliderProps = MultiSliderProps & {
  showLabel: boolean;
};

export default function Slider(props: SliderProps) {
  let {
    values,
    markerContainerStyle,
    trackStyle,
    selectedStyle,
    markerStyle,
    unselectedStyle,
    customMarker,
    showLabel,
    containerStyle,
    pressedMarkerStyle,
    ...otherProps
  } = props;

  let { colors, style: themeStyle } = useTheme();
  let CustomMarker;
  if (showLabel) {
    CustomMarker = customMarker;
  }

  return (
    <MultiSlider
      values={values}
      markerContainerStyle={[
        styles.markerContainerStyle,
        themeStyle?.slider?.markerContainerStyle,
        markerContainerStyle,
      ]}
      trackStyle={[
        { borderColor: colors.border },
        styles.trackStyle,
        themeStyle?.slider?.trackStyle,
        trackStyle,
      ]}
      selectedStyle={[
        { backgroundColor: colors.primary },
        themeStyle?.slider?.selectedStyle,
        selectedStyle,
      ]}
      unselectedStyle={[
        { backgroundColor: colors.background },
        themeStyle?.slider?.unselectedStyle,
        unselectedStyle,
      ]}
      markerStyle={[
        { borderColor: colors.primary, backgroundColor: colors.background },
        styles.markerStyle,
        themeStyle?.slider?.markerStyle,
        markerStyle,
      ]}
      containerStyle={[themeStyle?.slider?.containerStyle, containerStyle]}
      pressedMarkerStyle={[
        themeStyle?.slider?.pressedMarkerStyle,
        pressedMarkerStyle,
      ]}
      customMarker={CustomMarker}
      {...otherProps}
    />
  );
}

let DefaultMarker = ({
  currentValue,
  enabled,
  pressed,
  pressedMarkerStyle,
  markerStyle,
}: MarkerProps) => {
  let { colors, style: themeStyle } = useTheme();
  return (
    <View
      style={[
        styles.customMarkerContainer,
        pressed && { top: -17 },
        themeStyle?.slider?.markerContainerStyle,
      ]}
    >
      {pressed && <Tooltip value={currentValue} />}
      <TouchableHighlight>
        <View
          style={
            enabled
              ? [
                  styles.markerStyle,
                  themeStyle?.slider?.markerStyle,
                  markerStyle,
                  ...(pressed && [
                    themeStyle?.slider?.pressedMarkerStyle,
                    pressedMarkerStyle,
                  ]),
                ]
              : [
                  styles.markerStyle,
                  themeStyle?.slider?.markerStyle,
                  { backgroundColor: colors.disabled },
                ]
          }
        />
      </TouchableHighlight>
    </View>
  );
};

function Tooltip({ value }: { value: number }) {
  let { colors } = useTheme();

  return (
    <View style={styles.tooltipContainer}>
      <View
        style={[
          styles.box,
          {
            borderColor: colors.border,
            backgroundColor: colors.background,
          },
        ]}
      >
        <Text style={styles.height}>{value}</Text>
      </View>
      <View
        style={[
          styles.triangle,
          styles.largerTriangle,
          { borderTopColor: colors.border },
        ]}
      />
      <View
        style={[
          styles.triangle,
          styles.smallerTriangle,
          { borderTopColor: colors.background },
        ]}
      />
    </View>
  );
}

Slider.defaultProps = {
  customMarker: DefaultMarker,
  showLabel: true,
};

const styles = StyleSheet.create({
  trackStyle: {
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
  },
  markerStyle: {
    borderWidth: 1,
    height: 24,
    width: 24,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 0,
        },
      },
      web: {
        shadowOffset: {
          width: 0,
          height: 0,
        },
      },
    }),
  },
  markerContainerStyle: { marginTop: 4 },
  customMarkerContainer: {
    alignItems: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  largerTriangle: {
    position: 'relative',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 8,
  },
  smallerTriangle: {
    position: 'absolute',
    top: 19,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 7,
  },
  tooltipContainer: {
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: { paddingHorizontal: 10, borderWidth: 1, borderRadius: 4 },
  height: { height: 18 },
});
