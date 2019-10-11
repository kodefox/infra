import { useState } from 'react';
import { DateTimePickerMode } from './types';

export function useDateTimePicker(
  mode: DateTimePickerMode,
  initialDate: string,
  callback: (date: string) => void,
) {
  let [dateTime, setDateTime] = useState(initialDate);
  let [activePicker, setActivePicker] = useState<'date' | 'time'>(
    mode !== 'time' ? 'date' : 'time',
  );

  let resetActivePicker = () => mode !== 'time' && setActivePicker('date');
  let changeDate = (isoDate: string) => {
    let date = dateTime === '' ? new Date() : new Date(dateTime);
    let [oldDate, oldTime] = date.toISOString().split('T');
    let newDate = isoDate === '' ? oldDate : isoDate.split('T')[0];
    let combinedDateTime = new Date(`${newDate}T${oldTime}`).toISOString();
    setDateTime(combinedDateTime);
  };
  let confirmDate = (isoDateTime: string) => {
    if (mode === 'date') {
      setDateTime(isoDateTime);
      callback(isoDateTime);
      return;
    }
    changeDate(isoDateTime);
    setActivePicker('time');
  };
  let confirmTime = (isoDateTime: string) => {
    resetActivePicker();
    setDateTime(isoDateTime);
    callback(isoDateTime);
  };

  return {
    dateTime,
    activePicker,
    resetActivePicker,
    confirmDate,
    confirmTime,
  };
}
