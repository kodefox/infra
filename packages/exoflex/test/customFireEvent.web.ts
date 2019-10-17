import { fireEvent } from '@testing-library/react';

fireEvent.click = (element, options) => {
  try {
    fireEvent.mouseDown(element, options);
    fireEvent.mouseUp(element, options);
    return true;
  } catch {
    return false;
  }
};
