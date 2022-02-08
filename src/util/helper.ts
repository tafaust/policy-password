import { getNormalizedRandomNumber, getRandomIndex } from './prng';
import { IncludeList } from '../types';

/**
 * Returns `n` many random elements from an array `arr`. The same elements can
 * occur multiple times.
 * @param arr The array to pick `amount` many elements from.
 * @param amount The number of elements to pick from `arr`.
 * @throws Error When given array is empty.
 */
export const getRandomElementsFromArray = (arr: string[], amount: number) => {
  if (arr.length === 0) {
    throw new Error('Cannot get elements from empty array!');
  }
  if (amount < 0) {
    throw new Error('Value of amount must be greater or equal than zero!');
  }
  return new Array(amount)
    .fill(null)
    .map(() => arr[getRandomIndex(arr.length)]);
};

/**
 * Utility function to return a random {@link RuleName} from the given
 * `includeList`.
 * @param includeList An {@link IncludeList} that holds included characters per
 *                    key.
 * @returns string A string of characters to be included.
 */
export const getRandomIncludeListEntry: (includeList: IncludeList) => string = (
  includeList: Record<string, string>
) => {
  const keys = Object.keys(includeList);
  return includeList[keys[getRandomIndex(keys.length)]];
};

/**
 * Fisher-Yates shuffle implementation that operates in-place by default.
 * @param array The array that is to be shuffled.
 * @param inplace Whether to shuffle the array in-place. Defaults to true.
 * @see https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 */
export const shuffle = (array: string[], inplace = true): typeof array => {
  if (!inplace) {
    array = [...array];
  }
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(getNormalizedRandomNumber() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
 * Repeated Fisher-Yates shuffles until `x` exceeds the `threshold` where
 * `x ~ U{0,100}`.
 * @param array The array that is to be shuffled.
 * @param threshold Array is shuffled as long as `x` exceeds this threshold.
 * @param inplace Whether to shuffle the array in-place. Defaults to true.
 */
// export const randomShuffle = (
//   array: string[],
//   threshold: number,
//   inplace = true
// ): typeof array => {
//   // in case threshold  a multiple of 100, fill in 100 -> 0 || 100
//   threshold = Math.max(0, Math.min(100, threshold));
//   let _array = array;
//   while (getRandomNumber(0, 100) >= threshold) {
//     _array = shuffle(_array, inplace);
//   }
//   return _array;
// };
