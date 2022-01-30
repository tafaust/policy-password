import {
  PasswordPolicy,
  generateCompliantPassword,
  GeneratorConfig,
  defaultIncludeList,
} from '../../src/main';

/* You'd want to do import like this:
 */
// import {
//   PasswordPolicy,
//   generateCompliantPassword,
//   GeneratorConfig,
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

/* Generate 35 passwords.
 */
const passwords: string[] = [];
while (passwords.length < 35) {
  passwords.push(generateCompliantPassword(policy, config));
}

console.log(passwords.join('\n'));
/* Produces output like this:
e3K?#kb4Lbakeb
llA2jhj5a#lh+D
ae7d8hhXj#lMj?
EgcRkia#+1bh5h
O65fg##hdjhilQ
24Rgcdi#k-aQde
c!4hkEgVh1ija-
bhCcdcde51+T-g
W8blcbcb?Ha3-l
-Miji9bNk-hbl9
h9gh4ageNgj!R#
#f6k4hjbGkZe-i
dbhl3-e2li?VcP
3klhNack-g?G4b
ffe?j6lHiAe-f2
Od2i9cbg-efiO!
6cc4#lgahUi!La
aaJcF-f5j!i4lb
gdg#abkKNl5k2!
lfhd#iUd3+Sa4g
?j4lLhhc?2iCaj
UgkLlhel?lb19?
R?5Piikke#ghk8
!j-k0geIfjGl6f
#Sdk1cj+aaaE3g
?if+Xla7fgli4K
8jh-bDd-1jkhSe
fggc+Ul!3l4Pca
aifAg8!ike!B7i
fW?aa3gf?1iUae
Yjk-8ahi8ceVc#
i+ej-ll9aNh5Vd
fijkFb9l+P4k-c
hd3U3k!?hPjhbi
hicfeF?2lbe1#C
 */
