import {
  generateRandomPolicy,
  getRandomNumber,
  MaxPolicyConstraints,
  MinPolicyConstraints,
  PolicyConstraintsConfig,
  PolicyGenerator,
} from '../src/main';

describe('PolicyGenerator', () => {
  let policyGenerator: PolicyGenerator;
  let minConstraints: MinPolicyConstraints;
  let maxConstraints: MaxPolicyConstraints;

  /* eslint-disable @typescript-eslint/no-non-null-assertion */
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
      upper: getRandomNumber(minConstraints.upper! + 1, 24),
      lower: getRandomNumber(minConstraints.lower! + 1, 24),
      digit: getRandomNumber(minConstraints.digit! + 1, 24),
      special: getRandomNumber(minConstraints.special! + 1, 24),
      // center length uniform pdf around the total sum
      length: getRandomNumber(
        4 * minConstraints.length! * 0.5,
        4 * minConstraints.length! ** 1.5
      ),
    };
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
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

  test('generateRandomPolicy([]) throws Error', () => {
    const constraints = {
      minConstraints: {},
      maxConstraints: {},
    };
    expect(() => generateRandomPolicy([], constraints)).toThrowError();
  });

  test('generateRandomPolicy() throws Error if policy key is not in minConstraints or maxConstraints', () => {
    const constraints: PolicyConstraintsConfig = {
      minConstraints: { digit: 5 },
      maxConstraints: { digit: 5 },
    };
    expect(() => generateRandomPolicy(['length'], constraints)).toThrowError();
  });
});
