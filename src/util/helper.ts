import * as crypto from 'crypto';
import { IncludeList } from '../constants';

export const RANDOM_NUM_BYTES = 0x1;

/**
 * Returns a random number in range `[0,1]`.
 */
export const getNormalizedRandomNumber = (): number => {
  const denominator = 2 ** (RANDOM_NUM_BYTES * 8) - 1;
  return (
    parseInt(
      parseInt(
        crypto.randomBytes(RANDOM_NUM_BYTES).toString('hex'),
        16
      ).toString(10),
      10
    ) / denominator
  );
};

/**
 * Return a random number in range `[min,max]`.
 * @param min The lower bound of the interval.
 * @param max The upper bound of the interval.
 */
export const getRandomNumber = (min: number, max: number): number => {
  return getNormalizedRandomNumber() * (max - min) + min;
};

/**
 * Returns `n` many random elements from an array `arr`. The same elements can
 * occur multiple times.
 * @param arr The array to pick `amount` many elements from.
 * @param amount The number of elements to pick from `arr`.
 */
export const getRandomElementsFromArray = (arr: string, amount: number) =>
  new Array(amount)
    .fill(null)
    .map(() => arr[(getNormalizedRandomNumber() * (arr.length - 1)) << 0]);

/**
 * Utility function to return a random {@link RuleName} from the given
 * `whitelist`.
 * @param whitelist
 */
export const getRandomWhitelistEntryToFillFrom: (
  whitelist: IncludeList
) => string = (whitelist: Record<string, string>) => {
  const keys = Object.keys(whitelist);
  return whitelist[keys[(getNormalizedRandomNumber() * keys.length) << 0]];
};

export const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = (getRandomNumber(0, 1) * (i + 1)) << 0;
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const randomShuffle = (
  array: string[],
  threshold: number
): typeof array => {
  threshold = threshold % 100;
  let _array = array;
  while (getRandomNumber(0, 100) + 1 >= threshold) {
    _array = shuffle(_array);
  }
  return _array;
};
