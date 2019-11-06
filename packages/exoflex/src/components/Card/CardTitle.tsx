import React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { Label, Paragraph } from '../Typography';

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
      <View>
        {!!title && (
          <Paragraph weight="500" numberOfLines={1} style={titleStyle}>
            {title}
          </Paragraph>
        )}
        {!!subtitle && (
          <Label style={[styles.subtitle, subtitleStyle]}>{subtitle}</Label>
        )}
      </View>
    </View>
  );
}

CardTitle.displayName = 'Card.Title';

let styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  subtitle: {
    marginTop: 2,
    // TODO: This color should use colors.text with 0.6 opacity.
    color: '#757575',
  },
});

export default CardTitle;
