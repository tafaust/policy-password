import {
  PasswordPolicy,
  GeneratorConfig,
  PasswordGenerator,
  defaultIncludeList,
} from '../../src/main';

/* You'd want to do import like this:
 */
// import {
//   PasswordPolicy,
//   GeneratorConfig,
//   PasswordGenerator,
//   defaultIncludeList,
// } from 'policy-password';

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
  includeList: {
    ...defaultIncludeList,
    special: '!?#+-_',
    lower: 'abcdefghijklm',
  },
};

const generator = new PasswordGenerator(config);

/* Generate 35 passwords.
 */
const passwords: string[] = [];
while (passwords.length < 35) {
  passwords.push(generator.generate(policy));
}

console.log(passwords.join('\n'));
/* Produces output like this:
-dL!Jdaial98gl
dWli48d!Ra-dkg
Cj!ei?lj4l1fjS
-ig8aQbi-j2Dla
ib#!9gij4FlbfE
5f!k2lchhjWbM!
Mb61fSlllejf!#
!Fdj7c1lUilh#h
7eX#b-Oghi5edc
f7I#jfi2ebS#lf
l-kkeSd#Ah5l4g
16Mkkj-?gkIgad
9ijIjCkj!jj?6k
2kbeihQC-ea5?k
a#b-d8fhJEaj8l
hge+g?ga27gDgE
ic?je#bf4McgL5
9i?9gUlk!dkebS
igckici7h+J9#A
aDa4h7Kdli+ea+
cb!jeKjl#hg48X
df3l!a8Ij+aFcf
f!#NRai1ciei2i
ek9gkce3aMe#T-
eAehg+7Mhfdh-7
f5P9d?aFigjf#b
7l1jbjle+NiJ-d
adb3W#Nkl?cjb8
cghL0j6ai!#adQ
3?iEPcclaaj1-f
l!hPf3c7ej#Pai
f#baQ-j3gY4ebl
be?2ehEld4M?he
gQl?89blfSkdb-
?ehjAR25kdeem?
 */
