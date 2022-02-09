import {
  generateCompliantPassword,
  GeneratorConfig,
  lower,
  MinConstraint,
  Password,
  PasswordGenerator,
  Policy,
  PolicyGeneratorConfig,
  policyNistRecommendations,
} from '../src/main';
import * as policyModule from '../src/util/policy';
import { sampleRandomPolicy } from '../src/util';

describe('password.ts', () => {
  test('generateCompliantPassword() has length combined from constraints (excluding length)', () => {
    const constraint: MinConstraint = {
      upper: 0,
      lower: 0,
      digit: 0,
      special: 0,
    };
    const policy: Policy = {
      lower: 5,
      digit: 3,
      special: 3,
      upper: 3,
      length: 2,
    };
    const password = generateCompliantPassword({
      policy,
      constraints: { min: constraint, max: constraint },
    });
    expect(password.length).toEqual(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      policy.digit! + policy.special! + policy.upper! + policy.lower!
    );
  });

  test('generateCompliantPassword() password does comply the sampled policy', () => {
    const policyGenConfig: PolicyGeneratorConfig = {
      constraints: policyNistRecommendations,
    };
    let i = 0;
    while (i < 1000) {
      const config: GeneratorConfig = {
        policy: sampleRandomPolicy(policyGenConfig),
        samplePolicy: false,
      };
      const password: Password = generateCompliantPassword(config);
      expect(password).toComplyPolicy(config);
      /* eslint-disable @typescript-eslint/no-non-null-assertion */
      expect(password.length).toBeGreaterThanOrEqual(
        policyGenConfig.constraints.min.length!
      );
      expect(password.length).toBeLessThanOrEqual(
        Math.max(
          policyGenConfig.constraints.max.length!,
          policyGenConfig.constraints.max.lower! +
            policyGenConfig.constraints.max.upper! +
            policyGenConfig.constraints.max.digit! +
            policyGenConfig.constraints.max.special!
        )
      );
      /* eslint-enable @typescript-eslint/no-non-null-assertion */
      i++;
    }
  });

  test('generateCompliantPassword() samples its own policy when samplePolicy is truthy', () => {
    const sampleRandomPolicySpy = jest.spyOn(
      policyModule,
      'sampleRandomPolicy'
    );
    const config: GeneratorConfig = {
      policy: {},
      samplePolicy: true,
      constraints: undefined,
    };
    generateCompliantPassword(config);
    expect(sampleRandomPolicySpy).toBeCalledTimes(1);
  });

  test('generateCompliantPassword() does exclude all lower characters except a with only lower on the includeList', () => {
    const config: GeneratorConfig = {
      policy: { lower: 2, length: 8 },
      samplePolicy: false,
      includeList: { lower, upper: '', special: '', digit: '' },
      excludeList: [...lower.slice(1)],
    };
    const password: Password = generateCompliantPassword(config);
    expect(password).toEqual('aaaaaaaa');
  });

  test("generateCompliantPassword() does exclude all lower characters except a but the resulting password is not only a's with the defaultIncludeList", () => {
    const config: GeneratorConfig = {
      policy: { lower: 2, length: 8 },
      samplePolicy: false,
      excludeList: [...lower.slice(1)],
    };
    const password: Password = generateCompliantPassword(config);
    expect(password).not.toEqual('aaaaaaaa');
  });
});

describe('PasswordGenerator', () => {
  test('generate() generates a password', () => {
    const config: GeneratorConfig = {
      policy: { length: 24 },
      samplePolicy: true,
    };
    const pg = new PasswordGenerator(config);
    const password: Password = pg.generate();
    expect(password.length).toBeGreaterThanOrEqual(24);
  });
});
