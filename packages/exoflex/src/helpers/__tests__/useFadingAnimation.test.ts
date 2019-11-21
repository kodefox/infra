import { renderHook } from '@testing-library/react-hooks';

import useFadingAnimation from '../useFadingAnimation';

describe('useFadingAnimation', () => {
  it('should animate visibility properly', () => {
    let { result, rerender, unmount } = renderHook(
      ({ visible }) => useFadingAnimation(visible, { duration: 500 }),
      { initialProps: { visible: false } },
    );

    expect(result.current[0]).toBe(false);

    rerender({ visible: true });

    expect(result.current[0]).toBe(true);

    unmount();

    // Should not modify the state again after unmounting.
    expect(result.current[0]).toBe(true);
  });
  it(`should not animate when visibility doesn't change`, () => {
    let { result, rerender, unmount } = renderHook(
      ({ visible }) => useFadingAnimation(visible, { duration: 500 }),
      { initialProps: { visible: false } },
    );

    expect(result.current[0]).toBe(false);

    rerender({ visible: false });

    expect(result.current[0]).toBe(false);

    unmount();

    expect(result.current[0]).toBe(false);
  });
});
