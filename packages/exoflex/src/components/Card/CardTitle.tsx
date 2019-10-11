import React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import Label from '../Label';
import Text from '../Text';

type Props = {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  subtitle?: string;
  subtitleStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
};

function CardTitle({
  titleStyle,
  title,
  subtitle,
  subtitleStyle,
  style,
  ...otherProps
}: Props) {
  return (
    <View {...otherProps} style={[styles.root, style]}>
      <View style={styles.titles}>
        {!!title && <Title style={titleStyle}>{title}</Title>}
        {!!subtitle && (
          <Label style={[styles.subtitle, subtitleStyle]}>{subtitle}</Label>
        )}
      </View>
    </View>
  );
}

CardTitle.displayName = 'Card.Title';

type TitleProps = {
  children: string;
  style?: StyleProp<TextStyle>;
};

// TODO: Discuss Typograhpy with designer
let Title = ({ ...otherProps }: TitleProps) => (
  <Text weight="500" numberOfLines={1} {...otherProps} />
);

let styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  titles: {},
  subtitle: { marginTop: 2 },
});

export default CardTitle;
