import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  errorIcon: {
    position: 'absolute',
    alignSelf: 'center',
    right: 4,
    top: 10,
    margin: 0,
  },
  errorMessage: {
    position: 'absolute',
    bottom: -18,
  },
  label: {
    // TODO: This color should use colors.text with 0.6 opacity.
    color: '#757575',
  },
});
