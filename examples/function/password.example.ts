import {
  defaultIncludeList,
  generateCompliantPassword,
  GeneratorConfig,
} from '../../src/main';
import { computeEntropy } from '../../src/entropy';
import { Policy } from '../../src/types';

/* You'd want to do import like this:
 */
// import {
//   defaultIncludeList,
//   generateCompliantPassword,
//   GeneratorConfig,
//   computeEntropy,
//   Policy,
// } from 'policy-password';

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
const passwords: string[] = [];
while (passwords.length < 35) {
  const password = generateCompliantPassword(config);
  const entropy = computeEntropy(password, defaultIncludeList);
  passwords.push(`Password ${password} has an entropy of ${entropy}.`);
}
console.log(passwords.join('\n'));

/* Produces output like this:
Password W\mQGvnxl[ry#:ryu\y>vk?Ulqs4Y,Kdu0O\ySQ\dw has an entropy of 277.1963393718594.
Password ljiz.sk[OfkY7elr8d has an entropy of 118.7984311593683.
Password 7lwmiBp\blfZh-9 has an entropy of 98.99869263280692.
Password k8S7lmcybIr/+i2e has an entropy of 105.59860547499405.
Password .i*(;f$)~N-1Ef1nx,hr&/\%[<\@>.%h~q`+;n#,(_C has an entropy of 283.7962522140465.
Password lEm32lcj8^a)p3:5kOu has an entropy of 125.39834400155543.
Password 1Zu@p66%gY has an entropy of 65.99912842187128.
Password nituOIxfAsmPfifu0UlGProAdYcRQj4ePdijSwY}\oarlbl has an entropy of 310.195903582795.
Password U73u(q3d5tfBqaqz7ecnq4sumsy4b3a3lw3e4jc6e143k2i\72u3 has an entropy of 343.19546779373064.
Password 1qT[m8Xqnu[ has an entropy of 72.5990412640584.
Password X}ynfkMakn,3g9yr has an entropy of 105.59860547499405.
Password utjWX7{dG46,qe5 has an entropy of 98.99869263280692.
Password j@1843m7oj4jVn7f81p2v+468586cc36oE94S58398aw791b63391d0 has an entropy of 362.995206320292.
Password ci`"syWu1Yppb!Nvc<P6~c?li"=Zsyq has an entropy of 204.59729810780095.
Password vm;oNl$96Qjnzafnt has an entropy of 112.19851831718117.
Password bpmjj5yyzT~efip8ptwlachik\scmhAlics has an entropy of 230.99694947654947.
Password 7x76qm3s46sZ852n2999Ue7zc78kv=agr46un@9vo449 has an entropy of 290.3961650562336.
Password p$|Uz5Nq2j3shb8oybyq6x4mx has an entropy of 164.99782105467818.
Password iTpiWd2d8yeoi_}cfe has an entropy of 118.7984311593683.
Password 1gljbqs[ut:gSz4rKy has an entropy of 118.7984311593683.
Password 6kapXlq\llv6_nCxjc has an entropy of 118.7984311593683.
Password fngek@\4iqxorc5e?halBR has an entropy of 145.1980825281168.
Password yu8S(xjmveayzxyumm3=nnrgPd has an entropy of 171.59773389686532.
Password 3578w28j43779o3778?874f2F287213X)4j78299o0989921 has an entropy of 316.79581642498215.
Password J_6omijn3ssemwi2%6zGoh has an entropy of 145.1980825281168.
Password bh\83L\ft65"pw5pfq7d38alseuru7si5snfb7d798q6d854uaJ=uwp/s has an entropy of 376.1950320046663.
Password 5yx5podqEk:vpjzivd5I)g has an entropy of 145.1980825281168.
Password i4+djbmp~SttfybK7L has an entropy of 118.7984311593683.
Password ln[c7cxoty7RTcspgtwxrrdahqspxjjwbbf!{o!ibdos has an entropy of 290.3961650562336.
Password xfw8c-_nJre;w42}4]=\4}m;Ut,{4o7c[cewfn5 has an entropy of 257.396600845298.
Password mkp73GyrO.ep)vecnjpel has an entropy of 138.5981696859297.
Password 2w1pty82ehp6wfk7a^3W6y8hmp2EzrfvAkkkbV55uDuv1_np9p0oq96dq9723re has an entropy of 415.79450905778907.
Password tYN#xC2\vqtbsl9Cl9Nj-98fhfg450wcHk0Jdpa4usCbF has an entropy of 296.99607789842076.
Password `m.x679aqulg2xh7A8Hhfykhp7m18kt4oth has an entropy of 230.99694947654947.
Password 36489227550973594592l8093Cy83@404m879Ry28877173575h7467892| has an entropy of 389.3948576890405.
 */
