import React from 'react';
import { Button as PaperButton } from 'react-native-paper';
import Text from '../Text';

import useTheme from '../../helpers/useTheme';

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
    ...buttonProps
  } = props;
  let { colors } = useTheme();
  let mode = PRESETS[preset];

  return (
    <PaperButton
      mode={mode}
      uppercase={uppercase}
      contentStyle={[styles.contentWrapper, contentStyle]}
      style={[
        preset === 'secondary' && {
          borderWidth: 2,
          borderColor: colors.primary,
        },
        disabled && { opacity: 0.4 },
        style,
      ]}
      onPress={!disabled ? onPress : undefined}
      {...buttonProps}
    >
      {typeof children === 'string' ? (
        <Text preset={textPreset} weight="500" style={labelStyle}>
          {uppercase ? children.toUpperCase() : children}
        </Text>
      ) : (
        children
      )}
    </PaperButton>
  );
}
