import * as crypto from 'crypto';

export const RANDOM_SEED: Readonly<number> = 0x42;
export const RANDOM_NUM_BYTES: Readonly<number> = 0x1337;

/**
 * Returns a random number in range `[0,1]`.
 * @param {number} seed The seed for random number generation.
 */
export const getNormalizedRandomNumber = (seed?: number): number => {
  const denominator = 2 ** 8 - 1;
  return (
    parseInt(
      parseInt(
        crypto
          .randomBytes(Math.max(seed ?? 1, RANDOM_NUM_BYTES))
          .readUInt8(seed ?? RANDOM_SEED)
          .toString(16),
        16
      ).toString(10),
      10
    ) / denominator
  );
};

/**
 * Return a real valued random number in range `[min,max]`.
 * @param min The lower bound of the interval.
 * @param max The upper bound of the interval.
 * @throws {Error} When `min` is greater than `max`.
 */
export const getRandomNumber = (min: number, max: number): number => {
  if (min > max) {
    throw new Error('max must be greater than or equal to min!');
  }
  return getNormalizedRandomNumber() * (max - min) + min;
};

/**
 * Provides a natural valued index in range `[0,max)` given the length of a
 * `string` or an `Array`.
 * @param max The exclusive upper bound of the interval.
 * @param round (Optional) The rounding method. (Default: Math.round)
 * @throws {Error} When max is lower than one.
 */
export const getRandomIndex = (
  max: number,
  round: typeof Math.round = Math.round
): number => {
  if (max < 1) {
    throw new Error('max must be greater than or equal 1!');
  }
  return round(getRandomNumber(0, max - 1));
};
