import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, DateTimePicker } from 'exoflex';

function DateTimePickerExample() {
  let [isDatePickerVisible, setDatePickerVisible] = useState(false);
  let [isTimePickerVisible, setTimePickerVisible] = useState(false);
  let [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);
  let [date, setDate] = useState('');
  let [time, setTime] = useState('');
  let [dateTime, setDateTime] = useState('');

  let textDate =
    date === '' ? 'Open DatePicker' : new Date(date).toLocaleString('id-ID');
  let textTime =
    time === '' ? 'Open TimePicker' : new Date(time).toLocaleString('id-ID');
  let textDateTime =
    dateTime === ''
      ? 'Open DateTimePicker'
      : new Date(dateTime).toLocaleString('id-ID');

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Button onPress={() => setDatePickerVisible(true)}>{textDate}</Button>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        date={date}
        mode="date"
        onCancel={() => setDatePickerVisible(false)}
        onConfirm={(date) => {
          setDate(date);
          setDatePickerVisible(false);
        }}
      />
      <View style={{ height: 20 }} />
      <Button onPress={() => setTimePickerVisible(true)}>{textTime}</Button>
      <DateTimePicker
        isVisible={isTimePickerVisible}
        date={time}
        mode="time"
        onCancel={() => setTimePickerVisible(false)}
        onConfirm={(date) => {
          setTime(date);
          setTimePickerVisible(false);
        }}
      />
      <View style={{ height: 20 }} />
      <Button onPress={() => setDateTimePickerVisible(true)}>
        {textDateTime}
      </Button>
      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        date={dateTime}
        mode="datetime"
        onCancel={() => setDateTimePickerVisible(false)}
        onConfirm={(date) => {
          setDateTime(date);
          setDateTimePickerVisible(false);
        }}
      />
    </ScrollView>
  );
}

DateTimePickerExample.title = 'DateTimePicker';

let styles = StyleSheet.create({
  root: {
    padding: 16,
    backgroundColor: '#eeeeee',
  },
});

export default DateTimePickerExample;
