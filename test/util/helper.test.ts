import { defaultIncludeList } from '../../src/main';
import {
  getRandomElementsFromArray,
  getRandomIncludeListEntry,
  shuffle,
} from '../../src/util/helper';

describe('Helper', () => {
  test('getRandomElementsFromArray([element], N) returns the same element N times', () => {
    const element = 'a';
    let i = 0;
    while (i < 100) {
      i++;
      expect(getRandomElementsFromArray([element], i)).toHaveLength(i);
      expect(
        getRandomElementsFromArray([element], i).every((e) => e === element)
      ).toBe(true);
    }
  });

  test('getRandomElementsFromArray([], N) throws Error', () => {
    expect(() => getRandomElementsFromArray([], 5)).toThrowError();
  });

  test('getRandomElementsFromArray(arr, -1) throws Error', () => {
    const arr = new Array(42);
    expect(() => getRandomElementsFromArray(arr, -1)).toThrowError();
  });

  test('getRandomElementsFromArray(arr, 0) returns empty array', () => {
    const arr = new Array(42);
    expect(getRandomElementsFromArray(arr, 0).length).toStrictEqual(0);
  });

  test('getRandomIncludeListEntry(defaultIncludeList) returns value from IncludeList', () => {
    const includeString = getRandomIncludeListEntry(defaultIncludeList);
    expect(
      Object.values(defaultIncludeList).some((e) => e === includeString)
    ).toBe(true);
  });

  test('shuffle([element]) returns [element]', () => {
    expect(shuffle(['1'])).toStrictEqual(['1']);
  });

  test('shuffle(arr, false) returns the array shuffled', () => {
    const arr = [...Array(8).keys()].map((i) => i.toString());
    const shuffled = shuffle(arr, false);
    expect(shuffled.length).toEqual(arr.length);
    expect(new Set(shuffled)).toStrictEqual(new Set(arr));
    // attempt to test randomness (yes, this is no good idea for unit tests...)
    // the idea is that some elements must be unequal for an array of length 8
    expect(shuffled.some((_, index) => shuffled[index] !== arr[index])).toBe(
      true
    );
  });

  test('shuffle(arr) shuffles arr inplace', () => {
    const arr = [...Array(8).keys()].map((i) => i.toString());
    const shuffled = shuffle(arr, true);
    expect(shuffled.length).toEqual(arr.length);
    expect(new Set(shuffled)).toStrictEqual(new Set(arr));
    expect(shuffled.every((_, index) => shuffled[index] === arr[index])).toBe(
      true
    );
  });
});
