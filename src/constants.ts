export const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const lower = 'abcdefghijklmnopqrstuvwxyz';
export const digit = '1234567890';
export const special = '`~!@#$%^&*()-=_+[{]}\\|;\':",.<>/?';

// ref: <https://help.sap.com/doc/b0322267728e48a28b0c8ee7dd1ab4c7/1.0/en-US/Inclusive%20Language%20Guidelines.pdf>
// page: "Decision tree: blacklist / includeList"
export type IncludeList = Record<
  'upper' | 'lower' | 'digit' | 'special',
  string
>;
export const defaultIncludeList: IncludeList = {
  upper,
  lower,
  digit,
  special,
};
