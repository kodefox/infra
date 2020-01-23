import React, { useMemo, ReactNode } from 'react';
import { Text as TextNative, TextProps, StyleSheet } from 'react-native';

import resolveTextStyle from '../helpers/resolveTextStyle';
import useTheme from '../helpers/useTheme';
import { FontWeight, FontStyle } from '../types';

export type Props = TextProps & {
  children?: ReactNode;
  uppercase?: boolean;
  preset: string;
  weight: FontWeight;
  fontStyle: FontStyle;
};

function Text({
  uppercase: isUppercase,
  preset,
  weight,
  fontStyle,
  style,
  ...otherProps
}: Props) {
  let { colors, fonts } = useTheme();

  let resolvedTextStyle = useMemo(
    () => resolveTextStyle(fonts || {}, preset, weight, fontStyle),
    [fonts, preset, weight, fontStyle],
  );

  return (
    <TextNative
      {...otherProps}
      style={[
        resolvedTextStyle,
        { color: colors.text },
        isUppercase && styles.uppercaseLabel,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  uppercaseLabel: {
    textTransform: 'uppercase',
  },
});

Text.defaultProps = {
  preset: 'default',
  weight: '400',
  fontStyle: 'normal',
};

export default Text;
