import { getTrueWidth } from '../Switch';

const DEFAULT_WIDTH = 48;
const WIDTH = 100;

describe('getTrueWidth', () => {
  it('should return base width', () => {
    let width = getTrueWidth(DEFAULT_WIDTH);
    let thumbSize = getTrueWidth(width / 2);

    expect(width).toBe(DEFAULT_WIDTH);
    expect(thumbSize).toBe(width / 2);
  });

  it('should return width', () => {
    let width = getTrueWidth(DEFAULT_WIDTH, { width: WIDTH });
    let thumbSize = getTrueWidth(width / 2, { width: WIDTH });

    expect(width).toBe(WIDTH);
    expect(thumbSize).toBe(WIDTH);
  });

  it('should return minWidth', () => {
    const MIN_WIDTH_A = 60;
    const MIN_WIDTH_B = 120;

    let widthA = getTrueWidth(DEFAULT_WIDTH, {
      minWidth: MIN_WIDTH_A,
    });
    let widthB = getTrueWidth(DEFAULT_WIDTH, {
      width: WIDTH,
      minWidth: MIN_WIDTH_B,
    });

    expect(widthA).toBe(MIN_WIDTH_A);
    expect(widthB).toBe(MIN_WIDTH_B);
  });

  it('should return maxWidth', () => {
    const MAX_WIDTH_A = 30;
    const MAX_WIDTH_B = 80;

    let widthA = getTrueWidth(DEFAULT_WIDTH, {
      maxWidth: MAX_WIDTH_A,
    });
    let widthB = getTrueWidth(DEFAULT_WIDTH, {
      width: WIDTH,
      maxWidth: MAX_WIDTH_B,
    });

    expect(widthA).toBe(MAX_WIDTH_A);
    expect(widthB).toBe(MAX_WIDTH_B);
  });

  // NOTE: Follows CSS Standards
  // https://www.w3.org/TR/CSS21/visudet.html#min-max-widths
  it('should return minWidth even when maxWidth is bigger', () => {
    const MIN_WIDTH_A = 60;
    const MIN_WIDTH_B = 120;
    const MAX_WIDTH_A = 30;
    const MAX_WIDTH_B = 80;

    let widthA = getTrueWidth(DEFAULT_WIDTH, {
      minWidth: MIN_WIDTH_A,
      maxWidth: MAX_WIDTH_A,
    });
    let widthB = getTrueWidth(DEFAULT_WIDTH, {
      width: WIDTH,
      minWidth: MIN_WIDTH_B,
      maxWidth: MAX_WIDTH_B,
    });

    expect(widthA).toBe(MIN_WIDTH_A);
    expect(widthB).toBe(MIN_WIDTH_B);
  });
});
