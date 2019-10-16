/* eslint-disable react/display-name */
import React from 'react';

import ButtonExample from './ButtonExample';
import CardExample from './CardExample';
import CalendarExample from './CalendarExample';
import CheckboxExample from './CheckboxExample';
import IconButtonExample from './IconButtonExample';
import TextInputExample from './TextInputExample';

import Welcome from '../Welcome';

export let EXAMPLES = {
  button: ButtonExample,
  card: CardExample,
  calendar: CalendarExample,
  checkbox: CheckboxExample,
  iconbutton: IconButtonExample,
  textinput: TextInputExample,
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
