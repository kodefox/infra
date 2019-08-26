import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import MultiSlider, {
  MultiSliderProps,
  MarkerProps,
} from 'react-native-multi-slider';

type Props = MultiSliderProps;

export default function Slider(props: Props) {
  let {
    values, // if you want to use multiple slider, set the length to 2
    markerContainerStyle,
    trackStyle,
    selectedStyle,
    markerStyle,
    unselectedStyle,
    customMarker,
    ...otherProps
  } = props;

  return (
    <MultiSlider
      values={values}
      markerContainerStyle={[styles.markerContainerStyle, markerContainerStyle]}
      trackStyle={[styles.trackStyle, trackStyle]}
      selectedStyle={[styles.selectedStyle, selectedStyle]}
      unselectedStyle={[styles.unselectedStyle, unselectedStyle]}
      markerStyle={[styles.markerStyle, markerStyle]}
      customMarker={customMarker}
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
  return (
    <View style={styles.customMarkerContainer}>
      <Text style={{ height: 18 }}>{pressed ? currentValue : ''}</Text>
      <TouchableHighlight>
        <View
          style={
            enabled
              ? [styles.markerStyle, markerStyle, pressed && pressedMarkerStyle]
              : [styles.markerStyle, styles.disabled]
          }
        />
      </TouchableHighlight>
    </View>
  );
};

Slider.defaultProps = {
  values: [0, 3],
  onValuesChangeStart: () => {},
  onValuesChange: () => {},
  onValuesChangeFinish: () => {},
  onMarkersPosition: () => {},
  step: 1,
  min: 0,
  max: 10,
  touchDimensions: {
    height: 50,
    width: 50,
    borderRadius: 15,
    slipDisplacement: 200,
  },
  markerOffsetX: 0,
  markerOffsetY: 0,
  sliderLength: 280,
  onToggleOne: undefined,
  onToggleTwo: undefined,
  enabledOne: true,
  enabledTwo: true,
  allowOverlap: false,
  snapped: true,
  vertical: false,
  minMarkerOverlapDistance: 0,
  customMarker: DefaultMarker,
};

const styles = StyleSheet.create({
  trackStyle: {
    height: 8,
    borderRadius: 4,
    borderColor: '#e8e8e8',
    borderWidth: 1,
  },
  selectedStyle: {
    backgroundColor: '#0099dd', // TODO: get color from provider
  },
  markerStyle: {
    borderColor: '#0099dd',
    borderWidth: 1,
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  unselectedStyle: {
    backgroundColor: '#FFFFFF',
  },
  markerContainerStyle: { marginTop: 4 },
  disabled: {
    backgroundColor: 'grey',
  },
  customMarkerContainer: {
    alignItems: 'center',
    marginTop: -18,
  },
});
