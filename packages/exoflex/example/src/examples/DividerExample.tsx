import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Divider } from 'exoflex';

function DividerExample() {
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Text weight="bold">Horizontal Divider</Text>
      <View>
        <Text style={styles.text}>Item 1</Text>
        <Divider />
        <Text style={styles.text}>Item 2</Text>
      </View>
      <Text weight="bold">Vertical Divider</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Text style={[styles.text]}>Item 1</Text>
        <Divider mode="vertical" />
        <Text style={[styles.text]}>Item 2</Text>
      </View>
    </ScrollView>
  );
}

DividerExample.title = 'Divider';

let styles = StyleSheet.create({
  root: {
    padding: 16,
    backgroundColor: '#eeeeee',
  },
  text: {
    marginVertical: 10,
  },
});

export default DividerExample;
