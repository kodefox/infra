import React, { ComponentClass } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  StyleProp,
  Animated,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import BaseAccordion, {
  AccordionProps as BaseAccordionProps,
} from 'react-native-collapsible/Accordion';
import { TouchableRipple } from 'react-native-paper';
import { useAnimation } from 'react-native-animation-hooks';

import useTheme from '../helpers/useTheme';
import AnimatedIcon from './AnimatedIcon';
import Text from './Text';

type AdditionalHeaderProps = {
  renderIconLeft?: ((animation: Animated.Value) => void) | null;
  renderIconRight?: ((animation: Animated.Value) => void) | null;
  titleContainerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ViewStyle>;
};

export type Title = {
  title?: string;
};

export type AccordionProps<T> = Omit<BaseAccordionProps<T>, 'renderHeader'> &
  AdditionalHeaderProps & {
    renderHeader?: (
      content: T,
      index: number,
      isActive: boolean,
      sections: Array<T>,
    ) => React.ReactElement<{}>;
    useRipple?: boolean;
  };

type Header<T extends Title> = AdditionalHeaderProps & {
  content: T;
  index: number;
  isActive: boolean;
};

const ARROW_DIRECTION = {
  UP: -0.5,
  DOWN: 0.5,
};

export default function Accordion<T extends Title>(props: AccordionProps<T>) {
  let {
    activeSections,
    renderIconLeft,
    renderIconRight,
    titleContainerStyle,
    titleStyle,
    iconStyle,
    renderHeader: renderHeaderProps,
    onChange,
    useRipple = false,
    containerStyle,
    sectionContainerStyle,
    ...otherProps
  } = props;
  let { colors, style: themeStyle } = useTheme();

  let renderHeader = (content: T, index: number, isActive: boolean) => (
    <Header
      content={content}
      index={index}
      isActive={isActive}
      renderIconLeft={renderIconLeft}
      renderIconRight={renderIconRight}
      titleContainerStyle={[
        themeStyle?.accordion?.titleContainerStyle,
        titleContainerStyle,
      ]}
      titleStyle={[themeStyle?.accordion?.titleStyle, titleStyle]}
      iconStyle={[themeStyle?.accordion?.iconStyle, iconStyle]}
    />
  );

  let touchableComponent = useRipple
    ? ((TouchableRipple as unknown) as ComponentClass)
    : TouchableOpacity;

  return (
    <BaseAccordion
      containerStyle={[themeStyle?.accordion?.containerStyle, containerStyle]}
      activeSections={activeSections}
      onChange={onChange}
      touchableComponent={touchableComponent}
      renderHeader={renderHeaderProps || renderHeader}
      sectionContainerStyle={[
        styles.root,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        themeStyle?.accordion?.sectionContainerStyle,
        sectionContainerStyle,
      ]}
      {...otherProps}
    />
  );
}

function Header<T extends Title>({
  content,
  isActive,
  renderIconLeft,
  renderIconRight,
  titleContainerStyle,
  titleStyle,
  iconStyle,
}: Header<T>) {
  let animatedValue = useAnimation({
    useNativeDriver: true,
    type: 'timing',
    initialValue: ARROW_DIRECTION.DOWN,
    toValue: isActive ? ARROW_DIRECTION.UP : ARROW_DIRECTION.DOWN,
    duration: 300,
  });

  let DefaultIcon = (
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
                  outputRange: ['-90deg', '90deg'],
                }),
              },
            ],
          },
          iconStyle,
        ] as StyleProp<ViewStyle>
      }
    />
  );

  return (
    <View style={[styles.titleContainer, titleContainerStyle]}>
      <>
        {!!renderIconLeft && renderIconLeft(animatedValue)}
        <Text style={[styles.title, titleStyle]}>
          {content && content.title}
        </Text>
        {Object.is(renderIconRight, null)
          ? null
          : !!renderIconRight
          ? renderIconRight(animatedValue)
          : DefaultIcon}
      </>
    </View>
  );
}

let styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    width: '100%',
  },
  titleContainer: {
    backgroundColor: 'white',
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
});
