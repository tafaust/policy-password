import { IncludeList } from './types';

/*
Password strength is determined with this chart:
< 28 bits = Very Weak; might keep out family members
28 - 35 bits = Weak; should keep out most people, often good for desktop login passwords
36 - 59 bits = Reasonable; fairly secure passwords for network and company passwords
60 - 127 bits = Strong; can be good for guarding financial information
128+ bits = Very Strong; often overkill
 */

/**
 * This function computes the entropy (`log2`) of a given `password` given the
 * `includeList` it was created from.
 *
 * The entropy `E` is compute from:
 * ```
 *    E = |P| * log2(|I|)
 * ```
 * where `|P|` is the password length and `|I|` is the include list length.
 *
 * Password strength is determined with this chart:
 *  - < 28 bits = Very Weak; might keep out family members
 *  - 28 - 35 bits = Weak; should keep out most people, often good for desktop
 *    login passwords
 *  - 36 - 59 bits = Reasonable; fairly secure passwords for network and company
 *    passwords
 *  - 60 - 127 bits = Strong; can be good for guarding financial information
 *  - 128+ bits = Very Strong; often overkill
 *
 * @param password The password to compute the entropy from.
 * @param includeList The {@link IncludeList} to compute the entropy with.
 * @returns number The resulting entropy.
 */
export function computeEntropy(password: string, includeList: IncludeList) {
  const pool = [...new Set(Object.values(includeList))].join('');
  return Math.log2(pool.length) * password.length;
}
