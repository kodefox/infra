import { getTrueWidth } from '../Switch';

const DEFAULT_WIDTH = 48;
const WIDTH = 100;

describe('getTrueWidth', () => {
  it('should return default width', () => {
    let width = getTrueWidth('track', DEFAULT_WIDTH);
    let thumbSize = getTrueWidth('thumb', width);

    expect(width).toBe(DEFAULT_WIDTH);
    expect(thumbSize).toBe(width / 2);
  });

  it('should return width', () => {
    let width = getTrueWidth('track', DEFAULT_WIDTH, { width: WIDTH });
    let thumbSize = getTrueWidth('thumb', width, { width: WIDTH });

    expect(width).toBe(WIDTH);
    expect(thumbSize).toBe(WIDTH);
  });

  it('should return minWidth', () => {
    const MIN_WIDTH_A = 60;
    const MIN_WIDTH_B = 120;

    let widthA = getTrueWidth('track', DEFAULT_WIDTH, {
      minWidth: MIN_WIDTH_A,
    });
    let widthB = getTrueWidth('track', DEFAULT_WIDTH, {
      width: WIDTH,
      minWidth: MIN_WIDTH_B,
    });

    expect(widthA).toBe(MIN_WIDTH_A);
    expect(widthB).toBe(MIN_WIDTH_B);
  });

  it('should return maxWidth', () => {
    const MAX_WIDTH_A = 30;
    const MAX_WIDTH_B = 80;

    let widthA = getTrueWidth('track', DEFAULT_WIDTH, {
      maxWidth: MAX_WIDTH_A,
    });
    let widthB = getTrueWidth('track', DEFAULT_WIDTH, {
      width: WIDTH,
      maxWidth: MAX_WIDTH_B,
    });

    expect(widthA).toBe(MAX_WIDTH_A);
    expect(widthB).toBe(MAX_WIDTH_B);
  });

  it('should return maxWidth even when minWidth is bigger', () => {
    const MIN_WIDTH_A = 60;
    const MIN_WIDTH_B = 120;
    const MAX_WIDTH_A = 30;
    const MAX_WIDTH_B = 80;

    let widthA = getTrueWidth('track', DEFAULT_WIDTH, {
      minWidth: MIN_WIDTH_A,
      maxWidth: MAX_WIDTH_A,
    });
    let widthB = getTrueWidth('track', DEFAULT_WIDTH, {
      width: WIDTH,
      minWidth: MIN_WIDTH_B,
      maxWidth: MAX_WIDTH_B,
    });

    expect(widthA).toBe(MAX_WIDTH_A);
    expect(widthB).toBe(MAX_WIDTH_B);
  });
});
