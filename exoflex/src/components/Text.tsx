import React, { Component } from 'react';
import { Text as TextNative, TextProps } from 'react-native';

import resolveTextStyle from '../helpers/resolveTextStyle';
import { FontWeight, FontStyle } from '../types';

type Props = TextProps & {
  preset: string;
  weight: FontWeight;
  fontStyle: FontStyle;
};

class Text extends Component<Props> {
  static defaultProps = {
    preset: 'default',
    weight: '400',
    fontStyle: 'normal',
  };

  render() {
    let { preset, weight, fontStyle, style, ...otherProps } = this.props;

    let resolvedTextStyle = resolveTextStyle({}, preset, weight, fontStyle);

    return <TextNative {...otherProps} style={[resolvedTextStyle, style]} />;
  }
}

export default Text;
