import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Accordion, Text } from 'exoflex';
import drawerImage from '../../assets/drawer_header.png';
import useTheme from '../../../src/helpers/useTheme';

function AccordionExample() {
  let SECTIONS = [
    {
      title: 'FIRST SECTION',
      text: 'This is the first section content',
      image: drawerImage,
    },
    {
      title: 'SECOND SECTION',
      text: 'This is the second section content',
      image: drawerImage,
    },
  ];
  let [activeSections, setActiveSections] = useState([]);
  let { roundness } = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Accordion
        sections={SECTIONS}
        activeSections={activeSections}
        onChange={(sections) => setActiveSections(sections)}
        titleContainerStyle={[
          styles.titleContainer,
          {
            borderRadius: roundness,
          },
        ]}
        titleStyle={styles.title}
        renderContent={(content) => (
          <View
            style={[
              styles.contentContainer,
              {
                borderRadius: roundness,
              },
            ]}
          >
            <Image
              source={content.image}
              style={{ width: 50, height: 50, marginRight: 5 }}
            />
            <Text>{content.text}</Text>
          </View>
        )}
        sectionContainerStyle={[
          styles.sectionContainer,
          { borderRadius: roundness },
        ]}
      />
    </ScrollView>
  );
}

AccordionExample.title = 'Accordion';

let styles = StyleSheet.create({
  root: {
    padding: 16,
    backgroundColor: '#eeeeee',
  },
  titleContainer: { justifyContent: 'center', alignItems: 'center' },
  title: { fontWeight: 'bold' },
  contentContainer: {
    padding: 16,
    backgroundColor: '#e8ecf3',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionContainer: {
    borderWidth: 1,
    borderColor: '#454545',
    marginVertical: 5,
  },
});

export default AccordionExample;
