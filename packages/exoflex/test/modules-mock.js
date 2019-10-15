jest.mock('react-native-svg', () => 'Svg');
jest.mock('NativeAnimatedHelper');

// Hide warning about componentWillReceiveProps has been renamed
jest.spyOn(console, 'warn').mockImplementation((message: string) => {
  let blacklistedMessage =
    'Warning: componentWillReceiveProps has been renamed';
  return message.startsWith(blacklistedMessage) ? '' : message;
});
