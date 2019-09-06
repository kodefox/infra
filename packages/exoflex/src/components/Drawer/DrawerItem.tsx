import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Text from '../Text';

type Props = {
  label: string;
  active: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  // TODO: Icon?
  onPress: () => void;
};

export default function DrawerItem(props: Props) {
  let { label, labelStyle, active, style, onPress } = props;
  return (
    <TouchableRipple
      onPress={onPress}
      style={[
        styles.container,
        active && { backgroundColor: '#fafafa' },
        style,
      ]}
    >
      <Text style={labelStyle}>{label}</Text>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 19,
    paddingHorizontal: 12,
  },
});
