import { expect } from '@jest/globals';
import {
  defaultIncludeList,
  GeneratorConfig,
  IncludeList,
  RuleSet,
} from '../src/main';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toComplyPolicy(config: GeneratorConfig): CustomMatcherResult;
    }
  }
}

const toComplyPolicy = (received: string, config: GeneratorConfig) => {
  const { policy, includeList, excludeList } = config;
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
  const applicableRules: RuleSet = [
    {
      name: 'lower',
      rule: new RegExp(
        String.raw`^(?:[^${_includeList.lower}]*[${_includeList.lower}]){${policy.lower}}`
      ),
    },
    {
      name: 'upper',
      rule: new RegExp(
        String.raw`^(?:[^${_includeList.upper}]*[${_includeList.upper}]){${policy.upper}}`
      ),
    },
    {
      name: 'digit',
      rule: new RegExp(
        String.raw`^(?:[^${_includeList.digit}]*[${_includeList.digit}]){${policy.digit}}`
      ),
    },
    {
      name: 'special',
      rule: new RegExp(
        String.raw`^(?:[^${_includeList.special}]*[${_includeList.special}]){${policy.special}}`
      ),
    },
    {
      name: 'length',
      rule: new RegExp(String.raw`^.{${policy.length},}`),
    },
  ];
  const patternArray = applicableRules.map((rule) => rule.rule);
  if (patternArray.every((rcb) => rcb.test(received))) {
    return {
      message: () => `Password ${received} is valid`,
      pass: true,
    };
  } else {
    return {
      message: () => `Password ${received} is invalid`,
      pass: false,
    };
  }
};

expect.extend({
  toComplyPolicy: toComplyPolicy,
});
