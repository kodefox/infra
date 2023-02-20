import React from 'react';
import { View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Text from '../Text';
import ActivityIndicator from '../ActivityIndicator';
import IconButton from '../IconButton';

import { useButtonStyle } from './useButtonStyle';

import { ButtonProps } from './types';
import { styles } from './styles';
import useTheme from '../../helpers/useTheme';

export default function ButtonRipple(props: ButtonProps) {
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
    compact,
    color: buttonColor,
    loading,
    icon,
    accessibilityLabel,
    ...otherProps
  } = props;

  let { buttonStyle, textStyle, textColor, noShadowStyle } = useButtonStyle({
    preset,
    disabled,
    buttonColor,
  });
  let { style: themeStyle } = useTheme();

  return (
    <TouchableRipple
      {...otherProps}
      borderless
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={disabled ? { disabled: true } : undefined}
      style={[
        styles.button,
        compact && styles.compact,
        buttonStyle,
        noShadowStyle,
        style,
      ]}
    >
      <View style={[styles.content, styles.contentWrapper, contentStyle]}>
        {icon && loading !== true && (
          <View style={styles.icon}>
            <IconButton icon={icon} size={16} iconColor={textColor} />
          </View>
        )}
        {loading && (
          <ActivityIndicator size={16} color={textColor} style={styles.icon} />
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
    </TouchableRipple>
  );
}
