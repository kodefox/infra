import { StyleSheet } from 'react-native';

export const DEFAULT_HEIGHT = 60;
export const TEXTAREA_NUMBER_OF_LINES = 4;

export default StyleSheet.create({
  errorIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'center',
  },
  errorMessage: {
    padding: 12,
    paddingTop: 0,
    marginTop: -5,
  },
});
