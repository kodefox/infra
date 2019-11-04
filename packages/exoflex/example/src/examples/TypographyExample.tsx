import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Typography } from 'exoflex';

let {
  Heading,
  Subheading,
  LargeTitle,
  Title,
  Subtitle,
  Body,
  SecondaryBody,
  Caption,
} = Typography;

function TypographyExample() {
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Heading style={styles.spacing}>Heading</Heading>
      <Subheading style={styles.spacing}>Subheading</Subheading>
      <LargeTitle style={styles.spacing}>LargeTitle</LargeTitle>
      <Title style={styles.spacing}>Title</Title>
      <Subtitle style={styles.spacing}>Subtitle</Subtitle>
      <Body style={styles.spacing}>Body</Body>
      <SecondaryBody style={styles.spacing}>SecondaryBody</SecondaryBody>
      <Caption style={styles.spacing}>Caption</Caption>
      <Heading style={styles.spacing} weight="medium">
        Medium Heading
      </Heading>
      <Subheading style={styles.spacing} weight="medium">
        Medium Subheading
      </Subheading>
      <LargeTitle style={styles.spacing} weight="medium">
        Medium LargeTitle
      </LargeTitle>
      <Title style={styles.spacing} weight="medium">
        Medium Title
      </Title>
      <Subtitle style={styles.spacing} weight="medium">
        Medium Subtitle
      </Subtitle>
      <Body style={styles.spacing} weight="medium">
        Medium Body
      </Body>
      <SecondaryBody style={styles.spacing} weight="medium">
        Medium SecondaryBody
      </SecondaryBody>
      <Caption style={styles.spacing} weight="medium">
        Medium Caption
      </Caption>
    </ScrollView>
  );
}

TypographyExample.title = 'Typography';

let styles = StyleSheet.create({
  root: {
    padding: 16,
    backgroundColor: '#eeeeee',
  },
  spacing: {
    margin: 4,
  },
});

export default TypographyExample;
