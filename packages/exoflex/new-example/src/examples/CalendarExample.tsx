import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Calendar, Text } from 'exoflex';

const createDate = (increaseDays = 0) => {
  let date = new Date();
  let result = date.setDate(date.getDate() + increaseDays);
  return new Date(result).toISOString().split('T')[0];
};
const MARKED_DATES = {
  [createDate()]: {
    selected: true,
    marked: true,
  },
  [createDate(1)]: { marked: true },
  [createDate(2)]: {
    marked: true,
    dotColor: 'red',
    activeOpacity: 0,
  },
  [createDate(3)]: { disabled: true, disableTouchEvent: true },
};

function CalendarExample() {
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Text>Default calendar</Text>
      <Calendar
        // Collection of dates that have to be marked. Default = {}
        markedDates={MARKED_DATES}
      />
    </ScrollView>
  );
}

CalendarExample.title = 'Calendar';

let styles = StyleSheet.create({
  root: {
    padding: 16,
    backgroundColor: '#eeeeee',
  },
});

export default CalendarExample;
