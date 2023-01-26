/* eslint-disable react/display-name */
import React from 'react';

import AccordionExample from './AccordionExample';
import ActivityIndicatorExample from './ActivityIndicatorExample';
import AvatarExample from './AvatarExample';
import BadgeExample from './BadgeExample';
import ButtonExample from './ButtonExample';
import CardExample from './CardExample';
import CalendarExample from './CalendarExample';
import CheckboxExample from './CheckboxExample';
import ChipExample from './ChipExample';
import CollapsibleExample from './CollapsibleExample';
import DateTimePickerExample from './DateTimePickerExample';
import DividerExample from './DividerExample';
import SliderExample from './SliderExample';
import IconButtonExample from './IconButtonExample';
import MenuExample from './MenuExample';
import ModalExample from './ModalExample';
import PortalExample from './PortalExample';
import ProgressBarExample from './ProgressBarExample';
import RadioButtonExample from './RadioButtonExample';
import RadioButtonGroupExample from './RadioButtonGroupExample';
import RichRadioButtonExample from './RichRadioButtonExample';
import SegmentedControlExample from './SegmentedControlExample';
import SwitchExample from './SwitchExample';
import TextInputExample from './TextInputExample';
import ToastExample from './ToastExample';
import TypographyExample from './TypographyExample';

import Welcome from '../Welcome';

export let EXAMPLES = {
  accordion: AccordionExample,
  activityindicator: ActivityIndicatorExample,
  avatar: AvatarExample,
  badge: BadgeExample,
  button: ButtonExample,
  card: CardExample,
  calendar: CalendarExample,
  checkbox: CheckboxExample,
  chip: ChipExample,
  collapsible: CollapsibleExample,
  datetimepicker: DateTimePickerExample,
  divider: DividerExample,
  iconbutton: IconButtonExample,
  menu: MenuExample,
  modal: ModalExample,
  portal: PortalExample,
  progressbar: ProgressBarExample,
  radiobutton: RadioButtonExample,
  radiobuttongroup: RadioButtonGroupExample,
  richradiobutton: RichRadioButtonExample,
  segmentedcontrol: SegmentedControlExample,
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
