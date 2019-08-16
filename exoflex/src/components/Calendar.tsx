import React, {useState, useEffect} from 'react';
import {Calendar, DateObject} from 'react-native-calendars';
import XDate from 'xdate'

type Props = {
  initialRange?: Array<string>;
  theme: {markColor: string; todayTextColor: string};
  onSuccess?: (fromDate: string, toDate: string) => void;
};

export default function DateRangePicker(props: Props) {
  let [isFromDatePicked, setIsFromDatePicked] = useState(false);
  let [isToDatePicked, setIsToDatePicked] = useState(false);
  let [markedDates, setMarkedDates] = useState({});
  let [fromDate, setFromDate] = useState('');

  let {
    initialRange,
    onSuccess,
    theme: {markColor, todayTextColor},
  } = props;

  useEffect(() => {
    _setupInitialRange();
  }, []);

  let _onDayPress = (day: DateObject) => {
    if (!isFromDatePicked || (isFromDatePicked && isToDatePicked)) {
      _setupStartMarker(day);
    } else if (!isToDatePicked) {
      let newMarkedDates = {...markedDates};
      let [mMarkedDates, range] = _setupMarkedDates(
        fromDate,
        day.dateString,
        newMarkedDates,
      );
      if (range >= 0) {
        setIsFromDatePicked(true);
        setIsToDatePicked(true);
        setMarkedDates(mMarkedDates);

        onSuccess && onSuccess(fromDate, day.dateString);
      } else {
        _setupStartMarker(day);
      }
    }
  };

  let _setupStartMarker = (day: DateObject) => {
    let newMarkedDates = {
      [day.dateString]: {
        selected: true,
        startingDay: true,
        selectedColor: markColor,
        color: markColor,
      },
    };
    setIsFromDatePicked(true);
    setIsToDatePicked(false);
    setFromDate(day.dateString);
    setMarkedDates(newMarkedDates);
  };

  let _setupMarkedDates = (
    newFromDate: string,
    newToDate: string,
    newMarkedDates: {[key: string]: object},
  ) => {
    let mFromDate = new XDate(newFromDate);
    let mToDate = new XDate(newToDate);
    let range = mFromDate.diffDays(mToDate);
    if (range >= 0) {
      if (range == 0) {
        newMarkedDates = {[newToDate]: {}};
      } else {
        for (var i = 1; i <= range; i++) {
          let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd');
          if (i < range) {
            newMarkedDates[tempDate] = {
              color: markColor,
            };
          } else {
            newMarkedDates[tempDate] = {
              endingDay: true,
              color: markColor,
            };
          }
        }
      }
    }
    return [newMarkedDates, range];
  };

  let _setupInitialRange = () => {
    if (!initialRange) return;
    let [newFromDate, newToDate] = initialRange;
    let newMarkedDates = {[newFromDate]: {startingDay: true}};
    let [mMarkedDates] = _setupMarkedDates(
      newFromDate,
      newToDate,
      newMarkedDates,
    );
    setMarkedDates(mMarkedDates);
    setFromDate(newFromDate);
  };

  return (
    <Calendar
      markingType={Object.keys(markedDates).length > 1 ? 'period' : 'simple'}
      current={fromDate}
      markedDates={markedDates}
      onDayPress={(day) => {
        _onDayPress(day);
      }}
      theme={{todayTextColor: todayTextColor}}
    />
  );
}