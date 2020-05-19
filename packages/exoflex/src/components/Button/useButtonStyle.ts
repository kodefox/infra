import { TextStyle, ViewStyle } from 'react-native';
import color from 'color';

import useTheme from '../../helpers/useTheme';
import { ButtonPresets } from './types';

type Options = {
  preset: keyof ButtonPresets;
  disabled?: boolean;
  buttonColor?: string;
};

export function useButtonStyle(options: Options) {
  let { preset, disabled, buttonColor } = options;
  let { colors, roundness } = useTheme();

  let elevation = 0;
  let textColor = colors.text;
  let backgroundColor = 'transparent';
  let borderColor = 'transparent';
  let borderWidth = 0;

  if (preset === 'primary') {
    elevation = 2;
    backgroundColor = disabled
      ? color(colors.primary).alpha(0.12).rgb().string()
      : !!buttonColor
      ? buttonColor
      : colors.primary;
  } else if (preset === 'secondary') {
    borderColor = disabled
      ? color(colors.primary).alpha(0.4).rgb().string()
      : colors.primary;
    borderWidth = 2;
  }

  let isBackgroundDark =
    backgroundColor === 'transparent' ? false : color(backgroundColor).isDark();
  if (disabled) {
    textColor = color(isBackgroundDark ? 'white' : colors.primary)
      .alpha(0.4)
      .rgb()
      .string();
  } else if (preset === 'primary') {
    textColor = isBackgroundDark ? 'white' : 'black';
  } else if (buttonColor) {
    textColor = buttonColor;
  } else {
    textColor = colors.primary;
  }

  let textStyle = { color: textColor } as TextStyle;
  let buttonStyle = {
    backgroundColor,
    borderColor,
    borderWidth,
    borderRadius: roundness,
    elevation: disabled ? 0 : elevation,
  } as ViewStyle;
  let noShadowStyle = {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'transparent',
  } as ViewStyle;

  return { textStyle, buttonStyle, noShadowStyle, textColor };
}
