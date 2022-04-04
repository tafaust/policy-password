import { defaultIncludeList, policyNistRecommendations } from './constants';
import type {
  DefinitePolicy,
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
  let _policy: Policy = {};
  if (config.samplePolicy ?? false) {
    // sample policy from constraints
    const policyConfig: PolicyGeneratorConfig = {
      constraints: {
        ...policyNistRecommendations,
        ...constraints,
      },
    };
    _policy = sampleRandomPolicy(policyConfig);
  }
  // merge sampled policy with given policy
  _policy = { ..._policy, ...policy };
  // prepare pool to sample password characters from
  const _includeList: IncludeList = includeList ?? defaultIncludeList;
  if (excludeList !== undefined) {
    (Object.keys(_includeList) as (keyof IncludeList)[]).forEach((key) => {
      _includeList[key] = _includeList[key].replace(
        new RegExp(String.raw`${excludeList.join('')}`),
        ''
      );
    });
  }
  // build rule set from policy and constraints
  const availableRules: RuleSet = [
    {
      name: 'lower',
      rule: new RegExp(
        String.raw`^(?:[^${_includeList.lower}]*[${_includeList.lower}]){${_policy.lower},}`
      ),
    },
    {
      name: 'upper',
      rule: new RegExp(
        String.raw`^(?:[^${_includeList.upper}]*[${_includeList.upper}]){${_policy.upper},}`
      ),
    },
    {
      name: 'digit',
      rule: new RegExp(
        String.raw`^(?:[^${_includeList.digit}]*[${_includeList.digit}]){${_policy.digit},}`
      ),
    },
    {
      name: 'special',
      rule: new RegExp(
        String.raw`^(?:[^${_includeList.special}]*[${_includeList.special}]){${_policy.special},}`
      ),
    },
    // {
    //   name: 'special',
    //   rule: new RegExp(
    //     String.raw`^(?:[^${escapeSpecialCharacters(
    //       _includeList.special
    //     )}]*[${escapeSpecialCharacters(_includeList.special)}]){${
    //       _policy.special
    //     },}`
    //   ),
    // },
    {
      name: 'length',
      rule: new RegExp(String.raw`^.{${_policy.length},}`),
    },
  ];
  const applicableRules = availableRules.filter((rule) =>
    Object.keys(_policy).includes(rule.name)
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
                ? getRandomIncludeListEntry(_includeList)
                : _includeList[name]),
            ],
            // fixme type
            name === 'length'
              ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                getRandomIndex(_policy[name]! - password.length + 1)
              : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                _policy[name]!
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
