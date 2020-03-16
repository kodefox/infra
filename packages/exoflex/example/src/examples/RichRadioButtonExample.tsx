import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RichRadioButton, Title, Text, IconButton } from 'exoflex';

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
      <RichRadioButton
        data={DATA}
        selectedValue={size}
        onValueChanged={setSize}
        style={{ marginBottom: 30 }}
      />
      <Title style={{ marginBottom: 10 }}>Long List</Title>
      <RichRadioButton
        data={COLORS}
        selectedValue={color}
        onValueChanged={setColor}
        style={{ marginBottom: 30, marginHorizontal: -16 }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
      <Title style={{ marginBottom: 10 }}>Custom Selected Color</Title>
      <RichRadioButton
        data={DATA}
        selectedValue={size}
        selectedColor="red"
        onValueChanged={setSize}
        style={{ marginBottom: 30 }}
      />
      <Title style={{ marginBottom: 10 }}>Custom Item Style</Title>
      <RichRadioButton
        data={DATA}
        selectedValue={size}
        onValueChanged={setSize}
        style={{ marginBottom: 30 }}
        itemStyle={{ borderRadius: 20 }}
      />
      <Title style={{ marginBottom: 10 }}>Custom Text Style</Title>
      <RichRadioButton
        data={DATA}
        selectedValue={size}
        onValueChanged={setSize}
        style={{ marginBottom: 30 }}
        textStyle={{
          color: 'red',
          fontSize: 24,
        }}
      />
      <Title style={{ marginBottom: 10 }}>Custom Item Component</Title>
      <RichRadioButton
        data={DATA}
        selectedValue={size}
        onValueChanged={setSize}
        renderCustomItemContent={(label) => (
          <View style={{ flexDirection: 'row' }}>
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
            <Text fontStyle="italic" weight="bold" style={{ marginLeft: 10 }}>
              {label}
            </Text>
          </View>
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
