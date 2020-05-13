import React from 'react';
import { View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Text from '../Text';
import ActivityIndicator from '../ActivityIndicator';
import IconButton from '../IconButton';

import { useButtonStyle } from './useButtonStyle';

import { ButtonProps } from './types';
import { styles } from './styles';

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

  return (
    <TouchableRipple
      {...otherProps}
      borderless
      onPress={onPress}
      disabled={disabled}
      accessibilityTraits={disabled ? ['button', 'disabled'] : 'button'}
      accessibilityComponentType="button"
      accessibilityRole="button"
      accessibilityStates={disabled ? ['disabled'] : []}
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
            <IconButton icon={icon} size={16} color={textColor} />
          </View>
        )}
        {loading && (
          <ActivityIndicator size={16} color={textColor} style={styles.icon} />
        )}
        {typeof children === 'string' ? (
          <Text
            preset={textPreset}
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
