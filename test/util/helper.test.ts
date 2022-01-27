import {
  getNormalizedRandomNumber,
  getRandomNumber,
} from '../../src/util/helper';

test('getRandomNumber(N, N) returns N', () => {
  let i = 0;
  while (i < 500) {
    expect(getRandomNumber(i, i)).toStrictEqual(i);
    i++;
  }
});

test('getNormalizedRandomNumber() is in [0,1]', () => {
  let i = 0;
  while (i < 500) {
    expect(getNormalizedRandomNumber()).toBeGreaterThanOrEqual(0);
    expect(getNormalizedRandomNumber()).toBeLessThanOrEqual(1);
    i++;
  }
});
