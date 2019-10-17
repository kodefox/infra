import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Text } from 'exoflex';

function CardExample() {
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Card
        style={{
          borderRadius: 14,
          marginVertical: 16,
          backgroundColor: '#f8f8f8',
        }}
      >
        <Card.Title
          title="PIZZA4LYFE"
          style={{ justifyContent: 'center' }}
          titleStyle={{
            color: '#33bdd6',
            fontWeight: '700',
          }}
        />
        <Card.Cover
          source={{
            uri: 'https://media.giphy.com/media/4ayiIWaq2VULC/source.gif',
          }}
          style={{ height: 150 }}
        />
        <Card.Content>
          <Card style={{ borderRadius: 10 }}>
            <Card.Content>
              <Text>
                This is the description or content that you want to show in this
                card component. This is the description or content that you want
                to show in this card component.
              </Text>
            </Card.Content>
          </Card>
        </Card.Content>
        <Card.Actions>
          <Button
            preset="invisible"
            onPress={() => {}}
            contentStyle={{
              minWidth: 50,
            }}
          >
            Tekan 1
          </Button>
          <Button
            preset="invisible"
            onPress={() => {}}
            contentStyle={{
              minWidth: 50,
            }}
          >
            Tekan 2
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

CardExample.title = 'Card';

let styles = StyleSheet.create({
  root: {
    padding: 16,
    backgroundColor: '#eeeeee',
  },
});

export default CardExample;
