export const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const lower = 'abcdefghijklmnopqrstuvwxyz';
export const digit = '1234567890';
export const special = '!@#$%^&*()+_-=}{[]|:;"/?.><,`~';

export type Whitelist = Record<'upper' | 'lower' | 'digit' | 'special', string>;
export const defaultWhitelist: Whitelist = {
  upper,
  lower,
  digit,
  special,
};
