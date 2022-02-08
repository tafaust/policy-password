import { IncludeList, IncludeListKey, QuantifiableKeys } from './types';

/* ASCII characters from https://www.rfc-editor.org/rfc/rfc20.txt
 */

export const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const lower = 'abcdefghijklmnopqrstuvwxyz';
export const digit = '1234567890';
export const special = String.raw`!@#$%^&*()+_\-=}{[\]|:;"/?.><,\`~\\`;
// String.raw`\`~!@#$%^&*()-=_+[{]}\|;':",.<>/?`;

export const includeListKeys: ReadonlyArray<IncludeListKey> = [
  'lower',
  'upper',
  'special',
  'digit',
] as const;
export const quantifiableKeys: ReadonlyArray<QuantifiableKeys> = [
  ...includeListKeys,
  'length',
] as const;

// ref: <https://help.sap.com/doc/b0322267728e48a28b0c8ee7dd1ab4c7/1.0/en-US/Inclusive%20Language%20Guidelines.pdf>
// page: "Decision tree: blacklist / includeList"
export const defaultIncludeList: IncludeList = {
  upper,
  lower,
  digit,
  special,
};

/**
 * https://pages.nist.gov/800-63-3/sp800-63b.html#-5112-memorized-secret-verifiers
 */
export const policyNistRecommendations = {
  min: { length: 8, lower: 2, upper: 2, special: 2, digit: 2 },
  max: { length: 64, lower: 16, upper: 16, special: 16, digit: 16 },
};
