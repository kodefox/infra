import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Chip } from 'exoflex';
import { View } from 'react-native';

let Spacing = () => <View style={styles.spacing} />;

function ChipExample() {
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Chip onPress={() => {}}>Active</Chip>
      <Spacing />
      <Chip onPress={() => {}} mode="inactive">
        Inactive
      </Chip>
      <Spacing />
      <Chip onPress={() => {}} icon="close">
        Active
      </Chip>
    </ScrollView>
  );
}

ChipExample.title = 'Chip';

let styles = StyleSheet.create({
  root: {
    padding: 16,
    backgroundColor: '#eeeeee',
    alignItems: 'flex-start',
  },
  spacing: {
    marginVertical: 4,
  },
});

export default ChipExample;
