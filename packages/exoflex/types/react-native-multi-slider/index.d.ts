declare module 'react-native-multi-slider' {
  // Type definitions for @ptomasroos/react-native-multi-slider 0.0
  // Project: https://github.com/ptomasroos/react-native-multi-slider#readme
  // Definitions by: Edward Sammut Alessi <https://github.com/Slessi>
  // Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
  // TypeScript Version: 2.8

  import * as React from 'react';
  import { ViewStyle, StyleProp } from 'react-native';

  export interface MarkerProps {
    pressed: boolean;
    pressedMarkerStyle: StyleProp<ViewStyle>;
    markerStyle: StyleProp<ViewStyle>;
    enabled: boolean;
    currentValue: number;
    valuePrefix: string;
    valueSuffix: string;
  }

  export interface MultiSliderProps {
    values?: Array<number>;
    onValuesChange?: (values: Array<number>) => void;
    onValuesChangeStart?: () => void;
    onValuesChangeFinish?: (values: Array<number>) => void;
    sliderLength?: number;
    touchDimensions?: {
      height: number;
      width: number;
      borderRadius: number;
      slipDisplacement: number;
    };
    customMarker?: React.ComponentType<MarkerProps>;
    customMarkerLeft?: React.ComponentType<MarkerProps>;
    customMarkerRight?: React.ComponentType<MarkerProps>;
    isMarkersSeparated?: boolean;
    min?: number;
    max?: number;
    step?: number;
    optionsArray?: Array<number>;
    containerStyle?: StyleProp<ViewStyle>;
    trackStyle?: StyleProp<ViewStyle>;
    selectedStyle?: StyleProp<ViewStyle>;
    unselectedStyle?: StyleProp<ViewStyle>;
    markerContainerStyle?: StyleProp<ViewStyle>;
    markerStyle?: StyleProp<ViewStyle>;
    pressedMarkerStyle?: StyleProp<ViewStyle>;
    valuePrefix?: string;
    valueSuffix?: string;
    enabledOne?: boolean;
    enabledTwo?: boolean;
    onToggleOne?: () => void;
    onToggleTwo?: () => void;
    allowOverlap?: boolean;
    snapped?: boolean;
    markerOffsetX?: number;
    markerOffsetY?: number;
  }

  export default class MultiSlider extends React.Component<MultiSliderProps> {}
}
