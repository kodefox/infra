import React, { ComponentProps } from 'react';
import { Animated } from 'react-native';
import { IconButton } from 'react-native-paper';

function AnimatedIcon({
  style,
  ...otherProps
}: ComponentProps<typeof IconButton>) {
  return (
    <Animated.View style={style}>
      {/* TODO: Replace with react-native-paper Icon component */}
      <IconButton {...otherProps} />
    </Animated.View>
  );
}

export default AnimatedIcon;
