import React, { ReactNode } from 'react';
import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { Avatar } from 'react-native-paper';

type Props = {
  headerMode: 'full' | 'circle';
  headerSource: ImageSourcePropType;
  children: ReactNode;
};

export default function DrawerSection(props: Props) {
  let { headerMode, headerSource, children } = props;

  const Header = () => {
    if (headerMode === 'circle') {
      return (
        <View style={styles.headerCircleWrapper}>
          <Avatar.Image size={72} source={headerSource} />
        </View>
      );
    }
    return (
      <View style={styles.headerFullWrapper}>
        <Image source={headerSource} style={styles.headerFullImage} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      {children}
    </View>
  );
}

DrawerSection.defaultProps = {
  headerMode: 'full',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
