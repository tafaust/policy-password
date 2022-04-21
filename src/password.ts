import {
  defaultIncludeList,
  policyNistRecommendations,
  similar,
} from './constants';
import type {
  DefinitePolicy,
  ExcludeList,
  GeneratorConfig,
  IncludeList,
  Password,
  Policy,
  PolicyGeneratorConfig,
  RuleSet,
} from './types';
import {
  getRandomElementsFromArray,
  getRandomIncludeListEntry,
  getRandomIndex,
  sampleRandomPolicy,
  shuffle,
} from './util';

// Functional API

/**
 * Generate a password with characters from a {@link IncludeList} constrained by
 * a {@link Policy} with lower bound constraints.
 * @param {GeneratorConfig} [config={}] config todo
 */
export function generateCompliantPassword(config: GeneratorConfig): Password {
  const { policy, includeList, excludeList, constraints } = config;
  let internalPolicy: Policy = {};
  let internalExcludeList: ExcludeList = excludeList ?? [];
  if (config.samplePolicy ?? false) {
    // sample policy from constraints
    const policyConfig: PolicyGeneratorConfig = {
      constraints: {
        ...policyNistRecommendations,
        ...constraints,
      },
    };
    internalPolicy = sampleRandomPolicy(policyConfig);
  }
  // merge sampled policy with given policy
  internalPolicy = { ...internalPolicy, ...policy };
  // handle non-quantifiable policy keys
  if (policy.excludeSimilar ?? false) {
    internalExcludeList = [...internalExcludeList, ...similar];
  }
  // prepare pool to sample password characters from
  const internalIncludeList: IncludeList = includeList ?? defaultIncludeList;
  if (internalExcludeList.length !== 0) {
    (Object.keys(internalIncludeList) as (keyof IncludeList)[]).forEach(
      (key) => {
        internalIncludeList[key] = internalIncludeList[key].replace(
          new RegExp(String.raw`${internalExcludeList.join('|')}`, 'g'),
          ''
        );
      }
    );
  }
  // build rule set from policy and constraints
  const availableRules: RuleSet = [
    {
      name: 'lower',
      rule: new RegExp(
        String.raw`^(?:[^${internalIncludeList.lower}]*[${internalIncludeList.lower}]){${internalPolicy.lower},}`
      ),
    },
    {
      name: 'upper',
      rule: new RegExp(
        String.raw`^(?:[^${internalIncludeList.upper}]*[${internalIncludeList.upper}]){${internalPolicy.upper},}`
      ),
    },
    {
      name: 'digit',
      rule: new RegExp(
        String.raw`^(?:[^${internalIncludeList.digit}]*[${internalIncludeList.digit}]){${internalPolicy.digit},}`
      ),
    },
    {
      name: 'special',
      rule: new RegExp(
        String.raw`^(?:[^${internalIncludeList.special}]*[${internalIncludeList.special}]){${internalPolicy.special},}`
      ),
    },
    {
      name: 'length',
      rule: new RegExp(String.raw`^.{${internalPolicy.length},}`),
    },
  ];
  const applicableRules = availableRules.filter((rule) =>
    Object.keys(internalPolicy).includes(rule.name)
  );
  // generate password: sample from pool until rules are satisfied
  const password: Password[] = [];
  const patternArray = applicableRules.map(({ rule }) => rule);
  while (!patternArray.every((pattern) => pattern.test(password.join('')))) {
    for (const { rule, name } of applicableRules) {
      if (!rule.test(password.join(''))) {
        // fill with only _some_ random includeList entries if all options are
        // exhausted and the length constraint does not hold yet
        password.push(
          ...getRandomElementsFromArray(
            [
              ...(name === 'length'
                ? getRandomIncludeListEntry(internalIncludeList)
                : internalIncludeList[name]),
            ],
            // fixme type
            name === 'length'
              ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                getRandomIndex(internalPolicy[name]! - password.length + 1)
              : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                internalPolicy[name]!
          )
        );
      }
    }
  }
  return shuffle(password).join('');
}

// Class API

/**
 * This class aids with password generation.
 * @class
 */
export class PasswordGenerator {
  public readonly config: GeneratorConfig;
  public readonly policy: DefinitePolicy;

  constructor(config: GeneratorConfig) {
    const { policy, constraints } = config;
    this.config = { ...config, samplePolicy: false };
    const policyConfig: PolicyGeneratorConfig = {
      constraints: {
        ...policyNistRecommendations,
        ...constraints,
      },
    };
    this.policy = {
      ...sampleRandomPolicy(policyConfig),
      ...policy,
    };
  }

  public generate = (): Password =>
    generateCompliantPassword({
      ...this.config,
      policy: { ...this.policy, ...this.config.policy },
    });
}
