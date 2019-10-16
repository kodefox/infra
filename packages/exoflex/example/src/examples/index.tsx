/* eslint-disable react/display-name */
import React from 'react';

import ButtonExample from './ButtonExample';
import CheckboxExample from './CheckboxExample';
import Welcome from '../Welcome';

export let EXAMPLES = {
  button: ButtonExample,
  checkbox: CheckboxExample,
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
