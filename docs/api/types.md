# Type Definitions

Complete TypeScript type definitions for ng-states-core.

## State

Main interface for state data.

### Definition

```typescript
interface State {
  state: string;
  capital: string;
  region: GeopoliticalZone;
  postal_code: string;
  coordinates: Coordinates;
  population: number;
  created: string;
  slogan: string;
  lgas: string[];
  senatorial_districts: string[];
  towns: string[];
}
```

### Properties

| Property               | Type               | Description                          |
| ---------------------- | ------------------ | ------------------------------------ |
| `state`                | `string`           | Official state name                  |
| `capital`              | `string`           | Capital city name                    |
| `region`               | `GeopoliticalZone` | Geopolitical zone                    |
| `postal_code`          | `string`           | Primary postal code (6 digits)       |
| `coordinates`          | `Coordinates`      | Geographic coordinates               |
| `population`           | `number`           | Estimated population                 |
| `created`              | `string`           | Creation date (ISO 8601: YYYY-MM-DD) |
| `slogan`               | `string`           | Official state slogan                |
| `lgas`                 | `string[]`         | Array of LGA names                   |
| `senatorial_districts` | `string[]`         | Array of 3 senatorial districts      |
| `towns`                | `string[]`         | Array of major town names            |

### Example

```typescript
import { State, getState } from "ng-states-core";

const lagos: State = getState("Lagos");

console.log(lagos.state); // 'Lagos'
console.log(lagos.capital); // 'Ikeja'
console.log(lagos.region); // 'South-West'
console.log(lagos.postal_code); // '100001'
console.log(lagos.population); // 15400000
console.log(lagos.created); // '1967-05-27'
console.log(lagos.slogan); // 'Centre of Excellence'
```

---

## GeopoliticalZone

Union type for Nigeria's six geopolitical zones.

### Definition

```typescript
type GeopoliticalZone =
  | "North-Central"
  | "North-East"
  | "North-West"
  | "South-East"
  | "South-South"
  | "South-West";
```

### Values

- `"North-Central"` - 7 states
- `"North-East"` - 6 states
- `"North-West"` - 7 states
- `"South-East"` - 5 states
- `"South-South"` - 6 states
- `"South-West"` - 6 states

### Example

```typescript
import { GeopoliticalZone, getStatesByRegion } from "ng-states-core";

const zone: GeopoliticalZone = "South-West";
const states = getStatesByRegion(zone);

// TypeScript enforces valid zones
// const invalid: GeopoliticalZone = "Invalid"; // Error!
```

---

## Coordinates

Interface for geographic coordinates.

### Definition

```typescript
interface Coordinates {
  latitude: number;
  longitude: number;
}
```

### Properties

| Property    | Type     | Description                  |
| ----------- | -------- | ---------------------------- |
| `latitude`  | `number` | Latitude in decimal degrees  |
| `longitude` | `number` | Longitude in decimal degrees |

### Example

```typescript
import { Coordinates, getState } from "ng-states-core";

const lagos = getState("Lagos");
const coords: Coordinates = lagos.coordinates;

console.log(coords.latitude); // 6.45407
console.log(coords.longitude); // 3.39467

// Use with mapping libraries
function displayOnMap(coords: Coordinates) {
  console.log(`Location: ${coords.latitude}°N, ${coords.longitude}°E`);
}

displayOnMap(lagos.coordinates);
```

---

## TownSearchResult

Interface for town search results.

### Definition

```typescript
interface TownSearchResult {
  state: string;
  town: string;
}
```

### Properties

| Property | Type     | Description                     |
| -------- | -------- | ------------------------------- |
| `state`  | `string` | State where the town is located |
| `town`   | `string` | Town name                       |

### Example

```typescript
import { TownSearchResult, searchTowns } from "ng-states-core";

const results: TownSearchResult[] = searchTowns("aba");

results.forEach((result: TownSearchResult) => {
  console.log(`${result.town} in ${result.state}`);
});
// Aba in Abia
// Abakaliki in Ebonyi
```

