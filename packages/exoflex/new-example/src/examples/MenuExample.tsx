import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu, Button, Divider } from 'exoflex';

function MenuExample() {
  let [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={<Button onPress={() => setVisible(true)}>Show menu</Button>}
      >
        <Menu.Item onPress={() => {}} title="Item 1" />
        <Menu.Item onPress={() => {}} title="Item 2" />
        <Divider />
        <Menu.Item onPress={() => {}} title="Item 3" />
      </Menu>
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

MenuExample.title = 'Menu';
export default MenuExample;
