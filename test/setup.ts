import { MinPolicyConstraints, PasswordPolicy } from '../src/policy';
import { PasswordRule } from '../src/password';
import { expect } from '@jest/globals';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toComplyPolicy(validator: PasswordPolicy): CustomMatcherResult;
      toComplyPolicyAndMinConstraints(
        validator: PasswordPolicy,
        minConstraints: MinPolicyConstraints
      ): CustomMatcherResult;
    }
  }
}

const toComplyPolicy = (received: string, validator: PasswordPolicy) => {
  const lowerMinAmount = validator.lower || 0;
  const upperMinAmount = validator.upper || 0;
  const digitMinAmount = validator.digit || 0;
  const specialMinAmount = validator.special || 0;
  const lengthMinAmount = Math.max(
    validator.length || 0,
    lowerMinAmount + upperMinAmount + digitMinAmount + specialMinAmount
  );
  const rules: PasswordRule[] = [
    {
      name: 'lower',
      amount: lowerMinAmount,
      pattern: new RegExp(String.raw`^(?:[^a-z]*[a-z]){${lowerMinAmount},}`),
    },
    {
      name: 'upper',
      amount: upperMinAmount,
      pattern: new RegExp(String.raw`^(?:[^A-Z]*[A-Z]){${upperMinAmount},}`),
    },
    {
      name: 'digit',
      amount: digitMinAmount,
      pattern: new RegExp(String.raw`^(?:[^0-9]*[0-9]){${digitMinAmount},}`),
    },
    {
      name: 'special',
      amount: specialMinAmount,
      pattern: new RegExp(
        String.raw`^(?:[^!@#$%^&*()+_\-=}{[\]|:;"/?.><,\`~]*[!@#$%^&*()+_\-=}{[\]|:;"/?.><,\`~]){${specialMinAmount},}`
      ),
    },
    {
      name: 'length',
      amount: lengthMinAmount,
      pattern: new RegExp(String.raw`^.{${lengthMinAmount},}`),
    },
  ];
  const patternArray = rules.map((rule) => rule.pattern);
  if (patternArray.every((rcb) => rcb.test(received))) {
    return {
      message: () => `Password ${received} is valid`,
      pass: true,
    };
  } else {
    return {
      message: () => `Password ${received} is NOT valid`,
      pass: false,
    };
  }
};

const toComplyPolicyAndMinConstraints = (
  received: string,
  validator: PasswordPolicy,
  minConstraints: MinPolicyConstraints
) => {
  const _validator: PasswordPolicy = {
    length: Math.max(validator.length ?? 0, minConstraints.length ?? 0),
    special: Math.max(validator.special ?? 0, minConstraints.special ?? 0),
    upper: Math.max(validator.upper ?? 0, minConstraints.upper ?? 0),
    digit: Math.max(validator.digit ?? 0, minConstraints.digit ?? 0),
    lower: Math.max(validator.lower ?? 0, minConstraints.lower ?? 0),
  };
  return toComplyPolicy(received, _validator);
};

expect.extend({
  toComplyPolicy: toComplyPolicy,
  toComplyPolicyAndMinConstraints: toComplyPolicyAndMinConstraints,
});
