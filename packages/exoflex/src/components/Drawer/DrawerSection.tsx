import React, { ReactNode } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ImageSourcePropType,
  AccessibilityProps,
  AccessibilityRole,
  AccessibilityState,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import DrawerItem from './DrawerItem';

import { DefaultTheme } from '../../constants/themes';
import { IS_MOBILE } from '../../constants/platforms';

type Props = AccessibilityProps & {
  headerMode: 'full' | 'circle';
  headerSource: ImageSourcePropType;
  children: ReactNode;
  footerLabel?: string;
  footerIcon?: string;
  footerOnPress?: () => void;
  footerAccessibilityLabel?: string;
  footerAccessibilityHint?: string;
  footerAccessibilityRole?: AccessibilityRole;
  footerAccessibilityState?: AccessibilityState;
};

const emptyFn = () => {};

export default function DrawerSection(props: Props) {
  let {
    headerMode,
    headerSource,
    children,
    footerLabel,
    footerIcon,
    footerOnPress,
    accessibilityLabel,
    accessibilityRole,
    footerAccessibilityLabel,
    footerAccessibilityHint,
    footerAccessibilityRole,
    footerAccessibilityState,
    ...otherProps
  } = props;

  let defaultFooterAccessibilityRole = (IS_MOBILE ? 'menuitem' : 'link') as
    | 'menuitem'
    | 'link';

  const Header = () => {
    if (headerMode === 'circle') {
      return (
        <View
          accessibilityRole="header"
          style={styles.headerCircleWrapper}
          testID="drawerHeaderCircleImage"
        >
          <Avatar.Image size={72} source={headerSource} />
        </View>
      );
    }
    return (
      <View
        accessibilityRole="header"
        style={styles.headerFullWrapper}
        testID="drawerHeaderFullImage"
      >
        <Image source={headerSource} style={styles.headerFullImage} />
      </View>
    );
  };

  return (
    <View
      {...otherProps}
      accessibilityRole={accessibilityRole || 'menubar'}
      style={styles.container}
    >
      <Header />
      <View style={{ flex: 1 }}>{children}</View>
      {footerLabel && (
        <DrawerItem
          accessibilityRole={
            footerAccessibilityRole || defaultFooterAccessibilityRole
          }
          accessibilityState={footerAccessibilityState}
          label={footerLabel}
          icon={footerIcon}
          onPress={footerOnPress || emptyFn}
        />
      )}
    </View>
  );
}

DrawerSection.defaultProps = {
  headerMode: 'full',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DefaultTheme.colors.surface,
  },
  headerFullWrapper: {
    width: '100%',
    height: 135,
  },
  headerCircleWrapper: {
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerFullImage: {
    width: '100%',
    height: '100%',
  },
});
