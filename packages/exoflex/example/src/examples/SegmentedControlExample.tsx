import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { SegmentedControl, DefaultTheme } from 'exoflex';

function SegmentedControlExample() {
  let [selectedIndexA, setSelectedIndexA] = useState(0);
  let [selectedIndexB, setSelectedIndexB] = useState(0);
  let [selectedIndexC, setSelectedIndexC] = useState(0);
  let [selectedIndexD, setSelectedIndexD] = useState(0);

  let spacing = <View style={{ height: 10 }} />;

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Text>Default</Text>
      <SegmentedControl
        activeIndex={selectedIndexA}
        values={['One', 'Two']}
        onIndexChange={(selectedIndex: number) =>
          setSelectedIndexA(selectedIndex)
        }
      />
      {spacing}
      <SegmentedControl
        activeIndex={selectedIndexB}
        values={['One', 'Two', 'Three']}
        onIndexChange={(selectedIndex: number) =>
          setSelectedIndexB(selectedIndex)
        }
        indicatorStyle={{ backgroundColor: 'tomato' }}
        textStyle={{ color: 'tomato' }}
      />
      {spacing}
      <SegmentedControl
        activeIndex={selectedIndexC}
        values={['One', 'Two', 'Three', 'Four']}
        onIndexChange={(selectedIndex: number) =>
          setSelectedIndexC(selectedIndex)
        }
        indicatorStyle={{
          borderColor: 'tomato',
          borderWidth: 1,
          height: 30,
          borderRadius: 4,
        }}
        style={{ height: 32, borderRadius: 4 }}
      />
      {spacing}
      <Text>Border</Text>
      <SegmentedControl
        mode="border"
        activeIndex={selectedIndexA}
        values={['One', 'Two']}
        onIndexChange={(selectedIndex: number) =>
          setSelectedIndexA(selectedIndex)
        }
      />
      {spacing}
      <SegmentedControl
        mode="border"
        activeIndex={selectedIndexB}
        values={['One', 'Two', 'Three']}
        onIndexChange={(selectedIndex: number) =>
          setSelectedIndexB(selectedIndex)
        }
        style={{
          height: 30,
          borderRadius: 4,
          borderColor: '#000',
          borderWidth: 4,
        }}
        indicatorStyle={{ height: 30, backgroundColor: 'tomato' }}
        dividerWidth={4}
      />

      {spacing}
      <SegmentedControl
        mode="border"
        activeIndex={selectedIndexC}
        values={['One', 'Two', 'Three', 'Four']}
        onIndexChange={(selectedIndex: number) =>
          setSelectedIndexC(selectedIndex)
        }
        style={{ height: 30, borderRadius: 4, borderColor: 'grey' }}
        dividerColor="grey"
      />
      {spacing}
      <Text>IOS 13</Text>
      <SegmentedControl
        mode="ios-13"
        activeIndex={selectedIndexA}
        values={['One', 'Two']}
        onIndexChange={(selectedIndex: number) =>
          setSelectedIndexA(selectedIndex)
        }
      />
      {spacing}
      <SegmentedControl
        mode="ios-13"
        activeIndex={selectedIndexB}
        values={['One', 'Two', 'Three']}
        onIndexChange={(selectedIndex: number) =>
          setSelectedIndexB(selectedIndex)
        }
        style={{
          borderWidth: 4,
          height: 38,
          backgroundColor: '#34495e',
          borderColor: '#34495e',
        }}
        textStyle={{ color: '#fff' }}
        dividerWidth={2}
      />
      {spacing}
      <SegmentedControl
        mode="ios-13"
        activeIndex={selectedIndexC}
        values={['One', 'Two', 'Three', 'Four']}
        onIndexChange={(selectedIndex: number) =>
          setSelectedIndexC(selectedIndex)
        }
        dividerColor="red"
      />
    </ScrollView>
  );
}

SegmentedControlExample.title = 'SegmentedControl';

let styles = StyleSheet.create({
  root: {
    padding: 16,
    backgroundColor: 'white',
  },
});

export default SegmentedControlExample;
