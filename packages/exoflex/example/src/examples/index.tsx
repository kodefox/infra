/* eslint-disable react/display-name */
import React from 'react';

import ButtonExample from './ButtonExample';
import CardExample from './CardExample';
import CalendarExample from './CalendarExample';
import CheckboxExample from './CheckboxExample';
import CollapsibleExample from './CollapsibleExample';
import SliderExample from './SliderExample';
import IconButtonExample from './IconButtonExample';
import TextInputExample from './TextInputExample';
import ToastExample from './ToastExample';

import Welcome from '../Welcome';

export let EXAMPLES = {
  button: ButtonExample,
  card: CardExample,
  calendar: CalendarExample,
  checkbox: CheckboxExample,
  collapsible: CollapsibleExample,
  iconbutton: IconButtonExample,
  slider: SliderExample,
  textinput: TextInputExample,
  toast: ToastExample,
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
