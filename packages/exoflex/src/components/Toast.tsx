import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StyleProp,
  ViewStyle,
  View,
  TextStyle,
  Platform,
} from 'react-native';
import { Surface, IconButton } from 'react-native-paper';
import { useAnimation } from 'react-native-animation-hooks';

import Text from './Text';
import { ToastConfig } from './ToastContainer';
import useTheme from '../helpers/useTheme';
import { DefaultTheme } from '../constants/themes';

export type ModeProps = 'info' | 'warning' | 'error' | 'success';

type ColorsProps = Record<ModeProps, string>;

type Props = {
  /**
   * Will determine the icon and the color used for the Toast.
   */
  mode: ModeProps;
  /**
   * Configure the color of the surface of the Toast for each mode.
   */
  colors: ColorsProps;
  /**
   * Determine the visibility of the Toast.
   */
  visible: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: string;
};

function Toast({ mode, visible, style, children, colors, textStyle }: Props) {
  let { colors: themeColors } = useTheme();

  let animatedOpacity = useAnimation({
    type: 'timing',
    initialValue: visible ? 1 : 0,
    toValue: visible ? 1 : 0,
    duration: 200,
    // Native driver is not available on web.
    useNativeDriver: Platform.OS !== 'web',
  });

  return (
    <SafeAreaView pointerEvents="box-none" style={styles.wrapper}>
      <Surface
        pointerEvents="box-none"
        accessibilityLiveRegion="polite"
        style={
          [
            styles.container,
            {
              backgroundColor: colors[mode],
              opacity: animatedOpacity,
              transform: [
                {
                  scale: visible
                    ? animatedOpacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.9, 1],
                      })
                    : 1,
                },
              ],
            },
            style,
          ] as StyleProp<ViewStyle>
        }
      >
        <ToastIcon name={IconName[mode]} color={colors[mode]} />
        <Text style={[{ color: themeColors.surface }, textStyle]}>
          {children}
        </Text>
      </Surface>
    </SafeAreaView>
  );
}

let ToastIcon = ({ name, color }: { name: string; color: string }) => {
  let { colors } = useTheme();

  // There's no `i` icon that doesn't have outline or circle around it in IconButton.
  let isInfo = name === 'info';

  return (
    <View
      style={[
        styles.iconContainer,
        !isInfo && {
          backgroundColor: colors.surface,
        },
      ]}
    >
      {isInfo ? (
        <IconButton icon={name} color={colors.surface} size={36} />
      ) : (
        <IconButton icon={name} color={color} />
      )}
    </View>
  );
};

let IconName: Record<ModeProps, string> = {
  info: 'info',
  warning: 'info',
  error: 'close',
  success: 'check',
};

//  This kinda hacky
//  If we set the property in ToastContainer,
//  we get the "property does not exist error".
//  If we import the function and set the property here,
//  we get the circular dependency warning.

/**
 * Show a toast with the specified config.
 */
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
Toast.showToast = (config: ToastConfig) => {};
/**
 * Immidiately hide the currently visible toast.
 */
Toast.hideToast = () => {};

Toast.defaultProps = {
  mode: 'info',
  colors: {
    info: DefaultTheme.colors.accent,
    warning: '#ffce00',
    error: '#dc544b',
    success: '#27a163',
  },
};

let styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  container: {
    elevation: 6,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
    height: 42,
    borderRadius: 21,
    padding: 5,
    paddingRight: 16,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
});

export default Toast;
