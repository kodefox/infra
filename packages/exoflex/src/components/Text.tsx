import React, { useMemo } from 'react';
import { Text as TextNative, TextProps } from 'react-native';

import resolveTextStyle from '../helpers/resolveTextStyle';
import { FontWeight, FontStyle } from '../types';
import { useFonts } from './Font';

type Props = TextProps & {
  preset: string;
  weight: FontWeight;
  fontStyle: FontStyle;
};

function Text({ preset, weight, fontStyle, style, ...otherProps }: Props) {
  let fonts = useFonts();

  let resolvedTextStyle = useMemo(
    () => resolveTextStyle(fonts || {}, preset, weight, fontStyle),
    [fonts, preset, weight, fontStyle],
  );

  return <TextNative {...otherProps} style={[resolvedTextStyle, style]} />;
}

Text.defaultProps = {
  preset: 'default',
  weight: '400',
  fontStyle: 'normal',
};

export default Text;
