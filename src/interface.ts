/**
 * Represents a Nigerian state with its local government areas and senatorial districts
 */
export interface State {
  /** Name of the state */
  state: string;
  /** List of senatorial districts in the state */
  senatorial_districts: string[];
  /** List of local government areas in the state */
  lgas: string[];
}

/**
 * Response type for the lgas() function
 */
export interface StateData extends State {}

/**
 * Options for querying state data
 */
export interface QueryOptions {
  /** Whether to perform case-sensitive matching */
  caseSensitive?: boolean;
}
