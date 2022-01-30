import {
  getNormalizedRandomNumber,
  getRandomIndex,
  getRandomNumber,
} from '../src/prng';

describe('Pseudo Random Number Generator:', () => {
  test('getRandomNumber(N, N) returns N', () => {
    let i = 0;
    while (i < 1000) {
      expect(getRandomNumber(i, i)).toStrictEqual(i);
      i++;
    }
  });

  test('getRandomNumber(min, max) throws Error when min > max', () => {
    expect(() => getRandomNumber(2, 1)).toThrowError();
    expect(() => getRandomNumber(-1, -2)).toThrowError();
  });

  test('getNormalizedRandomNumber() is in [0,1]', () => {
    let i = 0;
    while (i < 1000) {
      expect(getNormalizedRandomNumber()).toBeGreaterThanOrEqual(0);
      expect(getNormalizedRandomNumber()).toBeLessThanOrEqual(1);
      i++;
    }
  });

  test('getRandomIndex(N) returns an index in range [0,N)', () => {
    let i = 0;
    while (i < 1000) {
      i++;
      const arr = new Array(i);
      const index = getRandomIndex(arr.length);
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(arr.length);
    }
  });

  test('getRandomIndex(x) with x~U{-N,0} throws Error', () => {
    let i = -1000;
    while (i < 0) {
      i++;
      expect(() => getRandomIndex(i)).toThrowError();
    }
  });

  test('getRandomIndex(0) throws Error', () => {
    // explicitly test the edge case, just to be sure
    expect(() => getRandomIndex(0)).toThrowError();
  });
});
