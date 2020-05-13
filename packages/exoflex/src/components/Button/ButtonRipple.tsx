import React from 'react';
import { View, StyleSheet } from 'react-native';
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
      accessibilityLabel={accessibilityLabel}
      accessibilityTraits={disabled ? ['button', 'disabled'] : 'button'}
      accessibilityComponentType="button"
      accessibilityRole="button"
      accessibilityStates={disabled ? ['disabled'] : []}
      style={[
        localStyles.button,
        compact && localStyles.compact,
        buttonStyle,
        noShadowStyle,
        style,
      ]}
    >
      <View style={[localStyles.content, styles.contentWrapper, contentStyle]}>
        {icon && loading !== true && (
          <View style={localStyles.icon}>
            <IconButton icon={icon} size={16} color={textColor} />
          </View>
        )}
        {loading && (
          <ActivityIndicator
            size={16}
            color={textColor}
            style={localStyles.icon}
          />
        )}
        {typeof children === 'string' ? (
          <Text
            preset={textPreset}
            weight="500"
            numberOfLines={1}
            style={[
              localStyles.label,
              compact && localStyles.compactLabel,
              uppercase && localStyles.uppercaseLabel,
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

const localStyles = StyleSheet.create({
  button: {
    minWidth: 64,
    borderStyle: 'solid',
  },
  compact: {
    minWidth: 'auto',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 21,
  },
  label: {
    textAlign: 'center',
    letterSpacing: 1,
    marginVertical: 9,
    marginHorizontal: 16,
  },
  compactLabel: {
    marginHorizontal: 8,
  },
  uppercaseLabel: {
    textTransform: 'uppercase',
  },
});
