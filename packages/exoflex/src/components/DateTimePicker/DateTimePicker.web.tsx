import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Portal, TouchableRipple } from 'react-native-paper';
import { DateObject } from 'react-native-calendars';
import { Calendar } from '../Calendar';
import TimePicker from '../TimePicker/TimePicker.web';
import Text from '../Text';

import useTheme from '../../helpers/useTheme';
import { useDateTimePicker } from './useDateTimePicker';
import { DateTimePickerProps, DateTimePickerMode } from './types';

export default function DateTimePicker(props: DateTimePickerProps) {
  let {
    mode = 'datetime' as DateTimePickerMode,
    date = new Date().toISOString(),
    isVisible,
    onCancel,
    onConfirm,
  } = props;

  let {
    dateTime,
    activePicker,
    resetActivePicker,
    confirmDate,
    confirmTime,
  } = useDateTimePicker(mode, date, onConfirm);

  let cancel = () => {
    resetActivePicker();
    onCancel();
  };

  let renderPicker =
    activePicker === 'date' ? (
      <DatePicker date={dateTime} onCancel={cancel} onConfirm={confirmDate} />
    ) : (
      <TimePickerContainer
        date={dateTime}
        onCancel={cancel}
        onConfirm={confirmTime}
      />
    );

  if (!isVisible) {
    return null;
  }
  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={cancel}
        contentContainerStyle={styles.modalContainer}
      >
        {renderPicker}
      </Modal>
    </Portal>
  );
}

export type PickerProps = Readonly<{
  date: string;
  onCancel: () => void;
  onConfirm: (date: string) => void;
}>;

export function DatePicker(props: PickerProps) {
  let { date, onCancel, onConfirm } = props;
  let { colors } = useTheme();

  let [selectedDate, setSelectedDate] = useState(date);

  let changeDate = (dateObject: DateObject) => {
    setSelectedDate(new Date(dateObject.timestamp).toISOString());
  };
  let confirm = () => onConfirm(selectedDate);

  return (
    <>
      <Calendar
        markedDates={{ [selectedDate.split('T')[0]]: { selected: true } }}
        onDayPress={changeDate}
      />
      <View style={styles.touchableActionWrapper}>
        <TouchableRipple onPress={onCancel} style={styles.touchableAction}>
          <Text>CANCEL</Text>
        </TouchableRipple>
        <TouchableRipple onPress={confirm} style={styles.touchableAction}>
          <Text style={{ color: colors.primary }}>CONFIRM</Text>
        </TouchableRipple>
      </View>
    </>
  );
}

export function TimePickerContainer(props: PickerProps) {
  let { date, onCancel, onConfirm } = props;
  let { colors } = useTheme();

  let [selectedDateTime, setSelectedDateTime] = useState(date);

  let changeTime = (dateTime: string) => setSelectedDateTime(dateTime);
  let confirm = () => onConfirm(selectedDateTime);

  return (
    <>
      <View style={{ alignItems: 'center', marginTop: 12 }}>
        <TimePicker date={selectedDateTime} onChangeTime={changeTime} />
      </View>
      <View style={styles.touchableActionWrapper}>
        <TouchableRipple onPress={onCancel} style={styles.touchableAction}>
          <Text>CANCEL</Text>
        </TouchableRipple>
        <TouchableRipple onPress={confirm} style={styles.touchableAction}>
          <Text style={{ color: colors.primary }}>CONFIRM</Text>
        </TouchableRipple>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    margin: 12,
    paddingVertical: 12,
    width: 360,
    alignSelf: 'center',
  },
  touchableAction: {
    padding: 12,
    marginTop: 16,
  },
  touchableActionWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
