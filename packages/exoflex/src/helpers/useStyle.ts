import useTheme from './useTheme';
import { NamedStyles, Theme } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useStyle<T extends NamedStyles<T> | NamedStyles<any>>(
  stylesheet: (theme: Theme) => T,
) {
  let theme = useTheme();
  return stylesheet(theme);
}
