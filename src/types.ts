type IncludeListKey = 'upper' | 'lower' | 'digit' | 'special';
type QuantifiableKeys = IncludeListKey | 'length';
type NonQuantifiableKeys = 'excludeSimilar';
/**
 * An object that holds the different categories of characters.
 * See {@link IncludeListKey} for more information.
 */
type IncludeList = { [K in IncludeListKey]: string };
/**
 * A list of characters to exclude from passwords. The exclude list takes
 * precedence over the {@link IncludeList}.
 */
type ExcludeList = string[];
/**
 * A policy puts definite constraints on a password. Every entry that is not
 * specified in the policy, will be filled with a random sample drawn from
 * `U{min, max}` where `min` and `max` are the constraints given by
 * {@link MinConstraint} and {@link MaxConstraint}.
 */
type Policy = {
  // quantifiable
  [K in QuantifiableKeys]?: number;
} & {
  // flags
  [K in NonQuantifiableKeys]?: boolean;
};
type DefinitePolicy = {
  [K in keyof Policy]-?: Policy[K];
};
type MinConstraint = { [K in QuantifiableKeys]?: number };
type MaxConstraint = { [K in QuantifiableKeys]?: number };
/**
 * A constraint range must contain all {@link QuantifiableKeys} for its
 * {@link MinConstraint}s and {@link MaxConstraint}s.
 */
type ConstraintRange = {
  min: MinConstraint;
  // { [k in keyof MinConstraint]-?: MinConstraint[k] };
  max: MaxConstraint;
  // { [k in keyof MaxConstraint]-?: MaxConstraint[k] };
};
type Password = string;
/**
 * We need to be able provide a rule for each entry of the
 * {@link QuantifiableKeys} because only those can be tested.
 */
type RuleName = QuantifiableKeys;
/**
 * A RuleSet is identified by its {@link RuleName} and provides a callable that
 * consumes `min` and `max` to produce a regular expression that represents this
 * rule.
 *
 * The parameters `min` are to be provided by the {@link Policy} with fallback
 * to the {@link MinConstraint}.
 *
 * A rule set is to be applied to quantifiable entities only.
 */
type RuleSet = {
  name: RuleName;
  rule: RegExp;
  // rule: (min: number, max: number) => RegExp;
}[];

// function configurations:

type GeneratorConfig = {
  policy: Policy | DefinitePolicy;
  constraints?: ConstraintRange;
  includeList?: IncludeList;
  excludeList?: string[];
  samplePolicy?: boolean;
};

type PolicyGeneratorConfig = {
  constraints: ConstraintRange;
  round?: typeof Math.round;
};

export {
  IncludeListKey,
  QuantifiableKeys,
  NonQuantifiableKeys,
  IncludeList,
  ExcludeList,
  Policy,
  DefinitePolicy,
  MinConstraint,
  MaxConstraint,
  ConstraintRange,
  Password,
  RuleSet,
  GeneratorConfig,
  PolicyGeneratorConfig,
};
