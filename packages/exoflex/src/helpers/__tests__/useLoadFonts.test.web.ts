import { renderHook } from '@testing-library/react-hooks';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore 'expo-font' is an optional peer dependency, so it only available as mock.
import { loadAsync } from 'expo-font';

import useLoadFonts from '../useLoadFonts';

describe('useLoadFonts', () => {
  it('should load fonts properly', async () => {
    let fonts = { 'Fantasque Sans Mono': 1 };
    let { result } = renderHook(() => useLoadFonts(fonts));

    expect(result.current).toBe(true);
    expect(loadAsync).toHaveBeenCalledWith(fonts);
  });
  it('should not load fonts when skipped', async () => {
    let fonts = { 'Fantasque Sans Mono': 2 };
    let { result } = renderHook(() => useLoadFonts(fonts, true));

    expect(result.current).toBe(true);
  });
});
