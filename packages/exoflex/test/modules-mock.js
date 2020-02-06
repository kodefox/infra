jest.mock('react-native-svg', () => 'Svg');

// Hide warning about componentWillReceiveProps has been renamed
jest.spyOn(console, 'warn').mockImplementation((message) => {
  let blacklistedMessage =
    'Warning: componentWillReceiveProps has been renamed';
  return message.startsWith(blacklistedMessage) ? '' : message;
});
