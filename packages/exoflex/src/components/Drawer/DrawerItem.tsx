import React from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  AccessibilityProps,
  View,
} from 'react-native';
import { TouchableRipple, IconButton } from 'react-native-paper';
import Text from '../Text';
import useTheme from '../../helpers/useTheme';
import { IS_MOBILE } from '../../constants/platforms';

export type DrawerItemProps = AccessibilityProps & {
  label: string;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  icon?: string;
  onPress: () => void;
  testID?: string;
};

export default function DrawerItem(props: DrawerItemProps) {
  const { style: themeStyle } = useTheme();
  let {
    label,
    labelStyle,
    active,
    style,
    icon,
    onPress,
    testID,
    accessibilityRole,
    accessibilityState,
    ...otherAcessibilityProps
  } = props;

  let defaultAccessibilityRole = (IS_MOBILE ? 'menuitem' : 'link') as
    | 'menuitem'
    | 'link';

  return (
    <View
      {...otherAcessibilityProps}
      accessibilityRole={accessibilityRole || defaultAccessibilityRole}
      accessibilityState={{ selected: active, ...accessibilityState }}
    >
      <TouchableRipple
        onPress={onPress}
        style={[
          styles.container,
          themeStyle?.drawerItem?.style,
          active && { backgroundColor: '#fafafa' },
          style,
        ]}
        testID={testID}
      >
        <>
          {icon && <IconButton icon={icon} style={styles.icon} />}
          <Text
            style={[
              styles.label,
              themeStyle?.drawerItem?.labelStyle,
              labelStyle,
            ]}
          >
            {label}
          </Text>
        </>
      </TouchableRipple>
    </View>
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
