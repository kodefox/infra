import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, DateTimePicker } from 'exoflex';

function DateTimePickerExample() {
  let [isDatePickerVisible, setDatePickerVisible] = useState(false);
  let [isDatePickerWithTitleVisible, setDatePickerWithTitleVisible] = useState(
    false,
  );
  let [isTimePickerVisible, setTimePickerVisible] = useState(false);
  let [isTimePickerWithTitleVisible, setTimePickerWithTitleVisible] = useState(
    false,
  );
  let [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);
  let [
    isDateTimePickerWithTitleVisible,
    setDateTimePickerWithTitleVisible,
  ] = useState(false);
  let [
    isDateTimePickerWithDifferentTitlesVisible,
    setDateTimePickerWithDifferentTitlesVisible,
  ] = useState(false);
  let [date, setDate] = useState('');
  let [dateWithTitle, setDateWithTitle] = useState('');
  let [time, setTime] = useState('');
  let [timeWithTitle, setTimeWithTitle] = useState('');
  let [dateTime, setDateTime] = useState('');
  let [dateTimeWithTitle, setDateTimeWithTitle] = useState('');
  let [dateTimeWithDifferentTitles, setDateTimeWithDifferentTitles] = useState(
    '',
  );

  let textDate =
    date === '' ? 'Open DatePicker' : new Date(date).toLocaleString('id-ID');
  let textDateWithTitle =
    dateWithTitle === ''
      ? 'Open DatePicker With Title'
      : new Date(dateWithTitle).toLocaleString('id-ID');
  let textTime =
    time === '' ? 'Open TimePicker' : new Date(time).toLocaleString('id-ID');
  let textTimeWithTitle =
    timeWithTitle === ''
      ? 'Open TimePicker With Title'
      : new Date(timeWithTitle).toLocaleString('id-ID');
  let textDateTime =
    dateTime === ''
      ? 'Open DateTimePicker'
      : new Date(dateTime).toLocaleString('id-ID');
  let textDateTimeWithTitle =
    dateTimeWithTitle === ''
      ? 'Open DateTimePicker With Title'
      : new Date(dateTimeWithTitle).toLocaleString('id-ID');
  let textDateTimeWithDifferentTitles =
    dateTimeWithDifferentTitles === ''
      ? 'Open DateTimePicker With Different Titles'
      : new Date(dateTimeWithDifferentTitles).toLocaleString('id-ID');

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Button onPress={() => setDatePickerVisible(true)}>{textDate}</Button>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        date={date}
        mode="date"
        onCancel={() => setDatePickerVisible(false)}
        onConfirm={(date) => {
          setDatePickerVisible(false);
          setDate(date);
        }}
      />
      <View style={{ height: 20 }} />
      <Button onPress={() => setDatePickerWithTitleVisible(true)}>
        {textDateWithTitle}
      </Button>
      <DateTimePicker
        title="Select a date"
        isVisible={isDatePickerWithTitleVisible}
        date={dateWithTitle}
        mode="date"
        onCancel={() => setDatePickerWithTitleVisible(false)}
        onConfirm={(date) => {
          setDatePickerWithTitleVisible(false);
          setDateWithTitle(date);
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
      <Button onPress={() => setTimePickerWithTitleVisible(true)}>
        {textTimeWithTitle}
      </Button>
      <DateTimePicker
        title="Select end time"
        isVisible={isTimePickerWithTitleVisible}
        date={timeWithTitle}
        mode="time"
        onCancel={() => setTimePickerWithTitleVisible(false)}
        onConfirm={(date) => {
          setTimePickerWithTitleVisible(false);
          setTimeWithTitle(date);
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
      <View style={{ height: 20 }} />
      <Button onPress={() => setDateTimePickerWithTitleVisible(true)}>
        {textDateTimeWithTitle}
      </Button>
      <DateTimePicker
        title="Select date and time"
        isVisible={isDateTimePickerWithTitleVisible}
        date={dateTimeWithTitle}
        mode="datetime"
        onCancel={() => setDateTimePickerWithTitleVisible(false)}
        onConfirm={(date) => {
          setDateTimeWithTitle(date);
          setDateTimePickerWithTitleVisible(false);
        }}
      />
      <View style={{ height: 20 }} />
      <Button onPress={() => setDateTimePickerWithDifferentTitlesVisible(true)}>
        {textDateTimeWithDifferentTitles}
      </Button>
      <DateTimePicker
        dateTitle="Select date"
        timeTitle="Select start time"
        isVisible={isDateTimePickerWithDifferentTitlesVisible}
        date={dateTimeWithDifferentTitles}
        mode="datetime"
        onCancel={() => setDateTimePickerWithDifferentTitlesVisible(false)}
        onConfirm={(date) => {
          setDateTimeWithDifferentTitles(date);
          setDateTimePickerWithDifferentTitlesVisible(false);
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
