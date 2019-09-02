import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from './types';
import { DefaultTheme } from '../../constants/themes';

const DEFAULT_SIZE = 24;

let Check = (props: IconProps) => {
  let size = props.size || DEFAULT_SIZE;
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${30} ${30}`}>
      <Path
        d="M13.28 20.72a1.328 1.328 0 0 1-1.88 0l-4.787-4.787a1.329 1.329 0 0 1 1.88-1.88l3.84 3.84 9.174-9.173a1.329 1.329 0 1 1 1.88 1.88L13.28 20.72z"
        fill={props.fill || DefaultTheme.colors.placeholder}
        fill-rule="nonzero"
      />
      <Path d="M0 0h17.55v17.55H0z" fill="transparent" />
    </Svg>
  );
};

export default Check;
