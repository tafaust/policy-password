import {
  generateCompliantPassword,
  generateRandomPolicy,
  generateRandomPolicyKeys,
  GeneratorConfig,
  MinPolicyConstraints,
  PasswordGenerator,
  PasswordPolicy,
} from '../src/main';

describe('PasswordGenerator', () => {
  let generator: PasswordGenerator;
  let config: GeneratorConfig;

  beforeAll(() => {
    config = { minPolicyConstraints: { length: 8 } };
    generator = new PasswordGenerator(config);
  });

  test('generateCompliantPassword() has length combined from constraints (excluding length)', () => {
    const minConstraints: MinPolicyConstraints = {
      upper: 0,
      lower: 0,
      digit: 0,
      special: 0,
    };
    const policy: PasswordPolicy = {
      lower: 3,
      digit: 3,
      special: 3,
      upper: 3,
      length: 2,
    };
    const password = generateCompliantPassword(policy, {
      minPolicyConstraints: minConstraints,
    });
    expect(password.length).toEqual(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      policy.digit! + policy.special! + policy.upper! + policy.lower!
    );
  });

  test('generate() password does comply the policy', () => {
    let i = 0;
    while (i < 50) {
      const keys = generateRandomPolicyKeys();
      const policy = generateRandomPolicy(keys, {
        minConstraints: Object.assign({}, ...keys.map((k) => ({ [k]: 2 }))),
        maxConstraints: Object.assign({}, ...keys.map((k) => ({ [k]: 4 }))),
      });
      const password = generator.generate(policy);
      expect(password).toComplyPolicy(policy);
      expect(password).toComplyPolicyAndMinConstraints(
        policy,
        config.minPolicyConstraints
      );
      expect(password.length).toBeGreaterThanOrEqual(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        config.minPolicyConstraints.length!
      );
      i++;
    }
  });
});
