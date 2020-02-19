import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Portal, TouchableRipple } from 'react-native-paper';
import { DateObject } from 'react-native-calendars';

import TimePicker from '../TimePicker/TimePicker.web';
import Text from '../Text';
import IconButton from '../IconButton';
import useTheme from '../../helpers/useTheme';

import { Calendar } from '../Calendar';
import { Subtitle } from '../Typography';
import { useDateTimePicker } from './useDateTimePicker';
import { DateTimePickerProps, DateTimePickerMode } from './types';

export default function DateTimePicker(props: DateTimePickerProps) {
  let {
    mode = 'datetime' as DateTimePickerMode,
    date = new Date().toISOString(),
    title,
    dateTitleWeb,
    timeTitleWeb,
    isVisible,
    use24Hour,
    onCancel,
    onConfirm,
    minimumDate,
    maximumDate,
  } = props;

  let { colors } = useTheme();

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

  let picker =
    activePicker === 'date' ? (
      <DatePicker
        title={dateTitleWeb || title}
        date={dateTime}
        minDate={minimumDate}
        maxDate={maximumDate}
        onCancel={cancel}
        onConfirm={confirmDate}
      />
    ) : (
      <TimePickerContainer
        title={timeTitleWeb || title}
        date={dateTime}
        use24Hour={use24Hour}
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
        contentContainerStyle={[
          styles.modalContainer,
          { backgroundColor: colors.background },
        ]}
      >
        {picker}
      </Modal>
    </Portal>
  );
}

export type PickerProps = Readonly<{
  date: string;
  title?: string;
  minDate?: Date;
  maxDate?: Date;
  use24Hour?: boolean;
  onCancel: () => void;
  onConfirm: (date: string) => void;
}>;

export function DatePicker(props: PickerProps) {
  let { date, title, minDate, maxDate, onCancel, onConfirm } = props;
  let { colors } = useTheme();

  let [selectedDate, setSelectedDate] = useState(date);

  let changeDate = (dateObject: DateObject) => {
    setSelectedDate(new Date(dateObject.timestamp).toISOString());
  };
  let confirm = () => onConfirm(selectedDate);

  let arrow = useCallback(
    (direction: 'left' | 'right') =>
      direction === 'left' ? (
        <IconButton icon="chevron-left" />
      ) : (
        <IconButton icon="chevron-right" />
      ),
    [],
  );

  return (
    <>
      {!!title && (
        <View style={[styles.headerWrapper, { borderColor: colors.border }]}>
          <Subtitle>{title}</Subtitle>
        </View>
      )}
      <Calendar
        current={selectedDate}
        markedDates={{ [selectedDate.split('T')[0]]: { selected: true } }}
        minDate={minDate}
        maxDate={maxDate}
        onDayPress={changeDate}
        renderArrow={arrow}
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
  let { date, title, use24Hour, onCancel, onConfirm } = props;
  let { colors } = useTheme();

  let [selectedDateTime, setSelectedDateTime] = useState(date);

  let changeTime = (dateTime: string) => setSelectedDateTime(dateTime);
  let confirm = () => onConfirm(selectedDateTime);

  return (
    <>
      <View style={{ marginTop: title ? 6 : 12 }}>
        {/* TODO: Handle format based on locale too */}
        {!!title && (
          <View
            style={[
              styles.headerWrapper,
              styles.timeHeaderWrapper,
              { borderColor: colors.border },
            ]}
          >
            <Subtitle>{title}</Subtitle>
          </View>
        )}
        <View style={{ alignItems: 'center' }}>
          <TimePicker
            date={selectedDateTime}
            format={use24Hour ? '24' : '12'}
            onChangeTime={changeTime}
          />
        </View>
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
    margin: 12,
    paddingVertical: 12,
    width: 360,
    alignSelf: 'center',
  },
  headerWrapper: {
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 11,
  },
  timeHeaderWrapper: {
    paddingBottom: 17, // NOTE: because of border
    marginBottom: 18,
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
