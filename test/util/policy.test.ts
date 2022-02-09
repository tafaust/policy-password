import { Policy, PolicyGeneratorConfig } from 'src/main';
import { isPolicyEmpty, sampleRandomPolicy } from '../../src/util';
import { expect } from '@jest/globals';

describe('policy.ts', () => {
  test('isPolicyEmpty({}) is true', () => {
    expect(isPolicyEmpty({})).toEqual(true);
  });

  test('isPolicyEmpty({ lower: 0, upper: 0, ... }) is true', () => {
    const policy: Policy = {
      lower: 0,
      upper: 0,
      special: 0,
      digit: 0,
      length: 0,
    };
    expect(isPolicyEmpty(policy)).toEqual(true);
  });

  test('sampleRandomPolicy() has lower values for floor rounding method on average', () => {
    const config: PolicyGeneratorConfig = {
      constraints: {
        min: { lower: 2 },
        max: { lower: 8 },
      },
    };
    let avg_floor = 0;
    let avg_round = 0;
    let i = 0;
    while (i < 1000) {
      avg_floor += sampleRandomPolicy({ ...config, round: Math.floor }).lower;
      avg_round += sampleRandomPolicy(config).lower;
      i++;
    }
    expect(avg_floor / 1000).toBeLessThan(avg_round / 1000);
  });

  test('sampleRandomPolicy() returns NaN for keys not specified in the constraints', () => {
    const config: PolicyGeneratorConfig = {
      constraints: {
        min: {},
        max: {},
      },
    };
    expect(sampleRandomPolicy(config).toString()).toBe(
      {
        lower: NaN,
        upper: NaN,
        digit: NaN,
        special: NaN,
        length: NaN,
      }.toString()
    );
  });

  test('sampleRandomPolicy() throws Error when min and max constraints have different keys', () => {
    const config: PolicyGeneratorConfig = {
      constraints: {
        min: { lower: 2 },
        max: { upper: 8 },
      },
    };
    expect(() => sampleRandomPolicy(config)).toThrowError();
  });
});
