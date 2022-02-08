import {
  computeEntropy,
  defaultIncludeList,
  GeneratorConfig,
  PasswordGenerator,
  Policy,
} from '../../src/main';

/* You'd want to do import like this:
 */
// import {
//   computeEntropy,
//   defaultIncludeList,
//   GeneratorConfig,
//   PasswordGenerator,
//   Policy,
// } from 'policy-password';

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

const generator = new PasswordGenerator(config);

/* Generate 35 passwords.
 */
const passwords: string[] = [];
while (passwords.length < 35) {
  const password = generator.generate();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const entropy = computeEntropy(password, config.includeList!);
  passwords.push(`Password ${password} has an entropy of ${entropy}.`);
}
console.log(passwords.join('\n'));

/* Produces output like this:
Password l-?+Z-j?-c!b5S?5hd##f has an entropy of 121.40855398401786.
Password +#-i+cUOl-b_5b_+c-?1l has an entropy of 121.40855398401786.
Password #l0#k#f#hG#-Uj!+b!!6c has an entropy of 121.40855398401786.
Password d5-c!Mf#d!l+3i#P+f!?_ has an entropy of 121.40855398401786.
Password ???7#mi??B6b+fD_-l#ki has an entropy of 121.40855398401786.
Password b?bJm#--Ek_fh5#_b4-?? has an entropy of 121.40855398401786.
Password l#k?+-2i-?O--hh7jGc?+ has an entropy of 121.40855398401786.
Password e8!?H+S#+k#kj!e_e?#7j has an entropy of 121.40855398401786.
Password +i?-+jf#C3h-fGj!##j-4 has an entropy of 121.40855398401786.
Password #gf3Jlaa+##?4_iK+_-+a has an entropy of 121.40855398401786.
Password -9leil-C?L#?#d__9ed## has an entropy of 121.40855398401786.
Password ??3ObeC#?agg#hg_#-4?# has an entropy of 121.40855398401786.
Password ?-lgh8_#je6-c-+SBe#!+ has an entropy of 121.40855398401786.
Password _+_i2?I+h6!-eeih?#-mL has an entropy of 121.40855398401786.
Password iCl+-+d_-!ec7-b?#d8P# has an entropy of 121.40855398401786.
Password g-#3Qk+?4#jd#cR+#-h?l has an entropy of 121.40855398401786.
Password Ueik?#-#6e--1-k!liF#+ has an entropy of 121.40855398401786.
Password hi1h#!#-kS!i-D+-?3!ef has an entropy of 121.40855398401786.
Password ##-9-k-c9e-ZQ?#ffmi?? has an entropy of 121.40855398401786.
Password LhDh-!?3!#fh+e_8!cj#+ has an entropy of 121.40855398401786.
Password +#+d-_3f??Ie+cd!-kl4R has an entropy of 121.40855398401786.
Password +!+gO+_cj#k2f-g2?+?cR has an entropy of 121.40855398401786.
Password 8?f8A?ali++!_++Cf+bk? has an entropy of 121.40855398401786.
Password +kUV3_gc-?e?j3+#-##ef has an entropy of 121.40855398401786.
Password a#?lc5_8?cjE#-?#chJ!? has an entropy of 121.40855398401786.
Password +#U?d#i-2R+a?9i_-d#ka has an entropy of 121.40855398401786.
Password Nmae????a##l8-!i?G+k3 has an entropy of 121.40855398401786.
Password 8-e-9abaa+!gK#-#?X!k+ has an entropy of 121.40855398401786.
Password ?#?_l-!56Jmf-#eJbak++ has an entropy of 121.40855398401786.
Password f-++Xi#!2E6!dj#kb-b## has an entropy of 121.40855398401786.
Password #6K?k6#!!Xgdh!##?k+ek has an entropy of 121.40855398401786.
Password e?+8#+Vcl5+b+c+g--#kI has an entropy of 121.40855398401786.
Password +d??h-5-hEU!i+j?f1+-h has an entropy of 121.40855398401786.
Password g-i4#d#ld-O+j?!-K?7_a has an entropy of 121.40855398401786.
Password ?##gg#cf#6!#-h7l?!AOk has an entropy of 121.40855398401786.

 */
