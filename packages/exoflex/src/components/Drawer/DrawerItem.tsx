import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { TouchableRipple, IconButton } from 'react-native-paper';
import Text from '../Text';

type Props = {
  label: string;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  icon?: string;
  onPress: () => void;
};

export default function DrawerItem(props: Props) {
  let { label, labelStyle, active, style, icon, onPress } = props;
  return (
    <TouchableRipple
      onPress={onPress}
      style={[
        styles.container,
        active && { backgroundColor: '#fafafa' },
        style,
      ]}
    >
      <>
        {icon && <IconButton icon={icon} style={styles.icon} />}
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      </>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 19,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    // NOTE: Because IconButton from paper has `margin: 6`
    margin: -6,
  },
  label: {
    paddingLeft: 12,
  },
});
