import React, { useState, ReactNode, useCallback } from 'react';
import {
  Animated,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import CollapsibleBase from 'react-native-collapsible';
import { IconButton } from 'react-native-paper';
import { useAnimation } from 'react-native-animation-hooks';

import Text from './Text';
import useTheme from '../helpers/useTheme';

type Props = {
  title: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  renderIconLeft?: (animatedValue: Animated.Value) => ReactNode;
  renderIconRight?: (animatedValue: Animated.Value) => ReactNode;
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
  renderIconLeft,
  renderIconRight,
  ...otherProps
}: Props) {
  let { colors } = useTheme();
  let [isCollapsed, setCollapsed] = useState(true);

  let toggleCollapsible = useCallback(() => {
    setCollapsed((c) => !c);
  }, []);

  let animatedValue = useAnimation({
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
        {!!renderIconLeft ? renderIconLeft(animatedValue) : null}
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        {renderIconRight === null ? null : !!renderIconRight ? (
          renderIconRight(animatedValue)
        ) : (
          <AnimatedIconButton
            icon="chevron-right"
            style={
              [
                styles.icon,
                {
                  transform: [
                    {
                      rotate: animatedValue.interpolate({
                        inputRange: [-0.5, 0.5],
                        outputRange: ['90deg', '-90deg'],
                      }),
                    },
                  ],
                },
                iconStyle,
              ] as StyleProp<ViewStyle>
            }
          />
        )}
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
    paddingHorizontal: 16,
    height: 48,
  },
  title: {
    marginRight: 24,
    flexWrap: 'wrap',
  },
  icon: {
    margin: 0,
    ...Platform.select({
      web: {},
      default: { position: 'absolute', right: 5, alignSelf: 'center' },
    }),
  },
  contentContainer: {
    padding: 16,
  },
});

export default Collapsible;
