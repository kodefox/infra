/* eslint-disable react/display-name */
import React from 'react';

import AccordionExample from './AccordionExample';
import ActivityIndicatorExample from './ActivityIndicatorExample';
import ButtonExample from './ButtonExample';
import CardExample from './CardExample';
import CalendarExample from './CalendarExample';
import CheckboxExample from './CheckboxExample';
import CollapsibleExample from './CollapsibleExample';
import DateTimePickerExample from './DateTimePickerExample';
import SliderExample from './SliderExample';
import IconButtonExample from './IconButtonExample';
import ModalExample from './ModalExample';
import PortalExample from './PortalExample';
import ProgressBarExample from './ProgressBarExample';
import RadioButtonExample from './RadioButtonExample';
import RadioButtonGroupExample from './RadioButtonGroupExample';
import SwitchExample from './SwitchExample';
import TextInputExample from './TextInputExample';
import ToastExample from './ToastExample';
import TypographyExample from './TypographyExample';

import Welcome from '../Welcome';

export let EXAMPLES = {
  accordion: AccordionExample,
  activityindicator: ActivityIndicatorExample,
  button: ButtonExample,
  card: CardExample,
  calendar: CalendarExample,
  checkbox: CheckboxExample,
  collapsible: CollapsibleExample,
  datetimepicker: DateTimePickerExample,
  iconbutton: IconButtonExample,
  modal: ModalExample,
  portal: PortalExample,
  progressbar: ProgressBarExample,
  radiobutton: RadioButtonExample,
  radiobuttongroup: RadioButtonGroupExample,
  slider: SliderExample,
  switch: SwitchExample,
  textinput: TextInputExample,
  toast: ToastExample,
  typography: TypographyExample,
};

export let ROUTES = Object.entries(EXAMPLES).reduce(
  (o, [name, Example]) => {
    o[`/${name}`] = () => <Example />;
    return o;
  },
  {
    '/': () => <Welcome />,
  },
);
