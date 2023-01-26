import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { IconButton, Text } from 'exoflex';

function IconButtonExample() {
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Text>Regular IconButton</Text>
      <IconButton icon="camera" onPress={() => {}} />
      <Text>IconButton with custom color</Text>
      <IconButton icon="settings" onPress={() => {}} color="red" />
    </ScrollView>
  );
}

IconButtonExample.title = 'IconButton';

let styles = StyleSheet.create({
  root: {
    padding: 16,
    backgroundColor: '#eeeeee',
  },
});

export default IconButtonExample;
