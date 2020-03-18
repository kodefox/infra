import React, { useState } from 'react';
import { TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { RichRadio, Title, Text, IconButton } from 'exoflex';

const DATA = [
  { label: 'S', value: 'small' },
  { label: 'M', value: 'medium' },
  { label: 'L', value: 'large' },
];

const COLORS = [
  { label: 'Red', value: 'red' },
  { label: 'Green', value: 'green' },
  { label: 'Blue', value: 'blue' },
  { label: 'Purple', value: 'purple' },
  { label: 'Orange', value: 'orange' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Maroon', value: 'maroon' },
  { label: 'Grey', value: 'grey' },
  { label: 'Black', value: 'black' },
  { label: 'Brown', value: 'brown' },
];

function RichRadioButtonExample() {
  let [size, setSize] = useState('');
  let [color, setColor] = useState('');

  return (
    <ScrollView style={styles.root}>
      <Title style={{ marginBottom: 10 }}>Default</Title>
      <RichRadio.Group
        data={DATA}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <RichRadio.Item
            label={item.label}
            selected={item.value === size}
            onPress={() => setSize(item.value)}
          />
        )}
        style={{ marginBottom: 30 }}
      />
      <Title style={{ marginBottom: 10 }}>Long List</Title>
      <RichRadio.Group
        data={COLORS}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <RichRadio.Item
            label={item.label}
            selected={item.value === color}
            onPress={() => setColor(item.value)}
          />
        )}
        style={{ marginBottom: 30 }}
      />
      <Title style={{ marginBottom: 10 }}>Custom Selected Color</Title>
      <RichRadio.Group
        data={DATA}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <RichRadio.Item
            label={item.label}
            selected={item.value === size}
            selectedColor="red"
            onPress={() => setSize(item.value)}
          />
        )}
        style={{ marginBottom: 30 }}
      />
      <Title style={{ marginBottom: 10 }}>Custom Item Style</Title>
      <RichRadio.Group
        data={DATA}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <RichRadio.Item
            label={item.label}
            selected={item.value === size}
            onPress={() => setSize(item.value)}
            style={{ borderRadius: 20 }}
          />
        )}
        style={{ marginBottom: 30 }}
      />
      <Title style={{ marginBottom: 10 }}>Custom Text Style</Title>
      <RichRadio.Group
        data={DATA}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <RichRadio.Item
            label={item.label}
            selected={item.value === size}
            onPress={() => setSize(item.value)}
            textStyle={{
              color: 'red',
              fontSize: 24,
            }}
          />
        )}
        style={{ marginBottom: 30 }}
      />
      <Title style={{ marginBottom: 10 }}>Custom Item Component</Title>
      <RichRadio.Group
        data={DATA}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setSize(item.value)}
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: item.value === size ? 'blue' : 'gray',
              paddingVertical: 10,
              paddingHorizontal: 15,
            }}
          >
            <IconButton
              icon="home"
              size={14}
              style={{
                padding: 0,
                margin: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />

            <Text weight="bold" fontStyle="italic" style={{ marginLeft: 10 }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
        style={{ marginBottom: 30 }}
      />
    </ScrollView>
  );
}

RichRadioButtonExample.title = 'RichRadioButton';

let styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
});

export default RichRadioButtonExample;
