import React, { useState, ReactNode, useCallback } from 'react';
import {
  Animated,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import CollapsibleBase from 'react-native-collapsible';
import { IconButton } from 'react-native-paper';
import { useAnimation } from 'react-native-animation-hooks';

import Text from './Text';
import { useTheme } from './Provider';

type Props = {
  title: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
};

let AnimatedIconButton: typeof IconButton = Animated.createAnimatedComponent(
  IconButton,
);

function Collapsible({
  title,
  style,
  titleStyle,
  contentContainerStyle,
  iconStyle,
  ...otherProps
}: Props) {
  let { colors } = useTheme();
  let [isCollapsed, setCollapsed] = useState(true);

  let toggleCollapsible = useCallback(() => {
    setCollapsed((c) => !c);
  }, []);

  let arrowRotation = useAnimation({
    type: 'timing',
    initialValue: -0.5,
    toValue: isCollapsed ? -0.5 : 0.5,
    duration: 300,
  });

  return (
    <Animated.View
      style={[
        styles.root,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={toggleCollapsible}
        style={styles.titleContainer}
      >
        <Text numberOfLines={1} style={[styles.title, titleStyle]}>
          {title}
        </Text>
        <AnimatedIconButton
          icon="chevron-right"
          style={
            [
              styles.icon,
              {
                transform: [
                  {
                    rotate: arrowRotation.interpolate({
                      inputRange: [-0.5, 0.5],
                      outputRange: ['-90deg', '90deg'],
                    }),
                  },
                ],
              },
              iconStyle,
            ] as StyleProp<ViewStyle>
          }
        />
      </TouchableOpacity>
      <CollapsibleBase
        collapsed={isCollapsed}
        style={[styles.contentContainer, contentContainerStyle]}
        {...otherProps}
      />
    </Animated.View>
  );
}

let styles = StyleSheet.create({
  root: {
    borderWidth: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    marginRight: 24,
  },
  icon: {
    position: 'absolute',
    right: 0,
  },
  contentContainer: {
    padding: 16,
  },
});

export default Collapsible;
