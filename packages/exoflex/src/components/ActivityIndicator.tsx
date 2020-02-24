import React, { ComponentProps } from 'react';
import { ActivityIndicator as PaperActivityIndicator } from 'react-native-paper';

import useTheme from '../helpers/useTheme';

export type ActivityIndicatorProps = ComponentProps<
  typeof PaperActivityIndicator
>;

export default function ActivityIndicator(props: ActivityIndicatorProps) {
  let { style: themeStyle } = useTheme();
  let { style, ...otherProps } = props;
  return (
    <PaperActivityIndicator
      style={[themeStyle?.activityIndicator?.style, style]}
      {...otherProps}
    />
  );
}
