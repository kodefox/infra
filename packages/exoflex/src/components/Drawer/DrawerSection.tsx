import React, { ReactNode } from 'react';
import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { Avatar } from 'react-native-paper';

import { DefaultTheme } from '../../constants/themes';

import DrawerItem from './DrawerItem';

type Props = {
  headerMode: 'full' | 'circle';
  headerSource: ImageSourcePropType;
  children: ReactNode;
  footerLabel?: string;
  footerIcon?: string;
  footerOnPress?: () => void;
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
  } = props;

  const Header = () => {
    if (headerMode === 'circle') {
      return (
        <View
          style={styles.headerCircleWrapper}
          testID="drawerHeaderCircleImage"
        >
          <Avatar.Image size={72} source={headerSource} />
        </View>
      );
    }
    return (
      <View style={styles.headerFullWrapper} testID="drawerHeaderFullImage">
        <Image source={headerSource} style={styles.headerFullImage} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={{ flex: 1 }}>{children}</View>
      {footerLabel && (
        <DrawerItem
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
