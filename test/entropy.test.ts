import { computeEntropy } from '../src/entropy';

describe('entropy.ts', () => {
  test('computeEntropy is deterministic', () => {
    let entropy = computeEntropy('aaaaaaaaaaa', {
      digit: '',
      special: '',
      upper: '',
      lower: 'a',
    });
    expect(entropy).toEqual(0);

    entropy = computeEntropy('abcabc', {
      digit: '',
      special: '',
      upper: '',
      lower: 'abc',
    });
    expect(2 ** (entropy / 6)).toEqual(3);
  });
});
