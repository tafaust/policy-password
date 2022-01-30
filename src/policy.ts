import { getRandomNumber, shuffle } from './util/helper';
import { IncludeList } from './constants';

/**
 * The policy derives from the {@link IncludeList} keys and a `length` attribute.
 */
export type PasswordPolicy = {
  [key in keyof IncludeList | 'length']?: number;
};

/**
 * The minimal policy constraints derive from the {@link PasswordPolicy} keys.
 */
export type MinPolicyConstraints = {
  [key in keyof PasswordPolicy]?: number;
};

/**
 * The maximum policy constraints derive from the {@link PasswordPolicy} keys.
 */
export type MaxPolicyConstraints = {
  [key in keyof PasswordPolicy]?: number;
};
export type PolicyConstraintsConfig = {
  minConstraints: MinPolicyConstraints;
  maxConstraints: MaxPolicyConstraints;
};

// Functional API

/**
 * Generates an array of random {@link PasswordPolicy} keys.
 * @returns {(keyof PasswordPolicy)[]} An array of minimum length of one and a
 *          maximum length of the total number of keys.
 */
export const generateRandomPolicyKeys = (): (keyof PasswordPolicy)[] => {
  const keys = ['length', 'special', 'upper', 'lower', 'digit'];
  // a in [0, round(keys.length / 2)]
  const a = getRandomNumber(0, (0.5 + keys.length * 0.5) << 0);
  // b in [min(keys.length, round(keys.length / 2), keys.length]
  return shuffle(
    keys.slice(a, getRandomNumber(Math.min(a + 1, keys.length), keys.length))
  ) as (keyof PasswordPolicy)[];
};

/**
 * Generates a {@link PasswordPolicy} with keys provided by `policyKeys` random
 * values given a {@link PolicyConstraintsConfig}.
 * @param policyKeys An array of {@link PasswordPolicy} keys to consider in the
 *                   resulting policy.
 * @param minConstraints Lower bound for the policy key.
 * @param maxConstraints Upper bound for the policy key.
 * @throws Error If any key of `policyKeys` is not present in `minConstraints`
 *               or `maxConstraints`.
 */
export const generateRandomPolicy = (
  policyKeys: (keyof PasswordPolicy)[],
  { minConstraints, maxConstraints }: PolicyConstraintsConfig
): Partial<PasswordPolicy> => {
  if (policyKeys.length === 0) {
    throw new Error('policyKeys must not be empty!');
  }
  return Object.assign(
    {},
    ...policyKeys.map((key) => {
      if (
        minConstraints[key] !== undefined &&
        maxConstraints[key] !== undefined
      ) {
        return {
          [key]:
            (0.5 +
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              getRandomNumber(minConstraints[key]!, maxConstraints[key]!)) <<
            0,
        };
      }
      throw new Error(
        `${key} must be present in minConstraints and maxConstraints!`
      );
    })
  );
};

// Class API

/**
 * This class aids with {@link PasswordPolicy} generation.
 * @class
 */
export class PolicyGenerator {
  private readonly minConstraints: MinPolicyConstraints;
  private readonly maxConstraints: MaxPolicyConstraints;

  constructor({ minConstraints, maxConstraints }: PolicyConstraintsConfig) {
    this.minConstraints = minConstraints;
    this.maxConstraints = maxConstraints;
  }

  generateRandomPolicyKeys(): (keyof PasswordPolicy)[] {
    return generateRandomPolicyKeys();
  }

  public generateRandomPolicy(
    policyKeys: (keyof PasswordPolicy)[]
  ): Partial<PasswordPolicy> {
    const { minConstraints, maxConstraints } = this;
    return generateRandomPolicy(policyKeys, { minConstraints, maxConstraints });
  }
}
