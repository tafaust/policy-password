import {
  getRandomNumber,
  MaxPolicyConstraints,
  MinPolicyConstraints,
  PolicyGenerator,
} from '../src/main';

describe('PolicyGenerator', () => {
  let policyGenerator: PolicyGenerator;
  let minConstraints: MinPolicyConstraints;
  let maxConstraints: MaxPolicyConstraints;

  beforeAll(() => {
    minConstraints = {
      upper: getRandomNumber(0, 8),
      lower: getRandomNumber(0, 8),
      digit: getRandomNumber(0, 8),
      special: getRandomNumber(0, 8),
      // center length uniform pdf around the total sum
      length: getRandomNumber(4 * 8 * 0.5, 4 * 8 ** 1.5),
    };
    maxConstraints = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      upper: getRandomNumber(minConstraints.upper!, 12),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      lower: getRandomNumber(minConstraints.lower!, 12),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      digit: getRandomNumber(minConstraints.digit!, 12),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      special: getRandomNumber(minConstraints.special!, 12),
      // center length uniform pdf around the total sum
      length: getRandomNumber(4 * 8 * 0.5, 4 * 8 ** 1.5),
    };
    policyGenerator = new PolicyGenerator({
      minConstraints,
      maxConstraints,
    });
  });

  test('generateRandomPolicyKeys() does not return an empty array', () => {
    const policyKeys = policyGenerator.generateRandomPolicyKeys();
    expect(policyKeys).toBeInstanceOf(Array);
    let i = 0;
    while (i < 10) {
      expect(policyGenerator.generateRandomPolicyKeys().length).toBeGreaterThan(
        0
      );
      i++;
    }
  });

  test('generateRandomPolicy() result has valid keys', () => {
    let i = 0;
    while (i < 10) {
      const policy = policyGenerator.generateRandomPolicy(
        policyGenerator.generateRandomPolicyKeys()
      );
      for (const key of Object.keys(policy)) {
        expect(['length', 'special', 'upper', 'lower', 'digit'].includes(key));
      }
      i++;
    }
  });
});
