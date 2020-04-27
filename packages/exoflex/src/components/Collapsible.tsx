import React, { useState, ReactNode, useCallback } from 'react';
import {
  Animated,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Platform,
  View,
  AccessibilityProps,
} from 'react-native';
import CollapsibleBase from 'react-native-collapsible';
import { useAnimation } from 'react-native-animation-hooks';

import AnimatedIcon from './AnimatedIcon';
import Text from './Text';
import useTheme from '../helpers/useTheme';

export type CollapsibleProps = AccessibilityProps & {
  title: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  titleContainerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  renderIconLeft?: null | ((animatedValue: Animated.Value) => ReactNode);
  renderIconRight?: null | ((animatedValue: Animated.Value) => ReactNode);
  disabled?: boolean;
  // NOTE: Deprecated prop, remove `isCollapsed` on v4.0
  isCollapsed?: boolean;
};

function Collapsible({
  title,
  style,
  titleStyle,
  titleContainerStyle,
  contentContainerStyle,
  iconStyle,
  renderIconLeft,
  renderIconRight,
  disabled,
  children,
  isCollapsed: isCollapsedProp,
  accessibilityRole,
  accessibilityState,
  ...otherAccessibilityProps
}: CollapsibleProps) {
  let { colors, style: themeStyle } = useTheme();
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

  if (isCollapsedProp) {
    // eslint-disable-next-line no-console
    console.warn(
      '`isCollapsed` props is deprecated. To control the Collapsible, please use Accordion component instead.',
    );
  }

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        themeStyle?.collapsible?.style,
        style,
      ]}
    >
      <TouchableOpacity
        {...otherAccessibilityProps}
        accessibilityRole={accessibilityRole || 'button'}
        accessibilityState={{ expanded: !isCollapsed, ...accessibilityState }}
        activeOpacity={0.9}
        onPress={toggleCollapsible}
        style={[
          styles.titleContainer,
          themeStyle?.collapsible?.titleContainerStyle,
          titleContainerStyle,
        ]}
        disabled={disabled}
      >
        {!!renderIconLeft ? renderIconLeft(animatedValue) : null}
        <Text
          style={[
            styles.title,
            themeStyle?.collapsible?.titleStyle,
            titleStyle,
          ]}
        >
          {title}
        </Text>
        {Object.is(renderIconRight, null) ? null : !!renderIconRight ? (
          renderIconRight(animatedValue)
        ) : (
          <AnimatedIcon
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
                themeStyle?.collapsible?.iconStyle,
                iconStyle,
              ] as StyleProp<ViewStyle>
            }
          />
        )}
      </TouchableOpacity>
      <CollapsibleBase
        collapsed={isCollapsed}
        style={[
          styles.contentContainer,
          themeStyle?.collapsible?.contentContainerStyle,
          contentContainerStyle,
        ]}
      >
        {children}
      </CollapsibleBase>
    </View>
  );
}

let styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 48,
  },
  title: {
    marginRight: 24,
    flex: 1,
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
