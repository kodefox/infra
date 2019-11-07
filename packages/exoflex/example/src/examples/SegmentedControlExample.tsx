import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SegmentedControl, DefaultTheme } from 'exoflex';

function SegmentedControlExample() {
  let [selectedIndexA, setSelectedIndexA] = useState(0);
  let [selectedIndexB, setSelectedIndexB] = useState(0);
  let [selectedIndexC, setSelectedIndexC] = useState(0);
  let [selectedIndexD, setSelectedIndexD] = useState(0);

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <SegmentedControl
        activeIndex={selectedIndexA}
        values={['One', 'Two', 'Three']}
        onIndexChange={(selectedIndex: number) =>
          setSelectedIndexA(selectedIndex)
        }
      />
      <View style={{ height: 20 }} />
      <SegmentedControl
        activeIndex={selectedIndexB}
        values={['One', 'Two', 'Three', 'Four']}
        onIndexChange={(selectedIndex: number) =>
          setSelectedIndexB(selectedIndex)
        }
        style={{
          height: 30,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: DefaultTheme.colors.primary,
        }}
        indicatorStyle={{ height: 30, borderRadius: 0 }}
        hasBorder={true}
      />
      <View style={{ height: 20 }} />
      <SegmentedControl
        activeIndex={selectedIndexC}
        values={['One', 'Two', 'Three', 'Four', 'Five']}
        onIndexChange={(selectedIndex: number) =>
          setSelectedIndexC(selectedIndex)
        }
        style={{
          height: 30,
          borderRadius: 15,
          borderColor: DefaultTheme.colors.primary,
        }}
        indicatorStyle={{ height: 30, borderRadius: 0 }}
        hasBorder={true}
      />
      <SegmentedControl
        activeIndex={selectedIndexD}
        values={['One', 'Two', 'Three', 'Four', 'Five', 'Six']}
        onIndexChange={(selectedIndex: number) =>
          setSelectedIndexD(selectedIndex)
        }
        style={{
          borderWidth: 0,
          overflow: 'visible',
        }}
        indicatorStyle={{
          borderRadius: 0,
          height: 2,
          bottom: 0,
        }}
        activeTextStyle={{ color: 'black' }}
      />
    </ScrollView>
  );
}

SegmentedControlExample.title = 'SegmentedControl';

let styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
    backgroundColor: '#eeeeee',
  },
});

export default SegmentedControlExample;