---

## Utility Types

### State Property Types

Extract specific property types from State:

```typescript
import { State } from "ng-states-core";

type StateName = State["state"]; // string
type StateCapital = State["capital"]; // string
type StateRegion = State["region"]; // GeopoliticalZone
type StateCoordinates = State["coordinates"]; // Coordinates
type StatePopulation = State["population"]; // number
type StateLgas = State["lgas"]; // string[]
```

### Partial State

Create partial state types:

```typescript
import { State } from "ng-states-core";

type StateSummary = Pick<State, "state" | "capital" | "region">;

const summary: StateSummary = {
  state: "Lagos",
  capital: "Ikeja",
  region: "South-West",
};
```

### Optional State

Make state properties optional:

```typescript
import { State } from "ng-states-core";

type PartialState = Partial<State>;

const partial: PartialState = {
  state: "Lagos",
  capital: "Ikeja",
  // Other properties are optional
};
```

---

## Type Guards

### isState

Check if a value is a State object:

```typescript
import { State } from "ng-states-core";

function isState(value: unknown): value is State {
  return (
    typeof value === "object" &&
    value !== null &&
    "state" in value &&
    "capital" in value &&
    "region" in value &&
    "lgas" in value
  );
}

const data: unknown = getSomeData();

if (isState(data)) {
  // TypeScript knows data is State
  console.log(data.capital);
}
```

### isGeopoliticalZone

Check if a string is a valid GeopoliticalZone:

```typescript
import { GeopoliticalZone } from "ng-states-core";

const validZones: readonly GeopoliticalZone[] = [
  "North-Central",
  "North-East",
  "North-West",
  "South-East",
  "South-South",
  "South-West",
] as const;

function isGeopoliticalZone(value: string): value is GeopoliticalZone {
  return validZones.includes(value as GeopoliticalZone);
}

const input = getUserInput();

if (isGeopoliticalZone(input)) {
  // TypeScript knows input is GeopoliticalZone
  const states = getStatesByRegion(input);
}
```

---

## Generic Types

### StateProcessor

Generic function type for processing states:

```typescript
import { State } from "ng-states-core";

type StateProcessor<T> = (state: State) => T;

const getPopulation: StateProcessor<number> = (state) => state.population;
const getCapital: StateProcessor<string> = (state) => state.capital;
const getLgaCount: StateProcessor<number> = (state) => state.lgas.length;
```

### StatePredicate

Type for state filter functions:

```typescript
import { State } from "ng-states-core";

type StatePredicate = (state: State) => boolean;

const isPopulous: StatePredicate = (s) => s.population > 10000000;
const isSouthWest: StatePredicate = (s) => s.region === "South-West";
const hasManyLgas: StatePredicate = (s) => s.lgas.length > 20;
```

---

## Advanced Types

### StateMap

Map states by name:

```typescript
import { State, getStates } from "ng-states-core";

type StateMap = Record<string, State>;

function createStateMap(): StateMap {
  const states = getStates();
  return states.reduce((map, state) => {
    map[state.state] = state;
    return map;
  }, {} as StateMap);
}

const stateMap = createStateMap();
console.log(stateMap["Lagos"].capital); // 'Ikeja'
```

### StateWithMetadata

Extend State with custom metadata:

```typescript
import { State } from "ng-states-core";

interface StateWithMetadata extends State {
  metadata: {
    lastUpdated: Date;
    verified: boolean;
    source: string;
  };
}

function enrichState(state: State): StateWithMetadata {
  return {
    ...state,
    metadata: {
      lastUpdated: new Date(),
      verified: true,
      source: "ng-states-core",
    },
  };
}
```

## Related

- [State Functions](/api/states) - Use these types
- [TypeScript Guide](/guide/typescript) - TypeScript best practices
- [API Overview](/api/overview) - All API functions
