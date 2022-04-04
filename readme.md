<p align="center">
  <img src="assets/logo_top.png" alt="PolicyPassword"/>
  <br>
  <i>policy-password is a library to generate passwords<br/>from policies given constraints.</i>
  <br>
</p>

<p align="center">
  <a href="CONTRIBUTING.md">Contributing Guidelines</a>
  ·
  <a href="https://github.com/tahesse/policy-password/issues">Submit an Issue</a>
  <br>
  <br>
</p>

<hr/>

The purpose of this library is to provide a powerful password generator based on a `PasswordPolicy` configuration.
This especially useful when using a library such as [keycloak](https://github.com/keycloak/keycloak-nodejs-admin-client). 
Keycloak provides the ability to set password policies per realm which can be obtained and parsed to generate passwords with this library.
<br/>

[comment]: <> (This library can also be used to generate random various `PasswordPolicy` of different quality levels.)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ftahesse%2Fbetapassword.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Ftahesse%2Fbetapassword?ref=badge_shield)
[![Lint and test](https://github.com/tahesse/policy-password/actions/workflows/lint-and-test.yml/badge.svg)](https://github.com/tahesse/policy-password/actions/workflows/lint-and-test.yml)
[![CodeQL](https://github.com/tahesse/policy-password/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/tahesse/policy-password/actions/workflows/codeql-analysis.yml)
[![codecov](https://codecov.io/gh/tahesse/policy-password/branch/main/graph/badge.svg?token=XgxgmeWzNo)](https://codecov.io/gh/tahesse/policy-password)
[![npm version](https://badge.fury.io/js/policy-password.svg)](https://badge.fury.io/js/policy-password)
![npm downloads](https://img.shields.io/npm/dm/policy-password)
![npm dependencies](https://img.shields.io/badge/dynamic/json?url=https://api.npmutil.com/package/policy-password&label=dependencies&query=$.dependencies.count)

# Installation

To install this library, run

    yarn add policy-password
    yarn install

or

    npm i policy-password

depending on your package manager.

# Usage
This library provides a class and a function based approach to generate passwords and/or policies. Generally, we need to build our policy first which we can then use to generate a password from.

#### `generateCompliantPassword({ policy[, constraints, includeList, excludeList, samplePolicy] })`
Generate a single password given the `passwordPolicy` and the `minPolicyConstraints` from the `GeneratorConfig`.

```typescript
/* Policy dictates that we want a password that is at least six characters long
   with a minimum of two special characters, two digits and two uppercase
   letters.
 */
const policy: Policy = {
  special: 2,
  digit: 2,
  upper: 2,
};
/* Prepare our config that holds the policy for password generation.
 */
const config: GeneratorConfig = { policy, samplePolicy: true };
/* Generate 35 passwords with our predefined policy atop.
 */
const password: Password = generateCompliantPassword(config);
```

#### `new PasswordGenerator({ policy[, constraints, includeList, excludeList, samplePolicy] }).generate()`

```typescript
/* Policy dictates that we want a password that is at least 12 characters long
   with a minimum of two two digits and two uppercase letters.
 */
const policy: Policy = {
  length: 12,
  digit: 2,
  upper: 2,
};
/* We want to have a constraint of minimum eight lowercase characters but only
   with letters [a-m] and not so fancy special chars.
 */
const config: GeneratorConfig = {
  policy,
  samplePolicy: true,
  includeList: {
    ...defaultIncludeList,
    special: '!?#+-_',
    lower: 'abcdefghijklm',
  },
};
const passwordGenerator = new PasswordGenerator(config);
const password: Password = passwordGenerator.generate();
```

## How to run an example
You can run an example, e.g. the _function/password.example.ts_ in the _examples_ folder like so:

    yarn run example:func

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
