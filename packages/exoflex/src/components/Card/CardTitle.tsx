import React from 'react';
import { View, StyleSheet, StyleProp, TextStyle } from 'react-native';

import Label from '../Label';
import Text from '../Text';

type Props = {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  subtitle?: string;
  subtitleStyle?: StyleProp<TextStyle>;
};

function CardTitle({
  titleStyle,
  title,
  subtitle,
  subtitleStyle,
  ...otherProps
}: Props) {
  return (
    <View {...otherProps} style={[styles.root]}>
      <View style={styles.titles}>
        {!!title && (
          <BukanTitle style={[styles.title, titleStyle]}>{title}</BukanTitle>
        )}
        {!!subtitle && (
          <Label style={[styles.subtitle, subtitleStyle]}>{subtitle}</Label>
        )}
      </View>
    </View>
  );
}

type BukanTitleProps = {
  children: string;
  style?: StyleProp<TextStyle>;
};

let BukanTitle = ({ ...otherProps }: BukanTitleProps) => (
  <Text weight="500" numberOfLines={1} {...otherProps} />
);

let styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  titles: {
    // flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'center',
    // height: 50,
  },
  title: {},
  subtitle: { marginTop: 2 },
});

export default CardTitle;
