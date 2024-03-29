import React, { useCallback, useRef } from 'react';
import { Animated, View, Pressable } from 'react-native';
import Text from '../Text';
import ActivityIndicator from '../ActivityIndicator';
import IconButton from '../IconButton';

import { useButtonStyle } from './useButtonStyle';

import { ButtonProps } from './types';
import { styles } from './styles';
import useTheme from '../../helpers/useTheme';

export default function ButtonOpacity(props: ButtonProps) {
  let {
    preset,
    children,
    textPreset,
    uppercase,
    contentStyle,
    style,
    labelStyle,
    disabled,
    onPress,
    onPressIn,
    onPressOut,
    compact,
    color: buttonColor,
    loading,
    icon,
    accessibilityLabel,
    ...otherProps
  } = props;
  let { buttonStyle, textStyle, textColor } = useButtonStyle({
    preset,
    disabled,
    buttonColor,
  });
  let { style: themeStyle } = useTheme();

  const animatedOpacity = useRef(new Animated.Value(1)).current;
  const fadeOpacityIn = useCallback(() => {
    Animated.timing(animatedOpacity, {
      toValue: preset === 'primary' ? 0.8 : 0.5,
      duration: 100,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fadeOpacityOut = useCallback(() => {
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Pressable
      {...otherProps}
      onPress={onPress}
      onPressIn={(e) => {
        onPressIn && onPressIn(e);
        fadeOpacityIn();
      }}
      onPressOut={(e) => {
        onPressOut && onPressOut(e);
        fadeOpacityOut();
      }}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={disabled ? { disabled: true } : undefined}
    >
      <Animated.View
        style={[
          styles.button,
          compact && styles.compact,
          buttonStyle,
          style,
          { opacity: animatedOpacity },
        ]}
      >
        <View style={[styles.content, styles.contentWrapper, contentStyle]}>
          {icon && loading !== true && (
            <View style={styles.icon}>
              <IconButton icon={icon} size={16} iconColor={textColor} />
            </View>
          )}
          {loading && (
            <ActivityIndicator
              size={16}
              color={textColor}
              style={styles.icon}
            />
          )}
          {typeof children === 'string' ? (
            <Text
              preset={textPreset}
              weight={themeStyle?.button?.labelFontWeight}
              fontStyle={themeStyle?.button?.labelFontStyle}
              numberOfLines={1}
              style={[
                styles.label,
                compact && styles.compactLabel,
                uppercase && styles.uppercaseLabel,
                textStyle,
                labelStyle,
              ]}
            >
              {children}
            </Text>
          ) : (
            children
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
}
