import {
  getNormalizedRandomNumber,
  getRandomElementsFromArray,
  getRandomWhitelistEntryToFillFrom,
  randomShuffle,
} from './util/helper';
import {
  digit as digits,
  lower as lowerCase,
  special as specialChars,
  upper as upperCase,
  Whitelist,
} from './constants';
import { MinPolicyConstraints, PasswordPolicy } from './policy';

/**
 * There must be a rule for each key of a {@link PasswordPolicy}.
 */
export type RuleName = keyof PasswordPolicy;

/**
 * A single rule builds from a {@link RuleName}, the minimum `amount` of a char
 * to occur and the `pattern` to validate this rule.
 */
export type PasswordRule = {
  name: RuleName;
  amount: number;
  pattern: RegExp;
};

export type GeneratorConfig = {
  minPolicyConstraints: MinPolicyConstraints;
  whitelist?: Whitelist;
};

// Functional API

/**
 * Generate a password with characters from a {@link Whitelist} constrained by a
 * {@link PasswordPolicy} with lower bound constraints.
 * @param passwordPolicy The {@link PasswordPolicy} to adhere to.
 * @param minPolicyConstraints The minimum constraints towards password
 *                             generation given by {@link MinPolicyConstraints}.
 * @param whitelist A list of {@link Whitelist} characters to build the password
 *                  from.
 * @returns string The generated password. Enjoy. :)
 */
export const generateCompliantPassword = (
  passwordPolicy: PasswordPolicy,
  { minPolicyConstraints, whitelist }: GeneratorConfig
): string => {
  // obtain lower bounds
  const { digit, lower, upper, special, length } = minPolicyConstraints;
  const lowerMinAmount = passwordPolicy.lower || lower || 0;
  const upperMinAmount = passwordPolicy.upper || upper || 0;
  const digitMinAmount = passwordPolicy.digit || digit || 0;
  const specialMinAmount = passwordPolicy.special || special || 0;
  const lengthMinAmount = Math.max(
    passwordPolicy.length ?? 0,
    length ?? 0,
    digitMinAmount + lowerMinAmount + upperMinAmount + specialMinAmount
  );
  // obtain password rules
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
  // obtain whitelist characters for the password
  const _whitelist: Whitelist = whitelist || {
    lower: lowerCase,
    upper: upperCase,
    digit: digits,
    special: specialChars,
  };
  // generate password
  const password: string[] = [];
  const patternArray = rules.map((rule) => rule.pattern);
  while (!patternArray.every((pattern) => pattern.test(password.join('')))) {
    for (const rule of rules) {
      if (!rule.pattern.test(password.join(''))) {
        // fill with only _some_ random whitelist entries if all options are
        // exhausted and the length constraint does not hold yet
        password.push(
          ...getRandomElementsFromArray(
            rule.name === 'length'
              ? getRandomWhitelistEntryToFillFrom(_whitelist)
              : _whitelist[rule.name],
            rule.name === 'length'
              ? (0.5 + getNormalizedRandomNumber() * rule.amount) << 0
              : rule.amount
          )
        );
      }
    }
  }
  // return shuffle(password).join('');
  return randomShuffle(password, 50).join('');
};

// Class API

/**
 * This class aids with password generation.
 * @class
 */
export class PasswordGenerator {
  private whitelist?: Whitelist;
  private minPolicyConstraints: MinPolicyConstraints;

  constructor(config: GeneratorConfig) {
    this.whitelist = config.whitelist;
    this.minPolicyConstraints = config.minPolicyConstraints;
  }

  public generate = (policy: PasswordPolicy): string => {
    const { minPolicyConstraints, whitelist } = this;
    return generateCompliantPassword(policy, {
      minPolicyConstraints,
      whitelist,
    });
  };
}
