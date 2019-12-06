import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Badge, Button } from 'exoflex';

function BadgeExample() {
  let [visible, setVisibility] = useState(true);
  let Spacing = () => <View style={{ height: 10 }} />;
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <View>
        <Badge visible={visible}>2</Badge>
        <Spacing />
        <Badge
          visible={visible}
          style={{ backgroundColor: 'blue', color: 'tomato' }}
          size={30}
        >
          10
        </Badge>
        <Spacing />
        <Badge visible={visible} style={{ backgroundColor: 'cyan' }}>
          999+
        </Badge>
        <Spacing />
        <Button onPress={() => setVisibility(!visible)}>
          Toggle Visibility
        </Button>
      </View>
    </ScrollView>
  );
}

BadgeExample.title = 'Badge';

let styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
});

export default BadgeExample;
