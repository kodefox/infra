import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar } from 'exoflex';

import avatarImage from '../../assets/drawer_header.png';

function AvatarExample() {
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <View style={styles.row}>
        <Avatar.Icon icon="home" style={styles.avatar} size={48} />
        <Avatar.Icon icon="home" style={styles.avatar} size={56} />
        <Avatar.Icon icon="home" style={styles.avatar} />
      </View>
      <View style={styles.row}>
        <Avatar.Image source={avatarImage} style={styles.avatar} size={48} />
        <Avatar.Image source={avatarImage} style={styles.avatar} size={56} />
        <Avatar.Image source={avatarImage} style={styles.avatar} />
      </View>
      <View style={styles.row}>
        <Avatar.Text label="EF" style={styles.avatar} size={48} />
        <Avatar.Text label="EF" style={styles.avatar} size={56} />
        <Avatar.Text label="EF" style={styles.avatar} />
      </View>
    </ScrollView>
  );
}

AvatarExample.title = 'Avatar';

let styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginVertical: 24,
    marginHorizontal: 12,
  },
});

export default AvatarExample;
