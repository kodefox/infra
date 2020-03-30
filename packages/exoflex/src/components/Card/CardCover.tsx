import React from 'react';
import {
  StyleSheet,
  StyleProp,
  View,
  Image,
  ImageProps,
  ViewStyle,
} from 'react-native';

import useTheme from '../../helpers/useTheme';

type Props = ImageProps & {
  style?: StyleProp<ViewStyle>;
};

function CardCover({ style, ...otherProps }: Props) {
  let { colors } = useTheme();
  return (
    <View style={[styles.root, { backgroundColor: colors.disabled }, style]}>
      <Image {...otherProps} style={styles.image} />
    </View>
  );
}

CardCover.displayName = 'Card.Cover';

let styles = StyleSheet.create({
  root: {
    height: 160,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    padding: 16,
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
});

export default CardCover;
