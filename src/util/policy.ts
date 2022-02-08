import {
  DefinitePolicy,
  Policy,
  PolicyGeneratorConfig,
  QuantifiableKeys,
} from '../types';
import { quantifiableKeys } from '../constants';
import { getRandomNumber } from './prng';

/**
 * Checks whether a {@link Policy} is empty or not.
 * @param {Policy} policy The policy to be tested.
 */
export function isPolicyEmpty(policy: Policy | DefinitePolicy): boolean {
  return quantifiableKeys.every((keys: QuantifiableKeys) => policy[keys] === 0);
}

/**
 * Check if two non-nested `object`s have the same keys.
 * @internal
 * @param {Record<string, any>} a First object.
 * @param {Record<string, any>} b Second object.
 */
function hasSameKeys(a: Record<string, any>, b: Record<string, any>) {
  return (
    Object.keys(a).length === Object.keys(b).length &&
    Object.keys(a).every((k) => b.hasOwnProperty(k))
  );
}

/**
 * Samples a {@link DefinitePolicy} from given a {@link ConstraintRange} in the
 * `config`.
 * @param {PolicyGeneratorConfig} config The configuration that is fundamental
 *                                       for the generation of a random policy.
 * @returns {DefinitePolicy} Returns a full policy.
 * @throws {Error} When there is an imbalance in {@link MinConstraint} and
 *                 {@link MaxConstraint} keys.
 */
export function sampleRandomPolicy(
  config: PolicyGeneratorConfig
): DefinitePolicy {
  const {
    constraints: { min, max },
    round,
  } = config;
  if (!hasSameKeys(min, max)) {
    throw new Error('Constraints must have same keys!');
  }
  return Object.assign(
    {},
    ...quantifiableKeys.map((key) => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        [key]: (round ?? Math.round)(getRandomNumber(min[key]!, max[key]!)),
      };
    })
  );
}
