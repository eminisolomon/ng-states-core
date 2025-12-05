import statesAndLocalGov from "./statesAndLocalGov.json";
import { State, StateData } from "./interface";

/**
 * Normalize input string to lowercase and trim whitespace
 * @param input - The string to normalize
 * @returns Normalized string
 */
function normalize(input: string): string {
  return input.toLowerCase().trim();
}

/**
 * Normalize FCT aliases to the official name
 * @param state - State name to normalize
 * @returns Normalized state name
 */
function normalizeFCT(state: string): string {
  const fctAliases = ["fct", "f.c.t", "abuja", "f c t"];
  return fctAliases.includes(normalize(state))
    ? "Federal Capital Territory"
    : state;
}

/**
 * Get all Nigerian states with their local government areas and senatorial districts
 * @returns Array of all states with complete data
 * @example
 * ```typescript
 * const allStates = all();
 * console.log(allStates.length); // 37
 * ```
 */
export function all(): State[] {
  return statesAndLocalGov as State[];
}

/**
 * Get list of all Nigerian state names
 * @returns Array of state names
 * @example
 * ```typescript
 * const stateNames = states();
 * console.log(stateNames); // ['Abia', 'Adamawa', ...]
 * ```
 */
export function states(): string[] {
  return statesAndLocalGov.map((state) => state.state);
}

/**
 * Get senatorial districts for a specific state
 * @param state - Name of the state (case-insensitive)
 * @returns Array of senatorial districts
 * @throws {Error} If state name is invalid or not found
 * @example
 * ```typescript
 * const districts = senatorial_districts('Lagos');
 * console.log(districts); // ['Lagos Central', 'Lagos East', 'Lagos West']
 * ```
 */
export function senatorial_districts(state: string): string[] {
  const normalizedState = normalize(state);

  if (!normalizedState || normalizedState === "") {
    throw new Error("Invalid Nigeria State");
  }

  const stateName = normalizeFCT(normalizedState);

  const stateData = statesAndLocalGov.find(
    (s) => normalize(s.state) === normalize(stateName)
  );

  if (!stateData) {
    throw new Error(`State "${state}" not found`);
  }

  return stateData.senatorial_districts;
}

/**
 * Get complete data for a specific state including LGAs and senatorial districts
 * @param state - Name of the state (case-insensitive)
 * @returns State data object containing state name, LGAs, and senatorial districts
 * @throws {Error} If state name is invalid or not found
 * @example
 * ```typescript
 * const lagosData = lgas('Lagos');
 * console.log(lagosData.state); // 'Lagos'
 * console.log(lagosData.lgas.length); // 20
 * ```
 */
export function lgas(state: string): StateData {
  const normalizedState = normalize(state);

  if (!normalizedState || normalizedState === "") {
    throw new Error("Invalid Nigeria State");
  }

  const stateName = normalizeFCT(normalizedState);

  const stateData = statesAndLocalGov.find(
    (s) => normalize(s.state) === normalize(stateName)
  );

  if (!stateData) {
    throw new Error(`State "${state}" not found`);
  }

  return stateData as StateData;
}

// Export types for consumers
export { State, StateData } from "./interface";

// Default export for CommonJS compatibility
export default {
  all,
  states,
  senatorial_districts,
  lgas,
};
