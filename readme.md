<img src="https://github.com/tahesse/betapassword/raw/main/assets/logo.png" style="display: block; margin: 0 auto" alt="BET/!\PASSWORD"/>

The purpose of this library is to provide a powerful password generator based on a `PasswordPolicy` configuration.
This library can also be used to generate random various `PasswordPolicy` of different quality levels.

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ftahesse%2Fbetapassword.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Ftahesse%2Fbetapassword?ref=badge_shield)
[![Lint and test](https://github.com/tahesse/betapassword/actions/workflows/lint-and-test.yml/badge.svg)](https://github.com/tahesse/betapassword/actions/workflows/lint-and-test.yml)
[![CodeQL](https://github.com/tahesse/betapassword/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/tahesse/betapassword/actions/workflows/codeql-analysis.yml)
[![codecov](https://codecov.io/gh/tahesse/betapassword/branch/main/graph/badge.svg?token=XgxgmeWzNo)](https://codecov.io/gh/tahesse/betapassword)

# Installation

To install this library, run

    yarn add betapassword
    yarn install

or

    npm i betapassword

depending on your package manager.

# Usage
This library provides a class and a function based approach to generate passwords and/or policies. Generally, we need to build our policy first which we can then use to generate a password from.

#### `generateCompliantPassword(passwordPolicy, { minPolicyConstraints[, whitelist] })`
Generate a single password given the `passwordPolicy` and the `minPolicyConstraints` from the `GeneratorConfig`.

```typescript
/* Policy dictates that we want a password that is at least 12 characters long
   with a minimum of two special characters, two digits and two uppercase
   letters.
 */
const policy: PasswordPolicy = {
  length: 12,
  special: 2,
  digit: 2,
  upper: 2,
};
/* We want to have a constraint of minimum eight lowercase characters but only
   with letters [a-m] and not so fancy special chars.
 */
const config: GeneratorConfig = {
  minPolicyConstraints: {
    lower: 8,
  },
  whitelist: {
    ...defaultWhitelist,
    special: '!?#+-_',
    lower: 'abcdefghijklm',
  },
};
const password: string = generateCompliantPassword(policy, config);
```

#### new PasswordGenerator({ minPolicyConstraints[, whitelist] }).generate(policy)
```typescript
/* Policy1 dictates that we want a password that is at least 12 characters long.
 */
const policy1: PasswordPolicy = { length: 12 };
/* Policy2 dictates that we want a password that is at least 24 characters long.
 */
const policy2: PasswordPolicy = { length: 24 };
/* We want to have a constraint of minimum eight lowercase characters but only
   with letters [a-m] and not so fancy special chars.
 */
const config: GeneratorConfig = {
  minPolicyConstraints: {
    upper: 8,
  },
  whitelist: {
    ...defaultWhitelist,
    special: '!?#+-_',
    lower: 'abcdefghijklm',
  },
};
const generator = new PasswordGenerator(config);
const password1 = generator.generate(policy1);
const password2 = generator.generate(policy2);
```

## How to run an example
You can run an example, e.g. the _function/password.example.ts_ in the _examples_ folder like so:

    EXAMPLE="examples/function/password.example"; npx tsc "${EXAMPLE}.ts" && node "${EXAMPLE}.js"

# Development
In case you want to develop on or contribute to this library, make sure to check out the remote HEAD and install all dependencies with your favorite package manager for NodeJs.
To run this application type

    yarn start

or

    npm start

## Testing
To run the test suite of this library, type

    yarn test

or

    npm test

## Code style \& lint
Please pay attention to the `.editorconfig` and `.eslintrc.js` and stick to those rules. PR's in that regard are welcome as well!

# Author
[Thomas Hesse](https://thomas-hesse.eu)


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ftahesse%2Fbetapassword.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Ftahesse%2Fbetapassword?ref=badge_large)
