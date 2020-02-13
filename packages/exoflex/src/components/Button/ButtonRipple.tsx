import React from 'react';
import { Button as PaperButton } from 'react-native-paper';

import Text from '../Text';

import { useButtonStyle } from './useButtonStyle';
import { ButtonProps } from './types';
import { PRESETS } from './presets';
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
    color: buttonColor,
    ...otherProps
  } = props;

  let { buttonStyle, textStyle, noShadowStyle } = useButtonStyle({
    preset,
    disabled,
    buttonColor,
  });
  let mode = PRESETS[preset];

  return (
    <PaperButton
      mode={mode}
      uppercase={uppercase}
      contentStyle={[styles.contentWrapper, contentStyle]}
      style={[buttonStyle, noShadowStyle, style]}
      onPress={!disabled ? onPress : undefined}
      {...otherProps}
    >
      {typeof children === 'string' ? (
        <Text
          preset={textPreset}
          weight="500"
          numberOfLines={1}
          style={[textStyle, labelStyle]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </PaperButton>
  );
}
