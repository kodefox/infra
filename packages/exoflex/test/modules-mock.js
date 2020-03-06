jest.mock('react-native-svg', () => 'Svg');

jest.mock('react-native-reanimated', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require('react');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { View, Text, Image, ScrollView } = require('react-native');
  const mockFn = jest.fn();

  class Code extends React.Component {
    render() {
      return null;
    }
  }

  return {
    __esModule: true,

    default: {
      SpringUtils: {
        makeDefaultConfig: mockFn,
        makeConfigFromBouncinessAndSpeed: mockFn,
        makeConfigFromOrigamiTensionAndFriction: mockFn,
      },

      View,
      Text,
      Image,
      ScrollView,
      Code,

      Clock: mockFn,
      Node: mockFn,
      Value: jest.fn(() => ({
        interpolate: mockFn, 
      })),

      Extrapolate: {
        EXTEND: 'extend',
        CLAMP: 'clamp',
        IDENTITY: 'identity',
      },

      add: mockFn,
      sub: mockFn,
      multiply: mockFn,
      divide: mockFn,
      pow: mockFn,
      modulo: mockFn,
      sqrt: mockFn,
      sin: mockFn,
      cos: mockFn,
      tan: mockFn,
      acos: mockFn,
      asin: mockFn,
      atan: mockFn,
      exp: mockFn,
      round: mockFn,
      floor: mockFn,
      ceil: mockFn,
      lessThan: mockFn,
      eq: mockFn,
      greaterThan: mockFn,
      lessOrEq: mockFn,
      greaterOrEq: mockFn,
      neq: mockFn,
      and: mockFn,
      or: mockFn,
      defined: mockFn,
      not: mockFn,
      set: mockFn,
      concat: mockFn,
      cond: mockFn,
      block: mockFn,
      call: mockFn,
      debug: mockFn,
      onChange: mockFn,
      startClock: mockFn,
      stopClock: mockFn,
      clockRunning: mockFn,
      event: mockFn,
      abs: mockFn,
      acc: mockFn,
      color: mockFn,
      diff: mockFn,
      diffClamp: mockFn,
      interpolate: mockFn,
      max: mockFn,
      min: mockFn,

      decay: mockFn,
      timing: jest.fn(() => ({
        start: mockFn,
      })),
      spring: mockFn,

      useCode: mockFn,
    },

    Easing: {
      linear: mockFn,
      ease: mockFn,
      quad: mockFn,
      cubic: mockFn,
      poly: () => mockFn,
      sin: mockFn,
      circle: mockFn,
      exp: mockFn,
      elastic: () => mockFn,
      back: () => mockFn,
      bounce: () => mockFn,
      bezier: () => mockFn,
      in: () => mockFn,
      out: () => mockFn,
      inOut: () => mockFn,
    },
  };
});

jest.mock('react-native-gesture-handler', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { View } = require('react-native');
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    /* Buttons */
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    /* Other */
    FlatList: View,
    gestureHandlerRootHOC: jest.fn(),
    Directions: {},
  };
});

// Hide warning about componentWillReceiveProps has been renamed
jest.spyOn(console, 'warn').mockImplementation((message) => {
  let blacklistedMessage =
    'Warning: componentWillReceiveProps has been renamed';
  return message.startsWith(blacklistedMessage) ? '' : message;
});
