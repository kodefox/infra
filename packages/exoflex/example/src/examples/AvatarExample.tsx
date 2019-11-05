import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Avatar } from 'exoflex';

import avatarImage from '../../assets/drawer_header.png';

function AvatarExample() {
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Avatar.Icon icon="home" style={styles.avatar} />
      <Avatar.Image source={avatarImage} style={styles.avatar} />
      <Avatar.Text label="EF" style={styles.avatar} />
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
  avatar: {
    marginVertical: 12,
  },
});

export default AvatarExample;
