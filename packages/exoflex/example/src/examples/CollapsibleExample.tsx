import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Collapsible, Text } from 'exoflex';

function CollapsibleExample() {
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Collapsible title="Press Me" isCollapsed={true}>
        <Text>Hello!</Text>
      </Collapsible>
    </ScrollView>
  );
}

CollapsibleExample.title = 'Collapsible';

let styles = StyleSheet.create({
  root: {
    padding: 16,
    backgroundColor: '#eeeeee',
  },
});

export default CollapsibleExample;
